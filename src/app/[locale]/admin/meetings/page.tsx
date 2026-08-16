"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { adminFetch } from "@/lib/admin-fetch";
import {
  Plus, Trash2, X, Save, Loader2, CalendarClock, Clock, Building2,
  User, Link2, CheckCircle2, XCircle, AlertTriangle,
} from "lucide-react";

type Meeting = {
  id: string;
  title: string;
  contactName: string | null;
  contactEmail: string | null;
  company: string | null;
  startTime: string;
  endTime: string | null;
  platform: string | null;
  meetingLink: string | null;
  status: string;
  source: string;
  notes: string | null;
};

const EMPTY_FORM = {
  title: "", contactName: "", contactEmail: "", company: "",
  startTime: "", endTime: "", platform: "", meetingLink: "", notes: "",
};

const STATUS_STYLES: Record<string, string> = {
  Scheduled: "bg-emerald-50 border-emerald-100 text-emerald-700",
  Completed: "bg-emerald-50 border-emerald-100 text-emerald-700",
  Cancelled: "bg-slate-100 border-slate-200 text-slate-500",
  Missed: "bg-rose-50 border-rose-100 text-rose-700",
};

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function AdminMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/meetings');
      const data = await res.json();
      setMeetings(Array.isArray(data.data) ? data.data : []);
    } catch (error) {
      console.error("Failed to fetch meetings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await adminFetch('/api/admin/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setForm(EMPTY_FORM);
        setShowForm(false);
        fetchMeetings();
      } else {
        alert(`Failed to save meeting: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error adding meeting:", error);
      alert("A network error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    setMeetings(meetings.map((m) => (m.id === id ? { ...m, status } : m)));
    try {
      await adminFetch(`/api/admin/meetings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error("Failed to update meeting status:", error);
      fetchMeetings();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this meeting?")) return;
    try {
      const res = await adminFetch(`/api/admin/meetings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMeetings(meetings.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete meeting.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("A network error occurred during deletion.");
    }
  };

  const now = new Date();
  const todaysMeetings = meetings
    .filter((m) => isSameDay(new Date(m.startTime), now))
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  const upcoming = meetings
    .filter((m) => new Date(m.startTime) > now && !isSameDay(new Date(m.startTime), now))
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  const past = meetings
    .filter((m) => new Date(m.startTime) < now && !isSameDay(new Date(m.startTime), now))
    .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  const formatTime = (iso: string) =>
    new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

  const MeetingCard = ({ m }: { m: Meeting }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-slate-200/80 rounded-2xl p-4 hover:border-emerald-400 hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="text-sm font-bold text-slate-800">{m.title}</p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium mt-0.5">
            <Clock size={11} />
            {formatDate(m.startTime)} · {formatTime(m.startTime)}
            {m.endTime && ` – ${formatTime(m.endTime)}`}
          </div>
        </div>
        <span className={`px-2 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider whitespace-nowrap ${STATUS_STYLES[m.status] || STATUS_STYLES.Scheduled}`}>
          {m.status}
        </span>
      </div>

      {(m.contactName || m.company) && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 mb-2">
          {m.contactName && (
            <span className="flex items-center gap-1"><User size={11} /> {m.contactName}</span>
          )}
          {m.company && (
            <span className="flex items-center gap-1"><Building2 size={11} /> {m.company}</span>
          )}
        </div>
      )}

      {m.meetingLink && (
        <a
          href={m.meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-emerald-600 font-semibold hover:underline mb-2"
        >
          <Link2 size={11} /> {m.platform || 'Join link'}
        </a>
      )}

      {m.notes && <p className="text-[11px] text-slate-500 italic mb-3">{m.notes}</p>}

      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="flex gap-1">
          <button
            onClick={() => updateStatus(m.id, 'Completed')}
            title="Mark completed"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
          >
            <CheckCircle2 size={14} />
          </button>
          <button
            onClick={() => updateStatus(m.id, 'Missed')}
            title="Mark missed"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
          >
            <AlertTriangle size={14} />
          </button>
          <button
            onClick={() => updateStatus(m.id, 'Cancelled')}
            title="Cancel"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            <XCircle size={14} />
          </button>
        </div>
        <button
          onClick={() => handleDelete(m.id)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="pb-16 max-w-[1440px] mx-auto text-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mb-1">Meetings</h1>
          <p className="text-sm text-slate-500">Every meeting confirmed by email or calendar, in one place — today, upcoming, and past.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white font-semibold tracking-wide text-xs rounded-xl hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
          {showForm ? <X size={15} /> : <Plus size={15} />}
          {showForm ? "Cancel" : "Log Meeting"}
        </button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="mb-6"
          >
            <form onSubmit={handleAdd} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Meeting Title</label>
                  <input
                    type="text" required value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Business Introduction & Collaboration Discussion"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-emerald-400 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Company</label>
                  <input
                    type="text" value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="e.g. SMASCO"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-emerald-400 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Contact Name</label>
                  <input
                    type="text" value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    placeholder="e.g. Amjad Almatrafi"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-emerald-400 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Contact Email</label>
                  <input
                    type="email" value={form.contactEmail}
                    onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                    placeholder="e.g. contact@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-emerald-400 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Starts</label>
                  <input
                    type="datetime-local" required value={form.startTime}
                    onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-emerald-400 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Ends</label>
                  <input
                    type="datetime-local" value={form.endTime}
                    onChange={(e) => setForm({ ...form, endTime: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-emerald-400 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Platform</label>
                  <input
                    type="text" value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value })}
                    placeholder="e.g. Google Meet, Teams, Call"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-emerald-400 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Meeting Link</label>
                  <input
                    type="url" value={form.meetingLink}
                    onChange={(e) => setForm({ ...form, meetingLink: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-semibold text-slate-850 focus:outline-none focus:border-emerald-400 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Notes</label>
                  <textarea
                    rows={2} value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Context from the email, what to prep, etc."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 px-3 text-xs font-medium text-slate-850 focus:outline-none focus:border-emerald-400 transition-all shadow-sm resize-none"
                  />
                </div>
              </div>
              <button
                type="submit" disabled={saving}
                className="w-full md:w-auto bg-slate-900 text-white py-2.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 size={14} className="animate-spin text-emerald-400" /> : <Save size={14} />}
                {saving ? "Saving..." : "Save Meeting"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-white animate-pulse rounded-2xl border border-slate-200 shadow-sm" />
          ))}
        </div>
      ) : meetings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed shadow-sm">
          <div className="w-14 h-14 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border">
            <CalendarClock size={22} className="text-slate-400" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1">No Meetings Logged</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">Log a meeting whenever a confirmation email comes in so nothing gets missed.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {todaysMeetings.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 mb-3 flex items-center gap-1.5">
                <Clock size={13} /> Today
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {todaysMeetings.map((m) => <MeetingCard key={m.id} m={m} />)}
              </div>
            </div>
          )}
          {upcoming.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Upcoming</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcoming.map((m) => <MeetingCard key={m.id} m={m} />)}
              </div>
            </div>
          )}
          {past.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">Past</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {past.map((m) => <MeetingCard key={m.id} m={m} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
