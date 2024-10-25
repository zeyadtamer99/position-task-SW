// src/pages/utils.tsx

export const getPlotHeight = (
  plotType: string,
  previousPlotType: string | null,
  nextPlotType: string | null
): string => {
  const isPreviousTall =
    previousPlotType === "Overview" ||
    previousPlotType === "Best Performing Jobs";
  const isNextTall =
    nextPlotType === "Overview" || nextPlotType === "Best Performing Jobs";

  if (
    plotType === "Followers" ||
    plotType === "Applies" ||
    plotType === "Hires"
  ) {
    if (isPreviousTall && !nextPlotType) {
      return "300px";
    } else if (isPreviousTall || isNextTall) {
      return "500px";
    } else if (
      !isPreviousTall &&
      !isNextTall &&
      (!previousPlotType || !nextPlotType)
    ) {
      return "300px";
    }
  }
  return "500px";
};

export const getPlotWidth = (
  plotType: string,
  previousPlotType: string | null,
  nextPlotType: string | null
): string => {
  if (
    (plotType === "Best Performing Jobs" &&
      (previousPlotType === "Overview" || nextPlotType === "Overview")) ||
    (plotType === "Overview" &&
      (previousPlotType === "Best Performing Jobs" ||
        nextPlotType === "Best Performing Jobs"))
  ) {
    return plotType === "Best Performing Jobs" ? "35%" : "64%";
  }
  return plotType === "Overview" || plotType === "Best Performing Jobs"
    ? "65%"
    : "25%";
};
