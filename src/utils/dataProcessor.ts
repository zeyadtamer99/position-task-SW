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
  const initialData: OverviewData = { views: [], clicks: [] };

  jobs.forEach((job) => {
    job.metrics.forEach((metric) => {
      initialData.views.push(metric.views);
      initialData.clicks.push(metric.clicks);
    });
  });

  console.log("📊 Processed Overview Data:", initialData);
  return initialData;
};
// src/utils/processDataForPlots.ts
export interface NewVisitsData {
  percentage: number;
}

export const processNewVisitsData = (jobs: Job[]): NewVisitsData => {
  const totalVisits = jobs.reduce(
    (acc, job) =>
      acc + job.metrics.reduce((sum, metric) => sum + metric.visits, 0),
    0
  );
  const percentage = Math.min(Math.round((totalVisits / 5000) * 100), 100);

  const result = { percentage };
  console.log("👀 Processed New Visits Data:", result);
  return result;
};
// src/utils/processDataForPlots.ts
export interface SavedJobsData {
  percentage: number;
  totalJobs: number;
}

export const processSavedJobsData = (jobs: Job[]): SavedJobsData => {
  const totalJobs = jobs.length;
  const totalSaved = jobs.reduce(
    (acc, job) =>
      acc + job.metrics.reduce((sum, metric) => sum + metric.saved, 0),
    0
  );
  const percentage = Math.min(
    Math.round((totalSaved / (totalJobs * 100)) * 100),
    100
  );

  const result = { percentage, totalJobs };
  console.log("💼 Processed Saved Jobs Data:", result);
  return result;
};
// src/utils/processDataForPlots.ts
export interface SmallStatData {
  title: string;
  emoji: string;
  number: number;
  description: string;
}

export const processSmallStatData = (jobs: Job[]): SmallStatData[] => {
  const followers = jobs.reduce(
    (acc, job) =>
      acc + job.metrics.reduce((sum, metric) => sum + metric.followers, 0),
    0
  );
  const applies = jobs.reduce(
    (acc, job) =>
      acc + job.metrics.reduce((sum, metric) => sum + metric.applies, 0),
    0
  );
  const hires = jobs.reduce(
    (acc, job) =>
      acc + job.metrics.reduce((sum, metric) => sum + metric.hires, 0),
    0
  );

  const smallStatData = [
    {
      title: "Followers",
      emoji: "👤",
      number: followers,
      description: "New followers this month",
    },
    {
      title: "Applies",
      emoji: "✉️",
      number: applies,
      description: "Job applications sent",
    },
    {
      title: "Hires",
      emoji: "✅",
      number: hires,
      description: "Positions filled",
    },
  ];

  console.log("📈 Processed Small Stats Data:", smallStatData);
  return smallStatData;
};
// src/utils/processDataForPlots.ts
export interface BestPerformingJobData {
  name: string;
  performance: number;
  applied: number;
}

export const processBestPerformingJobsData = (
  jobs: Job[]
): BestPerformingJobData[] => {
  const bestPerformingJobs = jobs.map((job) => {
    const performance =
      job.metrics.reduce((acc, metric) => acc + metric.hires, 0) /
      job.metrics.length;
    const applied = job.metrics.reduce(
      (acc, metric) => acc + metric.applies,
      0
    );

    return { name: job.name, performance: Math.round(performance), applied };
  });

  console.log("🏆 Processed Best Performing Jobs Data:", bestPerformingJobs);
  return bestPerformingJobs;
};
