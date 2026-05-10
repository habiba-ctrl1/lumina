"use client";

import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Clock } from "lucide-react";

export default function CalendarPage() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dates = Array.from({ length: 35 }, (_, i) => i + 1 - 3); // Mock calendar

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Event Schedule
          </h1>
          <p className="text-slate-500 font-medium">Coordinate logistics, team dispatches, and luxury event timelines.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            View List
          </button>
          <button className="px-5 py-2.5 bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-slate-800 transition-all shadow-lg">
            Today
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-3">
            <div className="p-2 bg-gold-500 rounded-lg shadow-lg shadow-gold-500/20">
              <CalendarDays className="text-white" size={20} />
            </div>
            May 2026
          </h2>
          <div className="flex gap-3">
            <button className="w-10 h-10 border border-slate-200 bg-white rounded-xl flex items-center justify-center hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900 shadow-sm">
              <ChevronLeft size={20} />
            </button>
            <button className="w-10 h-10 border border-slate-200 bg-white rounded-xl flex items-center justify-center hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900 shadow-sm">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-slate-100">
          {/* Days */}
          {days.map((day) => (
            <div key={day} className="bg-white py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
              {day}
            </div>
          ))}

          {/* Dates */}
          {dates.map((date, i) => (
            <div 
              key={i} 
              className={`min-h-[140px] bg-white p-4 transition-all duration-300 relative group border-r border-b border-slate-50 ${date <= 0 || date > 31 ? 'bg-slate-50/50' : 'hover:bg-slate-50/80'}`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-sm font-black transition-all ${
                  date === 15 
                    ? 'w-8 h-8 flex items-center justify-center rounded-xl bg-gold-500 text-white shadow-lg shadow-gold-500/30 ring-4 ring-gold-500/10' 
                    : date <= 0 || date > 31 ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-900'
                }`}>
                  {date > 0 && date <= 31 ? date : date <= 0 ? 30 + date : date - 31}
                </span>
                {date === 15 && <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />}
              </div>

              {/* Mock Event Cards */}
              <div className="space-y-2">
                {date === 12 && (
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-2.5 cursor-pointer hover:shadow-md transition-all group/event">
                    <p className="text-[10px] text-blue-700 font-extrabold truncate mb-1">Corporate Gala</p>
                    <div className="flex items-center gap-1 text-[9px] text-blue-400 font-bold">
                      <MapPin size={8} /> Riyadh
                    </div>
                  </div>
                )}
                {date === 18 && (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 cursor-pointer hover:shadow-md transition-all group/event">
                    <p className="text-[10px] text-emerald-700 font-extrabold truncate mb-1">Luxury Wedding</p>
                    <div className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold">
                      <MapPin size={8} /> Jeddah
                    </div>
                  </div>
                )}
                {date === 15 && (
                  <div className="bg-gold-50 border border-gold-100 rounded-xl p-2.5 cursor-pointer hover:shadow-md transition-all group/event">
                    <p className="text-[10px] text-gold-700 font-extrabold truncate mb-1">Elite VIP Event</p>
                    <div className="flex items-center gap-1 text-[9px] text-gold-400 font-bold">
                      <Clock size={8} /> 20:00
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

