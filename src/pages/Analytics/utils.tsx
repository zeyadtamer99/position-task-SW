// src/pages/utils.tsx

// src/utils.tsx
export const getResponsiveHeight = (
  plotType: string,
  previousPlotType: string | null,
  nextPlotType: string | null
) => {
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
      return { xs: "200px", sm: "250px", md: "300px" };
    } else if (isPreviousTall || isNextTall) {
      return { xs: "350px", sm: "400px", md: "400px" };
    } else if (
      !isPreviousTall &&
      !isNextTall &&
      (!previousPlotType || !nextPlotType)
    ) {
      return { xs: "200px", sm: "250px", md: "300px" };
    }
  }
  return { xs: "350px", sm: "400px", md: "400px" };
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

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
