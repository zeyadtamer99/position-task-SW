import { collection, getDocs } from "firebase/firestore";
import { Job, Metrics } from "../models/Job";
import { db } from "../services/firebase";

export const fetchJobsFromFirebase = async (): Promise<Job[]> => {
  console.log("🚀 Starting to fetch jobs from Firebase...");

  const jobsCollection = collection(db, "jobs");
  const jobsSnapshot = await getDocs(jobsCollection);

  console.log(`📂 Retrieved ${jobsSnapshot.size} jobs from Firebase`);

  const jobs: Job[] = await Promise.all(
    jobsSnapshot.docs.map(async (jobDoc) => {
      const jobData = jobDoc.data();
      console.log(`📄 Processing job: ${jobData.name} (ID: ${jobDoc.id})`);

      const metricsCollection = collection(jobDoc.ref, "metrics");
      const metricsSnapshot = await getDocs(metricsCollection);

      console.log(
        `📊 Retrieved ${metricsSnapshot.size} metrics entries for job: ${jobData.name}`
      );

      const metrics: Metrics[] = metricsSnapshot.docs.map((metricDoc) => {
        const metricData = metricDoc.data();
        console.log(
          `📅 Processing metric for month: ${metricData.month} - Followers: ${metricData.followers}, Applies: ${metricData.applies}`
        );

        return {
          month: metricData.month,
          followers: metricData.followers,
          applies: metricData.applies,
          hires: metricData.hires,
          saved: metricData.saved,
          visits: metricData.visits,
          clicks: metricData.clicks,
          views: metricData.views,
        };
      });

      console.log(`✅ Finished processing job: ${jobData.name}`);

      return {
        id: jobDoc.id,
        name: jobData.name,
        postedOn: jobData.postedOn.toDate(),
        metrics,
      };
    })
  );

  console.log("🎉 Successfully fetched all jobs with metrics data!");
  return jobs;
};
