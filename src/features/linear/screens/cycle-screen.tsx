"use client";

import React, { useState } from "react";
import Image from "next/image";
import { CycleData, LinearUser } from "../types";
import { MOCK_CYCLE_42, MOCK_USERS } from "../mock-data";
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CycleScreenProps {
  cycleData?: CycleData;
  onBack: () => void;
}

export const CycleScreen: React.FC<CycleScreenProps> = ({
  cycleData = MOCK_CYCLE_42,
  onBack,
}) => {
  const [selectedPointIndex, setSelectedPointIndex] = useState<number | null>(
    cycleData.burndown.length - 1
  );

  const completionPct = Math.round(
    (cycleData.completedPoints / cycleData.totalPoints) * 100
  );

  // SVG Chart dimensions
  const chartWidth = 320;
  const chartHeight = 150;
  const paddingX = 20;
  const paddingY = 20;
  const usableWidth = chartWidth - paddingX * 2;
  const usableHeight = chartHeight - paddingY * 2;

  const maxVal = cycleData.totalPoints;
  const pointsCount = cycleData.burndown.length;

  // Compute SVG coordinates for remaining and ideal
  const remainingCoords = cycleData.burndown.map((pt, idx) => {
    const x = paddingX + (idx / (pointsCount - 1)) * usableWidth;
    const y = paddingY + usableHeight - (pt.remaining / maxVal) * usableHeight;
    return { x, y, ...pt };
  });

  const idealCoords = cycleData.burndown.map((pt, idx) => {
    const x = paddingX + (idx / (pointsCount - 1)) * usableWidth;
    const y = paddingY + usableHeight - (pt.ideal / maxVal) * usableHeight;
    return { x, y };
  });

  const remainingPathD = remainingCoords.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  const idealPathD = idealCoords.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, "");

  const areaFillD = `${remainingPathD} L ${
    remainingCoords[remainingCoords.length - 1].x
  } ${chartHeight - paddingY} L ${paddingX} ${chartHeight - paddingY} Z`;

  const activePoint =
    selectedPointIndex !== null ? cycleData.burndown[selectedPointIndex] : null;

  return (
    <div className="flex flex-col h-full bg-linear-bg text-linear-text select-none overflow-hidden">
      {/* Top Header */}
      <div className="px-4 py-3 border-b border-linear-border bg-linear-bg/95 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 rounded-lg text-linear-muted hover:text-linear-text transition-colors"
            aria-label="Back to My Issues Inbox"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-linear-text">
                {cycleData.name}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-linear-indigo/20 text-linear-indigo border border-linear-indigo/30 font-semibold">
                Active
              </span>
            </div>
            <p className="text-[11px] text-linear-muted font-mono">
              {cycleData.startDate} – {cycleData.endDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-linear-surface border border-linear-border text-xs text-linear-muted font-mono">
          <Clock className="w-3.5 h-3.5 text-linear-indigo" />
          <span>{cycleData.daysRemaining} days left</span>
        </div>
      </div>

      {/* Main Scroll Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 pb-20">
        {/* Velocity Overview Card */}
        <div className="p-4 rounded-2xl bg-linear-surface border border-linear-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-linear-muted uppercase tracking-wider">
              Cycle Burndown & Velocity
            </span>
            <div className="flex items-center gap-1 text-xs font-mono text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{cycleData.velocityScore}% Velocity</span>
            </div>
          </div>

          {/* SVG Burndown Chart */}
          <div className="w-full flex justify-center py-2 relative">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full max-w-sm h-auto overflow-visible"
            >
              <defs>
                <linearGradient id="burndownGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line
                x1={paddingX}
                y1={paddingY}
                x2={chartWidth - paddingX}
                y2={paddingY}
                stroke="#242632"
                strokeDasharray="3 3"
              />
              <line
                x1={paddingX}
                y1={paddingY + usableHeight / 2}
                x2={chartWidth - paddingX}
                y2={paddingY + usableHeight / 2}
                stroke="#242632"
                strokeDasharray="3 3"
              />
              <line
                x1={paddingX}
                y1={chartHeight - paddingY}
                x2={chartWidth - paddingX}
                y2={chartHeight - paddingY}
                stroke="#242632"
              />

              {/* Ideal Burndown Dotted Line */}
              <path
                d={idealPathD}
                fill="none"
                stroke="#4B4E58"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Remaining Points Area Gradient */}
              <path d={areaFillD} fill="url(#burndownGrad)" />

              {/* Remaining Points Line */}
              <path
                d={remainingPathD}
                fill="none"
                stroke="#5E6AD2"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Points */}
              {remainingCoords.map((pt, idx) => (
                <circle
                  key={idx}
                  cx={pt.x}
                  cy={pt.y}
                  r={selectedPointIndex === idx ? 5 : 3}
                  className={cn(
                    "cursor-pointer transition-all",
                    selectedPointIndex === idx
                      ? "fill-white stroke-linear-indigo stroke-[3px]"
                      : "fill-linear-indigo hover:fill-white"
                  )}
                  onClick={() => setSelectedPointIndex(idx)}
                />
              ))}
            </svg>
          </div>

          {/* Scrubbed Day Info */}
          {activePoint && (
            <div className="p-2.5 rounded-xl bg-linear-bg border border-linear-border flex items-center justify-between text-xs font-mono">
              <span className="text-linear-muted">{activePoint.day}:</span>
              <div className="flex items-center gap-3">
                <span className="text-linear-indigo font-bold">
                  {activePoint.remaining} pts remaining
                </span>
                <span className="text-emerald-400">
                  +{activePoint.completed} completed
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center gap-6 text-[10px] text-linear-muted font-mono pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-linear-indigo inline-block rounded" />
              Actual Remaining
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 bg-[#4B4E58] border-t border-dashed border-[#8A8F98] inline-block" />
              Ideal Guideline
            </span>
          </div>
        </div>

        {/* Scope Distribution Bar & Breakdown */}
        <div className="p-4 rounded-2xl bg-linear-surface border border-linear-border space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-linear-text">
              Scope Completion: {completionPct}%
            </span>
            <span className="font-mono text-linear-muted">
              {cycleData.completedPoints} / {cycleData.totalPoints} pts
            </span>
          </div>

          {/* Segmented Progress Bar */}
          <div className="h-2 w-full rounded-full bg-linear-bg overflow-hidden flex">
            <div
              style={{
                width: `${(cycleData.completedPoints / cycleData.totalPoints) * 100}%`,
              }}
              className="bg-linear-indigo h-full"
            />
            <div
              style={{
                width: `${(cycleData.inProgressPoints / cycleData.totalPoints) * 100}%`,
              }}
              className="bg-[#F2C94C] h-full"
            />
            <div
              style={{
                width: `${(cycleData.todoPoints / cycleData.totalPoints) * 100}%`,
              }}
              className="bg-[#4B4E58] h-full"
            />
          </div>

          {/* Distribution legend */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-xs">
            <div className="p-2.5 rounded-xl bg-linear-bg border border-linear-border text-center">
              <span className="text-[10px] text-linear-muted block uppercase">
                Completed
              </span>
              <span className="font-mono font-bold text-linear-indigo text-sm">
                {cycleData.completedPoints} pts
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-linear-bg border border-linear-border text-center">
              <span className="text-[10px] text-linear-muted block uppercase">
                In Progress
              </span>
              <span className="font-mono font-bold text-[#F2C94C] text-sm">
                {cycleData.inProgressPoints} pts
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-linear-bg border border-linear-border text-center">
              <span className="text-[10px] text-linear-muted block uppercase">
                Todo
              </span>
              <span className="font-mono font-bold text-linear-muted text-sm">
                {cycleData.todoPoints} pts
              </span>
            </div>
          </div>
        </div>

        {/* Team Members Velocity */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-linear-muted uppercase tracking-wider flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-linear-indigo" />
            Team Member Velocity
          </h3>

          <div className="space-y-2">
            {[
              { user: MOCK_USERS.elena, points: 14, issuesCount: 4 },
              { user: MOCK_USERS.alex, points: 11, issuesCount: 3 },
              { user: MOCK_USERS.marcus, points: 7, issuesCount: 2 },
            ].map((member) => (
              <div
                key={member.user.id}
                className="p-3 rounded-xl bg-linear-surface border border-linear-border flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src={member.user.avatarUrl}
                      alt={member.user.name}
                      fill
                      sizes="24px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-semibold text-linear-text block">
                      {member.user.name}
                    </span>
                    <span className="text-[10px] text-linear-muted font-mono">
                      {member.issuesCount} assigned issues
                    </span>
                  </div>
                </div>

                <span className="font-mono text-linear-indigo font-bold">
                  {member.points} pts resolved
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
