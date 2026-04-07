"use client";

import { useEffect } from "react";
import { LandingPage } from "@/components/LandingPage";

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => {
      const saved = localStorage.getItem("ffapi-theme");
      if (saved === "light") document.documentElement.classList.remove("dark");
    };
  }, []);

  return <LandingPage />;
}
