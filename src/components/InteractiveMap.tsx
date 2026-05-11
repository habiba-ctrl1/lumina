"use client";

import dynamic from "next/dynamic";

const SaudiMap = dynamic(() => import("./SaudiMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-[#03030a] animate-pulse rounded-[3rem]" />
});

export default function InteractiveMap() {
  return <SaudiMap />;
}
