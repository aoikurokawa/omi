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
  textColor?: string;
}

function StepNode({ data }: { data: NodeData }) {
  return (
    <div
      className="p-4 min-w-[180px] text-center rounded-lg shadow-md"
      style={{
        backgroundColor: data.color || "#fff",
        border: `2px solid ${data.borderColor || "#1976d2"}`,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <p
        className="font-semibold text-sm"
        style={{ color: data.textColor || "inherit" }}
      >
        {data.label}
      </p>
      {data.description && (
        <p className="text-xs text-gray-500 mt-1">{data.description}</p>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function AuthorityNode({ data }: { data: NodeData }) {
  return (
    <div className="p-3 min-w-[150px] text-center rounded-lg bg-orange-50 border-2 border-dashed border-orange-400">
      <Handle type="target" position={Position.Left} />
      <p className="font-semibold text-xs text-orange-700">{data.label}</p>
      {data.description && (
        <p className="text-[10px] text-gray-500 mt-1">{data.description}</p>
      )}
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const nodeTypes = {
  step: StepNode,
  authority: AuthorityNode,
};

const initialNodes: Node[] = [
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
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Native Stake Program</h2>
        <p className="text-sm text-gray-400">
          Program ID:{" "}
          <code className="bg-gray-800 px-1 rounded">
            Stake11111111111111111111111111111111111111
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
          <div className="w-4 h-4 bg-blue-900/50 border-2 border-blue-500" />
          <span className="text-xs text-gray-300">Setup</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-green-900/50 border-2 border-green-500" />
          <span className="text-xs text-gray-300">Active</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-yellow-900/50 border-2 border-yellow-500" />
          <span className="text-xs text-gray-300">Waiting</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-orange-900/50 border-2 border-dashed border-orange-400" />
          <span className="text-xs text-gray-300">Authority</span>
        </div>
      </div>
    </div>
  );
}
