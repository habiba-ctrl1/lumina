"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  const [progress, setProgress] = useState(65);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="tracking" className="py-28 bg-charcoal-900 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-[0.3em] font-bold mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Event Operations
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display font-light text-white mb-6">
            Real-Time <span className="text-shimmer font-semibold italic">Execution</span> Tracking
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto font-light">
            Monitor every detail of your event as it happens. Our proprietary tracking system ensures 
            absolute precision and transparent communication.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-charcoal-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h3 className="text-2xl font-display text-white">The Royal Wedding Reception</h3>
                  <p className="text-gray-400 flex items-center gap-2 mt-1">
                    <MapPin size={14} className="text-gold-500" /> Riyadh International Ballroom
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-gold-500 font-display text-3xl">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Local Event Time</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-10">
                <div className="flex justify-between items-end mb-3">
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Preparation Progress</span>
                  <span className="text-gold-500 font-bold">{progress}%</span>
                </div>
                <div className="h-3 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${progress}%` }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-[shimmer_2s_linear_infinite]" />
                  </motion.div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <Users className="text-gold-500 mb-2" size={20} />
                  <div className="text-xl font-bold text-white">850</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-tighter">Guest Capacity</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <Zap className="text-emerald-500 mb-2" size={20} />
                  <div className="text-xl font-bold text-white">Online</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-tighter">AV Systems</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <Clock className="text-blue-500 mb-2" size={20} />
                  <div className="text-xl font-bold text-white">On-Time</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-tighter">Schedule Status</div>
                </div>
              </div>
            </div>

            {/* Live Feed Simulator */}
            <div className="bg-emerald-950/20 border border-emerald-500/10 rounded-2xl p-6">
              <h4 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Latest Updates
              </h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-1 h-10 bg-emerald-500/30 rounded-full" />
                  <div>
                    <p className="text-white text-sm">Catering team has finalized the appetizers station. Temperature checks verified.</p>
                    <span className="text-[10px] text-gray-500">2 minutes ago • Ops Team</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 h-10 bg-gold-500/30 rounded-full" />
                  <div>
                    <p className="text-white text-sm">Orchestra sound check successfully completed in the Main Atrium.</p>
                    <span className="text-[10px] text-gray-500">15 minutes ago • Tech Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline / Milestones */}
          <div className="bg-charcoal-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl">
            <h3 className="text-xl font-display text-white mb-8">Event Timeline</h3>
            <div className="space-y-8 relative">
              {/* Vertical Line */}
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />

              {eventMilestones.map((milestone, idx) => (
                <div key={milestone.id} className="relative pl-10">
                  {/* Dot */}
                  <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 bg-charcoal-900 flex items-center justify-center z-10 transition-colors duration-500 ${
                    milestone.status === 'completed' ? 'border-emerald-500 text-emerald-500' : 
                    milestone.status === 'in-progress' ? 'border-gold-500 text-gold-500' : 'border-white/20 text-white/20'
                  }`}>
                    {milestone.status === 'completed' ? <CheckCircle2 size={12} /> : 
                     milestone.status === 'in-progress' ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Circle size={8} fill="currentColor" /></motion.div> : <Circle size={8} />}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        milestone.status === 'completed' ? 'text-emerald-500/70' : 
                        milestone.status === 'in-progress' ? 'text-gold-500' : 'text-gray-500'
                      }`}>
                        {milestone.time}
                      </span>
                      {milestone.status === 'in-progress' && (
                        <span className="px-2 py-0.5 bg-gold-500/10 text-gold-500 rounded text-[9px] font-bold animate-pulse">ACTIVE</span>
                      )}
                    </div>
                    <p className={`text-sm font-medium ${milestone.status === 'pending' ? 'text-gray-500' : 'text-white'}`}>
                      {milestone.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-10 py-4 border border-white/10 hover:border-gold-500/50 text-white/70 hover:text-white transition-all duration-300 rounded-xl text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3">
              <AlertCircle size={14} /> Report An Issue
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
      `}</style>
    </section>
  );
}
