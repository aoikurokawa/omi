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
}

function PoolNode({ data }: { data: NodeData }) {
  return (
    <div
      className="p-4 min-w-[200px] text-center rounded-lg shadow-lg"
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

function ValidatorNode({ data }: { data: NodeData }) {
  return (
    <div className="p-3 min-w-[120px] text-center rounded bg-green-50 border-2 border-green-500">
      <Handle type="target" position={Position.Top} />
      <p className="font-semibold text-xs text-green-700">{data.label}</p>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function UserNode({ data }: { data: NodeData }) {
  return (
    <div className="p-3 min-w-[140px] text-center rounded-full bg-blue-50 border-2 border-blue-500">
      <Handle type="target" position={Position.Bottom} />
      <p className="font-semibold text-xs text-blue-700">{data.label}</p>
      <Handle type="source" position={Position.Top} />
    </div>
  );
}

function ActionNode({ data }: { data: NodeData }) {
  return (
    <div
      className="p-2 min-w-[100px] text-center rounded"
      style={{
        backgroundColor: data.color || "#fff",
        border: `2px solid ${data.borderColor || "#666"}`,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <Handle type="target" position={Position.Left} id="left" />
      <p className="font-semibold text-xs">{data.label}</p>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  );
}

const nodeTypes = {
  pool: PoolNode,
  validator: ValidatorNode,
  user: UserNode,
  action: ActionNode,
};

const initialNodes: Node[] = [
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
  {
    id: "user",
    type: "user",
    position: { x: 380, y: 20 },
    data: { label: "User (SOL)" },
  },
  {
    id: "manager",
    type: "action",
    position: { x: 700, y: 100 },
    data: { label: "Manager", color: "#fff8e1", borderColor: "#ffc107" },
  },
  {
    id: "staker",
    type: "action",
    position: { x: 700, y: 400 },
    data: { label: "Staker", color: "#fff8e1", borderColor: "#ffc107" },
  },
  {
    id: "deposit-sol",
    type: "action",
    position: { x: 200, y: 120 },
    data: { label: "Deposit SOL", color: "#e8f5e9", borderColor: "#4caf50" },
  },
  {
    id: "withdraw-sol",
    type: "action",
    position: { x: 500, y: 120 },
    data: { label: "Withdraw SOL", color: "#ffebee", borderColor: "#f44336" },
  },
  {
    id: "transient-1",
    type: "action",
    position: { x: 100, y: 600 },
    data: { label: "Transient", color: "#e0e0e0", borderColor: "#9e9e9e" },
  },
  {
    id: "transient-2",
    type: "action",
    position: { x: 250, y: 600 },
    data: { label: "Transient", color: "#e0e0e0", borderColor: "#9e9e9e" },
  },
  {
    id: "transient-3",
    type: "action",
    position: { x: 400, y: 600 },
    data: { label: "Transient", color: "#e0e0e0", borderColor: "#9e9e9e" },
  },
  {
    id: "transient-n",
    type: "action",
    position: { x: 550, y: 600 },
    data: { label: "Transient", color: "#e0e0e0", borderColor: "#9e9e9e" },
  },
];

const initialEdges: Edge[] = [
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
  {
    id: "e-pool-reserve",
    source: "stake-pool",
    target: "reserve",
    animated: true,
    style: { stroke: "#ff9800" },
  },
  {
    id: "e-pool-list",
    source: "stake-pool",
    target: "validator-list",
    targetHandle: "right",
    style: { stroke: "#009688" },
  },
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
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">SPL Stake Pool Program</h2>
        <p className="text-sm text-gray-400">
          Program ID:{" "}
          <code className="bg-gray-800 px-1 rounded">
            SPoo1Ku8WFXoNDMHPsrGSTSG1Y47rzgn41SLUNakuHy
          </code>
        </p>
      </div>
      <div className="h-[700px] border border-gray-700 rounded-lg bg-[#1a1a1a]">
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
          <div className="w-4 h-4 bg-orange-900/50 border-2 border-orange-500" />
          <span className="text-xs text-gray-300">Pool Account</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-green-900/50 border-2 border-green-500" />
          <span className="text-xs text-gray-300">Validator Stake</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-purple-900/50 border-2 border-purple-500" />
          <span className="text-xs text-gray-300">Pool Token</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-gray-700 border-2 border-gray-500" />
          <span className="text-xs text-gray-300">Transient</span>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-[#1a1a1a] rounded border border-gray-700">
          <div className="w-4 h-4 bg-yellow-900/50 border-2 border-yellow-500" />
          <span className="text-xs text-gray-300">Admin</span>
        </div>
      </div>
    </div>
  );
}
