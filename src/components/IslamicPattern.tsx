"use client";

import React from 'react';
import { useLocale } from 'next-intl';

interface IslamicPatternProps {
  className?: string;
  opacity?: number;
}

export default function IslamicPattern({ className = "", opacity = 0.03 }: IslamicPatternProps) {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  return (
    <div 
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}
      style={{ opacity }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: isRtl ? 'scaleX(-1)' : 'none' }}
      >
        <defs>
          <pattern
            id="islamic-geometric-pattern"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* Minimalist 8-Point Star Geometric Pattern */}
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <path d="M60 0 L60 120 M0 60 L120 60" opacity="0.3" />
              <path d="M17.57 17.57 L102.43 102.43 M17.57 102.43 L102.43 17.57" opacity="0.3" />
              <polygon points="60,20 80,40 100,60 80,80 60,100 40,80 20,60 40,40" />
              <polygon points="60,30 70,50 90,60 70,70 60,90 50,70 30,60 50,50" />
              <circle cx="60" cy="60" r="15" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-geometric-pattern)" className="text-[var(--gold)]" />
      </svg>
    </div>
  );
}
