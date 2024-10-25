// src/pages/mockData/mockPlotData.ts
export const mockPlotData = {
  Overview: {
    views: [30, 45, 60, 75, 50, 90, 40, 70, 60, 80, 95, 100],
    clicks: [205, 355, 535, 625, 140, 570, 530, 960, 650, 265, 485, 390],
  },
  NewVisits: {
    percentage: 65,
    totalVisits: 3250,
  },
  SavedJobs: {
    percentage: 45,
    totalJobs: 1500,
  },
  BestPerformingJobs: [
    { id: 1, name: "Software Engineer", performance: 85, applied: 120 },
    { id: 2, name: "Data Scientist", performance: 90, applied: 100 },
    { id: 3, name: "Product Manager", performance: 75, applied: 80 },
  ],
};
