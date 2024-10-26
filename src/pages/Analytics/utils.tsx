// src/pages/utils.tsx

import { Job, Metrics } from "../../models/Job";

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

const monthIndexMap: Record<string, number> = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

/**
 * Calculates data for a specified metric type over a given range.
 * @param jobs - Array of Job data.
 * @param metricType - The metric type (e.g., "views", "clicks").
 * @param range - Optional range of months to filter by.
 * @returns The total metric count for the specified range.
 */
export const calculateCurrentMonthData = (
  jobs: Job[],
  metricType: keyof Metrics,
  range?: { start: number; end?: number }
): { count: number } => {
  const currentMonth = new Date().getMonth();
  const startMonth = range?.start ?? currentMonth;
  const endMonth = range?.end ?? currentMonth;

  const currentMonthData = jobs.reduce((total, job) => {
    const monthMetrics = job.metrics.filter((metric) => {
      const monthIndex = monthIndexMap[metric.month];
      // Check if the metric falls within the specified range
      return monthIndex >= startMonth && monthIndex <= endMonth;
    });

    return (
      total +
      monthMetrics.reduce(
        (sum, metric) => sum + (metric[metricType] as number),
        0
      )
    );
  }, 0);

  return { count: currentMonthData };
};
/**
 * Calculates the percentage change of the metric over the specified range compared to the previous range.
 * @param jobs - Array of Job data.
 * @param metricType - The metric type (e.g., "views", "clicks").
 * @param range - Optional range of months to filter by.
 * @returns The percentage change from the previous range.
 */
export const calculatePreviousMonthComparison = (
  jobs: Job[],
  metricType: keyof Metrics,
  range?: { start: number; end?: number }
): { changePercentage: number } => {
  const currentMonth = new Date().getMonth();
  const startMonth = range?.start ?? currentMonth;
  const endMonth = range?.end ?? currentMonth;

  // Calculate previous range: if startMonth is January (0), wrap around to December (11)
  const previousStartMonth = startMonth === 0 ? 11 : startMonth - 1;
  const previousEndMonth = endMonth === 0 ? 11 : endMonth - 1;

  let currentTotal = 0;
  let previousTotal = 0;

  jobs.forEach((job) => {
    job.metrics.forEach((metric) => {
      const monthIndex = monthIndexMap[metric.month];

      // Sum metrics within the specified range
      if (monthIndex >= startMonth && monthIndex <= endMonth) {
        currentTotal += metric[metricType] as number;
      }
      // Sum metrics within the previous range
      if (monthIndex >= previousStartMonth && monthIndex <= previousEndMonth) {
        previousTotal += metric[metricType] as number;
      }
    });
  });

  const changePercentage =
    previousTotal > 0
      ? ((currentTotal - previousTotal) / previousTotal) * 100
      : 0;

  return { changePercentage: Math.round(changePercentage) };
};
