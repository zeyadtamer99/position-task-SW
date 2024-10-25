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
import { Column, useTable } from "react-table";
import { mockPlotData } from "../../mockData/mockPlotData";
// Define the data structure for the table rows
interface JobData {
  id: number;
  name: string;
  performance: number;
  applied: number;
}

// Define the data structure for the table rows
const BestPerformingJobsPlot: React.FC = () => {
  const data = React.useMemo(() => mockPlotData.BestPerformingJobs, []);

  // Define the columns for the table with proper types
  const columns = React.useMemo<Column<JobData>[]>(
    () => [
      { Header: "Name", accessor: "name" as const },
      { Header: "Performance (%)", accessor: "performance" as const },
      { Header: "Applied", accessor: "applied" as const },
    ],
    []
  );

  // Use the useTable hook to create the table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

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
      <Table {...getTableProps()} sx={{ width: "100%" }}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
};

export default BestPerformingJobsPlot;
