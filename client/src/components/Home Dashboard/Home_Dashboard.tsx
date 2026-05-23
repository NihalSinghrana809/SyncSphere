import Distance_Card from "./Distance_Card";
import Weekly_Goal_Progress from "./Weekly_Goal_Progress";
import Intensity_Zones from "./Intensity_Zones";
import "./Home_Dashboard.css";

import { useState } from "react";

type Zone = {
      label: string;
      value: number;
      color: string;
};

type DashboardStats = {
      distance: number;
      change: number;
      goal: number;
      current: number;
      zones: Zone[];
};

const WeeklyPerformance = () => {
      const [stats] = useState<DashboardStats>({
            distance: 42.8,
            change: 5.2,
            goal: 50,
            current: 42,
            zones: [
                  { label: "Z5", value: 12, color: "#f472b6" },
                  { label: "Z4", value: 45, color: "#a855f7" },
                  { label: "Z3", value: 30, color: "#60a5fa" },
                  { label: "Z2", value: 8, color: "#38bdf8" },
                  { label: "Z1", value: 5, color: "#94a3b8" },
            ],
      });

      return (
            <div className="min-h-screen bg-[#0B0E1A] text-white p-8 flex flex-col gap-6">
                  <Distance_Card distance={stats.distance} change={stats.change} />
                  <Weekly_Goal_Progress current={stats.current} goal={stats.goal} />
                  <Intensity_Zones zones={stats.zones} />
            </div>
      );
};

export default WeeklyPerformance;
