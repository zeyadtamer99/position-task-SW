//src\utils\dataProcessor.ts
import { Job, Metrics } from "../models/Job";

// Group metrics data by month
export const processJobsData = (jobs: Job[]): Record<string, Metrics[]> => {
  console.log("📊 Starting to process jobs data by month...");

  const groupedData = jobs.reduce((acc, job) => {
    console.log(`🔍 Processing job: ${job.name} (ID: ${job.id})`);

    job.metrics.forEach((metric) => {
      if (!acc[metric.month]) {
        console.log(`📅 Creating new month group for: ${metric.month}`);
        acc[metric.month] = [];
      }

      console.log(
        `➕ Adding metric to month: ${metric.month} - Followers: ${metric.followers}, Applies: ${metric.applies}`
      );
      acc[metric.month].push(metric);
    });

    return acc;
  }, {} as Record<string, Metrics[]>);

  console.log("✅ Finished processing jobs data by month");
  console.log(groupedData);

  return groupedData;
};

export type FilterType = "views" | "clicks";

export interface OverviewData {
  views: number[];
  clicks: number[];
}

export const processOverviewData = (jobs: Job[]): OverviewData => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const initialData: OverviewData = {
    views: Array(12).fill(0),
    clicks: Array(12).fill(0),
  };

  jobs.forEach((job) => {
    job.metrics.forEach((metric) => {
      const monthIndex = months.indexOf(metric.month); // Find index of the month
      if (monthIndex >= 0) {
        // Aggregate views and clicks for each month
        initialData.views[monthIndex] += metric.views;
        initialData.clicks[monthIndex] += metric.clicks;
      }
    });
  });

  console.log("📊 Aggregated Overview Data:", initialData);
  return initialData;
};

export interface NewVisitsData {
  totalVisits: number;
  visitsCurrentMonth: number;
  visitsPreviousMonth: number;
  visitsLast3Months: number;
}

export const processNewVisitsData = (jobs: Job[]): NewVisitsData => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const last3Months = [
    currentMonth,
    previousMonth,
    previousMonth - 1 < 0 ? 11 : previousMonth - 1,
  ];

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

  let totalVisits = 0;
  let visitsCurrentMonth = 0;
  let visitsPreviousMonth = 0;
  let visitsLast3Months = 0;

  console.log("📅 Processing Visits Data by Month");

  jobs.forEach((job) => {
    job.metrics.forEach((metric) => {
      const metricMonthIndex = monthIndexMap[metric.month];

      totalVisits += metric.visits;
      console.log(`🔍 ${metric.month} - Visits Count: ${metric.visits}`);

      if (metricMonthIndex === currentMonth) {
        visitsCurrentMonth += metric.visits;
        console.log("📅 Adding to Current Month Visits:", visitsCurrentMonth);
      }

      if (metricMonthIndex === previousMonth) {
        visitsPreviousMonth += metric.visits;
        console.log("⬅️ Adding to Previous Month Visits:", visitsPreviousMonth);
      }

      if (last3Months.includes(metricMonthIndex)) {
        visitsLast3Months += metric.visits;
        console.log("📅 Adding to Last 3 Months Visits:", visitsLast3Months);
      }
    });
  });

  const result = {
    totalVisits,
    visitsCurrentMonth,
    visitsPreviousMonth,
    visitsLast3Months,
  };

  console.log("👀 Processed New Visits Data Result:", result);
  return result;
};

// src/utils/processDataForPlots.ts
export interface SavedJobsData {
  percentage: number;
  totalSaves: number;
  savesCurrentMonth: number;
  savesPreviousMonth: number;
  savesLast3Months: number;
}

export const processSavedJobsData = (jobs: Job[]): SavedJobsData => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const last3Months = [
    currentMonth,
    previousMonth,
    previousMonth - 1 < 0 ? 11 : previousMonth - 1,
  ];

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

  let totalSaves = 0;
  let savesCurrentMonth = 0;
  let savesPreviousMonth = 0;
  let savesLast3Months = 0;

  console.log("📅 Processing Saves Data by Month");

  jobs.forEach((job) => {
    job.metrics.forEach((metric) => {
      const metricMonthIndex = monthIndexMap[metric.month];

      totalSaves += metric.saved;
      console.log(`🔍 ${metric.month} - Saved Count: ${metric.saved}`);

      if (metricMonthIndex === currentMonth) {
        savesCurrentMonth += metric.saved;
        console.log("📅 Adding to Current Month Saves:", savesCurrentMonth);
      }

      if (metricMonthIndex === previousMonth) {
        savesPreviousMonth += metric.saved;
        console.log("⬅️ Adding to Previous Month Saves:", savesPreviousMonth);
      }

      if (last3Months.includes(metricMonthIndex)) {
        savesLast3Months += metric.saved;
        console.log("📅 Adding to Last 3 Months Saves:", savesLast3Months);
      }
    });
  });

  const percentage = Math.min(
    Math.round((savesCurrentMonth / totalSaves) * 100),
    100
  );

  const result = {
    percentage,
    totalSaves,
    savesCurrentMonth,
    savesPreviousMonth,
    savesLast3Months,
  };

  console.log("💼 Processed Saved Jobs Data Result:", result);
  return result;
};

// src/utils/processDataForPlots.ts
export interface SmallStatData {
  title: string;
  emoji: string;
  number: number;
  description: string;
  changePercentage?: number; // New field to store percentage change
}

export const processSmallStatData = (
  jobs: Job[],
  selectedMonths?: { start: number; end?: number },
  descriptions?: Record<string, string> // Add optional descriptions parameter
): SmallStatData[] => {
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

  const calculateMetrics = (
    metricType: keyof Metrics,
    months: number[]
  ): { current: number; previous: number } => {
    let currentTotal = 0;
    let previousTotal = 0;

    jobs.forEach((job) => {
      job.metrics.forEach((metric) => {
        const monthIndex = monthIndexMap[metric.month];
        if (months.includes(monthIndex)) {
          // Ensure that `metric[metricType]` is treated as a number
          currentTotal +=
            typeof metric[metricType] === "number"
              ? (metric[metricType] as number)
              : 0;
        } else if (
          selectedMonths &&
          monthIndex >= selectedMonths.start - 1 &&
          monthIndex <= (selectedMonths.end || selectedMonths.start - 1) - 1
        ) {
          previousTotal +=
            typeof metric[metricType] === "number"
              ? (metric[metricType] as number)
              : 0;
        }
      });
    });

    return { current: currentTotal, previous: previousTotal };
  };
  let followers = { current: 0, previous: 0 };
  let applies = { current: 0, previous: 0 };
  let hires = { current: 0, previous: 0 };
  if (selectedMonths) {
    followers = calculateMetrics("followers", [selectedMonths.start]);
    applies = calculateMetrics("applies", [selectedMonths.start]);
    hires = calculateMetrics("hires", [selectedMonths.start]);
  }

  const createStatData = (
    title: string,
    emoji: string,
    metric: { current: number; previous: number }
  ): SmallStatData => ({
    title,
    emoji,
    number: metric.current,
    description: descriptions ? descriptions[title] : `during selected period`, // Use provided description if available
    changePercentage:
      metric.previous > 0
        ? Math.round(
            ((metric.current - metric.previous) / metric.previous) * 100
          )
        : 0,
  });

  return [
    createStatData("Followers", "👤", followers),
    createStatData("Applies", "✉️", applies),
    createStatData("Hires", "✅", hires),
  ];
};

// src/utils/processDataForPlots.ts
export interface BestPerformingJobData {
  name: string;
  performance: number;
  applied: number;
  postedOn: Date;
}

export const processBestPerformingJobsData = (
  jobs: Job[]
): BestPerformingJobData[] => {
  const weights = {
    views: 0.15,
    clicks: 0.35,
    saved: 0.5,
  };

  // Define maximum expected values for normalization
  const maxValues = {
    views: 1100, // Adjust as per your data expectations
    clicks: 1000, // Adjust as per your data expectations
    saved: 200, // Adjust as per your data expectations
  };

  const bestPerformingJobs = jobs.map((job) => {
    // Sum up all metrics for each job
    const totalMetrics = job.metrics.reduce(
      (acc, metric) => {
        acc.views += metric.views;
        acc.clicks += metric.clicks;
        acc.saved += metric.saved;
        return acc;
      },
      { views: 0, clicks: 0, saved: 0 }
    );

    const totalEntries = job.metrics.length;

    // Calculate the average and normalize each metric based on the defined max values
    const normalizedViews = totalMetrics.views / totalEntries / maxValues.views;
    const normalizedClicks =
      totalMetrics.clicks / totalEntries / maxValues.clicks;
    const normalizedSaved = totalMetrics.saved / totalEntries / maxValues.saved;

    // Apply weights and compute final performance percentage
    const weightedPerformance =
      normalizedViews * weights.views +
      normalizedClicks * weights.clicks +
      normalizedSaved * weights.saved;

    // Ensure performance does not exceed 100%
    const performance = Math.min(Math.round(weightedPerformance * 100), 100);

    const applied = job.metrics.reduce(
      (acc, metric) => acc + metric.applies,
      0
    );

    return {
      name: job.name,
      performance,
      applied,
      postedOn: job.postedOn,
    };
  });

  console.log("🏆 Processed Best Performing Jobs Data:", bestPerformingJobs);
  return bestPerformingJobs;
};
