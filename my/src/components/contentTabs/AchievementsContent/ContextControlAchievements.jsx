import React, { createContext, useState, useEffect } from "react";
import { achievementsData } from "./achievementsData";

export const AchievementsContext = createContext();

export const AchievementsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    stars: 0,
    wpm: 0,
    websiteReleased: false,
    plugins: 0,
  });

  const [achievements, setAchievements] = useState(achievementsData);

  useEffect(() => {
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.condition(stats) && a.status !== "achieved") {
          return { ...a, status: "achieved", date: new Date().toLocaleDateString() };
        }
        return a;
      })
    );
  }, [stats]);

  return (
    <AchievementsContext.Provider value={{ achievements, stats, setStats }}>
      {children}
    </AchievementsContext.Provider>
  );
};
