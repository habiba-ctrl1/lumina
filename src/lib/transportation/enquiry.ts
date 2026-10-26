// Enquiry model + validation shared by the multi-step form (per-step, for UX)
// and /api/transportation/enquiry (full payload, the only source of truth).
// No third-party schema library: the checks are small and explicit.

import { COUNTRIES, VEHICLE_CLASSES, type ServiceCategoryKey } from "./config";

export const JOURNEY_TYPES = [
  { value: "one_way", label: "One-way" },
  { value: "return", label: "Return" },
  { value: "multi_stop", label: "Multiple stops" },
  { value: "hourly", label: "Hourly chauffeur" },
  { value: "full_day", label: "Full-day chauffeur" },
  { value: "recurring", label: "Recurring corporate service" },
  { value: "event_delegation", label: "Event or delegation transportation" },
] as const;

export const BOOKING_PURPOSES = [
  { value: "corporate", label: "Corporate" },
  { value: "travel_agency", label: "Travel agency" },
  { value: "hotel", label: "Hotel / hospitality" },
  { value: "event_organizer", label: "Event organiser" },
  { value: "individual", label: "Individual" },
  { value: "other", label: "Other" },
] as const;

export const BUDGET_OPTIONS = [
  "Please recommend an appropriate option",
  "Under SAR 2,000",
  "SAR 2,000 – 5,000",
  "SAR 5,000 – 15,000",
  "SAR 15,000+",
] as const;

export const VEHICLE_CHOICES = [
  ...VEHICLE_CLASSES.map((v) => ({ value: v.key as string, label: v.name })),
  { value: "recommend", label: "Recommend a suitable vehicle" },
];

export const FORM_IDS = ["transportation_hub", "transport_request_a_quote"] as const;
export type FormId = (typeof FORM_IDS)[number];

export const SERVICE_KEYS: ServiceCategoryKey[] = ["cross_border", "vip_chauffeur", "corporate_transportation"];

export interface EnquiryInput {
  formId: FormId;
  serviceCategory: ServiceCategoryKey;
  journeyType: string;
  originCountry: string;
  originCity: string;
  pickupAddress: string;
  destinationCountry: string;
  destinationCity: string;
  destinationAddress: string;
  travelDate: string; // YYYY-MM-DD
  pickupTime: string; // HH:MM, Asia/Riyadh unless noted
  flexibleSchedule: boolean;
  returnDate: string;
  returnTime: string;
  passengers: number;
  luggage: string;
  vehicles: string[];
  vehicleMandatory: "equivalent" | "this_class";
  name: string;
  company: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
  whatsappPreferred: boolean;
  bookingPurpose: string;
  procurementNotes: string;
  itineraryStatus: "confirmed" | "initial";
  recurrence: "one_time" | "recurring";
  quoteDeadline: string;
  invoiceRequested: boolean;
  serviceRequirements: string;
  budget: string;
  notes: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
}

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const emptyEnquiry = (): EnquiryInput => ({
  formId: "transport_request_a_quote",
  serviceCategory: "vip_chauffeur",
  journeyType: "one_way",
  originCountry: "SA",
  originCity: "Riyadh",
  pickupAddress: "",
  destinationCountry: "SA",
  destinationCity: "",
  destinationAddress: "",
  travelDate: "",
  pickupTime: "",
  flexibleSchedule: false,
  returnDate: "",
  returnTime: "",
  passengers: 1,
  luggage: "",
  vehicles: [],
  vehicleMandatory: "equivalent",
  name: "",
  company: "",
  email: "",
  phoneCountryCode: "+966",
  phone: "",
  whatsappPreferred: true,
  bookingPurpose: "corporate",
  procurementNotes: "",
  itineraryStatus: "initial",
  recurrence: "one_time",
  quoteDeadline: "",
  invoiceRequested: false,
  serviceRequirements: "",
  budget: "",
  notes: "",
  privacyConsent: false,
  marketingConsent: false,
});

/** Steps → the fields each one owns (drives per-step validation in the UI). */
export const STEP_FIELDS: (keyof EnquiryInput)[][] = [
  ["serviceCategory", "journeyType"],
  ["originCountry", "originCity", "pickupAddress", "destinationCountry", "destinationCity", "destinationAddress", "travelDate", "pickupTime", "returnDate", "returnTime", "passengers", "luggage"],
  ["vehicles", "vehicleMandatory"],
  ["name", "company", "email", "phoneCountryCode", "phone", "bookingPurpose"],
  ["itineraryStatus", "recurrence", "quoteDeadline", "budget"],
  ["notes", "privacyConsent"],
];

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]{2,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;
const CC_RE = /^\+\d{1,4}$/;

/** Today's date in Saudi time as YYYY-MM-DD — "past date" means past in Riyadh. */
export function todayInRiyadh(now = new Date()): string {
  return now.toLocaleDateString("en-CA", { timeZone: "Asia/Riyadh" });
}

const isRealDate = (s: string) => DATE_RE.test(s) && !Number.isNaN(Date.parse(`${s}T00:00:00Z`)) && new Date(`${s}T00:00:00Z`).toISOString().startsWith(s);

/** Strip control characters and angle brackets, trim, cap length. */
export function cleanString(v: unknown, max = 200): string {
  if (typeof v !== "string") return "";
  return v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f<>]/g, "").trim().slice(0, max);
}

const countryKeys = new Set(COUNTRIES.map((c) => c.key));
const vehicleKeys = new Set(VEHICLE_CHOICES.map((v) => v.value));
const journeyKeys = new Set<string>(JOURNEY_TYPES.map((j) => j.value));
const purposeKeys = new Set<string>(BOOKING_PURPOSES.map((p) => p.value));

/** Normalise untrusted input into a bounded EnquiryInput (no validation yet). */
export function normalizeEnquiry(raw: unknown): EnquiryInput {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const d = emptyEnquiry();
  const bool = (v: unknown, dflt: boolean) => (typeof v === "boolean" ? v : dflt);
  const digits = (v: unknown) => cleanString(v, 30).replace(/[^\d]/g, "");
  const pax = Number(r.passengers);
  return {
    formId: (FORM_IDS as readonly string[]).includes(r.formId as string) ? (r.formId as FormId) : d.formId,
    serviceCategory: SERVICE_KEYS.includes(r.serviceCategory as ServiceCategoryKey) ? (r.serviceCategory as ServiceCategoryKey) : ("" as ServiceCategoryKey),
    journeyType: cleanString(r.journeyType, 30),
    originCountry: cleanString(r.originCountry, 4),
    originCity: cleanString(r.originCity, 80),
    pickupAddress: cleanString(r.pickupAddress, 250),
    destinationCountry: cleanString(r.destinationCountry, 4),
    destinationCity: cleanString(r.destinationCity, 80),
    destinationAddress: cleanString(r.destinationAddress, 250),
    travelDate: cleanString(r.travelDate, 10),
    pickupTime: cleanString(r.pickupTime, 5),
    flexibleSchedule: bool(r.flexibleSchedule, false),
    returnDate: cleanString(r.returnDate, 10),
    returnTime: cleanString(r.returnTime, 5),
    passengers: Number.isFinite(pax) ? Math.trunc(pax) : 0,
    luggage: cleanString(r.luggage, 100),
    vehicles: Array.isArray(r.vehicles) ? Array.from(new Set(r.vehicles.map((v) => cleanString(v, 30)))).slice(0, 8) : [],
    vehicleMandatory: r.vehicleMandatory === "this_class" ? "this_class" : "equivalent",
    name: cleanString(r.name, 100),
    company: cleanString(r.company, 150),
    email: cleanString(r.email, 150).toLowerCase(),
    phoneCountryCode: cleanString(r.phoneCountryCode, 5),
    phone: digits(r.phone),
    whatsappPreferred: bool(r.whatsappPreferred, true),
    bookingPurpose: cleanString(r.bookingPurpose, 30),
    procurementNotes: cleanString(r.procurementNotes, 300),
    itineraryStatus: r.itineraryStatus === "confirmed" ? "confirmed" : "initial",
    recurrence: r.recurrence === "recurring" ? "recurring" : "one_time",
    quoteDeadline: cleanString(r.quoteDeadline, 10),
    invoiceRequested: bool(r.invoiceRequested, false),
    serviceRequirements: cleanString(r.serviceRequirements, 400),
    budget: cleanString(r.budget, 80),
    notes: cleanString(r.notes, 2000),
    privacyConsent: r.privacyConsent === true,
    marketingConsent: r.marketingConsent === true,
  };
}

export function validateEnquiry(e: EnquiryInput, now = new Date()): EnquiryErrors {
  const err: EnquiryErrors = {};
  const today = todayInRiyadh(now);

  if (!SERVICE_KEYS.includes(e.serviceCategory)) err.serviceCategory = "Choose a service.";
  if (!journeyKeys.has(e.journeyType)) err.journeyType = "Choose a journey type.";

  if (!countryKeys.has(e.originCountry)) err.originCountry = "Choose a pickup country.";
  if (!e.originCity) err.originCity = "Enter the pickup city.";
  if (!countryKeys.has(e.destinationCountry)) err.destinationCountry = "Choose a destination country.";
  if (!e.destinationCity) err.destinationCity = "Enter the destination city.";

  if (!err.originCountry && !err.destinationCountry) {
    const crossBorder = e.originCountry !== e.destinationCountry;
    if (e.serviceCategory === "cross_border" && !crossBorder) err.destinationCountry = "Cross-border journeys need a different destination country.";
    if (e.serviceCategory === "vip_chauffeur" && crossBorder) err.destinationCountry = "Choose Cross-border transfer for journeys leaving Saudi Arabia.";
    if (crossBorder && e.originCountry !== "SA" && e.destinationCountry !== "SA") err.destinationCountry = "One end of the journey must be in Saudi Arabia.";
  }

  if (!isRealDate(e.travelDate)) err.travelDate = "Enter a valid travel date.";
  else if (e.travelDate < today) err.travelDate = "Travel date can't be in the past.";
  if (e.pickupTime && !TIME_RE.test(e.pickupTime)) err.pickupTime = "Enter a valid time.";
  if (e.journeyType === "return") {
    if (!isRealDate(e.returnDate)) err.returnDate = "Enter the return date.";
    else if (!err.travelDate && e.returnDate < e.travelDate) err.returnDate = "Return can't be before the outbound date.";
    if (e.returnTime && !TIME_RE.test(e.returnTime)) err.returnTime = "Enter a valid time.";
  }
  if (!(e.passengers >= 1 && e.passengers <= 100)) err.passengers = "Enter 1–100 passengers.";

  if (e.vehicles.some((v) => !vehicleKeys.has(v))) err.vehicles = "Choose a listed vehicle class.";
  else if (e.vehicles.length === 0) err.vehicles = "Choose a vehicle class or ask us to recommend one.";

  if (e.name.length < 2) err.name = "Enter your full name.";
  if (!EMAIL_RE.test(e.email)) err.email = "Enter a valid email address.";
  if (!CC_RE.test(e.phoneCountryCode)) err.phoneCountryCode = "Use a code like +966.";
  if (e.phone.length < 6 || e.phone.length > 14) err.phone = "Enter a valid phone number.";
  if (!purposeKeys.has(e.bookingPurpose)) err.bookingPurpose = "Choose a booking purpose.";

  if (e.quoteDeadline) {
    if (!isRealDate(e.quoteDeadline)) err.quoteDeadline = "Enter a valid date.";
    else if (e.quoteDeadline < today) err.quoteDeadline = "Quotation deadline can't be in the past.";
  }

  if (!e.privacyConsent) err.privacyConsent = "Please accept the privacy notice to send your enquiry.";
  return err;
}

/** Errors limited to a step's fields — for "Next" in the UI. */
export function validateStep(step: number, e: EnquiryInput): EnquiryErrors {
  const all = validateEnquiry(e);
  const out: EnquiryErrors = {};
  for (const k of STEP_FIELDS[step] ?? []) if (all[k]) out[k] = all[k];
  return out;
}

export const countryName = (k: string) => COUNTRIES.find((c) => c.key === k)?.name ?? k;
export const vehicleLabel = (k: string) => VEHICLE_CHOICES.find((v) => v.value === k)?.label ?? k;
export const journeyLabel = (k: string) => JOURNEY_TYPES.find((j) => j.value === k)?.label ?? k;
export const purposeLabel = (k: string) => BOOKING_PURPOSES.find((p) => p.value === k)?.label ?? k;
