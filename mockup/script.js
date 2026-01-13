const lbPerKg = 2.20462;
const healthFactors = {
  unhealthy: 0.9,
  average: 1.0,
  healthy: 1.1,
};

const elements = {
  species: document.getElementById("species"),
  speciesChips: document.getElementById("species-chips"),
  length: document.getElementById("length"),
  warning: document.getElementById("length-warning"),
  helper: document.getElementById("length-helper"),
  estimate: document.getElementById("estimate"),
  reset: document.getElementById("reset"),
  threshold: document.getElementById("threshold"),
  celebrate: document.getElementById("celebrate"),
  fishBody: document.getElementById("fish-body"),
  fishName: document.getElementById("fish-name"),
  measureLabel: document.getElementById("measure-label"),
  diagramCaption: document.getElementById("diagram-caption"),
  measurePhoto: document.getElementById("measure-photo"),
  measureSvg: document.getElementById("measure-svg"),
  thresholdLabel: document.getElementById("threshold-label"),
  thresholdBadge: document.getElementById("threshold-badge"),
  results: {
    unhealthy: document.querySelector("#result-unhealthy .result-value"),
    unhealthyAlt: document.querySelector("#result-unhealthy .result-alt"),
    average: document.querySelector("#result-average .result-value"),
    averageAlt: document.querySelector("#result-average .result-alt"),
    healthy: document.querySelector("#result-healthy .result-value"),
    healthyAlt: document.querySelector("#result-healthy .result-alt"),
  },
};

let speciesData = [];

const formatNumber = (value) => value.toFixed(1);
const defaultHelper = "Measure from nose to tail fork.";

const thresholdMap = {
  Snapper: { value: 20, unit: "lb" },
  "Yellowtail Kingfish": { value: 20, unit: "kg" },
};

const setResults = (kgValues) => {
  elements.results.unhealthy.textContent = `${formatNumber(kgValues.unhealthy)} kg`;
  elements.results.unhealthyAlt.textContent = `${formatNumber(kgValues.unhealthy * lbPerKg)} lb`;
  elements.results.average.textContent = `${formatNumber(kgValues.average)} kg`;
  elements.results.averageAlt.textContent = `${formatNumber(kgValues.average * lbPerKg)} lb`;
  elements.results.healthy.textContent = `${formatNumber(kgValues.healthy)} kg`;
  elements.results.healthyAlt.textContent = `${formatNumber(kgValues.healthy * lbPerKg)} lb`;
};

const clearResults = () => {
  elements.results.unhealthy.textContent = "-- kg";
  elements.results.unhealthyAlt.textContent = "-- lb";
  elements.results.average.textContent = "-- kg";
  elements.results.averageAlt.textContent = "-- lb";
  elements.results.healthy.textContent = "-- kg";
  elements.results.healthyAlt.textContent = "-- lb";
};

const setWarning = (message) => {
  if (message) {
    elements.warning.textContent = message;
    elements.warning.hidden = false;
  } else {
    elements.warning.textContent = "";
    elements.warning.hidden = true;
  }
};

const parseJson = (data) =>
  data.species.map((item) => {
    const threshold = thresholdMap[item.common_name] || null;
    return {
      species: item.common_name,
      scientificName: item.scientific_name,
      lengthType: item.length_type,
      a: Number(item.a),
      b: Number(item.b),
      lengthMin: item.min_length_cm ?? null,
      lengthMax: item.max_length_cm ?? null,
      thresholdValue: threshold ? threshold.value : null,
      thresholdUnit: threshold ? threshold.unit : null,
    };
  });

const populateSpecies = () => {
  speciesData.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.species;
    option.textContent = item.species;
    elements.species.appendChild(option);
  });
};

const populateChips = () => {
  const quickList = speciesData.filter((item) =>
    ["Yellowtail Kingfish", "Kahawai", "Snapper", "Trevally"].includes(item.species)
  );
  elements.speciesChips.innerHTML = "";
  quickList.forEach((item) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.textContent = item.species;
    chip.addEventListener("click", () => {
      elements.species.value = item.species;
      setWarning("");
      updateHelper(item);
      updateDiagram(item);
    });
    elements.speciesChips.appendChild(chip);
  });
};

const getSelectedSpecies = () =>
  speciesData.find((item) => item.species === elements.species.value);

const validateInput = (selected, lengthValue) => {
  if (!selected) {
    return "Select a species to continue.";
  }
  if (!lengthValue) {
    return "Enter a length to estimate.";
  }
  if (selected.lengthMin && lengthValue < selected.lengthMin) {
    return `Length must be between ${selected.lengthMin} and ${selected.lengthMax} cm for ${selected.species}.`;
  }
  if (selected.lengthMax && lengthValue > selected.lengthMax) {
    return `Length must be between ${selected.lengthMin} and ${selected.lengthMax} cm for ${selected.species}.`;
  }
  if (!Number.isFinite(selected.a) || !Number.isFinite(selected.b)) {
    return "Data not available yet for this species.";
  }
  return "";
};

const updateHelper = (selected) => {
  if (!selected) {
    elements.helper.textContent = defaultHelper;
    elements.measureLabel.textContent = "Fork length";
    elements.diagramCaption.textContent =
      "Place fish on the board and read the fork length.";
    return;
  }
  if (selected.lengthType === "LJFL") {
    elements.helper.textContent = "Measure lower jaw to tail fork (LJFL).";
    elements.measureLabel.textContent = "Lower jaw fork length";
    elements.diagramCaption.textContent =
      "Align lower jaw to the board and read LJFL.";
    return;
  }
  if (selected.lengthType === "FL") {
    elements.helper.textContent = "Measure snout to tail fork (FL).";
    elements.measureLabel.textContent = "Fork length";
    elements.diagramCaption.textContent =
      "Place fish on the board and read the fork length.";
    return;
  }
  elements.helper.textContent = defaultHelper;
  elements.measureLabel.textContent = "Fork length";
  elements.diagramCaption.textContent =
    "Place fish on the board and read the fork length.";
};

const fishShapes = {
  kingfish:
    "M70 95 C95 70, 140 58, 190 63 C225 68, 258 80, 280 98 C258 115, 225 126, 190 128 C140 130, 95 118, 70 95 Z",
  tuna:
    "M64 96 C92 68, 150 52, 205 60 C248 66, 286 86, 302 102 C286 118, 248 136, 205 140 C150 144, 92 128, 64 96 Z",
  marlin:
    "M66 94 C98 66, 150 52, 208 60 C255 66, 296 90, 312 104 C296 120, 255 136, 208 140 C150 144, 98 128, 66 94 Z",
  snapper:
    "M72 100 C100 74, 150 62, 198 68 C228 72, 250 84, 268 100 C250 118, 228 128, 198 132 C150 136, 100 126, 72 100 Z",
  groper:
    "M62 100 C96 70, 150 56, 212 64 C248 68, 278 86, 296 104 C278 122, 248 136, 212 140 C150 146, 96 132, 62 100 Z",
  trevally:
    "M76 100 C104 76, 148 66, 188 70 C218 74, 242 86, 262 100 C242 116, 218 126, 188 130 C148 134, 104 124, 76 100 Z",
};

const fishTypeMap = {
  "Yellowtail Kingfish": "kingfish",
  Kahawai: "trevally",
  Snapper: "snapper",
  "Groper (Hāpuku)": "groper",
  "Groper (Bass)": "groper",
  "Yellowfin Tuna": "tuna",
  "Southern Bluefin Tuna": "tuna",
  Trevally: "trevally",
  "Blue Marlin": "marlin",
  "Striped Marlin": "marlin",
};

const fishPhotoMap = {
  "Yellowtail Kingfish": "../assets/Kingfish.png",
  Snapper: "../assets/Snapper.png",
  Kahawai: "../assets/Kahawai.png",
  Trevally: "../assets/Trevally.png",
};

const updateDiagram = (selected) => {
  if (!selected) {
    elements.fishName.textContent = "Select a species";
    elements.fishBody.setAttribute("d", fishShapes.kingfish);
    elements.measurePhoto.style.display = "none";
    elements.measureSvg.style.display = "block";
    return;
  }

  const fishType = fishTypeMap[selected.species] || "kingfish";
  elements.fishBody.setAttribute("d", fishShapes[fishType]);
  elements.fishName.textContent = selected.species;

  const photoSrc = fishPhotoMap[selected.species];
  if (photoSrc) {
    elements.measurePhoto.src = photoSrc;
    elements.measurePhoto.alt = `${selected.species} on measuring board`;
    elements.measurePhoto.style.display = "block";
    elements.measureSvg.style.display = "none";
  } else {
    elements.measurePhoto.style.display = "none";
    elements.measureSvg.style.display = "block";
  }
};

const updateThreshold = (selected, averageKg) => {
  if (!selected.thresholdValue || !selected.thresholdUnit) {
    elements.threshold.hidden = true;
    elements.celebrate.hidden = true;
    document.getElementById("result-average").classList.remove("celebrate");
    return;
  }

  const unit = selected.thresholdUnit.toLowerCase();
  const compareValue = unit === "lb" ? averageKg * lbPerKg : averageKg;
  const isAbove = compareValue >= selected.thresholdValue;

  elements.thresholdLabel.textContent = `${selected.species} >${selected.thresholdValue} ${unit}`;
  elements.thresholdBadge.textContent = isAbove ? "Above" : "Below";
  elements.thresholdBadge.classList.toggle("above", isAbove);
  elements.thresholdBadge.classList.toggle("below", !isAbove);
  elements.threshold.hidden = false;
  elements.celebrate.hidden = !isAbove;
  document.getElementById("result-average").classList.toggle("celebrate", isAbove);
};

const handleEstimate = () => {
  const selected = getSelectedSpecies();
  const lengthValue = Number(elements.length.value);
  const warningMessage = validateInput(selected, lengthValue);

  if (warningMessage) {
    setWarning(warningMessage);
    clearResults();
    elements.threshold.hidden = true;
    return;
  }

  setWarning("");

  const coefficient =
    selected.a >= 0.001 ? selected.a / 1000 : selected.a;
  const baseKg = coefficient * Math.pow(lengthValue, selected.b);
  const kgValues = {
    unhealthy: baseKg * healthFactors.unhealthy,
    average: baseKg * healthFactors.average,
    healthy: baseKg * healthFactors.healthy,
  };

  setResults(kgValues);
  updateThreshold(selected, kgValues.average);
};

const handleReset = () => {
  elements.length.value = "";
  setWarning("");
  clearResults();
  elements.threshold.hidden = true;
  elements.celebrate.hidden = true;
  document.getElementById("result-average").classList.remove("celebrate");
  updateHelper(getSelectedSpecies());
};

const initialize = async () => {
  const response = await fetch("../nz_length_weight_coefficients.json");
  const data = await response.json();
  speciesData = parseJson(data);
  populateSpecies();
  populateChips();
  elements.species.value = "Snapper";
  updateHelper(getSelectedSpecies());
  updateDiagram(getSelectedSpecies());
};

initialize();

elements.estimate.addEventListener("click", handleEstimate);
elements.reset.addEventListener("click", handleReset);
elements.species.addEventListener("change", () => {
  updateHelper(getSelectedSpecies());
  updateDiagram(getSelectedSpecies());
  setWarning("");
});
