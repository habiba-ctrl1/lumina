"use client";

import { useMemo, useState } from "react";
import { MessageCircle, ArrowRight } from "lucide-react";
import {
  COUNTRIES,
  VEHICLE_CLASSES,
  buildTransportWhatsAppUrl,
  getRouteEligibility,
  type ServiceCategoryKey,
} from "@/lib/transportation/config";
import { trackTransportEvent } from "@/lib/transportation/analytics";

const field =
  "w-full rounded-md border border-white/15 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#c5a059] focus:outline-none focus:ring-1 focus:ring-[#c5a059] [color-scheme:dark]";
const label = "block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 mb-1.5";

export default function RouteSelector() {
  const [fromCountry, setFromCountry] = useState("SA");
  const [fromCity, setFromCity] = useState("Riyadh");
  const [toCountry, setToCountry] = useState("SA");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [vehicle, setVehicle] = useState("");
  const [checked, setChecked] = useState(false);

  const fromCities = useMemo(() => COUNTRIES.find((c) => c.key === fromCountry)?.cities ?? [], [fromCountry]);
  const toCities = useMemo(() => COUNTRIES.find((c) => c.key === toCountry)?.cities ?? [], [toCountry]);
  const countryName = (k: string) => COUNTRIES.find((c) => c.key === k)?.name ?? k;

  const crossBorder = fromCountry !== toCountry;
  const category: ServiceCategoryKey = crossBorder ? "cross_border" : "vip_chauffeur";
  const eligibility = getRouteEligibility(fromCountry, toCountry);
  const vehicleName = VEHICLE_CLASSES.find((v) => v.key === vehicle)?.name;
  const today = new Date().toISOString().slice(0, 10);

  const origin = fromCity ? `${fromCity}, ${countryName(fromCountry)}` : undefined;
  const destination = toCity ? `${toCity}, ${countryName(toCountry)}` : undefined;
  const waUrl = buildTransportWhatsAppUrl({
    category,
    origin,
    destination,
    date: date ? `${date}${time ? ` ${time}` : ""}` : undefined,
    vehicle: vehicleName,
  });

  const quoteParams: Record<string, string> = {
    service: category, oc: fromCountry, ocity: fromCity, dc: toCountry, dcity: toCity, pax: passengers || "1",
  };
  if (date) quoteParams.date = date;
  if (time) quoteParams.time = time;
  if (vehicle) quoteParams.vehicle = vehicle;
  const quoteHref = `/transportation/request-a-quote?${new URLSearchParams(quoteParams).toString()}`;

  // One country change must keep city lists consistent.
  const pickFrom = (k: string) => {
    setFromCountry(k);
    setFromCity(COUNTRIES.find((c) => c.key === k)?.cities[0] ?? "");
    setChecked(false);
  };
  const pickTo = (k: string) => {
    setToCountry(k);
    setToCity("");
    setChecked(false);
  };

  return (
    <form
      className="rounded-xl border border-white/10 bg-[#0e1c2d]/80 p-5 md:p-7 backdrop-blur-sm"
      onSubmit={(e) => {
        e.preventDefault();
        setChecked(true);
        trackTransportEvent("transport_route_check", {
          service_category: category,
          origin_country: fromCountry,
          destination_country: toCountry,
          vehicle_class: vehicle || "none",
        });
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className={label} htmlFor="tx-from-country">Pickup country</label>
          <select id="tx-from-country" className={field} value={fromCountry} onChange={(e) => pickFrom(e.target.value)}>
            {COUNTRIES.map((c) => <option key={c.key} value={c.key} className="text-black">{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="tx-from-city">Pickup city</label>
          <select id="tx-from-city" className={field} value={fromCity} onChange={(e) => { setFromCity(e.target.value); setChecked(false); }}>
            {fromCities.map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="tx-to-country">Destination country</label>
          <select id="tx-to-country" className={field} value={toCountry} onChange={(e) => pickTo(e.target.value)}>
            {COUNTRIES.map((c) => <option key={c.key} value={c.key} className="text-black">{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="tx-to-city">Destination city</label>
          <select id="tx-to-city" className={field} value={toCity} onChange={(e) => { setToCity(e.target.value); setChecked(false); }}>
            <option value="" className="text-black">Select city</option>
            {toCities.map((c) => <option key={c} value={c} className="text-black">{c}</option>)}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="tx-date">Travel date</label>
          <input id="tx-date" type="date" min={today} className={field} value={date} onChange={(e) => { setDate(e.target.value); setChecked(false); }} />
        </div>
        <div>
          <label className={label} htmlFor="tx-time">Pickup time</label>
          <input id="tx-time" type="time" className={field} value={time} onChange={(e) => { setTime(e.target.value); setChecked(false); }} />
        </div>
        <div>
          <label className={label} htmlFor="tx-pax">Passengers</label>
          <input id="tx-pax" type="number" min={1} max={100} inputMode="numeric" className={field} value={passengers} onChange={(e) => { setPassengers(e.target.value); setChecked(false); }} />
        </div>
        <div>
          <label className={label} htmlFor="tx-vehicle">Vehicle class</label>
          <select
            id="tx-vehicle"
            className={field}
            value={vehicle}
            onChange={(e) => {
              setVehicle(e.target.value);
              setChecked(false);
              if (e.target.value) trackTransportEvent("transport_vehicle_select", { vehicle_class: e.target.value });
            }}
          >
            <option value="" className="text-black">Recommend a suitable vehicle</option>
            {VEHICLE_CLASSES.map((v) => <option key={v.key} value={v.key} className="text-black">{v.name}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={!toCity}
          className="inline-flex items-center gap-2 rounded-md bg-[#c5a059] px-5 py-3 text-sm font-semibold text-[#0b1623] transition hover:bg-[#d6b574] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c5a059]"
        >
          Check this journey <ArrowRight size={16} aria-hidden />
        </button>
        {!toCity && <span className="text-xs text-white/50">Choose a destination city to continue.</span>}
      </div>

      {checked && (
        <div role="status" className="mt-5 rounded-lg border border-[#c5a059]/40 bg-[#c5a059]/10 p-4 text-sm leading-relaxed text-white/90">
          <p className="font-semibold text-white">
            {crossBorder ? "Cross-border journey — feasibility review" : "Saudi chauffeur journey — availability check"}
          </p>
          <p className="mt-1">
            {origin} → {destination}.{" "}
            {crossBorder
              ? eligibility?.publicNote
              : "We confirm vehicle availability with our transport partner before quoting. Coverage outside Riyadh is checked per enquiry."}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={quoteHref}
              className="inline-flex items-center gap-2 rounded-md bg-[#c5a059] px-4 py-2.5 font-semibold text-[#0b1623] hover:bg-[#d6b574]"
            >
              Request a quote <ArrowRight size={15} aria-hidden />
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackTransportEvent("transport_whatsapp_click", { service_category: category, placement: "route_selector" })}
              className="inline-flex items-center gap-2 rounded-md border border-white/25 px-4 py-2.5 font-medium text-white hover:bg-white/10"
            >
              <MessageCircle size={15} aria-hidden /> Send on WhatsApp
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
