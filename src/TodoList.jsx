import React, { useState } from "react";
import { Button, Checkbox, TextField, Typography, Card, CardContent, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, done: false }]);
      setInput("");
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
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          label="Add a new task"
        />
        <Button variant="contained" onClick={addTask}>
          Add
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {tasks.map((task) => (
          <Card key={task.id} variant="outlined">
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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
              <IconButton color="error" onClick={() => deleteTask(task.id)}>
                <DeleteIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default TodoList;
