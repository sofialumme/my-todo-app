import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Checkbox
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";

const TodoList = () => {
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
          date: date.toISOString(),
          priority: priority,
          done: false
        }
      ]);
      setInput("");
      setDate(null);
      setPriority("Medium");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const columns = [
    {
      field: "text",
      headerName: "Task",
      flex: 1,
      renderCell: (params) => (
        <Typography
          sx={{
            textDecoration: params.row.done ? "line-through" : "none",
            color: params.row.done ? "text.secondary" : "text.primary"
          }}
        >
          {params.row.text}
        </Typography>
      )
    },
    {
      field: "date",
      headerName: "Due Date",
      flex: 1,
      type: "date",
      valueGetter: (value, row) => new Date(row.date)
    },
    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      renderCell: (params) => (
        <Typography color={params.row.priority === "High" ? "error.main" : "text.primary"}>
          {params.row.priority}
        </Typography>
      )
    },
    {
      field: "done",
      headerName: "Done",
      width: 100,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.done}
          onChange={() => toggleTask(params.row.id)}
        />
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => deleteTask(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 700, mx: "auto", mt: 5, p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 3 }}>
          <TextField
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            label="Add a new task"
          />
          <DatePicker
            label="Due Date"
            value={date}
            onChange={(newDate) => setDate(newDate)}
            slotProps={{ textField: { fullWidth: true } }}
          />
          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" onClick={addTask}>
            Add
          </Button>
        </Box>
        <Typography variant="h6" gutterBottom>Task Table</Typography>
        <Box sx={{ height: 500 }}>
          <DataGrid
            rows={tasks}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableRowSelectionOnClick
            getRowId={(row) => row.id}
            checkboxSelection={false}
          />
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default TodoList;