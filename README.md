# HowBig??

How big is my fish.

Data files
- data/species.csv: placeholder species coefficients, length bounds, and thresholds.
- data/health_factors.json: global unhealthy/average/healthy multipliers.

Weight model
- Uses W = a * L^b with L in cm and W in kg.
- Output also shown in lb (1 kg = 2.20462 lb).

Deploy (Netlify)
1) Push this repo to GitHub/GitLab (or zip it).
2) In Netlify, create a new site and connect the repo.
3) Publish directory: public
4) Build command: (leave blank)
