import React, { useState } from "react";
import { Button, Checkbox, TextField, Typography, Card, CardContent, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [date, setDate] = useState(null);

  const addTask = () => {
    if (input.trim() && date) {
      setTasks([...tasks, { id: Date.now(), text: input, date: date.format('YYYY-MM-DD'), done: false }]);
      setInput("");
      setDate(null);
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 2 }}>
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
          <Button variant="contained" onClick={addTask}>
            Add
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {tasks.map((task) => (
            <Card key={task.id} variant="outlined">
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Checkbox
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                    />
                    <Typography
                      sx={{ textDecoration: task.done ? "line-through" : "none", color: task.done ? "text.secondary" : "text.primary" }}
                    >
                      {task.text}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Due: {task.date}
                  </Typography>
                </Box>
                <IconButton color="error" onClick={() => deleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default TodoList;