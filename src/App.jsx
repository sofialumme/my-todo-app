import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import HomeTab from "./components/HomeTab";
import TasksTab from "./components/TasksTab";

function TabPanel({ children, value, index }) {
  return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
}

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab label="Home" />
        <Tab label="Tasks" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <HomeTab />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <TasksTab />
      </TabPanel>
    </Box>
  );
};

export default App;