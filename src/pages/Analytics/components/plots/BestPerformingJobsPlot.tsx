import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatDate } from "../../utils";
import { useTranslation } from "react-i18next";
import { BestPerformingJobData } from "../../../../models/Interfaces";

interface BestPerformingJobsPlotProps {
  data: BestPerformingJobData[] | null;
}

const BestPerformingJobsPlot: React.FC<BestPerformingJobsPlotProps> = ({
  data,
}) => {
  const { t } = useTranslation();

  if (!data) return null;

  // Sort data by performance in descending order
  const sortedData = [...data].sort((a, b) => b.performance - a.performance);

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: { xs: "12px", md: "16px" },
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
        height: "100%",
        position: "relative",
        overflowX: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          marginBottom: "16px",
          fontSize: { xs: "1rem", md: "1.25rem" },
        }}
      >
        {t("titles.bestPerformingJobs")}
      </Typography>
      <TableContainer sx={{ maxWidth: "100%" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontSize: { xs: "0.75rem", md: "0.875rem", lg: "1rem" },
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                {t("tableHeaders.name")}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "0.75rem", md: "0.875rem", lg: "1rem" },
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                {t("tableHeaders.performance")}
              </TableCell>
              <TableCell
                sx={{
                  fontSize: { xs: "0.75rem", md: "0.875rem", lg: "1rem" },
                  fontWeight: 600,
                  color: "text.secondary",
                }}
              >
                {t("tableHeaders.applied")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((job) => (
              <TableRow
                key={job.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  height: { xs: "48px", md: "56px" },
                }}
              >
                <TableCell>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: "0.8rem", md: "0.9rem", lg: "1rem" },
                    }}
                  >
                    {job.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "grey.600",
                      fontSize: { xs: "0.65rem", md: "0.75rem" },
                    }}
                  >
                    {formatDate(job.postedOn)}
                  </Typography>
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", md: "0.875rem", lg: "1rem" },
                  }}
                >
                  {job.performance}%
                </TableCell>
                <TableCell
                  sx={{
                    fontSize: { xs: "0.75rem", md: "0.875rem", lg: "1rem" },
                  }}
                >
                  {job.applied}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Note for Performance Calculation */}
      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          color: "grey.500",
          fontSize: { xs: "0.75rem", md: "0.875rem" },
          textAlign: "right",
        }}
      >
        {t("performanceNote")}
      </Typography>
    </Box>
  );
};

export default BestPerformingJobsPlot;
