export interface BestPerformingJobData {
  name: string;
  performance: number;
  applied: number;
  postedOn: Date;
}

export interface SmallStatData {
  title: string;
  emoji: string;
  number: number;
  description: string;
  changePercentage?: number;
}

export interface SavedJobsData {
  percentage: number;
  totalSaves: number;
  savesCurrentMonth: number;
  savesPreviousMonth: number;
  savesLast3Months: number;
}

export interface NewVisitsData {
  totalVisits: number;
  visitsCurrentMonth: number;
  visitsPreviousMonth: number;
  visitsLast3Months: number;
}

export type FilterType = "views" | "clicks";

export interface OverviewData {
  views: number[];
  clicks: number[];
}
