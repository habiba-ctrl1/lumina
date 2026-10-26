"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { COUNTRIES, SERVICE_CATEGORIES, buildTransportWhatsAppUrl, type ServiceCategoryKey } from "@/lib/transportation/config";
import {
  BOOKING_PURPOSES, BUDGET_OPTIONS, JOURNEY_TYPES, STEP_FIELDS, VEHICLE_CHOICES,
  countryName, emptyEnquiry, todayInRiyadh, validateStep, vehicleLabel,
  type EnquiryErrors, type EnquiryInput, type FormId,
} from "@/lib/transportation/enquiry";
import { captureAttribution } from "@/lib/transportation/attribution";
import { trackTransportEvent } from "@/lib/transportation/analytics";

const STEPS = ["Journey", "Details", "Vehicle", "You", "Requirements", "Review"];

const input =
  "w-full rounded-md border border-[#1c2430]/20 bg-white px-3 py-2.5 text-sm text-[#1c2430] placeholder:text-[#1c2430]/40 focus:border-[#c5a059] focus:outline-none focus:ring-2 focus:ring-[#c5a059]/40";
const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#1c2430]/65";
const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-md bg-[#0b1623] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16293f] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a059]";
const btnGhost =
  "inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-[#1c2430]/70 hover:text-[#1c2430] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c5a059]";

export interface TransportEnquiryFormProps {
  formId: FormId;
  initial?: Partial<EnquiryInput>;
  heading?: string;
}

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className={labelCls}>{label}</label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-[#1c2430]/50">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="mt-1 text-xs font-medium text-red-700">{error}</p>}
    </div>
  );
}

export default function TransportEnquiryForm({ formId, initial, heading = "Tell us about the journey" }: TransportEnquiryFormProps) {
  const [data, setData] = useState<EnquiryInput>(() => ({ ...emptyEnquiry(), formId, ...initial }));
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const [reference, setReference] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const startedAt = useRef<number>(Date.now());
  const started = useRef(false);
  const topRef = useRef<HTMLDivElement>(null);
  const today = useMemo(() => todayInRiyadh(), []);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const set = <K extends keyof EnquiryInput>(k: K, v: EnquiryInput[K]) => {
    if (!started.current) {
      started.current = true;
      trackTransportEvent("transport_form_start", { form_id: formId });
    }
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const pickCategory = (c: ServiceCategoryKey) => {
    setData((d) => {
      const next = { ...d, serviceCategory: c };
      if (c === "cross_border" && d.destinationCountry === d.originCountry) {
        next.destinationCountry = d.originCountry === "SA" ? "AE" : "SA";
        next.destinationCity = "";
      }
      if (c !== "cross_border" && d.destinationCountry !== "SA" && d.originCountry === "SA") {
        next.destinationCountry = "SA";
        next.destinationCity = "";
      }
      return next;
    });
    trackTransportEvent("transport_service_select", { service_category: c });
  };

  const citiesFor = (cc: string) => COUNTRIES.find((c) => c.key === cc)?.cities ?? [];
  const isBusiness = ["corporate", "travel_agency", "hotel", "event_organizer"].includes(data.bookingPurpose);

  const goTo = (n: number) => {
    setStep(n);
    topRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };

  const next = () => {
    const e = validateStep(step, data);
    if (Object.keys(e).length) {
      setErrors(e);
      trackTransportEvent("transport_form_error", { step: step + 1, service_category: data.serviceCategory });
      return;
    }
    setErrors({});
    goTo(step + 1);
  };

  const submit = async () => {
    if (status === "submitting" || status === "success") return;
    const e = validateStep(5, data);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setStatus("submitting");
    setServerMsg("");
    try {
      const res = await fetch("/api/transportation/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          formId,
          website: honeypot,
          elapsedMs: Date.now() - startedAt.current,
          attribution: captureAttribution(),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok && json.reference) {
        setReference(json.reference);
        setStatus("success");
        trackTransportEvent("transport_lead_submitted", { service_category: data.serviceCategory, customer_type: data.bookingPurpose, form_id: formId });
        return;
      }
      if (res.ok && json.ok) {
        // Silent anti-spam path: nothing was stored, so never claim a reference.
        setStatus("error");
        setServerMsg("We couldn't confirm your enquiry. Please try again, or message us on WhatsApp.");
        return;
      }
      if (res.status === 400 && json.fields) {
        setErrors(json.fields);
        const bad = Object.keys(json.fields);
        const firstStep = STEP_FIELDS.findIndex((fs) => fs.some((f) => bad.includes(f)));
        setStatus("idle");
        setServerMsg(json.error || "Please check the highlighted fields.");
        goTo(firstStep >= 0 ? firstStep : 5);
        return;
      }
      setStatus("error");
      setServerMsg(json.error || "We couldn't save your enquiry. Please try again, or message us on WhatsApp.");
    } catch {
      setStatus("error");
      setServerMsg("Connection problem. Your details are still here — please try again, or message us on WhatsApp.");
    }
  };

  if (status === "success" && reference) {
    const wa = buildTransportWhatsAppUrl({
      category: data.serviceCategory,
      origin: data.originCity,
      destination: data.destinationCity,
      date: data.travelDate,
      vehicle: data.vehicles.length === 1 ? vehicleLabel(data.vehicles[0]) : undefined,
      reference,
    });
    return (
      <div ref={topRef} role="status" className="rounded-xl bg-[#faf7f1] p-7 text-[#1c2430] md:p-10">
        <CheckCircle2 className="text-[#2f7d4f]" size={34} aria-hidden />
        <h3 className="mt-4 font-serif text-2xl font-bold">Enquiry received</h3>
        <p className="mt-2 text-sm text-[#1c2430]/75">Your reference</p>
        <p className="font-mono text-xl font-semibold tracking-wide">{reference}</p>
        <p className="mt-5 text-sm leading-relaxed text-[#1c2430]/80">
          We&apos;ll review the route, passengers, vehicle preference and timing, then reply with options or a written quotation. This confirms receipt only — availability and pricing are confirmed in the quotation, and nothing is booked until you accept it.
        </p>
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTransportEvent("transport_whatsapp_click", { service_category: data.serviceCategory, placement: "form_success" })}
          className="mt-6 inline-flex items-center gap-2 rounded-md border border-[#1c2430]/25 px-5 py-3 text-sm font-medium hover:bg-[#1c2430]/5"
        >
          <MessageCircle size={16} aria-hidden /> Continue on WhatsApp with your reference
        </a>
      </div>
    );
  }

  const crossBorder = data.serviceCategory === "cross_border";
  const e = errors;

  return (
    <div ref={topRef} className="scroll-mt-24 rounded-xl bg-[#faf7f1] p-6 text-[#1c2430] md:p-9">
      <h3 className="font-serif text-2xl font-bold">{heading}</h3>

      <ol className="mt-5 flex gap-1.5" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex-1" aria-current={i === step ? "step" : undefined}>
            <div className={`h-1 rounded-full transition-colors duration-500 ${i <= step ? "bg-[#c5a059]" : "bg-[#1c2430]/10"}`} />
            <span className={`mt-1.5 hidden text-[11px] sm:block ${i === step ? "font-semibold" : "text-[#1c2430]/50"}`}>{s}</span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-xs text-[#1c2430]/55 sm:hidden">Step {step + 1} of {STEPS.length}: {STEPS[step]}</p>

      {/* Honeypot — hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(ev) => setHoneypot(ev.target.value)} /></label>
      </div>

      <form
        className="mt-7 space-y-5"
        noValidate
        onSubmit={(ev) => {
          ev.preventDefault();
          if (step < STEPS.length - 1) next();
          else submit();
        }}
      >
        {step === 0 && (
          <>
            <fieldset>
              <legend className={labelCls}>What do you need?</legend>
              <div className="grid gap-3 sm:grid-cols-3">
                {(Object.keys(SERVICE_CATEGORIES) as ServiceCategoryKey[]).map((k) => (
                  <label key={k} className={`cursor-pointer rounded-lg border p-4 text-sm transition ${data.serviceCategory === k ? "border-[#c5a059] bg-white shadow-sm" : "border-[#1c2430]/15 bg-white/60 hover:border-[#c5a059]/60"}`}>
                    <input type="radio" name="serviceCategory" className="sr-only" checked={data.serviceCategory === k} onChange={() => pickCategory(k)} />
                    <span className="font-semibold">{SERVICE_CATEGORIES[k].label}</span>
                  </label>
                ))}
              </div>
              {e.serviceCategory && <p role="alert" className="mt-1 text-xs font-medium text-red-700">{e.serviceCategory}</p>}
            </fieldset>
            <Field id="tx-journey" label="Journey type" error={e.journeyType}>
              <select id="tx-journey" className={input} value={data.journeyType} onChange={(ev) => set("journeyType", ev.target.value)}>
                {JOURNEY_TYPES.map((j) => <option key={j.value} value={j.value}>{j.label}</option>)}
              </select>
            </Field>
            {crossBorder && (
              <p className="rounded-md border border-[#c5a059]/40 bg-[#c5a059]/10 p-3 text-xs leading-relaxed">
                Cross-border journeys are reviewed for feasibility, operator permits and travel documents before anything is confirmed.
              </p>
            )}
          </>
        )}

        {step === 1 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="tx-oc" label="Pickup country" error={e.originCountry}>
                <select id="tx-oc" className={input} value={data.originCountry} onChange={(ev) => { set("originCountry", ev.target.value); set("originCity", ""); }}>
                  {COUNTRIES.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
                </select>
              </Field>
              <Field id="tx-ocity" label="Pickup city" error={e.originCity}>
                <input id="tx-ocity" list="tx-ocities" className={input} value={data.originCity} onChange={(ev) => set("originCity", ev.target.value)} autoComplete="off" />
                <datalist id="tx-ocities">{citiesFor(data.originCountry).map((c) => <option key={c} value={c} />)}</datalist>
              </Field>
              <div className="sm:col-span-2">
                <Field id="tx-paddr" label="Pickup address, hotel, airport or landmark" error={e.pickupAddress}>
                  <input id="tx-paddr" className={input} value={data.pickupAddress} onChange={(ev) => set("pickupAddress", ev.target.value)} placeholder="e.g. King Khalid International Airport, Terminal 5" />
                </Field>
              </div>
              <Field id="tx-dc" label="Destination country" error={e.destinationCountry}>
                <select id="tx-dc" className={input} value={data.destinationCountry} onChange={(ev) => { set("destinationCountry", ev.target.value); set("destinationCity", ""); }}>
                  {COUNTRIES.map((c) => <option key={c.key} value={c.key}>{c.name}</option>)}
                </select>
              </Field>
              <Field id="tx-dcity" label="Destination city" error={e.destinationCity}>
                <input id="tx-dcity" list="tx-dcities" className={input} value={data.destinationCity} onChange={(ev) => set("destinationCity", ev.target.value)} autoComplete="off" />
                <datalist id="tx-dcities">{citiesFor(data.destinationCountry).map((c) => <option key={c} value={c} />)}</datalist>
              </Field>
              <div className="sm:col-span-2">
                <Field id="tx-daddr" label="Destination address (optional)" error={e.destinationAddress}>
                  <input id="tx-daddr" className={input} value={data.destinationAddress} onChange={(ev) => set("destinationAddress", ev.target.value)} />
                </Field>
              </div>
              <Field id="tx-date" label="Travel date" error={e.travelDate}>
                <input id="tx-date" type="date" min={today} className={input} value={data.travelDate} onChange={(ev) => set("travelDate", ev.target.value)} />
              </Field>
              <Field id="tx-time" label="Pickup time" error={e.pickupTime} hint="Saudi Arabia time (AST, UTC+3)">
                <input id="tx-time" type="time" className={input} value={data.pickupTime} onChange={(ev) => set("pickupTime", ev.target.value)} />
              </Field>
              {data.journeyType === "return" && (
                <>
                  <Field id="tx-rdate" label="Return date" error={e.returnDate}>
                    <input id="tx-rdate" type="date" min={data.travelDate || today} className={input} value={data.returnDate} onChange={(ev) => set("returnDate", ev.target.value)} />
                  </Field>
                  <Field id="tx-rtime" label="Return time" error={e.returnTime}>
                    <input id="tx-rtime" type="time" className={input} value={data.returnTime} onChange={(ev) => set("returnTime", ev.target.value)} />
                  </Field>
                </>
              )}
              <Field id="tx-pax" label="Passengers" error={e.passengers}>
                <input id="tx-pax" type="number" min={1} max={100} inputMode="numeric" className={input} value={data.passengers || ""} onChange={(ev) => set("passengers", Number(ev.target.value))} />
              </Field>
              <Field id="tx-lug" label="Luggage" error={e.luggage}>
                <input id="tx-lug" className={input} value={data.luggage} onChange={(ev) => set("luggage", ev.target.value)} placeholder="e.g. 4 suitcases + 2 cabin bags" />
              </Field>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={data.flexibleSchedule} onChange={(ev) => set("flexibleSchedule", ev.target.checked)} className="h-4 w-4 accent-[#c5a059]" />
              My schedule is flexible
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <fieldset>
              <legend className={labelCls}>Vehicle classes (choose one or more)</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {VEHICLE_CHOICES.map((v) => {
                  const checked = data.vehicles.includes(v.value);
                  return (
                    <label key={v.value} className={`cursor-pointer rounded-lg border p-3.5 text-sm transition ${checked ? "border-[#c5a059] bg-white shadow-sm" : "border-[#1c2430]/15 bg-white/60 hover:border-[#c5a059]/60"}`}>
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 align-middle accent-[#c5a059]"
                        checked={checked}
                        onChange={() => {
                          let vs = checked ? data.vehicles.filter((x) => x !== v.value) : [...data.vehicles, v.value];
                          if (!checked && v.value === "recommend") vs = ["recommend"];
                          if (!checked && v.value !== "recommend") vs = vs.filter((x) => x !== "recommend");
                          set("vehicles", vs);
                          if (!checked) trackTransportEvent("transport_vehicle_select", { vehicle_class: v.value });
                        }}
                      />
                      {v.label}
                    </label>
                  );
                })}
              </div>
              {e.vehicles && <p role="alert" className="mt-1 text-xs font-medium text-red-700">{e.vehicles}</p>}
              <p className="mt-2 text-xs text-[#1c2430]/55">All vehicles are subject to availability and confirmed in your quotation.</p>
            </fieldset>
            {data.vehicles.length > 0 && !data.vehicles.includes("recommend") && (
              <Field id="tx-vm" label="Is the vehicle class mandatory?">
                <select id="tx-vm" className={input} value={data.vehicleMandatory} onChange={(ev) => set("vehicleMandatory", ev.target.value as EnquiryInput["vehicleMandatory"])}>
                  <option value="equivalent">An equivalent vehicle is acceptable</option>
                  <option value="this_class">This class only</option>
                </select>
              </Field>
            )}
          </>
        )}

        {step === 3 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="tx-name" label="Full name" error={e.name}>
              <input id="tx-name" className={input} value={data.name} onChange={(ev) => set("name", ev.target.value)} autoComplete="name" />
            </Field>
            <Field id="tx-company" label="Company (optional)" error={e.company}>
              <input id="tx-company" className={input} value={data.company} onChange={(ev) => set("company", ev.target.value)} autoComplete="organization" />
            </Field>
            <Field id="tx-email" label="Business email" error={e.email}>
              <input id="tx-email" type="email" className={input} value={data.email} onChange={(ev) => set("email", ev.target.value)} autoComplete="email" />
            </Field>
            <div>
              <label htmlFor="tx-phone" className={labelCls}>Phone</label>
              <div className="flex gap-2">
                <input aria-label="Country code" className={`${input} w-20`} value={data.phoneCountryCode} onChange={(ev) => set("phoneCountryCode", ev.target.value)} inputMode="tel" />
                <input id="tx-phone" className={input} value={data.phone} onChange={(ev) => set("phone", ev.target.value)} inputMode="tel" autoComplete="tel-national" />
              </div>
              {(e.phone || e.phoneCountryCode) && <p role="alert" className="mt-1 text-xs font-medium text-red-700">{e.phone || e.phoneCountryCode}</p>}
            </div>
            <Field id="tx-purpose" label="Booking purpose" error={e.bookingPurpose}>
              <select id="tx-purpose" className={input} value={data.bookingPurpose} onChange={(ev) => set("bookingPurpose", ev.target.value)}>
                {BOOKING_PURPOSES.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
              </select>
            </Field>
            <label className="flex items-center gap-2 self-end pb-2 text-sm">
              <input type="checkbox" checked={data.whatsappPreferred} onChange={(ev) => set("whatsappPreferred", ev.target.checked)} className="h-4 w-4 accent-[#c5a059]" />
              Contact me on WhatsApp
            </label>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id="tx-stage" label="Is this a confirmed itinerary?">
              <select id="tx-stage" className={input} value={data.itineraryStatus} onChange={(ev) => set("itineraryStatus", ev.target.value as EnquiryInput["itineraryStatus"])}>
                <option value="initial">Initial enquiry</option>
                <option value="confirmed">Confirmed itinerary</option>
              </select>
            </Field>
            <Field id="tx-rec" label="One-time or recurring?">
              <select id="tx-rec" className={input} value={data.recurrence} onChange={(ev) => set("recurrence", ev.target.value as EnquiryInput["recurrence"])}>
                <option value="one_time">One-time</option>
                <option value="recurring">Recurring requirement</option>
              </select>
            </Field>
            <Field id="tx-qd" label="Quotation needed by (optional)" error={e.quoteDeadline}>
              <input id="tx-qd" type="date" min={today} className={input} value={data.quoteDeadline} onChange={(ev) => set("quoteDeadline", ev.target.value)} />
            </Field>
            <Field id="tx-budget" label="Budget (optional)" error={e.budget}>
              <select id="tx-budget" className={input} value={data.budget} onChange={(ev) => set("budget", ev.target.value)}>
                <option value="">Prefer not to say</option>
                {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field id="tx-req" label="Important service requirements (optional)">
                <input id="tx-req" className={input} value={data.serviceRequirements} onChange={(ev) => set("serviceRequirements", ev.target.value)} placeholder="e.g. child seat, arabic-speaking driver, meet-and-greet" />
              </Field>
            </div>
            {isBusiness && (
              <>
                <div className="sm:col-span-2">
                  <Field id="tx-proc" label="Purchase-order or procurement requirements (optional)">
                    <input id="tx-proc" className={input} value={data.procurementNotes} onChange={(ev) => set("procurementNotes", ev.target.value)} />
                  </Field>
                </div>
                <label className="flex items-center gap-2 text-sm sm:col-span-2">
                  <input type="checkbox" checked={data.invoiceRequested} onChange={(ev) => set("invoiceRequested", ev.target.checked)} className="h-4 w-4 accent-[#c5a059]" />
                  I need a formal quotation or invoice
                </label>
              </>
            )}
          </div>
        )}

        {step === 5 && (
          <>
            <dl className="grid gap-x-6 gap-y-2 rounded-lg border border-[#1c2430]/10 bg-white p-4 text-sm sm:grid-cols-2">
              <div><dt className="text-xs text-[#1c2430]/55">Service</dt><dd>{SERVICE_CATEGORIES[data.serviceCategory].label}</dd></div>
              <div><dt className="text-xs text-[#1c2430]/55">Route</dt><dd>{data.originCity}, {countryName(data.originCountry)} → {data.destinationCity}, {countryName(data.destinationCountry)}</dd></div>
              <div><dt className="text-xs text-[#1c2430]/55">Date</dt><dd>{data.travelDate} {data.pickupTime}</dd></div>
              <div><dt className="text-xs text-[#1c2430]/55">Passengers · vehicle</dt><dd>{data.passengers} · {data.vehicles.map(vehicleLabel).join(", ")}</dd></div>
            </dl>
            <Field id="tx-notes" label="Additional notes (optional)">
              <textarea id="tx-notes" rows={4} className={input} value={data.notes} onChange={(ev) => set("notes", ev.target.value)} placeholder="Itinerary details, extra stops, anything we should know." />
            </Field>
            <div>
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" checked={data.privacyConsent} onChange={(ev) => set("privacyConsent", ev.target.checked)} className="mt-0.5 h-4 w-4 accent-[#c5a059]" aria-describedby={e.privacyConsent ? "tx-priv-err" : undefined} />
                <span>I agree to my details being used to prepare a quotation, as described in the <a href="/privacy" target="_blank" className="underline">privacy notice</a>.</span>
              </label>
              {e.privacyConsent && <p id="tx-priv-err" role="alert" className="mt-1 text-xs font-medium text-red-700">{e.privacyConsent}</p>}
            </div>
            <label className="flex items-start gap-2 text-sm text-[#1c2430]/75">
              <input type="checkbox" checked={data.marketingConsent} onChange={(ev) => set("marketingConsent", ev.target.checked)} className="mt-0.5 h-4 w-4 accent-[#c5a059]" />
              <span>Optional: send me occasional updates about SEM transportation services.</span>
            </label>
          </>
        )}

        {serverMsg && (
          <p role="alert" className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden /> {serverMsg}
          </p>
        )}

        <div className="flex items-center justify-between pt-2">
          {step > 0 ? (
            <button type="button" className={btnGhost} onClick={() => goTo(step - 1)}><ArrowLeft size={15} aria-hidden /> Back</button>
          ) : <span />}
          {step < STEPS.length - 1 ? (
            <button type="submit" className={btnPrimary}>Continue <ArrowRight size={15} aria-hidden /></button>
          ) : (
            <button type="submit" disabled={status === "submitting"} className={btnPrimary}>
              {status === "submitting" ? <><Loader2 size={15} className="animate-spin" aria-hidden /> Sending…</> : "Request Your Tailored Quote"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
