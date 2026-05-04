"use client";

import { motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

export default function CalendarPage() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 35 }, (_, i) => i + 1 - 3); // Mock calendar

  return (
    <div className="pb-10">
      <div className="mb-10">
        <h1 className="text-3xl font-light text-white mb-2">
          Event <span className="text-gold-500 font-semibold italic">Calendar</span> & Dispatch
        </h1>
        <p className="text-gray-500 text-sm">Manage all your upcoming luxury events, bookings, and team dispatches.</p>
      </div>

      <div className="bg-charcoal-800 border border-white/5 rounded-2xl p-6 shadow-2xl">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium text-white flex items-center gap-2">
            <CalendarDays className="text-gold-500" size={24} />
            May 2026
          </h2>
          <div className="flex gap-2">
            <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
              <ChevronLeft size={20} className="text-gray-400" />
            </button>
            <button className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
          {/* Days */}
          {days.map((day) => (
            <div key={day} className="bg-charcoal-900 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-widest">
              {day}
            </div>
          ))}

          {/* Dates */}
          {dates.map((date, i) => (
            <div 
              key={i} 
              className={`min-h-[120px] bg-charcoal-800 p-2 border-t border-white/5 ${date <= 0 || date > 31 ? 'opacity-30' : 'hover:bg-white/[0.02]'} transition-colors relative group`}
            >
              <span className={`text-sm ${date === 15 ? 'bg-gold-500 w-6 h-6 flex items-center justify-center rounded-full text-charcoal-900 font-bold' : 'text-gray-400'}`}>
                {date > 0 && date <= 31 ? date : date <= 0 ? 30 + date : date - 31}
              </span>

              {/* Mock Event */}
              {date === 12 && (
                <div className="mt-2 bg-blue-500/20 border border-blue-500/30 rounded p-1.5 cursor-pointer hover:bg-blue-500/30">
                  <p className="text-[10px] text-blue-400 font-bold truncate">Corporate Gala</p>
                  <p className="text-[9px] text-blue-500/80">Riyadh, SA</p>
                </div>
              )}
              {date === 18 && (
                <div className="mt-2 bg-emerald-500/20 border border-emerald-500/30 rounded p-1.5 cursor-pointer hover:bg-emerald-500/30">
                  <p className="text-[10px] text-emerald-400 font-bold truncate">Luxury Wedding</p>
                  <p className="text-[9px] text-emerald-500/80">Jeddah, SA</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
