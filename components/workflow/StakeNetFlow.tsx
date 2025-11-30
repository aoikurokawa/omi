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
  items?: string[];
}

function ProgramNode({ data }: { data: NodeData }) {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 2,
        minWidth: 220,
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
        <Typography
          variant="caption"
          display="block"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          {data.description}
        </Typography>
      )}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right" />
    </Paper>
  );
}

function DataNode({ data }: { data: NodeData }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        minWidth: 160,
        textAlign: "center",
        bgcolor: data.color || "#f5f5f5",
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
      {data.items && (
        <Box sx={{ mt: 0.5, textAlign: "left" }}>
          {data.items.map((item: string, i: number) => (
            <Typography
              key={i}
              variant="caption"
              display="block"
              color="text.secondary"
              sx={{ fontSize: 9 }}
            >
              • {item}
            </Typography>
          ))}
        </Box>
      )}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right" />
    </Paper>
  );
}

function ProcessNode({ data }: { data: NodeData }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 1,
        minWidth: 140,
        textAlign: "center",
        bgcolor: data.color || "#fff",
        border: "2px solid",
        borderColor: data.borderColor || "#666",
        borderRadius: "20px",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} id="left" />
      <Typography variant="caption" fontWeight="bold">
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
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right" />
    </Paper>
  );
}

function KeeperNode({ data }: { data: NodeData }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 1.5,
        minWidth: 120,
        textAlign: "center",
        bgcolor: "#fff8e1",
        border: "2px dashed #ff9800",
        borderRadius: "50%",
      }}
    >
      <Handle type="target" position={Position.Left} id="left" />
      <Typography variant="caption" fontWeight="bold" sx={{ color: "#e65100" }}>
        {data.label}
      </Typography>
      <Handle type="source" position={Position.Right} id="right" />
    </Paper>
  );
}

const nodeTypes = {
  program: ProgramNode,
  data: DataNode,
  process: ProcessNode,
  keeper: KeeperNode,
};

const initialNodes: Node[] = [
  // Main Programs
  {
    id: "validator-history",
    type: "program",
    position: { x: 100, y: 150 },
    data: {
      label: "Validator History",
      description: "HistoryJTGbKQD2mRgLZ3X...",
      color: "#e8f5e9",
      borderColor: "#4caf50",
    },
  },
  {
    id: "steward",
    type: "program",
    position: { x: 400, y: 150 },
    data: {
      label: "Steward Program",
      description: "Stewardf95sJbmtcZsyag...",
      color: "#e3f2fd",
      borderColor: "#1976d2",
    },
  },
  {
    id: "stake-pool",
    type: "program",
    position: { x: 700, y: 150 },
    data: {
      label: "SPL Stake Pool",
      description: "via CPI calls",
      color: "#fff3e0",
      borderColor: "#ff9800",
    },
  },
  // Validator History Data
  {
    id: "vh-data",
    type: "data",
    position: { x: 50, y: 320 },
    data: {
      label: "Validator Metrics",
      color: "#e8f5e9",
      borderColor: "#4caf50",
      items: [
        "Vote Credits",
        "Commission",
        "MEV Commission",
        "Version",
        "Client Type",
      ],
    },
  },
  {
    id: "cluster-history",
    type: "data",
    position: { x: 200, y: 320 },
    data: {
      label: "Cluster History",
      color: "#e8f5e9",
      borderColor: "#4caf50",
      items: ["3 years of data", "All validators"],
    },
  },
  // Steward Data
  {
    id: "steward-config",
    type: "data",
    position: { x: 350, y: 320 },
    data: {
      label: "Steward Config",
      color: "#e3f2fd",
      borderColor: "#1976d2",
      items: ["Scoring params", "Unstake caps", "Thresholds"],
    },
  },
  {
    id: "steward-state",
    type: "data",
    position: { x: 500, y: 320 },
    data: {
      label: "Steward State",
      color: "#e3f2fd",
      borderColor: "#1976d2",
      items: ["Validator scores", "Delegations", "State machine"],
    },
  },
  // Processes
  {
    id: "compute-score",
    type: "process",
    position: { x: 250, y: 480 },
    data: {
      label: "Compute Score",
      description: "Every 10 epochs",
      color: "#f3e5f5",
      borderColor: "#9c27b0",
    },
  },
  {
    id: "compute-delegations",
    type: "process",
    position: { x: 420, y: 480 },
    data: {
      label: "Compute Delegations",
      description: "Target distribution",
      color: "#f3e5f5",
      borderColor: "#9c27b0",
    },
  },
  {
    id: "instant-unstake",
    type: "process",
    position: { x: 590, y: 480 },
    data: {
      label: "Instant Unstake",
      description: "Emergency removal",
      color: "#ffebee",
      borderColor: "#f44336",
    },
  },
  // Keepers
  {
    id: "keeper-1",
    type: "keeper",
    position: { x: 50, y: 580 },
    data: { label: "Keeper 1" },
  },
  {
    id: "keeper-2",
    type: "keeper",
    position: { x: 50, y: 650 },
    data: { label: "Keeper 2" },
  },
  {
    id: "keeper-n",
    type: "keeper",
    position: { x: 50, y: 720 },
    data: { label: "Keeper N" },
  },
  // Validators
  {
    id: "validators",
    type: "data",
    position: { x: 700, y: 400 },
    data: {
      label: "Validator Stakes",
      color: "#fff3e0",
      borderColor: "#ff9800",
      items: ["Increase stake", "Decrease stake", "Auto-add validators"],
    },
  },
  // JitoSOL
  {
    id: "jitosol",
    type: "program",
    position: { x: 700, y: 550 },
    data: {
      label: "JitoSOL",
      description: "Liquid staking token",
      color: "#fce4ec",
      borderColor: "#e91e63",
    },
  },
  // Scoring criteria box
  {
    id: "scoring",
    type: "data",
    position: { x: 250, y: 600 },
    data: {
      label: "Scoring Criteria",
      color: "#f3e5f5",
      borderColor: "#9c27b0",
      items: [
        "MEV commission",
        "Block production",
        "Vote credits",
        "Commission rate",
        "Superminority",
      ],
    },
  },
];

const initialEdges: Edge[] = [
  // Validator History to Steward
  {
    id: "e-vh-steward",
    source: "validator-history",
    target: "steward",
    sourceHandle: "right",
    targetHandle: "left",
    animated: true,
    style: { stroke: "#4caf50" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#4caf50" },
    label: "metrics",
  },
  // Steward to Stake Pool
  {
    id: "e-steward-pool",
    source: "steward",
    target: "stake-pool",
    sourceHandle: "right",
    targetHandle: "left",
    animated: true,
    style: { stroke: "#1976d2" },
    markerEnd: { type: MarkerType.ArrowClosed, color: "#1976d2" },
    label: "CPI",
  },
  // Data connections
  {
    id: "e-vh-data",
    source: "validator-history",
    target: "vh-data",
    style: { stroke: "#4caf50" },
  },
  {
    id: "e-vh-cluster",
    source: "validator-history",
    target: "cluster-history",
    style: { stroke: "#4caf50" },
  },
  {
    id: "e-steward-config",
    source: "steward",
    target: "steward-config",
    style: { stroke: "#1976d2" },
  },
  {
    id: "e-steward-state",
    source: "steward",
    target: "steward-state",
    style: { stroke: "#1976d2" },
  },
  // Process connections
  {
    id: "e-data-score",
    source: "vh-data",
    target: "compute-score",
    style: { stroke: "#9c27b0" },
  },
  {
    id: "e-cluster-score",
    source: "cluster-history",
    target: "compute-score",
    style: { stroke: "#9c27b0" },
  },
  {
    id: "e-config-score",
    source: "steward-config",
    target: "compute-score",
    style: { stroke: "#9c27b0" },
  },
  {
    id: "e-score-delegations",
    source: "compute-score",
    target: "compute-delegations",
    animated: true,
    style: { stroke: "#9c27b0" },
  },
  {
    id: "e-state-delegations",
    source: "steward-state",
    target: "compute-delegations",
    style: { stroke: "#9c27b0" },
  },
  {
    id: "e-delegations-unstake",
    source: "compute-delegations",
    target: "instant-unstake",
    style: { stroke: "#9c27b0" },
  },
  // Keeper connections
  {
    id: "e-keeper1-score",
    source: "keeper-1",
    target: "compute-score",
    sourceHandle: "right",
    targetHandle: "left",
    style: { stroke: "#ff9800", strokeDasharray: "5,5" },
  },
  {
    id: "e-keeper2-deleg",
    source: "keeper-2",
    target: "compute-delegations",
    sourceHandle: "right",
    targetHandle: "left",
    style: { stroke: "#ff9800", strokeDasharray: "5,5" },
  },
  {
    id: "e-keepern-unstake",
    source: "keeper-n",
    target: "instant-unstake",
    sourceHandle: "right",
    targetHandle: "left",
    style: { stroke: "#ff9800", strokeDasharray: "5,5" },
  },
  // Pool connections
  {
    id: "e-pool-validators",
    source: "stake-pool",
    target: "validators",
    style: { stroke: "#ff9800" },
  },
  {
    id: "e-unstake-validators",
    source: "instant-unstake",
    target: "validators",
    targetHandle: "left",
    style: { stroke: "#f44336" },
  },
  {
    id: "e-pool-jitosol",
    source: "stake-pool",
    target: "jitosol",
    style: { stroke: "#e91e63" },
  },
  // Scoring criteria
  {
    id: "e-score-criteria",
    source: "compute-score",
    target: "scoring",
    style: { stroke: "#9c27b0", strokeDasharray: "3,3" },
  },
];

export default function StakeNetFlow() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" gutterBottom>
          Jito StakeNet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Validator History:{" "}
          <code>HistoryJTGbKQD2mRgLZ3XhqHnN811Qpez8X9kCcGHoa</code>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Steward: <code>Stewardf95sJbmtcZsyagb2dg4Mo8eVQho8gpECvLx8</code>
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
              bgcolor: "#e8f5e9",
              border: "2px solid #4caf50",
            }}
          />
          <Typography variant="caption">Validator History</Typography>
        </Paper>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#e3f2fd",
              border: "2px solid #1976d2",
            }}
          />
          <Typography variant="caption">Steward</Typography>
        </Paper>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#fff3e0",
              border: "2px solid #ff9800",
            }}
          />
          <Typography variant="caption">Stake Pool</Typography>
        </Paper>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#f3e5f5",
              border: "2px solid #9c27b0",
              borderRadius: "10px",
            }}
          />
          <Typography variant="caption">Process</Typography>
        </Paper>
        <Paper sx={{ p: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#fff8e1",
              border: "2px dashed #ff9800",
              borderRadius: "50%",
            }}
          />
          <Typography variant="caption">Keeper</Typography>
        </Paper>
      </Box>
    </Box>
  );
}
