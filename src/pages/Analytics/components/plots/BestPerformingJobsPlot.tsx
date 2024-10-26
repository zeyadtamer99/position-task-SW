// src/components/BestPerformingJobsPlot.tsx
import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { BestPerformingJobData } from "../../../../utils/dataProcessor";
import { formatDate } from "../../utils";

interface BestPerformingJobsPlotProps {
  data: BestPerformingJobData[] | null;
}

const BestPerformingJobsPlot: React.FC<BestPerformingJobsPlotProps> = ({
  data,
}) => {
  if (!data) return null;

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%", // Full width of the parent
        height: "100%", // Consistent height
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: "16px" }}>
        Best Performing Jobs
      </Typography>
      <Table sx={{ width: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Performance</TableCell>
            <TableCell>Applied</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((job) => (
            <TableRow key={job.name}>
              <TableCell>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {job.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "grey.600", fontSize: "0.8rem" }}
                >
                  {formatDate(job.postedOn)}
                </Typography>
              </TableCell>
              <TableCell>{job.performance}%</TableCell>
              <TableCell>{job.applied}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default BestPerformingJobsPlot;
