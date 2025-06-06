import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const priorityOptions = ["Low", "Medium", "High"];

const TasksTab = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState(null);
  const [priority, setPriority] = useState("Medium");

  const addTask = () => {
    if (input.trim() && date) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text: input,
          date: date.toDate(),
          priority,
          done: false,
        },
      ]);
      setInput("");
      setDate(null);
      setPriority("Medium");
    }
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const columns = [
    {
      field: "done",
      headerName: "Done",
      width: 80,
      renderCell: (params) => (
        <input
          type="checkbox"
          checked={params.row.done}
          onChange={() => toggleTask(params.row.id)}
        />
      ),
    },
    {
      field: "text",
      headerName: "Task",
      flex: 2,
      renderCell: (params) => (
        <span
          style={{
            textDecoration: params.row.done ? "line-through" : "none",
            color: params.row.done ? "#999" : "#000",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "date",
      headerName: "Due Date",
      type: "date",
      flex: 1,
      valueGetter: (value, row) => new Date(row.date),
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => (
        <span
          style={{
            color: params.value === "High" ? "red" : "inherit",
            fontWeight: params.value === "High" ? "bold" : "normal",
          }}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => deleteTask(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} direction="row" sx={{ mb: 3 }}>
        <TextField
          label="New Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
        />
        <DatePicker
          label="Due Date"
          value={date}
          onChange={(newDate) => setDate(newDate)}
        />
        <TextField
          select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          sx={{ minWidth: 120 }}
        >
          {priorityOptions.map((level) => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={addTask}>
          Add
        </Button>
      </Stack>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={tasks}
          columns={columns}
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
            sorting: { sortModel: [{ field: "date", sort: "asc" }] },
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default TasksTab;
