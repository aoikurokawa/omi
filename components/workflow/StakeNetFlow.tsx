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

interface NodeData {
  label: string;
  description?: string;
  color?: string;
  borderColor?: string;
  items?: string[];
}

function ProgramNode({ data }: { data: NodeData }) {
  return (
    <div
      className="p-4 min-w-[220px] text-center rounded-lg shadow-lg"
      style={{
        backgroundColor: data.color || "#fff",
        border: `3px solid ${data.borderColor || "#1976d2"}`,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} id="left" />
      <p className="font-semibold">{data.label}</p>
      {data.description && (
        <p className="text-xs text-gray-500 mt-1">{data.description}</p>
      )}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}

function DataNode({ data }: { data: NodeData }) {
  return (
    <div
      className="p-3 min-w-40 text-center rounded"
      style={{
        backgroundColor: data.color || "#f5f5f5",
        border: `2px solid ${data.borderColor || "#666"}`,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} id="left" />
      <p className="font-semibold text-xs">{data.label}</p>
      {data.items && (
        <div className="mt-1 text-left">
          {data.items.map((item, i) => (
            <p key={i} className="text-[9px] text-gray-500">
              • {item}
            </p>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}

function ProcessNode({ data }: { data: NodeData }) {
  return (
    <div
      className="p-2 min-w-[140px] text-center rounded-full"
      style={{
        backgroundColor: data.color || "#fff",
        border: `2px solid ${data.borderColor || "#666"}`,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} id="left" />
      <p className="font-semibold text-xs">{data.label}</p>
      {data.description && (
        <p className="text-[10px] text-gray-500">{data.description}</p>
      )}
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}

function KeeperNode({ data }: { data: NodeData }) {
  return (
    <div className="p-3 min-w-[120px] text-center rounded-full bg-yellow-50 border-2 border-dashed border-orange-400">
      <Handle type="target" position={Position.Left} id="left" />
      <p className="font-semibold text-xs text-orange-700">{data.label}</p>
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}

const nodeTypes = {
  program: ProgramNode,
  data: DataNode,
  process: ProcessNode,
  keeper: KeeperNode,
};

const initialNodes: Node[] = [
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
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Jito StakeNet</h2>
        <p className="text-sm text-gray-400 mb-1">
          Validator History:{" "}
          <code className="bg-gray-800 px-1 rounded">
            HistoryJTGbKQD2mRgLZ3XhqHnN811Qpez8X9kCcGHoa
          </code>
        </p>
        <p className="text-sm text-gray-400">
          Steward:{" "}
          <code className="bg-gray-800 px-1 rounded">
            Stewardf95sJbmtcZsyagb2dg4Mo8eVQho8gpECvLx8
          </code>
        </p>
      </div>
      <div className="h-[60vh] border border-gray-700 rounded-lg bg-[#1a1a1a]">
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
          <Background color="#333" gap={16} />
        </ReactFlow>
      </div>
      <div className="mt-4 flex gap-3 flex-wrap">
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-green-900/50 border-2 border-green-500" />
          <span className="text-xs text-gray-300">Validator History</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-blue-900/50 border-2 border-blue-500" />
          <span className="text-xs text-gray-300">Steward</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-orange-900/50 border-2 border-orange-500" />
          <span className="text-xs text-gray-300">Stake Pool</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-purple-900/50 border-2 border-purple-500 rounded-full" />
          <span className="text-xs text-gray-300">Process</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-yellow-900/50 border-2 border-dashed border-orange-400 rounded-full" />
          <span className="text-xs text-gray-300">Keeper</span>
        </div>
      </div>
    </div>
  );
}
