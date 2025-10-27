"use client";
import { PieChart } from "react-minimal-pie-chart";

export default function ReputationChart({ score, data }) {
  return (
    <div className="relative flex items-center justify-center">
      <div className="w-full max-w-[250px]">
        <PieChart
          data={data}
          lineWidth={20}
          paddingAngle={2}
          rounded
          startAngle={-90}
          background="#1e293b" // neutral-800
        />
      </div>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-sm text-neutral-400">Overall</span>
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-sm text-neutral-400">/ 1000</span>
      </div>
    </div>
  );
}