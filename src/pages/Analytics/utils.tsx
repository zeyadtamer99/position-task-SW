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
 * Calculates the current month's data for a specified metric type.
 * @param jobs - Array of Job data.
 * @param metricType - The metric type (e.g., "views", "clicks").
 * @returns The total metric count for the current month.
 */
export const calculateCurrentMonthData = (
  jobs: Job[],
  metricType: keyof Metrics
): { count: number } => {
  const currentMonth = new Date().getMonth();
  const currentMonthData = jobs.reduce((total, job) => {
    const monthMetric = job.metrics.find(
      (metric) => monthIndexMap[metric.month] === currentMonth
    );
    return monthMetric ? total + (monthMetric[metricType] as number) : total;
  }, 0);

  return { count: currentMonthData };
};

/**
 * Calculates the percentage change of the metric between the current and previous month.
 * @param jobs - Array of Job data.
 * @param metricType - The metric type (e.g., "views", "clicks").
 * @returns The percentage change from the previous month.
 */
export const calculatePreviousMonthComparison = (
  jobs: Job[],
  metricType: keyof Metrics
): { changePercentage: number } => {
  const currentMonth = new Date().getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;

  let currentTotal = 0;
  let previousTotal = 0;

  jobs.forEach((job) => {
    job.metrics.forEach((metric) => {
      const monthIndex = monthIndexMap[metric.month];
      if (monthIndex === currentMonth) {
        currentTotal += metric[metricType] as number;
      } else if (monthIndex === previousMonth) {
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
