// Partner application review states. `VendorApplication.status` is a plain String
// column, so adding states needs no migration. The original three stay exactly as
// they were; the extra states let the founder triage without losing anything:
//
//   Pending               new, untouched
//   Under Review          being looked at
//   Need More Information waiting on the applicant (reason goes to the activity log)
//   Approved              became / merged into a vendor
//   Rejected              not a fit
//   Duplicate             same company as an existing vendor or an earlier application;
//                         kept as a consent/audit record, never turned into a 2nd vendor
//
// "Possible Duplicate" is deliberately NOT a stored status — it is computed at read
// time from the vendor table, so it can never go stale.

export const APPLICATION_STATUSES = [
  'Pending',
  'Under Review',
  'Need More Information',
  'Approved',
  'Rejected',
  'Duplicate',
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

/** Statuses that still need a decision — used for dashboards, action-needed and stale-digest counts. */
export const OPEN_APPLICATION_STATUSES: ApplicationStatus[] = ['Pending', 'Under Review', 'Need More Information'];
