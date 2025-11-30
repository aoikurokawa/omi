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

function PoolNode({ data }: { data: NodeData }) {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        minWidth: 200,
        textAlign: "center",
        bgcolor: data.color || "#fff",
        border: "3px solid",
        borderColor: data.borderColor || "#1976d2",
        borderRadius: 2,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} id="left" />
      <Typography
        variant="subtitle1"
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
      <Handle type="source" position={Position.Right} id="right" />
    </Paper>
  );
}

function ValidatorNode({ data }: { data: NodeData }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        minWidth: 120,
        textAlign: "center",
        bgcolor: "#e8f5e9",
        border: "2px solid #4caf50",
        borderRadius: 1,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Typography variant="caption" fontWeight="bold" sx={{ color: "#2e7d32" }}>
        {data.label}
      </Typography>
      <Handle type="source" position={Position.Bottom} />
    </Paper>
  );
}

function UserNode({ data }: { data: NodeData }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        minWidth: 140,
        textAlign: "center",
        bgcolor: "#e3f2fd",
        border: "2px solid #1976d2",
        borderRadius: "50%",
      }}
    >
      <Handle type="target" position={Position.Bottom} />
      <Typography variant="caption" fontWeight="bold" sx={{ color: "#1565c0" }}>
        {data.label}
      </Typography>
      <Handle type="source" position={Position.Top} />
    </Paper>
  );
}

function ActionNode({ data }: { data: NodeData }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 1,
        minWidth: 100,
        textAlign: "center",
        bgcolor: data.color || "#fff",
        border: "2px solid",
        borderColor: data.borderColor || "#666",
        borderRadius: 1,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} id="left" />
      <Typography variant="caption" fontWeight="bold">
        {data.label}
      </Typography>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right" />
    </Paper>
  );
}

const nodeTypes = {
  pool: PoolNode,
  validator: ValidatorNode,
  user: UserNode,
  action: ActionNode,
};

const initialNodes: Node[] = [
  // Stake Pool Center
  {
    id: "stake-pool",
    type: "pool",
    position: { x: 350, y: 250 },
    data: {
      label: "Stake Pool",
      description: "SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy",
      color: "#fff3e0",
      borderColor: "#ff9800",
    },
  },
  // Reserve
  {
    id: "reserve",
    type: "pool",
    position: { x: 350, y: 400 },
    data: {
      label: "Reserve Stake",
      description: "Undelegated SOL",
      color: "#fce4ec",
      borderColor: "#e91e63",
    },
  },
  // Pool Mint
  {
    id: "pool-mint",
    type: "pool",
    position: { x: 650, y: 250 },
    data: {
      label: "Pool Token Mint",
      description: "Liquid staking token",
      color: "#f3e5f5",
      borderColor: "#9c27b0",
    },
  },
  // Validator List
  {
    id: "validator-list",
    type: "pool",
    position: { x: 50, y: 250 },
    data: {
      label: "Validator List",
      description: "Tracks all validators",
      color: "#e0f2f1",
      borderColor: "#009688",
    },
  },
  // Validators
  {
    id: "validator-1",
    type: "validator",
    position: { x: 100, y: 500 },
    data: { label: "Validator 1" },
  },
  {
    id: "validator-2",
    type: "validator",
    position: { x: 250, y: 500 },
    data: { label: "Validator 2" },
  },
  {
    id: "validator-3",
    type: "validator",
    position: { x: 400, y: 500 },
    data: { label: "Validator 3" },
  },
  {
    id: "validator-n",
    type: "validator",
    position: { x: 550, y: 500 },
    data: { label: "Validator N" },
  },
  // Users
  {
    id: "user",
    type: "user",
    position: { x: 380, y: 20 },
    data: { label: "User (SOL)" },
  },
  // Manager/Staker
  {
    id: "manager",
    type: "action",
    position: { x: 700, y: 100 },
    data: {
      label: "Manager",
      color: "#fff8e1",
      borderColor: "#ffc107",
    },
  },
  {
    id: "staker",
    type: "action",
    position: { x: 700, y: 400 },
    data: {
      label: "Staker",
      color: "#fff8e1",
      borderColor: "#ffc107",
    },
  },
  // Actions
  {
    id: "deposit-sol",
    type: "action",
    position: { x: 200, y: 120 },
    data: {
      label: "Deposit SOL",
      color: "#e8f5e9",
      borderColor: "#4caf50",
    },
  },
  {
    id: "withdraw-sol",
    type: "action",
    position: { x: 500, y: 120 },
    data: {
      label: "Withdraw SOL",
      color: "#ffebee",
      borderColor: "#f44336",
    },
  },
  // Transient Stakes
  {
    id: "transient-1",
    type: "action",
    position: { x: 100, y: 600 },
    data: {
      label: "Transient",
      color: "#e0e0e0",
      borderColor: "#9e9e9e",
    },
  },
  {
    id: "transient-2",
    type: "action",
    position: { x: 250, y: 600 },
    data: {
      label: "Transient",
      color: "#e0e0e0",
      borderColor: "#9e9e9e",
    },
  },
  {
    id: "transient-3",
    type: "action",
    position: { x: 400, y: 600 },
    data: {
      label: "Transient",
      color: "#e0e0e0",
      borderColor: "#9e9e9e",
    },
  },
  {
    id: "transient-n",
    type: "action",
    position: { x: 550, y: 600 },
    data: {
      label: "Transient",
      color: "#e0e0e0",
      borderColor: "#9e9e9e",
    },
  },
];

const initialEdges: Edge[] = [
  // User flow
  {
    id: "e-user-deposit",
    source: "user",
    target: "deposit-sol",
    animated: true,
    style: { stroke: "#4caf50" },
  },
  {
    id: "e-deposit-pool",
    source: "deposit-sol",
    target: "stake-pool",
    animated: true,
    style: { stroke: "#4caf50" },
  },
  {
    id: "e-pool-mint",
    source: "stake-pool",
    target: "pool-mint",
    sourceHandle: "right",
    style: { stroke: "#9c27b0" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#9c27b0" },
  },
  {
    id: "e-mint-user",
    source: "pool-mint",
    target: "user",
    style: { stroke: "#9c27b0" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#9c27b0" },
  },

  // Withdraw flow
  {
    id: "e-user-withdraw",
    source: "user",
    target: "withdraw-sol",
    style: { stroke: "#f44336" },
  },
  {
    id: "e-withdraw-pool",
    source: "withdraw-sol",
    target: "stake-pool",
    style: { stroke: "#f44336" },
  },

  // Pool to reserve
  {
    id: "e-pool-reserve",
    source: "stake-pool",
    target: "reserve",
    animated: true,
    style: { stroke: "#ff9800" },
  },

  // Validator list
  {
    id: "e-pool-list",
    source: "stake-pool",
    target: "validator-list",
    targetHandle: "right",
    style: { stroke: "#009688" },
  },

  // Reserve to validators
  {
    id: "e-reserve-v1",
    source: "reserve",
    target: "validator-1",
    style: { stroke: "#4caf50" },
  },
  {
    id: "e-reserve-v2",
    source: "reserve",
    target: "validator-2",
    style: { stroke: "#4caf50" },
  },
  {
    id: "e-reserve-v3",
    source: "reserve",
    target: "validator-3",
    style: { stroke: "#4caf50" },
  },
  {
    id: "e-reserve-vn",
    source: "reserve",
    target: "validator-n",
    style: { stroke: "#4caf50" },
  },

  // Transient stakes
  {
    id: "e-v1-t1",
    source: "validator-1",
    target: "transient-1",
    style: { stroke: "#9e9e9e", strokeDasharray: "3,3" },
  },
  {
    id: "e-v2-t2",
    source: "validator-2",
    target: "transient-2",
    style: { stroke: "#9e9e9e", strokeDasharray: "3,3" },
  },
  {
    id: "e-v3-t3",
    source: "validator-3",
    target: "transient-3",
    style: { stroke: "#9e9e9e", strokeDasharray: "3,3" },
  },
  {
    id: "e-vn-tn",
    source: "validator-n",
    target: "transient-n",
    style: { stroke: "#9e9e9e", strokeDasharray: "3,3" },
  },

  // Manager/Staker connections
  {
    id: "e-manager-pool",
    source: "manager",
    target: "stake-pool",
    targetHandle: "right",
    style: { stroke: "#ffc107", strokeDasharray: "5,5" },
  },
  {
    id: "e-staker-reserve",
    source: "staker",
    target: "reserve",
    targetHandle: "right",
    style: { stroke: "#ffc107", strokeDasharray: "5,5" },
  },
];

export default function StakePoolFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          SPL Stake Pool Program
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Program ID: <code>SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy</code>
        </Typography>
      </Box>
      <Box sx={{ height: 700, border: "1px solid #e0e0e0", borderRadius: 2 }}>
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
              bgcolor: "#fff3e0",
              border: "2px solid #ff9800",
            }}
          />
          <Typography variant="caption">Pool Account</Typography>
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
          <Typography variant="caption">Validator Stake</Typography>
        </Paper>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#f3e5f5",
              border: "2px solid #9c27b0",
            }}
          />
          <Typography variant="caption">Pool Token</Typography>
        </Paper>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#e0e0e0",
              border: "2px solid #9e9e9e",
            }}
          />
          <Typography variant="caption">Transient</Typography>
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
          <Typography variant="caption">Admin</Typography>
        </Paper>
      </Box>
    </Box>
  );
}
