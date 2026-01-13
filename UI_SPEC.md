UI Spec: Fish Weight Estimator (MVP)

Overview
- Single-screen, mobile-first experience optimized for outdoor use.
- Primary action: select species, enter length (cm), get weight range in kg/lb.
- Offline-capable (PWA), but UI should work without network from cached assets.

Information Architecture
- Home/Estimate screen (default)
- Optional: Species search/list modal (only if list grows or search needed)

Screen: Home / Estimate

Header
- Title: "Fish Weight Estimator"
- Optional status dot: offline/online (small, right aligned)

Section: Species
- Label: "Species"
- Control: dropdown or full-width button that opens species list modal
- Placeholder: "Select species"
- Behavior: remember last selected species locally

Section: Length Input
- Label: "Length (cm)"
- Control: numeric input only (no letters), allow decimals (one optional decimal)
- Helper text: "Measure from nose to tail fork"
- Validation:
  - If value < min or > max for species: show inline warning
  - If no species selected, disable input or show inline prompt

Primary Action
- Button: "Estimate"
- Enabled only when species selected and length valid
- Action triggers calculation and scrolls to Results if needed

Section: Results
- Title: "Results"
- Cards or rows for each band:
  - Unhealthy: weight kg + lb
  - Average: weight kg + lb (highlighted or bold)
  - Healthy: weight kg + lb
- Format: 1 decimal for kg, 1 decimal for lb
- If no results yet, show placeholder text: "Enter a length to estimate."

Section: Threshold (conditional)
- Only show for snapper or kingfish
- Format:
  - "Snapper >20 lb" with status chip "Above" or "Below"
  - "Kingfish >20 kg" with status chip "Above" or "Below"
- Status based on average weight band

Secondary Action
- Button: "New estimate"
- Clears length and results; keeps species

Screen: Species List (Optional)

Header
- Title: "Select Species"
- Back button

Search (optional)
- Input: "Search species"
- Filters list in real time

List
- Simple list items with species name
- Tap to select and return to Home

Visual Style Guidelines
- Layout:
  - Single column, max width 520px on large screens
  - 16-20px base spacing
- Typography:
  - Clear, high-contrast; size 16-18px body, 20-24px headers
- Colors:
  - Outdoor-friendly contrast, avoid low-contrast grays
  - Status chips: green (Above), gray (Below)
- Touch targets:
  - Minimum 44px height

Interaction Rules
- Keep calculations local (no network required).
- Persist last selected species and last length in local storage (optional).
- Allow manual override if user enters length without selecting species: show prompt.

Error States
- Invalid length: "Length must be between X and Y cm for this species."
- Missing species: "Select a species to continue."
- Missing coefficients: "Data not available yet for this species." (should not occur in MVP)

Accessibility
- Inputs labeled and linked to controls.
- Large font size for outdoor readability.
- Color is not the only indicator for Above/Below (include text).

Content Copy (MVP)
- Helper: "Measure from nose to tail fork."
- Results placeholder: "Enter a length to estimate."
- Threshold labels: "Above" / "Below"
