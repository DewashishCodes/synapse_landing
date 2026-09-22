import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAnimatedCount, useCountdown } from "./useCountdown";

const UNSTOP_REGISTER_URL =
  "https://unstop.com/hackathons/sit-flagship-hackathon-2026-8-hour-ai-hackathon-symbiosis-institute-of-technology-sit-pune-1746836";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setSeen(true);
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

function Panel({
  children,
  align = "left",
}: {
  children: ReactNode;
  align?: "left" | "right" | "center";
}) {
  const { ref, seen } = useInView<HTMLDivElement>();
  const place =
    align === "center"
      ? "mx-auto text-center"
      : align === "right"
        ? "ml-auto mr-0 md:mr-8"
        : "mr-auto ml-0 md:ml-8";
  return (
    <div
      ref={ref}
      className={`panel w-full max-w-xl ${place} transition-all duration-700 ease-out ${
        seen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

function Section({
  children,
  align = "left",
  id,
}: {
  children: ReactNode;
  align?: "left" | "right" | "center";
  id?: string;
}) {
  return (
    <section {...(id ? { id } : {})} className="flex min-h-screen items-center px-5 py-24 md:px-12">
      <Panel align={align}>{children}</Panel>
    </section>
  );
}

function PrizePoolStat() {
  const { ref, seen } = useInView<HTMLDivElement>();
  const amount = useAnimatedCount(seen ? 45000 : 0, 1600);

  return (
    <div
      ref={ref}
      className="mt-2 mb-6 border-2 border-amber-500/50 bg-gradient-to-br from-amber-950/40 via-stone-950/80 to-stone-950/80 px-3 py-6 sm:px-6 text-center shadow-[0_0_30px_rgba(251,191,36,0.15)]"
    >
      <div className="mb-2 text-[10px] font-hud uppercase tracking-[0.3em] text-amber-300/80">
        💰 Total Prize Pool
      </div>
      <div className="font-numeral text-4xl sm:text-6xl md:text-7xl text-amber-300 tabular-nums drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
        ₹{amount.toLocaleString("en-IN")}
      </div>
      <div className="mt-2 text-[11px] text-foreground/60 font-sans">
        ₹15,000 split evenly across three tracks
      </div>
    </div>
  );
}

const tracks = [
  {
    icon: "⚙️",
    name: "AI in Automotives",
    copy: "Visual quality inspection on assembly lines, intelligent route & fleet logistics optimization, warranty defect mining & legacy parts obsolescence assistant.",
  },
  {
    icon: "📈",
    name: "AI in FinTech",
    copy: "IPO readiness & risk scoring, market anomaly watchdog, crash scenario simulator & dynamic peer group discovery engine.",
  },
  {
    icon: "🩺",
    name: "AI in HealthCare",
    copy: "Real-time coronary vessel angiogram analyzer, coronary dominance classifier & clinical AI decision support.",
  },
  {
    icon: "💡",
    name: "Open Innovation (AI)",
    copy: "Build anything AI-related creating genuine real-world value, solving pressing industry challenges or pioneering creative workflows.",
  },
];

const stages = [
  {
    step: "01",
    date: "04 – 20 Sep",
    status: "Live",
    title: "Registration",
    summary: "Form a team of 2–4 members and register on Unstop.",
    link: UNSTOP_REGISTER_URL,
    linkText: "Register on Unstop ↗",
  },
  {
    step: "02",
    date: "10 – 17 Sep",
    status: "Live",
    title: "Problem Statement Revealed",
    summary: "Official problem statements and tracks released. Choose your challenge.",
    link: "https://docs.google.com/document/d/1eQaB8ff8zm1NyZjAAIr-yj2xg_JXoRQJbga_ebcsRd8/edit?usp=sharing",
    linkText: "Problem Statements ↗",
  },
  {
    step: "03",
    date: "10 – 20 Sep",
    status: "Live",
    title: "Concept & PPT Submission",
    summary: "Submit proposed solution using the prescribed PPT format before 20 Sep.",
    link: "https://docs.google.com/presentation/d/1rqsWU6EXgTRaemE4th6hhaaCuSa3o0Z69BbW_bvKI9s/edit?usp=sharing",
    linkText: "PPT Template ↗",
  },
  {
    step: "04",
    date: "15 – 25 Sep",
    status: "Upcoming",
    title: "Sponsor & Prize Pool Reveal",
    summary: "Official sponsors and track-wise prize pool announcement.",
  },
  {
    step: "05",
    date: "21 Sep",
    status: "Upcoming",
    title: "Shortlisting & Finalists",
    summary: "Technical evaluation; shortlisted teams announced for the offline finale.",
  },
  {
    step: "06",
    date: "26 Sep",
    status: "Grand Finale",
    title: "Grand Finale (8-Hour Offline)",
    summary: "8-hour offline sprint, mentorship, prototype demos & judging at SIT Pune.",
    link: "https://maps.app.goo.gl/LDoRTSB48btC2j7E9",
    linkText: "SIT Pune Campus 📍",
  },
];

export interface ShortlistedTeamSlot {
  id: number;
  slotNumber: string;
  name: string; // Intentionally empty - ready for real team names to be inserted later
}

// Exactly 50 team slots (01 to 50) with empty name fields
export const SHORTLISTED_TEAMS_DATA: ShortlistedTeamSlot[] = Array.from(
  { length: 50 },
  (_, i) => ({
    id: i + 1,
    slotNumber: String(i + 1).padStart(2, "0"),
    name: "",
  }),
);

function ShortlistedTeamNodeCard({ slot }: { slot: ShortlistedTeamSlot }) {
  return (
    <div className="biome-card group relative p-3 flex flex-col justify-between border border-stone-800/90 bg-stone-950/80 hover:border-cyan-400/80 hover:bg-stone-900/60 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.4)] hover:shadow-[0_0_15px_rgba(0,245,212,0.15)] overflow-hidden">
      {/* Corner LED Indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 group-hover:bg-cyan-300 group-hover:shadow-[0_0_6px_#00f5d4] transition-all" />
      </div>

      {/* SLOT NUMBER */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="font-hud text-[10px] font-bold text-cyan-400/80 group-hover:text-cyan-300 tracking-wider">
          SLOT #{slot.slotNumber}
        </span>
        <span className="text-[8px] font-mono text-stone-500 group-hover:text-cyan-400/60 transition-colors">
          [NODE {slot.slotNumber}]
        </span>
      </div>

      {/* TEAM NAME AREA (Intentionally blank placeholder frame) */}
      <div className="my-1 flex min-h-[2.4rem] items-center justify-center rounded-sm bg-stone-900/40 border border-stone-800/40 px-2 group-hover:border-cyan-500/30 transition-colors">
        {slot.name ? (
          <span className="font-hud text-xs sm:text-sm font-bold text-cyan-100 group-hover:text-cyan-300 truncate">
            {slot.name}
          </span>
        ) : (
          <span className="font-mono text-[10px] tracking-widest text-stone-600/60 group-hover:text-cyan-400/40 transition-colors select-none">
            [ · ]
          </span>
        )}
      </div>

    </div>
  );
}

const teamFormationRules = [
  "Team size: 2–4 members",
  "Each participant must have a laptop",
  "Valid College ID is mandatory",
  "Cross-disciplinary collaboration is encouraged",
  "Cross-college/ Cross-department/ Cross-year teams are allowed.",
];

export function Overlay() {
  const timeLeft = useCountdown();

  return (
    <main className="relative z-10">
      {/* REFINED MINECRAFT HUD FLOATING NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-3 sm:px-6 pointer-events-none flex items-center justify-between gap-3">
        {/* LOGO — full link list lives in the bottom hotbar */}
        <a
          href="#top"
          className="pointer-events-auto flex items-center gap-2.5 shrink-0 select-none group border-2 border-stone-700/80 bg-stone-950/90 backdrop-blur-md px-4 sm:px-5 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
        >
          <img
            src="/logo-small.png"
            alt="Synapse 1.0"
            className="h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)] animate-logo-float"
          />
          <span className="font-hud text-sm font-bold text-foreground tracking-wider whitespace-nowrap">
            SYNAPSE 1.0
          </span>
          <span className="hidden sm:inline-block font-hud text-[10px] text-emerald-400 border border-emerald-500/40 bg-emerald-950/60 px-1.5 py-0.5 whitespace-nowrap">
            SIT PUNE
          </span>
        </a>

        {/* RIGHT ACTION */}
        <a
          href={UNSTOP_REGISTER_URL}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto pixel-btn-diamond text-xs py-2 px-4 whitespace-nowrap shrink-0"
        >
          <span>REGISTER ↗</span>
        </a>
      </header>

      {/* HERO: SURFACE / NIGHT SKY LAUNCH */}
      <section
        id="top"
        className="flex min-h-screen flex-col items-center justify-center px-4 text-center pt-16"
      >
        <div className="badge-pill animate-fade-in flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-emerald-400 shadow-[0_0_8px_#50fa7b]" />
          <span>WORLD: SIT PUNE · DIFFICULTY: 8-HR SPRINT · MODE: OFFLINE</span>
        </div>

        {/* MINECRAFT HUD STATUS: HEARTS, LEVEL BAR, HUNGER */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-hud select-none">
          {/* 10 Red Hearts */}
          <div className="flex items-center gap-1 text-red-500 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]">
            <span className="text-sm">♥♥♥♥♥</span>
            <span className="text-[10px] text-red-400/90 font-mono tracking-normal">20/20 HP</span>
          </div>

          {/* Green Minecraft XP Level & Bar */}
          <div className="flex items-center gap-2 px-2.5 py-1 bg-stone-950/80 border border-emerald-500/60 shadow-[0_0_10px_rgba(80,250,123,0.2)]">
            <span className="text-emerald-400 font-bold text-xs tracking-wider">LVL 99</span>
            <div className="w-16 sm:w-24 h-1.5 bg-stone-900 border border-emerald-900 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_8px_#50fa7b]"
                style={{ width: "85%" }}
              />
            </div>
            <span className="text-[9px] text-emerald-300 font-mono">AI EXP</span>
          </div>

          {/* Sprint Energy / Stamina */}
          <div className="flex items-center gap-1.5 text-cyan-400 filter drop-shadow-[0_0_6px_rgba(0,229,255,0.6)]">
            <span className="text-xs">⚡⚡⚡⚡⚡</span>
            <span className="text-[10px] text-cyan-300/90 font-mono tracking-normal">100% SPRINT</span>
          </div>
        </div>

        <h1 className="hero-title mt-6">
          SYNAPSE
          <br />
          <span className="hero-sub">1.0 · SIT PUNE 2026</span>
        </h1>

        <p className="hero-copy mt-6 max-w-2xl text-balance text-base md:text-lg text-foreground/90 font-sans leading-relaxed">
          Symbiosis Institute of Technology, Pune, in association with the IEEE Student Branch, SIT
          Pune, presents <span className="text-cyan-300 font-semibold">Synapse 1.0</span> — an
          intensive 8-hour offline AI hackathon where industry challenges meet student innovation.
        </p>

        {/* PRIZE POOL CALLOUT */}
        <a
          href="#prizes"
          className="mt-5 inline-flex items-center gap-2.5 border-2 border-amber-500/60 bg-amber-950/30 px-4 py-1.5 shadow-[0_0_18px_rgba(251,191,36,0.2)] hover:border-amber-400 hover:shadow-[0_0_24px_rgba(251,191,36,0.35)] transition-all"
        >
          <span className="text-base">💰</span>
          <span className="font-hud text-[10px] uppercase tracking-[0.2em] text-amber-300/80">
            Prize Pool
          </span>
          <span className="font-numeral text-2xl leading-none text-amber-300">₹45,000</span>
        </a>

        {/* LIVE COUNTER HERO BUTTONS */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={UNSTOP_REGISTER_URL}
            target="_blank"
            rel="noreferrer"
            className="pixel-btn-diamond text-xs sm:text-sm md:text-base tracking-wider"
          >
            <span className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 bg-emerald-950 border border-emerald-400 shadow-[0_0_8px_#50fa7b] animate-pulse" />
              <span>
                REGISTER (
                <span className="font-mono tabular-nums tracking-normal text-[#032b30] font-bold">
                  {timeLeft.formatted} LEFT
                </span>
                )
              </span>
            </span>
          </a>
          <a
            href="https://docs.google.com/document/d/1eQaB8ff8zm1NyZjAAIr-yj2xg_JXoRQJbga_ebcsRd8/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="pixel-btn-stone text-xs md:text-sm"
          >
            <span>PROBLEM STATEMENTS ↗</span>
          </a>
          <Link
            to="/team"
            className="pixel-btn-stone text-xs md:text-sm text-cyan-300 border-cyan-500/40 hover:border-cyan-400 flex items-center gap-1.5"
          >
            <span>MEET THE TEAM 👥</span>
          </Link>
        </div>

        <div className="scroll-hint mt-14 flex flex-col items-center gap-2">
          <span className="text-[10px] text-cyan-400 font-hud tracking-[0.25em]">
            [ DESCENT INITIATED ]
          </span>
          <span>SCROLL TO DESCEND INTO THE MINES ↓</span>
        </div>
      </section>

      {/* OVERVIEW: DESCENT LEVEL 01 // QUEST DISCOVERED */}
      <Section align="left" id="overview">
        <div className="badge-pill mb-3">
          <span className="text-cyan-400">◆</span> QUEST DISCOVERED // SYNAPSE 1.0
        </div>
        <h2 className="section-title">Where Industry Challenges Meet Student Innovation</h2>
        <p className="section-copy">
          Symbiosis Institute of Technology, Pune, in association with the IEEE Student Branch, SIT
          Pune, presents Synapse 1.0, an offline, industry-focused hackathon designed to bring
          together talented engineering students and real-world technology challenges.
        </p>
        <p className="section-copy mt-3">
          Synapse 1.0 goes beyond conventional hackathons. Shortlisted teams will work on
          industry-relevant problem statements and develop practical, innovative solutions within an
          intensive 8-hour offline sprint at the SIT Pune campus.
        </p>
        <p className="section-copy mt-3">
          The hackathon provides participants with an opportunity to experience real-world
          problem-solving, collaborate under time constraints, and showcase their technical skills
          to industry professionals.
        </p>

        {/* INVENTORY SLOTS / HUD STATS WITH LIVE COUNTER */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {[
            { num: "₹45,000", label: "Total Prize Pool", icon: "💰", accent: "text-amber-300" },
            { num: "8-Hour", label: "Sprint Duration", icon: "⏱️" },
            { num: "2 – 4", label: "Party Size", icon: "👥" },
            { num: "Offline", label: "SIT Pune Finale", icon: "📍" },
            { num: timeLeft.compact, label: "Until Gate Closes", icon: "⏳" },
          ].map((item) => (
            <div key={item.label} className="inventory-slot">
              <span className="text-xl mb-1">{item.icon}</span>
              <div
                className={`font-hud font-bold text-base tabular-nums ${item.accent ?? "text-cyan-300"}`}
              >
                {item.num}
              </div>
              <div className="text-[10px] font-hud text-foreground/60 uppercase text-center mt-0.5">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TRACKS: DESCENT LEVEL 02 // 4 BIOME REALMS */}
      <Section align="right" id="tracks">
        <div className="badge-pill mb-3">
          <span className="text-emerald-400">◆</span> SELECT YOUR REALM // 4 BIOMES UNLOCKED
        </div>
        <h2 className="section-title">Problem Statements & Tracks</h2>
        <p className="section-copy">
          The official Problem Statements & Tracks for Synapse 1.0 are now revealed. Explore the
          tracks, find the challenge that excites you, and start building your solution. Submit your
          PPT for the Concept & PPT Submission Round by 20th September 2026.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {tracks.map((t) => (
            <div key={t.name} className="biome-card group">
              <div className="flex items-center justify-between">
                <span className="text-2xl">{t.icon}</span>
                <span className="text-[9px] font-hud px-2 py-0.5 border border-cyan-500/40 bg-cyan-950/40 text-cyan-300 uppercase">
                  BIOME UNLOCKED
                </span>
              </div>
              <h3 className="mt-2 font-display text-lg text-foreground group-hover:text-cyan-300 transition-colors">
                {t.name}
              </h3>
              <p className="mt-1 text-xs text-foreground/75 leading-relaxed font-sans">{t.copy}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://docs.google.com/document/d/1eQaB8ff8zm1NyZjAAIr-yj2xg_JXoRQJbga_ebcsRd8/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="pixel-btn-diamond text-xs"
          >
            <span>Open Problem Statements Doc 🔗</span>
          </a>
          <a
            href="https://docs.google.com/presentation/d/1rqsWU6EXgTRaemE4th6hhaaCuSa3o0Z69BbW_bvKI9s/edit?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="pixel-btn-stone text-xs"
          >
            <span>Prescribed PPT Format 🔗</span>
          </a>
        </div>
      </Section>

      {/* STAGES & TIMELINE: DESCENT LEVEL 03 // QUEST LOG */}
      <Section align="left" id="timeline">
        <div className="badge-pill mb-3">
          <span className="text-amber-400">◆</span> QUEST LOG // PROGRESSION TIMELINE
        </div>
        <h2 className="section-title">Stages & Timeline</h2>
        <p className="section-copy">
          Key phases from online registration and PPT submission to the 8-hour offline Grand Finale.
        </p>

        <div className="mt-5 space-y-2">
          {stages.map((st) => (
            <div
              key={st.title}
              className={`p-2.5 sm:p-3 border transition-colors ${
                st.status === "Live"
                  ? "border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400/70"
                  : st.status === "Grand Finale"
                    ? "border-cyan-500/40 bg-cyan-950/20 hover:border-cyan-400/70"
                    : "border-stone-800 bg-stone-900/40 hover:border-stone-700"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-hud text-[11px] text-amber-400 font-bold tracking-wider">
                    {st.step}
                  </span>
                  <span className="font-display font-semibold text-xs sm:text-sm text-foreground">
                    {st.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-hud text-[10px] text-foreground/70 bg-stone-800/80 px-2 py-0.5 border border-stone-700/60">
                    {st.date}
                  </span>
                  <span
                    className={`text-[9px] px-1.5 py-0.5 font-hud font-bold uppercase border ${
                      st.status === "Live"
                        ? "border-emerald-400/80 text-emerald-400 bg-emerald-950/80 shadow-[0_0_8px_rgba(80,250,123,0.25)]"
                        : st.status === "Grand Finale"
                          ? "border-cyan-400 text-cyan-300 bg-cyan-950/80 shadow-[0_0_8px_rgba(0,229,255,0.3)]"
                          : "border-stone-700 text-foreground/50 bg-stone-900/60"
                    }`}
                  >
                    {st.status === "Live"
                      ? "LIVE"
                      : st.status === "Grand Finale"
                        ? "FINALE"
                        : "UPCOMING"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-xs text-foreground/75 font-sans">
                <p className="m-0 text-xs text-foreground/80 leading-snug">{st.summary}</p>
                {st.link && (
                  <a
                    href={st.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-hud text-cyan-400 hover:text-cyan-300 shrink-0 font-medium hover:underline ml-auto sm:ml-0"
                  >
                    <span>{st.linkText}</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* SHORTLISTED TEAMS: DESCENT LEVEL 03.5 // 50 NEURAL SLOTS */}
      <section id="shortlisted" className="flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center w-full">
        <Panel align="center">
          <div className="badge-pill mb-3">
            <span className="text-cyan-400">◆</span> NEURAL MATRIX // 50 NODES ACTIVE
          </div>
          <h2 className="section-title">Shortlisted Teams</h2>
          <p className="section-copy max-w-2xl mx-auto">
            50 shortlisted team slots for the Synapse 1.0 offline Grand Finale at SIT Pune. Official team roster decrypting on 21st September.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-950/30 text-amber-300 font-hud text-xs tracking-wider shadow-[0_0_12px_rgba(251,191,36,0.15)]">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#fbbf24]" />
            <span>50 / 50 SLOTS RESERVED</span>
          </div>

          {/* 50 TEAMS NEURAL MATRIX GRID */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 text-left w-full max-w-5xl mx-auto">
            {SHORTLISTED_TEAMS_DATA.map((slot) => (
              <ShortlistedTeamNodeCard key={slot.id} slot={slot} />
            ))}
          </div>
        </Panel>
      </section>

      {/* TEAM FORMATION & VENUE: DESCENT LEVEL 04 */}
      <Section align="right" id="details">
        <div className="badge-pill mb-3">
          <span className="text-cyan-400">◆</span> TEAM FORMATION // GUIDELINES & WAYPOINT
        </div>
        <h2 className="section-title">Team Formation</h2>
        <p className="section-copy">
          Synapse 1.0 is open to all students under the following team formation guidelines:
        </p>

        <div className="mt-5">
          <div className="text-[11px] font-hud uppercase tracking-wider text-emerald-400 font-semibold mb-3">
            [ TEAM FORMATION GUIDELINES ]:
          </div>
          <div className="space-y-2">
            {teamFormationRules.map((rule) => (
              <div key={rule} className="quest-row flex items-center gap-3 py-2.5 px-3.5">
                <span className="text-cyan-400 text-xs shrink-0">✦</span>
                <span className="text-xs sm:text-sm font-hud text-foreground/90 leading-relaxed">
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* WAYPOINT COORDINATES CARD */}
        <div className="mt-6 biome-card">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-hud uppercase tracking-wider text-cyan-400 font-semibold">
              [ WAYPOINT COORDINATES // SIT PUNE ]
            </div>
            <span className="text-xs font-hud text-amber-300">
              X: 18.53 · Y: 73.73 · Z: OFFLINE
            </span>
          </div>
          <p className="mt-2 text-sm font-display text-foreground">
            Symbiosis Institute of Technology | SIT Pune
          </p>
          <p className="text-xs text-foreground/70 mt-1 leading-relaxed font-sans">
            Tal:, near Lupin Research Park, Gram:, Lavale, Mulshi, Maharashtra 412115, Pune,
            Maharashtra, India
          </p>
          <a
            href="https://maps.app.goo.gl/LDoRTSB48btC2j7E9"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-hud text-cyan-400 hover:text-cyan-300 underline"
          >
            <span>Open in Google Maps 📍</span>
          </a>
        </div>
      </Section>

      {/* PRIZES: DESCENT LEVEL 05 // TREASURE VAULT */}
      <Section align="left" id="prizes">
        <div className="badge-pill mb-3">
          <span className="text-amber-400">◆</span> TREASURE VAULT // LOOT POOL
        </div>
        <h2 className="section-title">Prizes & Opportunities</h2>
        <p className="section-copy">
          Synapse 1.0 is backing its builders with a ₹45,000 total prize pool, backed by NASDAQ,
          PACCAR India, and Innvolution — alongside industry mentorship and certificates for every
          team that ships.
        </p>

        <PrizePoolStat />

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: "🏆 Track-Wise Cash Prize Pool",
              tier: "LEGENDARY LOOT",
              color: "text-amber-400",
            },
            { title: "🚀 Industry Mentorship", tier: "EPIC REWARD", color: "text-purple-400" },
            { title: "💼 Partner Opportunities", tier: "EPIC REWARD", color: "text-purple-400" },
            {
              title: "📜 Winning & Participation Certificates",
              tier: "RARE ARTIFACT",
              color: "text-cyan-400",
            },
          ].map((p) => (
            <div key={p.title} className="quest-row flex items-center justify-between py-2.5 px-3">
              <span className="text-xs font-sans text-foreground">{p.title}</span>
              <span
                className={`text-[9px] font-hud uppercase ${p.color} border border-stone-700/80 px-1.5 py-0.5 bg-black/40`}
              >
                {p.tier}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* SPONSORS: LEVEL 06 // VILLAGE TRADING HALL & BEACON ALTAR */}
      <section
        id="sponsors"
        className="flex min-h-[130vh] flex-col items-center justify-center px-4 text-center"
      >
        <Panel align="center">
          <div className="badge-pill">
            <span className="text-amber-400">◆</span> VILLAGE TRADING HALL · SPONSORS REVEALED
          </div>
          <h2 className="section-title mt-4">Industry Partners & Sponsors</h2>
          <p className="section-copy mx-auto">
            Meet the industry partners backing Synapse 1.0. Track-wise prize pool details will
            follow soon.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              {
                name: "NASDAQ",
                src: "/sponsors/nasdaq.png",
                imgClass: "max-h-24 sm:max-h-24 w-auto scale-[1.75] object-contain",
              },
              {
                name: "PACCAR India",
                src: "/sponsors/paccar-india.png",
                imgClass: "max-h-16 sm:max-h-16 w-auto object-contain px-1",
              },
              {
                name: "Innvolution",
                src: "/sponsors/innvolution.avif",
                imgClass: "max-h-24 sm:max-h-24 w-auto scale-[1.75] object-contain",
              },
            ].map((sponsor) => (
              <div
                key={sponsor.name}
                className="sponsor-slot sponsor-slot--revealed group flex items-center justify-center p-2 sm:p-3 overflow-hidden"
              >
                <img
                  src={sponsor.src}
                  alt={sponsor.name}
                  className={`${sponsor.imgClass} group-hover:scale-[1.85] transition-transform duration-300`}
                />
              </div>
            ))}
          </div>
        </Panel>
      </section>

      {/* REGISTER: TERMINAL PLATFORM // NETHER PORTAL GATEWAY */}
      <section
        id="register"
        className="flex min-h-screen flex-col items-center justify-center px-4 text-center"
      >
        <Panel align="center">
          <div className="badge-pill mb-4 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-emerald-400 shadow-[0_0_8px_#50fa7b] animate-pulse" />
            <span>
              REGISTRATION LIVE ·{" "}
              <span className="font-mono tabular-nums text-emerald-300">{timeLeft.formatted}</span>{" "}
              LEFT BEFORE PORTAL CLOSES
            </span>
          </div>
          <h2 className="hero-title text-4xl sm:text-5xl md:text-6xl">
            Think you've got it?
            <br />
            <span className="text-cyan-400">Prove it.</span>
          </h2>
          <p className="section-copy mx-auto mt-4">
            Registrations for Synapse 1.0 are open on Unstop. Form a party of 2–4 members, choose
            your challenge biome, and submit your concept PPT.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://docs.google.com/presentation/d/1rqsWU6EXgTRaemE4th6hhaaCuSa3o0Z69BbW_bvKI9s/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="pixel-btn-diamond text-sm md:text-base"
            >
              <span>⚔️ Submit Concept / PPT</span>
            </a>
            <a
              href="https://docs.google.com/document/d/1eQaB8ff8zm1NyZjAAIr-yj2xg_JXoRQJbga_ebcsRd8/edit?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="pixel-btn-stone text-xs md:text-sm"
            >
              <span>Problem Statements ↗</span>
            </a>
          </div>

          {/* HACKATHON METADATA FOOTER */}
          <div className="mt-12 space-y-2 border-t-2 border-stone-800 pt-8 text-xs text-foreground/60 max-w-lg mx-auto font-sans">
            <p className="font-hud font-bold text-cyan-300 text-xs">
              SYNAPSE 1.0 | SIT FLAGSHIP HACKATHON 2026 | 8-HOUR AI HACKATHON
            </p>
            <p>
              Listed by Symbiosis Institute of Technology (SIT), Pune in association with IEEE
              Student Branch, SIT Pune.
            </p>
          </div>
        </Panel>
      </section>

      {/* MINECRAFT INVENTORY HOTBAR (QUICK NAVIGATION HUD) */}
      <aside
        aria-label="Quick Navigation Hotbar"
        className="fixed bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-40 pointer-events-auto select-none"
      >
        <div className="minecraft-hotbar">
          {[
            { slot: "1", icon: "⚔️", label: "Overview", href: "#overview" },
            { slot: "2", icon: "🗺️", label: "Tracks", href: "#tracks" },
            { slot: "3", icon: "📜", label: "Timeline", href: "#timeline" },
            { slot: "4", icon: "🔒", label: "Shortlisted", href: "#shortlisted" },
            { slot: "5", icon: "🛡️", label: "Team Rules", href: "#details" },
            { slot: "6", icon: "🏆", label: "Prizes", href: "#prizes" },
            { slot: "7", icon: "🏛️", label: "Sponsors", href: "#sponsors" },
            { slot: "8", icon: "👥", label: "The Team", href: "/team", isRouter: true },
            {
              slot: "9",
              icon: "💎",
              label: "Register",
              href: UNSTOP_REGISTER_URL,
              isExternal: true,
            },
          ].map((item) =>
            item.isRouter ? (
              <Link
                key={item.slot}
                to={item.href}
                className="minecraft-hotbar-slot group"
                title={`${item.label} (Press ${item.slot})`}
              >
                <span className="absolute top-0.5 left-1 text-[8px] font-hud text-foreground/40 group-hover:text-cyan-300">
                  {item.slot}
                </span>
                <span className="text-sm sm:text-base">{item.icon}</span>
              </Link>
            ) : (
              <a
                key={item.slot}
                href={item.href}
                {...(item.isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
                className="minecraft-hotbar-slot group"
                title={`${item.label} (Press ${item.slot})`}
              >
                <span className="absolute top-0.5 left-1 text-[8px] font-hud text-foreground/40 group-hover:text-cyan-300">
                  {item.slot}
                </span>
                <span className="text-sm sm:text-base">{item.icon}</span>
              </a>
            ),
          )}
        </div>
      </aside>
    </main>
  );
}
