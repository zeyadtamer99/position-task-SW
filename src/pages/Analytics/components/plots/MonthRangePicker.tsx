// src/components/MonthRangePicker.tsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";
import { DatePicker, Popover } from "antd";
import { ExclamationCircleOutlined, CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface MonthRangePickerProps {
  open: boolean;
  onClose: () => void;
  onRangeSelect: (range: { start: number; end?: number }) => void;
}

const MonthRangePicker: React.FC<MonthRangePickerProps> = ({
  open,
  onClose,
  onRangeSelect,
}) => {
  const [range, setRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([
    null,
    null,
  ]);
  const [showWarning, setShowWarning] = useState(false);

  const handleConfirm = () => {
    if (range[0]) {
      onRangeSelect({
        start: range[0].month(),
        end: range[1] ? range[1].month() : undefined,
      });
      onClose();
    }
  };

  useEffect(() => {
    if (range[0] && range[1]) {
      const monthDifference = range[1].diff(range[0], "month");
      setShowWarning(monthDifference > 5);
    } else {
      setShowWarning(false);
    }
  }, [range]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{ borderRadius: 2, zIndex: "99" }}
    >
      <DialogTitle
        sx={{ display: "flex", alignItems: "center", gap: 1, zIndex: "88" }}
      >
        <CalendarOutlined style={{ fontSize: "1.5rem", color: "#1890ff" }} />
        <span>Select Month Range</span>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 3,
          backgroundColor: "#f9f9f9",
          borderRadius: "12px",
          zIndex: "77",
        }}
      >
        <RangePicker
          picker="month"
          value={range}
          onChange={(value) => setRange(value)}
          style={{ width: "100%", zIndex: "66" }}
        />

        {showWarning && (
          <Popover
            content={
              <Typography color="warning.main">
                <ExclamationCircleOutlined /> If selecting more than 6 months,
                comparison will be done for the same year.
              </Typography>
            }
            title="Warning"
          >
            <ExclamationCircleOutlined
              style={{ color: "#faad14", fontSize: "1.5rem" }}
            />
            <Typography color="warning.main" sx={{ marginLeft: 1 }}>
              Range exceeds 6 months.
            </Typography>
          </Popover>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} disabled={!range[0]}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MonthRangePicker;
