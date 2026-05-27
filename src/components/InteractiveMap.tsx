"use client";

import dynamic from "next/dynamic";

const SaudiMap = dynamic(() => import("./SaudiMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-slate-100 animate-pulse rounded-2xl" />
});

export default function InteractiveMap() {
  return <SaudiMap />;
}
