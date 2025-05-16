export const allergyRangeColors = {
  NONE: "#FFFFFF",
  VERY_LOW: "#00e838",
  LOW: "#a5eb02",
  MODERATE: "#ebbb02",
  HIGH: "#f27200",
  VERY_HIGH: "#ff0000",
};

const grassPollenMetrics = {
  ranges: [
    { level: "NONE", range: [0, 0] },
    { level: "VERY_LOW", range: [1, 15] },
    { level: "LOW", range: [16, 50] },
    { level: "MODERATE", range: [51, 100] },
    { level: "HIGH", range: [101, 200] },
    { level: "VERY_HIGH", range: [201, Infinity] },
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
  ranges: [
    { level: "NONE", range: [0, 0] },
    { level: "VERY_LOW", range: [1, 30] },
    { level: "LOW", range: [31, 100] },
    { level: "MODERATE", range: [101, 200] },
    { level: "HIGH", range: [201, 400] },
    { level: "VERY_HIGH", range: [401, Infinity] },
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
    ranges,
    referencePoints,
    minPollen: MIN_POLLEN,
    maxPollen: MAX_POLLEN,
  } = pollenMetrics;

  // Function to determine the level
  const getLevel = (count) => {
    for (const { level, range } of ranges) {
      if (count >= range[0] && count <= range[1]) {
        return level;
      }
    }
    return "Unknown";
  };

  // If it is less than or equal to the minimum, return the object with percentage and level
  if (pollenCount <= MIN_POLLEN) return { percentage: 0, level: "NONE" };
  if (pollenCount > MAX_POLLEN) return { percentage: 100, level: "VERY_HIGH" };

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
      return { percentage, level: getLevel(pollenCount) };
    }
  }
}

export function getPollenPercentageMiddleware(name: any, pollenCount: any = 0) {
  if (!pollenCount) return { percentage: 0, level: "NONE" };
  if (name === "Poaceae")
    return getPollenPercentage(pollenCount.toFixed(), grassPollenMetrics);
  if (name === "Pinaceae" || name === "Abies")
    return { percentage: 0, level: "NONE" };
  return getPollenPercentage(pollenCount.toFixed(), birchAndOthersMetrics);
}
