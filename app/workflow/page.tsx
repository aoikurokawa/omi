"use client";

import { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import StakeProgramFlow from "@/components/workflow/StakeProgramFlow";
import StakePoolFlow from "@/components/workflow/StakePoolFlow";
import StakeNetFlow from "@/components/workflow/StakeNetFlow";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`workflow-tabpanel-${index}`}
      aria-labelledby={`workflow-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function WorkflowPage() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Container sx={{ py: 4, mt: 10 }} maxWidth="xl">
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Solana Staking Workflows
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Interactive visualization of Stake Program, Stake Pool, and StakeNet workflows
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="workflow tabs"
          centered
        >
          <Tab label="Stake Program" />
          <Tab label="SPL Stake Pool" />
          <Tab label="Jito StakeNet" />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <StakeProgramFlow />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <StakePoolFlow />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <StakeNetFlow />
      </TabPanel>
    </Container>
  );
}
