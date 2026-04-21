"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Lock,
  UserCheck,
  ArrowRight,
  QrCode,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Clock,
  Footprints,
  Banknote,
  ShieldAlert,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ─────────────────────────────────────────────
   DESIGN TOKENS — Institutional White
───────────────────────────────────────────── */
const WHITE = "#ffffff";
const BG = "#ffffff";
const TEXT = "#09090b";       // zinc-950
const TEXT_SEC = "#3f3f46";   // zinc-700
const TEXT_MUTED = "#71717a"; // zinc-500
const BORDER = "#e4e4e7";    // zinc-200
const BG_SUBTLE = "#f4f4f5"; // zinc-100
const CRIMSON = "#E11D48";
const CRIMSON_LIGHT = "#fef2f2";

/* ─────────────────────────────────────────────
   SHARED SLIDE WRAPPER
   Forces h-screen, centered, generous padding
───────────────────────────────────────────── */
const SlideWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    className="h-screen w-full flex flex-col items-center justify-center px-16 py-14 md:px-24 md:py-20"
    style={{ background: BG }}
  >
    {children}
  </div>
);

/* ─────────────────────────────────────────────
   SECTION BADGE — top-left
───────────────────────────────────────────── */
const SectionBadge = ({ label }: { label: string }) => (
  <div
    className="absolute top-8 left-12 text-[11px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border"
    style={{ color: CRIMSON, borderColor: CRIMSON, background: CRIMSON_LIGHT }}
  >
    {label}
  </div>
);

/* ─────────────────────────────────────────────
   IMAGE PLACEHOLDER
   Dashed border container for future assets
───────────────────────────────────────────── */
const ImagePlaceholder = ({
  label = "Drop image here",
  className = "",
}: {
  label?: string;
  className?: string;
}) => (
  <div
    className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed ${className}`}
    style={{ background: BG_SUBTLE, borderColor: "#d4d4d8" }}
  >
    <ImageIcon className="w-12 h-12 mb-3" style={{ color: "#a1a1aa" }} />
    <span className="text-sm font-medium" style={{ color: TEXT_MUTED }}>
      {label}
    </span>
  </div>
);

const Slide1Hero = () => {
  const phrases = [
    "PGs near Cambridge Institute...",
    "PGs in K.R. Puram...",
    "PGs in T.C. Palya..."
  ];
  
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(60);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 60);

      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(() => {}, 200);
      } else {
        timer = setTimeout(handleType, typingSpeed);
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full px-10" style={{ background: BG }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center w-full max-w-4xl text-center"
      >
        {/* Logo — Full Visibility */}
        <img 
          src="https://i.postimg.cc/1zchw4K7/Gemini-Generated-Image-kk5qrrkk5qrrkk5q-removebg-preview-(1).png" 
          className="w-full max-w-[260px] h-auto object-contain mb-6" 
          alt="Ashraya Nest Icon"
        />

        {/* Brand Name */}
        <h1 className="text-6xl md:text-[5rem] font-black uppercase tracking-tighter text-zinc-950 leading-none">
          ASHRAYA
        </h1>
        
        <p className="text-xl font-medium tracking-[0.4em] uppercase text-zinc-500 mt-3 italic opacity-90">
          Trusted Student Living
        </p>

        {/* Separator */}
        <div className="w-12 h-[1px] bg-zinc-300 mt-8 mb-6 mx-auto" />

        {/* Meaning Paragraph */}
        <p className="max-w-xl text-base leading-relaxed text-zinc-500 italic">
          <span className="font-semibold not-italic" style={{ color: CRIMSON }}>&ldquo;Ashraya&rdquo;</span> is Sanskrit for{" "}
          <span className="font-semibold not-italic" style={{ color: CRIMSON }}>Refuge &amp; Shelter.</span>{" "}
          It&rsquo;s what every student searches for when they step into a new city for the first time — a safe, affordable place to call home. We named our platform after that feeling because that is exactly what we deliver.
        </p>

        {/* Search Bar Anchor */}
        <div className="mt-12 w-full max-w-2xl bg-white border-2 border-zinc-300 rounded-full px-6 py-4 flex items-center justify-between shadow-lg">
            <span className="flex-1 text-zinc-700 font-medium text-lg text-left select-none overflow-hidden whitespace-nowrap">
              {text}
              <span className="animate-pulse ml-[1px] font-normal text-zinc-950">|</span>
            </span>
            <Search className="w-6 h-6 text-zinc-900 ml-4 flex-shrink-0" />
        </div>
      </motion.div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   SLIDE 2 — Admission Season Nightmare
───────────────────────────────────────────── */
const Slide2Nightmare = () => (
  <SlideWrapper>
    <SectionBadge label="The Broken First Mile" />
    <div className="w-full max-w-7xl flex flex-col items-center">
      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold tracking-tight text-center leading-tight mb-2"
        style={{ color: TEXT }}
      >
        The Admission Season Nightmare
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-lg font-medium text-center mb-10"
        style={{ color: TEXT_MUTED }}
      >
        A Broken First Mile for <span style={{ color: CRIMSON }} className="font-semibold">3 Lakh+</span> students every year
      </motion.p>

      {/* Two-Column Layout */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* LEFT — Physical & Mental Toll */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="p-7 rounded-2xl border flex flex-col"
          style={{ background: BG_SUBTLE, borderColor: BORDER }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${CRIMSON}12`, border: `1.5px solid ${CRIMSON}30` }}
            >
              <Clock className="w-5 h-5" style={{ color: CRIMSON }} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: TEXT }}>
              The Exhaustion of &lsquo;Roaming&rsquo;
            </h3>
          </div>

          {/* Hero Metric */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-5xl font-black" style={{ color: CRIMSON }}>15+</span>
            <span className="text-lg font-semibold" style={{ color: TEXT_SEC }}>Hours Wasted</span>
          </div>
          <p className="text-sm leading-relaxed mb-5" style={{ color: TEXT_SEC }}>
            Navigating opaque listings during admission week — students visit{" "}
            <span className="font-semibold" style={{ color: TEXT }}>10–15 properties physically</span>{" "}
            due to widespread &lsquo;Catfishing&rsquo;.
          </p>

          {/* Catfishing Callout */}
          <div
            className="p-4 rounded-xl border-l-[3px] flex items-start gap-3"
            style={{ background: `${CRIMSON}06`, borderColor: CRIMSON }}
          >
            <Footprints className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: CRIMSON }} />
            <p className="text-xs leading-relaxed" style={{ color: TEXT_SEC }}>
              <span className="font-bold" style={{ color: CRIMSON }}>90% of online photos</span>{" "}
              are misleading or outdated — what you see is never what you get.
            </p>
          </div>
        </motion.div>

        {/* RIGHT — Financial Leakage */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="p-7 rounded-2xl border flex flex-col"
          style={{ background: BG_SUBTLE, borderColor: BORDER }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: `${CRIMSON}12`, border: `1.5px solid ${CRIMSON}30` }}
            >
              <Banknote className="w-5 h-5" style={{ color: CRIMSON }} />
            </div>
            <h3 className="text-lg font-bold" style={{ color: TEXT }}>
              The Hidden &lsquo;Capital Shock&rsquo;
            </h3>
          </div>

          <div className="space-y-4">
            {/* Bullet 1 */}
            <div className="flex items-start gap-3">
              <span
                className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: CRIMSON }}
              />
              <div>
                <p className="text-sm font-bold" style={{ color: TEXT }}>
                  Brokerage Trap
                </p>
                <p className="text-xs leading-relaxed mt-0.5" style={{ color: TEXT_SEC }}>
                  1 month&apos;s rent lost to &lsquo;take-it-or-leave-it&rsquo; local brokers — a non-negotiable entry fee.
                </p>
              </div>
            </div>

            {/* Bullet 2 */}
            <div className="flex items-start gap-3">
              <span
                className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: CRIMSON }}
              />
              <div>
                <p className="text-sm font-bold" style={{ color: TEXT }}>
                  The Token Scam
                </p>
                <p className="text-xs leading-relaxed mt-0.5" style={{ color: TEXT_SEC }}>
                  Students paying{" "}
                  <span className="font-semibold" style={{ color: CRIMSON }}>₹2,000+</span>{" "}
                  in &lsquo;refundable visitor deposits&rsquo; for fake listings that don&apos;t exist.
                </p>
              </div>
            </div>

            {/* Bullet 3 */}
            <div className="flex items-start gap-3">
              <span
                className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: CRIMSON }}
              />
              <div>
                <p className="text-sm font-bold" style={{ color: TEXT }}>
                  Deposit Deadlock
                </p>
                <p className="text-xs leading-relaxed mt-0.5" style={{ color: TEXT_SEC }}>
                  3–10 months of rent locked in deposits with unfair exit deductions — capital trapped indefinitely.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar — Structural Gap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full p-5 rounded-2xl border-2 border-dashed flex items-center gap-6"
        style={{ borderColor: CRIMSON, background: CRIMSON_LIGHT }}
      >
        <div className="flex items-center gap-3 flex-shrink-0">
          <ShieldAlert className="w-7 h-7" style={{ color: CRIMSON }} />
          <span className="text-3xl font-black" style={{ color: CRIMSON }}>90%</span>
          <span className="text-sm font-bold uppercase tracking-wider" style={{ color: CRIMSON }}>
            Supply Gap
          </span>
        </div>
        <div className="h-8 w-px flex-shrink-0" style={{ background: `${CRIMSON}30` }} />
        <p className="text-sm leading-relaxed" style={{ color: TEXT_SEC }}>
          Out of <span className="font-semibold" style={{ color: TEXT }}>3.06 Lakh professional students</span>, only 10% get on-campus housing. The remaining{" "}
          <span className="font-semibold" style={{ color: CRIMSON }}>90% are forced into unorganized PGs</span>{" "}
          with poor food, broken Wi-Fi, and safety risks.
        </p>
      </motion.div>

      {/* Source Capsule */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-6"
      >
        <span className="inline-block bg-zinc-100 px-4 py-1.5 rounded-full text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
          Sources: AISHE 2021-22, Reddit Community Data, TOI Student Surveys
        </span>
      </motion.div>
    </div>
  </SlideWrapper>
);

/* ─────────────────────────────────────────────
   SLIDE 3 — Market Landscape (Data + Chart)
───────────────────────────────────────────── */
const NAVY = "#0f172a";
const TEAL = "#14b8a6";

const marketData = [
  { name: "Unorganized Market", value: 80, color: NAVY },
  { name: "Organized Market", value: 20, color: TEAL },
];

const ChartTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: { color: string } }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-4 py-2.5 rounded-lg text-sm font-semibold shadow-lg border"
        style={{ background: WHITE, borderColor: BORDER, color: TEXT }}
      >
        {payload[0].name}:{" "}
        <span style={{ color: payload[0].payload.color }}>
          {payload[0].value}%
        </span>
      </div>
    );
  }
  return null;
};

const Slide3Market = () => (
  <SlideWrapper>
    <SectionBadge label="Market Landscape" />
    <div className="w-full max-w-7xl flex flex-col items-center">
      {/* Top Row: Chart + Content */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left — Donut Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <div className="w-full" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marketData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={130}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {marketData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Center Label */}
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 -mt-[180px] mb-[140px]">
            Market Gap
          </p>

          {/* Legend */}
          <div className="flex gap-8 mt-4">
            {marketData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-2.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: entry.color }}
                />
                <span className="text-sm font-medium" style={{ color: TEXT_MUTED }}>
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Headline + Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-col space-y-5"
        >
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-1"
            style={{ color: TEXT }}
          >
            The Bengaluru Student
            <br />
            Housing Ecosystem
          </h2>

          {/* Hard Data Stats */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[140px] p-4 rounded-xl border" style={{ background: BG_SUBTLE, borderColor: BORDER }}>
              <p className="text-2xl font-black" style={{ color: CRIMSON }}>1,100+</p>
              <p className="text-xs font-medium mt-1" style={{ color: TEXT_MUTED }}>Colleges</p>
            </div>
            <div className="flex-1 min-w-[140px] p-4 rounded-xl border" style={{ background: BG_SUBTLE, borderColor: BORDER }}>
              <p className="text-2xl font-black" style={{ color: CRIMSON }}>5.1 Lakh</p>
              <p className="text-xs font-medium mt-1" style={{ color: TEXT_MUTED }}>Total Student Enrollment</p>
            </div>
            <div className="flex-1 min-w-[140px] p-4 rounded-xl border" style={{ background: BG_SUBTLE, borderColor: BORDER }}>
              <p className="text-2xl font-black" style={{ color: CRIMSON }}>3.3 Lakh+</p>
              <p className="text-xs font-medium mt-1" style={{ color: TEXT_MUTED }}>Outstation Students</p>
            </div>
          </div>

          {/* Organized vs Unorganized */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-5 rounded-xl border flex gap-4 items-start"
            style={{ background: `${TEAL}08`, borderColor: `${TEAL}40` }}
          >
            <span className="text-xl mt-0.5">🏢</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: TEAL }}>
                Organized — 20%
              </p>
              <p className="text-sm leading-relaxed" style={{ color: TEXT_SEC }}>
                Managed co-living operators like <span className="font-semibold" style={{ color: TEXT }}>Stanza Living</span> & <span className="font-semibold" style={{ color: TEXT }}>Zolo Stays</span>. Corporate-led, standardized, tech-managed co-living accommodation.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="p-5 rounded-xl border flex gap-4 items-start"
            style={{ background: `${NAVY}06`, borderColor: `${NAVY}25` }}
          >
            <span className="text-xl mt-0.5">🏚️</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1" style={{ color: NAVY }}>
                Unorganized — 80%
              </p>
              <p className="text-sm leading-relaxed" style={{ color: TEXT_SEC }}>
                Fractured private PG networks, broker-dependent, lacking transparency, and inefficient admission pipelines. <span className="font-semibold" style={{ color: TEXT_MUTED }}>~2.7 Lakh migrant students currently live in these hostel/PG networks.</span> <span className="font-semibold" style={{ color: CRIMSON }}>This is our land-grab.</span>
              </p>
            </div>
          </motion.div>

          {/* The Ashraya Play */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="p-4 rounded-xl border-2 border-dashed"
            style={{ borderColor: CRIMSON, background: CRIMSON_LIGHT }}
          >
            <p className="text-sm font-semibold leading-relaxed" style={{ color: TEXT }}>
              <span style={{ color: CRIMSON }}>The Ashraya Play:</span>{" "}
              We are the first &lsquo;Verified Admission Engine&rsquo; focusing specifically on the underserved CIT/GCU corridor, bringing efficiency to the unorganized majority.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Source Capsule */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <span className="inline-block bg-zinc-100 px-4 py-1.5 rounded-full text-[10px] text-zinc-500 uppercase tracking-widest font-medium">
          Sources: AISHE 2021-22, TOI, Reddit Community Data, Stanza Industry Reports
        </span>
      </motion.div>
    </div>
  </SlideWrapper>
);

/* ─────────────────────────────────────────────
   SLIDE 3 — The Problem (Quote Style)
───────────────────────────────────────────── */
const Slide3Problem = () => (
  <SlideWrapper>
    <SectionBadge label="The Problem" />
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl w-full rounded-2xl p-14 md:p-16 border-l-4 shadow-sm"
      style={{
        background: BG_SUBTLE,
        borderColor: CRIMSON,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: BORDER,
        borderRightColor: BORDER,
        borderBottomColor: BORDER,
      }}
    >
      <div className="text-5xl mb-6 leading-none" style={{ color: CRIMSON }}>
        &ldquo;
      </div>
      <h2
        className="text-4xl md:text-5xl font-bold tracking-tight italic leading-snug mb-10"
        style={{ color: TEXT }}
      >
        The Trust Deficit in&nbsp;Urban&nbsp;Housing
      </h2>

      <div className="space-y-6">
        {[
          {
            label: "Catfishing",
            body: "Online photos vs. ground reality — 8/10 students surveyed reported mismatched conditions on arrival.",
          },
          {
            label: "Brokerage Trap",
            body: "High entry barriers inflate cost-of-living, pricing students out before the semester begins.",
          },
          {
            label: "Admission Friction",
            body: "No verified pipeline forces students to roam city corridors during their most critical academic days.",
          },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.12 }}
            className="flex items-start gap-4"
          >
            <span
              className="mt-2.5 w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: CRIMSON }}
            />
            <p className="text-lg leading-relaxed" style={{ color: TEXT_SEC }}>
              <strong style={{ color: TEXT }}>{item.label}:</strong>{" "}
              {item.body}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </SlideWrapper>
);

/* ─────────────────────────────────────────────
   SLIDE 4 — Solution / Pipeline
───────────────────────────────────────────── */
const Slide4Solution = () => (
  <SlideWrapper>
    <SectionBadge label="The Solution" />
    <div className="max-w-6xl w-full flex flex-col items-center space-y-14">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold tracking-tight text-center"
        style={{ color: TEXT }}
      >
        Ashraya: The Digital Admission Engine
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-normal text-center max-w-2xl leading-relaxed"
        style={{ color: TEXT_SEC }}
      >
        We don&apos;t just list PGs —{" "}
        <span style={{ color: CRIMSON }} className="font-semibold">
          we institutionalize trust
        </span>{" "}
        for the student-owner relationship.
      </motion.p>

      {/* Pipeline */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 md:gap-6 w-full">
        {[
          { icon: Search, label: "Search", sub: "Verified PG listings" },
          { icon: Lock, label: "Lock Coupon", sub: "Zero brokerage lock-in" },
          { icon: UserCheck, label: "Walk-in Admission", sub: "Guaranteed seat" },
        ].map((step, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="flex flex-col items-center gap-5 p-10 rounded-2xl border w-full md:w-64 shadow-sm"
              style={{
                background: i === 1 ? CRIMSON_LIGHT : BG_SUBTLE,
                borderColor: i === 1 ? CRIMSON : BORDER,
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: i === 1 ? `${CRIMSON}15` : WHITE,
                  border: `1.5px solid ${i === 1 ? CRIMSON : BORDER}`,
                }}
              >
                <step.icon
                  className="w-7 h-7"
                  style={{ color: i === 1 ? CRIMSON : TEXT_MUTED }}
                />
              </div>
              <div className="text-center">
                <p className="text-lg font-bold" style={{ color: TEXT }}>
                  {step.label}
                </p>
                <p className="text-sm mt-1" style={{ color: TEXT_MUTED }}>
                  {step.sub}
                </p>
              </div>
            </motion.div>

            {i < 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 + i * 0.15 }}
                className="hidden md:flex items-center"
              >
                <ArrowRight className="w-6 h-6" style={{ color: CRIMSON }} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  </SlideWrapper>
);

/* ─────────────────────────────────────────────
   SLIDE 5 — PG Carousel
───────────────────────────────────────────── */
const pgCards = [
  {
    name: "SV Boys PG",
    location: "Koramangala, Bengaluru",
    price: "₹7,500/mo",
    tag: "Verified · No Brokerage",
    features: ["AC Rooms", "WiFi", "Meals Included", "Laundry"],
  },
  {
    name: "Lakshmi Ladies PG",
    location: "BTM Layout, Bengaluru",
    price: "₹6,200/mo",
    tag: "Verified · Women Only",
    features: ["24/7 Security", "WiFi", "Power Backup", "RO Water"],
  },
  {
    name: "Green Valley PG",
    location: "HSR Layout, Bengaluru",
    price: "₹8,800/mo",
    tag: "Verified · Premium",
    features: ["Gym Access", "WiFi", "Meals + Snacks", "Housekeeping"],
  },
  {
    name: "Sai Krupa PG",
    location: "Electronic City, Bengaluru",
    price: "₹5,500/mo",
    tag: "Verified · Budget Friendly",
    features: ["WiFi", "Meals", "Common Hall", "2-Wheeler Parking"],
  },
];

const Slide5Carousel = () => {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };
  const prev = () => go(active === 0 ? pgCards.length - 1 : active - 1);
  const next = () => go(active === pgCards.length - 1 ? 0 : active + 1);

  const card = pgCards[active];

  return (
    <SlideWrapper>
      <SectionBadge label="Verified Properties" />
      <div className="max-w-5xl w-full flex flex-col items-center space-y-10">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold tracking-tight text-center"
          style={{ color: TEXT }}
        >
          Ashraya-Verified Properties
        </motion.h2>

        {/* Card area */}
        <div className="relative w-full max-w-2xl overflow-hidden" style={{ height: 320 }}>
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ x: dir * 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: dir * -80, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-2xl p-10 border flex flex-col justify-between shadow-md"
              style={{ background: BG_SUBTLE, borderColor: BORDER }}
            >
              {/* Tag */}
              <span
                className="self-start text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border"
                style={{
                  background: CRIMSON_LIGHT,
                  color: CRIMSON,
                  borderColor: `${CRIMSON}30`,
                }}
              >
                {card.tag}
              </span>

              <div>
                <h3 className="text-3xl font-bold mb-1" style={{ color: TEXT }}>
                  {card.name}
                </h3>
                <p className="text-base mb-5" style={{ color: TEXT_MUTED }}>
                  {card.location}
                </p>
                <div className="flex flex-wrap gap-2">
                  {card.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs px-3 py-1 rounded-full border"
                      style={{
                        background: WHITE,
                        color: TEXT_SEC,
                        borderColor: BORDER,
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-3xl font-black" style={{ color: CRIMSON }}>
                {card.price}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors hover:bg-zinc-50"
            style={{ borderColor: BORDER, background: WHITE, color: TEXT }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-3">
            {pgCards.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className="carousel-dot rounded-full"
                style={{
                  width: i === active ? 28 : 10,
                  height: 10,
                  background: i === active ? CRIMSON : "#d4d4d8",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-colors hover:bg-zinc-50"
            style={{ borderColor: BORDER, background: WHITE, color: TEXT }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </SlideWrapper>
  );
};

/* ─────────────────────────────────────────────
   SLIDE 6 — Traction
───────────────────────────────────────────── */
const Slide6Traction = () => (
  <SlideWrapper>
    <SectionBadge label="Traction" />
    <div className="max-w-6xl w-full flex flex-col items-center space-y-14">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold tracking-tight text-center"
        style={{ color: TEXT }}
      >
        Numbers That Speak
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {[
          { stat: "4", label: "PGs Verified", sub: "Live on the platform" },
          { stat: "₹6L+", label: "Potential Savings", sub: "Unlocked for students" },
          { stat: "100%", label: "Zero Brokerage", sub: "Brokerage-free pipeline" },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.12 }}
            className="flex flex-col items-center text-center p-10 rounded-2xl border shadow-sm"
            style={{ background: BG_SUBTLE, borderColor: BORDER }}
          >
            <div className="text-6xl font-black mb-3" style={{ color: CRIMSON }}>
              {item.stat}
            </div>
            <div className="text-xl font-bold mb-1" style={{ color: TEXT }}>
              {item.label}
            </div>
            <div className="text-sm" style={{ color: TEXT_MUTED }}>
              {item.sub}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-lg font-normal"
        style={{ color: TEXT_MUTED }}
      >
        Tech-enabled pipeline is live and scaling.
      </motion.p>
    </div>
  </SlideWrapper>
);

/* ─────────────────────────────────────────────
   SLIDE 7 — Closing / CTA
───────────────────────────────────────────── */
const Slide7Closing = () => (
  <SlideWrapper>
    <div className="flex flex-col items-center text-center space-y-8">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        className="h-px w-48"
        style={{
          background: `linear-gradient(90deg, transparent, ${CRIMSON}, transparent)`,
        }}
      />

      <motion.h1
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-8xl md:text-[9rem] font-black tracking-tight"
        style={{ color: TEXT, letterSpacing: "-0.04em" }}
      >
        ASHRAYA
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="text-xl font-semibold tracking-widest uppercase"
        style={{ color: CRIMSON }}
      >
        Trusted Student Living.
      </motion.p>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="h-px w-48"
        style={{
          background: `linear-gradient(90deg, transparent, ${CRIMSON}, transparent)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-8 rounded-2xl border-2 border-dashed cursor-pointer hover:shadow-lg transition-shadow"
        style={{ background: BG_SUBTLE, borderColor: "#d4d4d8" }}
        onClick={() => window.open("https://ashraya.in", "_blank")}
      >
        <QrCode className="w-28 h-28 md:w-36 md:h-36 mx-auto" style={{ color: CRIMSON }} />
        <p
          className="mt-4 text-xs font-bold uppercase tracking-widest text-center"
          style={{ color: TEXT_MUTED }}
        >
          Scan · ashraya.in
        </p>
      </motion.div>
    </div>
  </SlideWrapper>
);

/* ─────────────────────────────────────────────
   SLIDE REGISTRY
───────────────────────────────────────────── */
const slides = [
  Slide1Hero,
  Slide2Nightmare,
  Slide3Market,
  Slide3Problem,
  Slide4Solution,
  Slide5Carousel,
  Slide6Traction,
  Slide7Closing,
];

const SLIDE_LABELS = [
  "Brand",
  "Nightmare",
  "Market",
  "Problem",
  "Solution",
  "Properties",
  "Traction",
  "Close",
];

/* ─────────────────────────────────────────────
   ROOT COMPONENT
───────────────────────────────────────────── */
export default function PitchDeck() {
  const [current, setCurrent] = useState(0);
  const [locked, setLocked] = useState(false);
  const [dir, setDir] = useState(1);

  const navigate = useCallback(
    (to: number) => {
      if (locked || to < 0 || to >= slides.length) return;
      setDir(to > current ? 1 : -1);
      setCurrent(to);
      setLocked(true);
      setTimeout(() => setLocked(false), 850);
    },
    [current, locked]
  );

  // Wheel
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY > 50) navigate(current + 1);
      else if (e.deltaY < -50) navigate(current - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [navigate, current]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "ArrowRight", " "].includes(e.key)) navigate(current + 1);
      if (["ArrowUp", "ArrowLeft"].includes(e.key)) navigate(current - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, current]);

  return (
    <div
      className="fixed inset-0 overflow-hidden select-none"
      style={{ background: BG }}
    >
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          initial={{ opacity: 0, y: dir > 0 ? "6%" : "-6%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: dir > 0 ? "-6%" : "6%" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {React.createElement(slides[current])}
        </motion.div>
      </AnimatePresence>

      {/* ── Right-side Nav Dots ── */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => navigate(idx)}
            title={SLIDE_LABELS[idx]}
            className="group flex items-center gap-2 justify-end"
          >
            <span
              className="text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: CRIMSON }}
            >
              {SLIDE_LABELS[idx]}
            </span>
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: current === idx ? 12 : 8,
                height: current === idx ? 12 : 8,
                background: current === idx ? CRIMSON : "#d4d4d8",
                boxShadow:
                  current === idx ? `0 0 0 3px ${CRIMSON}25` : "none",
              }}
            />
          </button>
        ))}
      </div>

      {/* ── Slide Counter ── */}
      <div
        className="absolute bottom-6 left-10 text-xs font-mono tracking-widest"
        style={{ color: TEXT_MUTED }}
      >
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(slides.length).padStart(2, "0")}
      </div>
    </div>
  );
}
