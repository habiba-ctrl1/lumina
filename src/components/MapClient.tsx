"use client";

import dynamic from "next/dynamic";

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), { 
  ssr: false,
  loading: () => <div className="w-full h-[600px] bg-black animate-pulse rounded-[3rem]" />
});

export default function MapClient() {
  return <InteractiveMap />;
}
