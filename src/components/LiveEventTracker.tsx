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
    <section id="tracking" className="py-24 bg-[#F8F9FA] relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-champagne-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-champagne-500/10 border border-champagne-500/20 text-champagne-500 text-[10px] uppercase tracking-[0.3em] font-bold mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-champagne-500 animate-pulse" />
            Live Event Operations
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-sans font-bold text-[#041E42] mb-8">
            Real-Time <span className="text-plum-700 font-semibold italic">Execution</span> Tracking
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-lg font-light leading-relaxed">
            Monitor every detail of your elite event as it happens. Our military-precise tracking system 
            ensures absolute transparency and flawless coordination for the most discerning hosts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Dashboard Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-gray-100 rounded-sm p-10 shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                  <h3 className="text-xl font-sans font-bold text-[#041E42] mb-2">The Royal Wedding Reception</h3>
                  <p className="text-gray-500 flex items-center gap-2 text-sm font-light">
                    <MapPin size={16} className="text-champagne-500" /> Riyadh International Ballroom
                  </p>
                </div>
                <div className="md:text-right">
                  <div className="text-[#041E42] font-sans text-3xl font-bold tracking-tighter">
                    {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                  <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] mt-2 font-medium">Local Event Time</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-16 mb-12">
                {/* Circular Progress */}
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      className="text-gray-100"
                    />
                    <motion.circle
                      cx="96"
                      cy="96"
                      r={radius}
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="transparent"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-champagne-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-sans font-bold text-[#041E42]">85%</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold mt-1">Ready</span>
                  </div>
                </div>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-12 w-full">
                  <div className="p-6 bg-[#F8F9FA] rounded-sm border border-gray-100">
                    <Users className="text-champagne-500 mb-4" size={24} />
                    <div className="text-xl font-sans font-bold text-[#041E42]">850</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Guests</div>
                  </div>
                  <div className="p-6 bg-[#F8F9FA] rounded-sm border border-gray-100">
                    <Zap className="text-sage-500 mb-4" size={24} />
                    <div className="text-2xl font-display font-bold text-[#041E42]">Online</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">AV Systems</div>
                  </div>
                  <div className="p-6 bg-[#F8F9FA] rounded-sm border border-gray-100">
                    <Clock className="text-plum-700 mb-4" size={24} />
                    <div className="text-2xl font-display font-bold text-[#041E42]">On-Time</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">Schedule</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Updates */}
            <div className="bg-white border border-gray-100 p-8 rounded-sm">
              <h4 className="text-[#041E42] text-[10px] font-bold uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-sage-500 animate-pulse" />
                Latest Strategic Updates
              </h4>
              <div className="space-y-8">
                {[
                  { text: "Catering team has finalized the appetizers station. Temperature checks verified.", time: "2 minutes ago", team: "Ops Team", color: "bg-sage-500" },
                  { text: "Orchestra sound check successfully completed in the Main Atrium.", time: "15 minutes ago", team: "Tech Team", color: "bg-champagne-500" }
                ].map((update, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className={`w-1 h-12 ${update.color} rounded-full transition-transform group-hover:scale-y-110`} />
                    <div>
                      <p className="text-[#041E42] text-sm leading-relaxed mb-2">{update.text}</p>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-medium">{update.time} • {update.team}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white border border-gray-100 rounded-sm p-10 shadow-sm h-fit">
            <h3 className="text-xl font-display text-[#041E42] mb-10">Event Timeline</h3>
            <div className="space-y-8 relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gray-100" />

              {eventMilestones.map((milestone) => (
                <div key={milestone.id} className="relative pl-12 group">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center z-10 transition-all duration-500 ${
                    milestone.status === 'completed' ? 'border-sage-500 text-sage-500' : 
                    milestone.status === 'in-progress' ? 'border-champagne-500 text-champagne-500' : 'border-gray-200 text-gray-300'
                  }`}>
                    {milestone.status === 'completed' ? <CheckCircle2 size={12} /> : 
                     milestone.status === 'in-progress' ? <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Circle size={8} fill="currentColor" /></motion.div> : <Circle size={8} />}
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        milestone.status === 'completed' ? 'text-sage-500' : 
                        milestone.status === 'in-progress' ? 'text-champagne-500' : 'text-gray-400'
                      }`}>
                        {milestone.time}
                      </span>
                      {milestone.status === 'in-progress' && (
                        <span className="px-2 py-0.5 bg-champagne-500/10 text-champagne-500 rounded text-[8px] font-bold animate-pulse">ACTIVE</span>
                      )}
                    </div>
                    <p className={`text-sm font-medium transition-colors ${milestone.status === 'pending' ? 'text-gray-400' : 'text-[#041E42]'}`}>
                      {milestone.task}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-12 py-5 border border-gray-100 hover:border-champagne-500/50 text-gray-400 hover:text-[#041E42] transition-all duration-500 rounded-sm text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 group">
              <AlertCircle size={14} className="group-hover:text-champagne-500" />
              Direct Support Line
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
