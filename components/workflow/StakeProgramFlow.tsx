"use client";

import {
  ReactFlow,
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

interface NodeData {
  label: string;
  description?: string;
  color?: string;
  borderColor?: string;
  textColor?: string;
}

function StepNode({ data }: { data: NodeData }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        minWidth: 180,
        textAlign: "center",
        bgcolor: data.color || "#fff",
        border: "2px solid",
        borderColor: data.borderColor || "#1976d2",
        borderRadius: 2,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Typography
        variant="subtitle2"
        fontWeight="bold"
        sx={{ color: data.textColor || "inherit" }}
      >
        {data.label}
      </Typography>
      {data.description && (
        <Typography variant="caption" display="block" color="text.secondary">
          {data.description}
        </Typography>
      )}
      <Handle type="source" position={Position.Bottom} />
    </Paper>
  );
}

function AuthorityNode({ data }: { data: NodeData }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        minWidth: 150,
        textAlign: "center",
        bgcolor: "#fff3e0",
        border: "2px dashed #ff9800",
        borderRadius: 2,
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Typography variant="caption" fontWeight="bold" sx={{ color: "#e65100" }}>
        {data.label}
      </Typography>
      {data.description && (
        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          sx={{ fontSize: 10 }}
        >
          {data.description}
        </Typography>
      )}
      <Handle type="source" position={Position.Right} />
    </Paper>
  );
}

const nodeTypes = {
  step: StepNode,
  authority: AuthorityNode,
};

const initialNodes: Node[] = [
  // Main flow
  {
    id: "create",
    type: "step",
    position: { x: 300, y: 0 },
    data: {
      label: "Create Stake Account",
      description: "Generate new keypair",
      color: "#e3f2fd",
      borderColor: "#1976d2",
    },
  },
  {
    id: "initialize",
    type: "step",
    position: { x: 300, y: 100 },
    data: {
      label: "Initialize",
      description: "Set authorities & lockup",
      color: "#e3f2fd",
      borderColor: "#1976d2",
    },
  },
  {
    id: "delegate",
    type: "step",
    position: { x: 300, y: 200 },
    data: {
      label: "Delegate Stake",
      description: "Choose validator",
      color: "#e8f5e9",
      borderColor: "#4caf50",
    },
  },
  {
    id: "warmup",
    type: "step",
    position: { x: 300, y: 300 },
    data: {
      label: "Warmup Period",
      description: "1-2 epochs",
      color: "#fff8e1",
      borderColor: "#ffc107",
    },
  },
  {
    id: "active",
    type: "step",
    position: { x: 300, y: 400 },
    data: {
      label: "Active & Earning",
      description: "Receiving rewards",
      color: "#e8f5e9",
      borderColor: "#4caf50",
    },
  },
  {
    id: "deactivate",
    type: "step",
    position: { x: 300, y: 500 },
    data: {
      label: "Deactivate",
      description: "Begin unstaking",
      color: "#fce4ec",
      borderColor: "#e91e63",
    },
  },
  {
    id: "cooldown",
    type: "step",
    position: { x: 300, y: 600 },
    data: {
      label: "Cooldown Period",
      description: "1-2 epochs",
      color: "#fff8e1",
      borderColor: "#ffc107",
    },
  },
  {
    id: "withdraw",
    type: "step",
    position: { x: 300, y: 700 },
    data: {
      label: "Withdraw SOL",
      description: "Return to wallet",
      color: "#f3e5f5",
      borderColor: "#9c27b0",
    },
  },
  // Authorities
  {
    id: "stake-authority",
    type: "authority",
    position: { x: 50, y: 200 },
    data: {
      label: "Stake Authority",
      description: "Delegate, deactivate, split, merge",
    },
  },
  {
    id: "withdraw-authority",
    type: "authority",
    position: { x: 550, y: 600 },
    data: {
      label: "Withdraw Authority",
      description: "Withdraw funds, change authorities",
    },
  },
  // Side operations
  {
    id: "split",
    type: "step",
    position: { x: 80, y: 400 },
    data: {
      label: "Split",
      description: "Create new stake account",
      color: "#e0f7fa",
      borderColor: "#00bcd4",
    },
  },
  {
    id: "merge",
    type: "step",
    position: { x: 520, y: 400 },
    data: {
      label: "Merge",
      description: "Combine stake accounts",
      color: "#e0f7fa",
      borderColor: "#00bcd4",
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1",
    source: "create",
    target: "initialize",
    animated: true,
    style: { stroke: "#1976d2" },
  },
  {
    id: "e2",
    source: "initialize",
    target: "delegate",
    animated: true,
    style: { stroke: "#1976d2" },
  },
  {
    id: "e3",
    source: "delegate",
    target: "warmup",
    animated: true,
    style: { stroke: "#4caf50" },
  },
  {
    id: "e4",
    source: "warmup",
    target: "active",
    animated: true,
    style: { stroke: "#ffc107" },
  },
  {
    id: "e5",
    source: "active",
    target: "deactivate",
    style: { stroke: "#666" },
  },
  {
    id: "e6",
    source: "deactivate",
    target: "cooldown",
    animated: true,
    style: { stroke: "#e91e63" },
  },
  {
    id: "e7",
    source: "cooldown",
    target: "withdraw",
    animated: true,
    style: { stroke: "#ffc107" },
  },
  // Authority connections
  {
    id: "e-stake-auth",
    source: "stake-authority",
    target: "delegate",
    style: { stroke: "#ff9800", strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ff9800" },
  },
  {
    id: "e-withdraw-auth",
    source: "withdraw-authority",
    target: "withdraw",
    style: { stroke: "#ff9800", strokeDasharray: "5,5" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#ff9800" },
  },
  // Side operations
  {
    id: "e-split",
    source: "active",
    target: "split",
    style: { stroke: "#00bcd4" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#00bcd4" },
  },
  {
    id: "e-merge",
    source: "active",
    target: "merge",
    style: { stroke: "#00bcd4" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#00bcd4" },
  },
];

export default function StakeProgramFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Native Stake Program
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Program ID: <code>Stake11111111111111111111111111111111111111</code>
        </Typography>
      </Box>
      <Box sx={{ height: 800, border: "1px solid #e0e0e0", borderRadius: 2 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <Background color="#f5f5f5" gap={16} />
        </ReactFlow>
      </Box>
      <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#e3f2fd",
              border: "2px solid #1976d2",
            }}
          />
          <Typography variant="caption">Setup</Typography>
        </Paper>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#e8f5e9",
              border: "2px solid #4caf50",
            }}
          />
          <Typography variant="caption">Active</Typography>
        </Paper>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#fff8e1",
              border: "2px solid #ffc107",
            }}
          />
          <Typography variant="caption">Waiting</Typography>
        </Paper>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#fff3e0",
              border: "2px dashed #ff9800",
            }}
          />
          <Typography variant="caption">Authority</Typography>
        </Paper>
      </Box>
    </Box>
  );
}
