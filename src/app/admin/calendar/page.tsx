"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Clock, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Event = {
  id: string;
  title: string;
  date: string | null;
  location: string | null;
  type: string;
  status: string;
};

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // May 2026 as per mockup

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data.data || []);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setLoading(false);
    }
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const calendarDates = [];
  // Fill leading empty days
  for (let i = 0; i < firstDay; i++) {
    calendarDates.push({ date: null, currentMonth: false });
  }
  // Fill actual days
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDates.push({ date: i, currentMonth: true });
  }

  const getEventsForDate = (day: number) => {
    return events.filter(e => {
      if (!e.date) return false;
      const d = new Date(e.date);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === day;
    });
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="pb-20 max-w-7xl mx-auto">
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Event Schedule
          </h1>
          <p className="text-slate-500 font-medium">Coordinate logistics, team dispatches, and luxury event timelines.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-3 bg-white border border-slate-200 text-slate-600 font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2">
            View List
          </button>
          <button className="px-6 py-3 bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
            <Plus size={16} className="text-gold-500" />
            Add Event
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="p-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-6">
            <div className="p-3 bg-gold-500 rounded-2xl shadow-xl shadow-gold-500/20">
              <CalendarDays className="text-white" size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {monthNames[month]} {year}
              </h2>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Event Master Timeline</p>
            </div>
          </div>
          <div className="flex gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900"
            >
              <ChevronLeft size={22} />
            </button>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900"
            >
              Today
            </button>
            <button 
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="w-11 h-11 rounded-xl flex items-center justify-center hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-slate-100">
          {/* Days */}
          {days.map((day) => (
            <div key={day} className="bg-white py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] border-b border-slate-100">
              {day}
            </div>
          ))}

          {/* Dates */}
          {calendarDates.map((item, i) => {
            const dateEvents = item.date ? getEventsForDate(item.date) : [];
            const isToday = item.date && new Date().getDate() === item.date && new Date().getMonth() === month && new Date().getFullYear() === year;

            return (
              <div 
                key={i} 
                className={`min-h-[160px] bg-white p-5 transition-all duration-300 relative group border-r border-b border-slate-50 ${!item.currentMonth ? 'bg-slate-50/50' : 'hover:bg-slate-50/80'}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-sm font-black transition-all ${
                    isToday 
                      ? 'w-9 h-9 flex items-center justify-center rounded-xl bg-gold-500 text-white shadow-lg shadow-gold-500/30 ring-4 ring-gold-500/10' 
                      : !item.currentMonth ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-900'
                  }`}>
                    {item.date}
                  </span>
                  {dateEvents.length > 0 && (
                    <div className="flex gap-1">
                      {dateEvents.slice(0, 3).map((_, idx) => (
                        <div key={idx} className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2.5">
                  {dateEvents.map((event) => (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={event.id}
                      className={`p-3 rounded-2xl cursor-pointer hover:shadow-xl transition-all border shadow-sm ${
                        event.type === 'Wedding' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                        event.type === 'Corporate' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                        'bg-gold-50 border-gold-100 text-gold-700'
                      }`}
                    >
                      <p className="text-[10px] font-black truncate mb-1.5 uppercase tracking-tight">{event.title}</p>
                      <div className="flex items-center gap-2 text-[9px] font-bold opacity-60">
                        <MapPin size={10} /> {event.location || 'TBD'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

