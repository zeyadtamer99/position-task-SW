export interface Metrics {
  month: string;
  followers: number;
  applies: number;
  hires: number;
  saved: number;
  visits: number;
  clicks: number;
  views: number;
}
export interface Job {
  id: string;
  name: string;
  postedOn: Date;
  metrics: Metrics[];
}
