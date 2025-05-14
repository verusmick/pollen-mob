const grassPollenMetrics = {
  labels: [
    { label: "None", range: [0, 0] },
    { label: "Very Low", range: [1, 15] },
    { label: "Low", range: [16, 50] },
    { label: "Moderate", range: [51, 100] },
    { label: "High", range: [101, 200] },
    { label: "Very High", range: [201, Infinity] },
  ],
  referencePoints: [
    { pollen: 0, percentage: 0 },
    { pollen: 15, percentage: 20 },
    { pollen: 50, percentage: 50 },
    { pollen: 100, percentage: 75 },
    { pollen: 200, percentage: 100 },
  ],
  minPollen: 0,
  maxPollen: 200,
};

export const birchAndOthersMetrics = {
  labels: [
    { label: "None", range: [0, 0] },
    { label: "Very Low", range: [1, 30] },
    { label: "Low", range: [31, 100] },
    { label: "Moderate", range: [101, 200] },
    { label: "High", range: [201, 400] },
    { label: "Very High", range: [401, Infinity] },
  ],
  referencePoints: [
    { pollen: 0, percentage: 0 },
    { pollen: 30, percentage: 20 },
    { pollen: 100, percentage: 50 },
    { pollen: 200, percentage: 75 },
    { pollen: 400, percentage: 100 },
  ],
  minPollen: 0,
  maxPollen: 400,
};

export function getPollenPercentage(pollenCount: number, pollenMetrics: any) {
  const {
    labels,
    referencePoints,
    minPollen: MIN_POLLEN,
    maxPollen: MAX_POLLEN,
  } = pollenMetrics;

  // Function to determine the label
  const getLabel = (count) => {
    for (const { label, range } of labels) {
      if (count >= range[0] && count <= range[1]) {
        return label;
      }
    }
    return "Unknown";
  };

  // If it is less than or equal to the minimum, return the object with percentage and label
  if (pollenCount <= MIN_POLLEN) return { percentage: 0, label: "None" };
  if (pollenCount > MAX_POLLEN) return { percentage: 100, label: "Very High" };

  // Find the segment the value is in
  for (let i = 0; i < referencePoints.length - 1; i++) {
    const current = referencePoints[i];
    const next = referencePoints[i + 1];

    if (pollenCount >= current.pollen && pollenCount <= next.pollen) {
      // Linear mapping between the two reference points
      const percentage =
        current.percentage +
        ((pollenCount - current.pollen) / (next.pollen - current.pollen)) *
          (next.percentage - current.percentage);
      return { percentage, label: getLabel(pollenCount) };
    }
  }
}

export function getPollenPercentageMiddleware(name: any, pollenCount: any) {
  if (!pollenCount) return { percentage: 0, label: "None" };
  if (name === "Poaceae")
    return getPollenPercentage(pollenCount, grassPollenMetrics);
  if (name === "Pinaceae" || name === "Abies")
    return { percentage: 0, label: "None" };
  return getPollenPercentage(pollenCount, birchAndOthersMetrics);
}
