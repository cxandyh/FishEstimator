PRD: HowBig?? (NZ Catch-and-Release Fish Weight Estimator)

Problem
- NZ anglers practicing catch-and-release lack a simple, offline way to estimate fish weight from length and compare to common reference sizes (snapper >20 lb, kingfish >20 kg).

Goals
- Fast length-to-weight estimate for common NZ species.
- Show weight in kg and lb.
- Classify estimate into unhealthy/average/healthy bands.
- Work offline after first load (PWA).

Scope
- MVP: Mobile-first web app hosted publicly, offline-capable via PWA.
- Future: Native iOS/Android apps with offline data.

Primary Users
- NZ recreational anglers and fishing clubs.

Success Metrics
- 80% of sessions complete in under 30s.
- 60% of sessions include 2+ estimates.
- App store rating >= 4.5 if/when native apps ship.

Species (MVP)
- Kingfish
- Kahawai
- Snapper
- Grouper
- Yellowfin Tuna
- Southern Bluefin Tuna
- Trevally
- Blue Marlin
- Striped Marlin

User Stories
- Select a species, enter length in cm, and see estimated weight in kg and lb.
- See if a snapper is above 20 lb or a kingfish is above 20 kg.
- View unhealthy/average/healthy range based on condition.
- Use the tool without internet after first load.

Functional Requirements
- Species selector (list or cards).
- Length input in cm (default).
- Output:
  - Estimated weight for unhealthy/average/healthy bands.
  - Both kg and lb displayed for each band.
  - Threshold callout for snapper and kingfish only.
- Offline support via PWA caching.
- Brief measurement tips (optional help text).

Non-Functional Requirements
- First load under 2s on 4G.
- Mobile-first responsive layout.
- Tap targets and contrast suitable for outdoor use.

Weight Estimation Logic (MVP)
- Use a length-weight model per species: W = a * L^b (L in cm, W in kg).
- Convert kg to lb for display.
- Health bands (global multipliers):
  - Unhealthy: 0.90 * W
  - Average: 1.00 * W
  - Healthy: 1.10 * W
- Thresholds:
  - Snapper: 20 lb
  - Kingfish: 20 kg

Data Requirements
- Species table with columns:
  - species_name
  - scientific_name (optional)
  - a
  - b
  - length_cm_min
  - length_cm_max
  - threshold_value (optional)
  - threshold_unit (optional)
- Coefficients and bounds supplied by user (placeholder for now).

Out of Scope (MVP)
- Accounts or profiles.
- Photo measurement.
- Catch logging or social sharing.
- Dynamic server-side data.

Open Questions
- Provide species-specific coefficients and bounds.
- Confirm if any extra reference thresholds are needed later.
