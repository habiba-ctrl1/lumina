"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Clock, CheckCircle2, Circle, AlertCircle, MapPin, Users, Zap } from "lucide-react";

const eventMilestones = [
  { id: 1, time: "08:00 AM", task: "Venue Handover & Security Check", status: "completed" },
  { id: 2, time: "10:30 AM", task: "Floral Installations & Stage Setup", status: "completed" },
  { id: 3, time: "01:00 PM", task: "Catering Prep & Table Styling", status: "completed" },
  { id: 4, time: "04:30 PM", task: "Sound & Lighting Rehearsal", status: "in-progress" },
  { id: 5, time: "06:00 PM", task: "VIP Guest Arrivals", status: "pending" },
  { id: 6, time: "08:00 PM", task: "Grand Entrance & Reception", status: "pending" },
];

export default function LiveEventTracker() {
  const [progress] = useState(65);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <section id="tracking" className="py-24 bg-[var(--surface-raised)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[var(--primary)] text-[12px] font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
            Live Event Operations
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-semibold text-neutral-900 mb-5" style={{ letterSpacing: "-0.025em" }}>
            Real-Time <span className="text-[var(--primary)]">Execution</span> Tracking
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto text-[16px] leading-relaxed">
            Monitor every detail of your elite event as it happens. Our military-precise tracking system 
            ensures absolute transparency and flawless coordination for the most discerning hosts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-neutral-200/80 rounded-2xl p-8" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-1.5" style={{ letterSpacing: "-0.01em" }}>The Royal Wedding Reception</h3>
                  <p className="text-neutral-500 flex items-center gap-2 text-[13px] font-medium">
                    <MapPin size={14} className="text-[var(--primary)]" /> Riyadh International Ballroom
                  </p>
                </div>
                <div className="md:text-end">
                  <div className="text-neutral-900 text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                  <p className="text-neutral-400 text-[11px] font-medium mt-1">Local Event Time</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-10 mb-8">
                {/* Circular Progress */}
                <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      className="text-neutral-100"
                    />
                    <motion.circle
                      cx="80"
                      cy="80"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-[var(--primary)]"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-neutral-900" style={{ letterSpacing: "-0.02em" }}>85%</span>
                    <span className="text-[11px] text-neutral-400 font-medium mt-0.5">Ready</span>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
                  <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <Users className="text-[var(--primary)] mb-4" size={20} />
                    <div className="text-lg font-semibold text-neutral-900" style={{ letterSpacing: "-0.01em" }}>850</div>
                    <div className="text-[12px] text-neutral-500 font-medium mt-0.5">Guests</div>
                  </div>
                  <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <Zap className="text-emerald-500 mb-4" size={20} />
                    <div className="text-lg font-semibold text-neutral-900" style={{ letterSpacing: "-0.01em" }}>Online</div>
                    <div className="text-[12px] text-neutral-500 font-medium mt-0.5">AV Systems</div>
                  </div>
                  <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                    <Clock className="text-emerald-500 mb-4" size={20} />
                    <div className="text-lg font-semibold text-neutral-900" style={{ letterSpacing: "-0.01em" }}>On-Time</div>
                    <div className="text-[12px] text-neutral-500 font-medium mt-0.5">Schedule</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Updates */}
            <div className="bg-white border border-neutral-200/80 p-8 rounded-2xl" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <h4 className="text-neutral-900 text-[13px] font-semibold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Latest Strategic Updates
              </h4>
              <div className="space-y-6">
                {[
                  { text: "Catering team has finalized the appetizers station. Temperature checks verified.", time: "2 minutes ago", team: "Ops Team", color: "bg-emerald-500" },
                  { text: "Orchestra sound check successfully completed in the Main Atrium.", time: "15 minutes ago", team: "Tech Team", color: "bg-neutral-300" }
                ].map((update: any, i: number) => (
                  <div key={i} className="flex gap-4 group">
                    <div className={`w-1 h-auto ${update.color} rounded-full transition-transform group-hover:scale-y-110`} />
                    <div>
                      <p className="text-neutral-700 text-[14px] leading-relaxed mb-1">{update.text}</p>
                      <span className="text-[12px] text-neutral-400 font-medium">{update.time} • {update.team}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-8 h-fit" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
            <h3 className="text-lg font-semibold text-neutral-900 mb-8" style={{ letterSpacing: "-0.01em" }}>Event Timeline</h3>
            <div className="space-y-6 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-neutral-200" />

              {eventMilestones.map((milestone: any) => (
                <div key={milestone.id} className="relative ps-10 group">
                  <div className={`absolute start-0 top-1 w-6 h-6 rounded-full border bg-white flex items-center justify-center z-10 transition-all duration-300 ${
                    milestone.status === 'completed' ? 'border-emerald-500 text-emerald-500' : 
                    milestone.status === 'in-progress' ? 'border-[var(--primary)] text-[var(--primary)] shadow-[0_0_0_4px_rgba(13,107,78,0.1)]' : 'border-neutral-200 text-neutral-300'
                  }`}>
                    {milestone.status === 'completed' ? <CheckCircle2 size={12} strokeWidth={3} /> : 
                     milestone.status === 'in-progress' ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Circle size={8} fill="currentColor" /></motion.div> : <Circle size={8} />}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[12px] font-semibold ${
                        milestone.status === 'completed' ? 'text-emerald-500' : 
                        milestone.status === 'in-progress' ? 'text-[var(--primary)]' : 'text-neutral-400'
                      }`}>
                        {milestone.time}
                      </span>
                      {milestone.status === 'in-progress' && (
                        <span className="px-2 py-0.5 bg-emerald-50 text-[var(--primary)] rounded text-[10px] font-semibold animate-pulse">ACTIVE</span>
                      )}
                    </div>
                    <p className={`text-[13px] font-medium transition-colors ${milestone.status === 'pending' ? 'text-neutral-400' : 'text-neutral-800'}`}>
                      {milestone.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-8 py-3.5 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 transition-colors duration-200 rounded-xl text-[13px] font-medium flex items-center justify-center gap-2">
              <AlertCircle size={16} />
              Direct Support Line
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
