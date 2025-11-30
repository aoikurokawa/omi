"use client";

import { useState } from "react";
import StakeProgramFlow from "@/components/workflow/StakeProgramFlow";
import StakePoolFlow from "@/components/workflow/StakePoolFlow";
import StakeNetFlow from "@/components/workflow/StakeNetFlow";

const tabs = [
  { id: 0, label: "Stake Program" },
  { id: 1, label: "SPL Stake Pool" },
  { id: 2, label: "Jito StakeNet" },
];

export default function WorkflowPage() {
  const [tabValue, setTabValue] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 mt-20">
      <h1 className="text-3xl font-bold text-center mb-2">
        Solana Staking Workflows
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Interactive visualization of Stake Program, Stake Pool, and StakeNet
        workflows
      </p>

      <div className="border-b border-gray-200 mb-6">
        <div className="flex justify-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabValue(tab.id)}
              className={`pb-4 px-2 text-sm font-medium transition-colors ${
                tabValue === tab.id
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-4">
        {tabValue === 0 && <StakeProgramFlow />}
        {tabValue === 1 && <StakePoolFlow />}
        {tabValue === 2 && <StakeNetFlow />}
      </div>
    </div>
  );
}
