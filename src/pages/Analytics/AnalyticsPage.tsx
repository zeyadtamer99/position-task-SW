import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import NewVisitsPlot from "./components/plots/NewVisitsPlot";
import OverviewPlot from "./components/plots/OverviewPlot";
import SavedJobsPlot from "./components/plots/SavedJobsPlot";
import SmallStatPlot from "./components/plots/SmallStatPlot";
import AddPlotButton from "./components/AddPlotButton";
import AddPlotModal from "./components/AddPlotModal";
import BestPerformingJobsPlot from "./components/plots/BestPerformingJobsPlot";
import Sidebar from "../../components/Sidebar";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { getPlotWidth, getResponsiveHeight } from "./utils";
import { fetchJobsFromFirebase } from "../../utils/firebaseFetch";
import {
  BestPerformingJobData,
  NewVisitsData,
  OverviewData,
  processBestPerformingJobsData,
  processNewVisitsData,
  processOverviewData,
  processSavedJobsData,
  processSmallStatData,
  SavedJobsData,
  SmallStatData,
} from "../../utils/dataProcessor";
import { Job } from "../../models/Job";

const plotTypes = [
  "Overview",
  "New Visits",
  "Saved Jobs",
  "Best Performing Jobs",
  "Followers",
  "Applies",
  "Hires",
];

const AnalyticsPage: React.FC = () => {
  const [plots, setPlots] = useState<string[]>(["Overview"]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [hoveredPlotIndex, setHoveredPlotIndex] = useState<number | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  // Data states for each plot
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [newVisitsData, setNewVisitsData] = useState<NewVisitsData | null>(
    null
  );
  const [savedJobsData, setSavedJobsData] = useState<SavedJobsData | null>(
    null
  );
  const [smallStatData, setSmallStatData] = useState<SmallStatData[]>([]);
  const [bestJobData, setBestPerformingJobsData] = useState<
    BestPerformingJobData[]
  >([]);

  useEffect(() => {
    const loadData = async () => {
      console.log("🚀 Fetching jobs data from Firestore...");
      const fetchedJobs = await fetchJobsFromFirebase();
      setJobs(fetchedJobs);
      if (fetchedJobs) {
        // Process and set data for each plot
        setOverviewData(processOverviewData(fetchedJobs));
        setNewVisitsData(processNewVisitsData(fetchedJobs));
        setSavedJobsData(processSavedJobsData(fetchedJobs));
        setSmallStatData(processSmallStatData(fetchedJobs));
        setBestPerformingJobsData(processBestPerformingJobsData(fetchedJobs));
      }
    };

    loadData();
  }, []);
  const handleAddPlot = (plotType: string) => {
    setPlots([...plots, plotType]);
    setModalOpen(false);
  };

  const handleRemovePlot = (plotType: string) => {
    setPlots(plots.filter((plot) => plot !== plotType));
  };

  const renderPlotComponent = (plotType: string) => {
    switch (plotType) {
      case "Overview":
        return <OverviewPlot data={overviewData} />;
      case "New Visits":
        return <NewVisitsPlot data={newVisitsData} />;
      case "Saved Jobs":
        return <SavedJobsPlot data={savedJobsData} />;
      case "Best Performing Jobs":
        return <BestPerformingJobsPlot data={bestJobData} />;

      // Render SmallStatPlots for Followers, Applies, and Hires
      case "Followers":
      case "Applies":
      case "Hires": {
        const statData = smallStatData.find((data) => data.title === plotType);
        if (statData) {
          return (
            <SmallStatPlot
              emoji={statData.emoji}
              title={statData.title}
              jobs={jobs}
              description={statData.description}
              changePercentage={statData.changePercentage}
              onMonthRangeChange={handleMonthRangeChange}
            />
          );
        }
        return null;
      }

      default:
        console.warn(`Unknown plot type: ${plotType}`);
        return null;
    }
  };

  const handleMonthRangeChange = (range: { start: number; end?: number }) => {
    const updatedData = processSmallStatData(jobs, range);
    setSmallStatData(updatedData);
  };

  // Inside AnalyticsPage component
  const renderPlot = (plotType: string, index: number) => {
    const previousPlotType = index > 0 ? plots[index - 1] : null;
    const nextPlotType = index < plots.length - 1 ? plots[index + 1] : null;

    const plotWidth = getPlotWidth(plotType, previousPlotType, nextPlotType);
    const isSideBySide = plotWidth === "50%";

    return (
      <Box
        key={index}
        sx={{
          width: { xs: "100%", md: "49%", lg: plotWidth },
          height: isSideBySide
            ? { xs: "250px", md: "400px" }
            : { xs: "350px", md: "500px" },
          display: { xs: isSideBySide ? "flex" : "block", md: "block" },
          flexDirection: { xs: "row", md: "column" },
          gap: { xs: "8px", md: "0" },
        }}
        onMouseEnter={() => setHoveredPlotIndex(index)}
        onMouseLeave={() => setHoveredPlotIndex(null)}
      >
        <Box sx={{ position: "relative" }}>
          {hoveredPlotIndex === index && (
            <Button
              type="text"
              onClick={() => handleRemovePlot(plotType)}
              icon={<CloseOutlined style={{ fontSize: "1.5em" }} />}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                zIndex: 1,
                color: "red",
              }}
            />
          )}
        </Box>
        {renderPlotComponent(plotType)}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        minHeight: "100vh",
        height: "fit-content",
      }}
    >
      <Sidebar />

      <Box
        sx={{
          width: "100%",
          backgroundColor: "#dae5ff",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: "16px" }}>
          Let’s see the data
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          {plots.map((plotType, index) => renderPlot(plotType, index))}
          {plots.length < plotTypes.length && (
            <Box sx={{ width: "30%" }}>
              <AddPlotButton
                onClick={() => setModalOpen(true)}
                height={
                  plots.length > 0
                    ? getResponsiveHeight(plots[plots.length - 1], null, null)
                    : { xs: "300px", sm: "400px", md: "500px" }
                } // Use responsive height of the last plot, or default values if no plots exist
              />
            </Box>
          )}
        </Box>

        <AddPlotModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAddPlot={handleAddPlot}
          existingPlots={plots}
        />
      </Box>
    </Box>
  );
};

export default AnalyticsPage;
