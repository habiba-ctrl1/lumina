"use client";

import { useEffect, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, MapPin, Clock, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">
            Event Schedule
          </h1>
          <p className="text-sm text-slate-500">Coordinate logistics, team dispatches, and luxury event timelines.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/events" className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-50 transition-all shadow-sm">
            View List
          </Link>
          <Link href="/admin/events" className="px-4 py-2 bg-slate-900 text-white font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm flex items-center gap-1.5">
            <Plus size={15} />
            Add Event
          </Link>
        </div>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        {/* Calendar Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-teal-500 rounded-xl text-white shadow-md">
              <CalendarDays size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800 tracking-tight">
                {monthNames[month]} {year}
              </h2>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Event Master Timeline</p>
            </div>
          </div>
          <div className="flex gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
            <button 
              onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-50 transition-all text-slate-500"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900"
            >
              Today
            </button>
            <button 
              onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
              className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-50 transition-all text-slate-500"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-px bg-slate-200">
          {/* Days */}
          {days.map((day: any) => (
            <div key={day} className="bg-slate-50 py-3 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-150">
              {day}
            </div>
          ))}

          {/* Dates */}
          {calendarDates.map((item: any, i: number) => {
            const dateEvents = item.date ? getEventsForDate(item.date) : [];
            const isToday = item.date && new Date().getDate() === item.date && new Date().getMonth() === month && new Date().getFullYear() === year;

            return (
              <div 
                key={i} 
                className={`min-h-[110px] bg-white p-2.5 transition-all duration-200 relative group border-r border-b border-slate-100 ${!item.currentMonth ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-xs font-bold transition-all ${
                    isToday 
                      ? 'w-6 h-6 flex items-center justify-center rounded-lg bg-teal-500 text-white shadow-md shadow-teal-500/20' 
                      : !item.currentMonth ? 'text-slate-300' : 'text-slate-400 group-hover:text-slate-700'
                  }`}>
                    {item.date}
                  </span>
                  {dateEvents.length > 0 && (
                    <div className="flex gap-0.5">
                      {dateEvents.slice(0, 3).map((_, idx) => (
                        <div key={idx} className="w-1 h-1 rounded-full bg-teal-500" />
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  {dateEvents.map((event: any) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      key={event.id}
                      className={`p-1.5 rounded-lg border text-[10px] leading-tight ${
                        event.type === 'Wedding' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                        event.type === 'Corporate' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                        'bg-teal-50 border-teal-100 text-teal-705'
                      }`}
                    >
                      <p className="font-bold truncate mb-0.5">{event.title}</p>
                      <div className="flex items-center gap-1 opacity-75 font-semibold text-[9px]">
                        <MapPin size={8} /> {event.location || 'TBD'}
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
