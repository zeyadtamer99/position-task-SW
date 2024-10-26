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
  const isSideBySide =
    (plotType === "Best Performing Jobs" && previousPlotType === "Overview") ||
    (plotType === "Overview" && nextPlotType === "Best Performing Jobs");

  if (isSideBySide) {
    return "49%"; // Single width for use with responsive styling directly in the component
  }

  return plotType === "Overview" || plotType === "Best Performing Jobs"
    ? "60%"
    : "29%";
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
