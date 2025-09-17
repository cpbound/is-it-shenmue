import React from "react";

export default function ShenmueMeter({ score }) {
  let color = "bg-red-500";
  if (score >= 80) color = "bg-green-500";
  else if (score >= 50) color = "bg-yellow-400";

  return (
    <div className="mt-4">
      <div className="w-full bg-gray-300 rounded-full h-6 overflow-hidden">
        <div
          className={`${color} h-6 rounded-full transition-all duration-700`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <div className="mt-2 flex justify-between text-sm font-medium">
        <span>Shenmueness</span>
        <span>{score}%</span>
      </div>
    </div>
  );
}
