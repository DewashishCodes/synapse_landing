import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

const UNSTOP_REGISTER_URL =
  "https://unstop.com/hackathons/sit-flagship-hackathon-2026-8-hour-ai-hackathon-symbiosis-institute-of-technology-sit-pune-1746836";

export const Route = createFileRoute("/team")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "The Team Behind Synapse 1.0 | SIT Flagship Hackathon 2026" },
      {
        name: "description",
        content:
          "Meet the organizing council, faculty advisors, technical architects, and student leads behind Synapse 1.0 at Symbiosis Institute of Technology (SIT), Pune.",
      },
      {
        property: "og:title",
        content: "The Team Behind Synapse 1.0 | SIT Flagship Hackathon 2026",
      },
      {
        property: "og:description",
        content:
          "The guild behind Synapse 1.0 — Faculty advisors, student leads, technical architects, and creative directors.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TeamPage,
});

type Category = "all" | "advisory" | "leads" | "tech" | "design_ops";

interface TeamMemberPlaceholder {
  id: string;
  slotNumber: string;
  role: string;
  category: Category;
  affiliation: string;
  badge: string;
  badgeColor: string;
  icon: string;
}

const teamSlots: TeamMemberPlaceholder[] = [
  {
    id: "faculty-01",
    slotNumber: "01",
    role: "Chief Convener & Patron",
    category: "advisory",
    affiliation: "Symbiosis Institute of Technology, Pune",
    badge: "PATRON",
    badgeColor:
      "border-amber-400/80 text-amber-300 bg-amber-950/60 shadow-[0_0_8px_rgba(251,191,36,0.3)]",
    icon: "👑",
  },
  {
    id: "faculty-02",
    slotNumber: "02",
    role: "Faculty Advisor & Branch Counselor",
    category: "advisory",
    affiliation: "IEEE Student Branch, SIT Pune",
    badge: "ADVISOR",
    badgeColor:
      "border-amber-400/80 text-amber-300 bg-amber-950/60 shadow-[0_0_8px_rgba(251,191,36,0.3)]",
    icon: "📜",
  },
  {
    id: "lead-01",
    slotNumber: "03",
    role: "Lead Student Organizer",
    category: "leads",
    affiliation: "Core Organizing Council · SIT Pune",
    badge: "CORE LEAD",
    badgeColor: "border-cyan-400 text-cyan-300 bg-cyan-950/60 shadow-[0_0_8px_rgba(0,229,255,0.4)]",
    icon: "⚔️",
  },
  {
    id: "lead-02",
    slotNumber: "04",
    role: "Co-Lead & Operations Director",
    category: "leads",
    affiliation: "Core Organizing Council · SIT Pune",
    badge: "CORE LEAD",
    badgeColor: "border-cyan-400 text-cyan-300 bg-cyan-950/60 shadow-[0_0_8px_rgba(0,229,255,0.4)]",
    icon: "🛡️",
  },
  {
    id: "tech-01",
    slotNumber: "05",
    role: "Technical Architect & Platform Lead",
    category: "tech",
    affiliation: "Technology & AI Guild · SIT Pune",
    badge: "TECH GUILD",
    badgeColor:
      "border-emerald-400/80 text-emerald-400 bg-emerald-950/60 shadow-[0_0_8px_rgba(80,250,123,0.3)]",
    icon: "⚡",
  },
  {
    id: "tech-02",
    slotNumber: "06",
    role: "Problem Statements & AI Review Lead",
    category: "tech",
    affiliation: "Academic & Challenge Council · SIT Pune",
    badge: "AI REVIEW",
    badgeColor:
      "border-emerald-400/80 text-emerald-400 bg-emerald-950/60 shadow-[0_0_8px_rgba(80,250,123,0.3)]",
    icon: "🧠",
  },
  {
    id: "tech-03",
    slotNumber: "07",
    role: "Hackathon Platform & Evaluation Lead",
    category: "tech",
    affiliation: "Systems & Infrastructure · SIT Pune",
    badge: "INFRA",
    badgeColor:
      "border-emerald-400/80 text-emerald-400 bg-emerald-950/60 shadow-[0_0_8px_rgba(80,250,123,0.3)]",
    icon: "💻",
  },
  {
    id: "lead-03",
    slotNumber: "08",
    role: "Sponsorships & Industry Relations Lead",
    category: "leads",
    affiliation: "Corporate Partnerships · SIT Pune",
    badge: "PARTNERSHIPS",
    badgeColor:
      "border-amber-400/80 text-amber-300 bg-amber-950/60 shadow-[0_0_8px_rgba(251,191,36,0.3)]",
    icon: "💎",
  },
  {
    id: "design-01",
    slotNumber: "09",
    role: "Creative Director & UI/UX Lead",
    category: "design_ops",
    affiliation: "Design & Brand Guild · SIT Pune",
    badge: "CREATIVE",
    badgeColor:
      "border-purple-400 text-purple-300 bg-purple-950/60 shadow-[0_0_8px_rgba(192,132,252,0.3)]",
    icon: "🎨",
  },
  {
    id: "design-02",
    slotNumber: "10",
    role: "Media, PR & Social Outreach Lead",
    category: "design_ops",
    affiliation: "Public Relations · IEEE SB SIT Pune",
    badge: "OUTREACH",
    badgeColor:
      "border-purple-400 text-purple-300 bg-purple-950/60 shadow-[0_0_8px_rgba(192,132,252,0.3)]",
    icon: "📡",
  },
  {
    id: "ops-01",
    slotNumber: "11",
    role: "Event Logistics & Venue Experience Lead",
    category: "design_ops",
    affiliation: "Hospitality & Venue Ops · SIT Pune",
    badge: "OPERATIONS",
    badgeColor: "border-cyan-400 text-cyan-300 bg-cyan-950/60 shadow-[0_0_8px_rgba(0,229,255,0.4)]",
    icon: "📍",
  },
  {
    id: "ops-02",
    slotNumber: "12",
    role: "Participant Experience & Volunteer Lead",
    category: "design_ops",
    affiliation: "Logistics Crew · SIT Pune",
    badge: "CREW LEAD",
    badgeColor: "border-cyan-400 text-cyan-300 bg-cyan-950/60 shadow-[0_0_8px_rgba(0,229,255,0.4)]",
    icon: "👥",
  },
];

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "ALL GUILDS" },
  { id: "advisory", label: "FACULTY & ADVISORS" },
  { id: "leads", label: "CORE LEADS" },
  { id: "tech", label: "TECH & AI GUILD" },
  { id: "design_ops", label: "DESIGN & OPS" },
];

function TeamPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filteredSlots =
    activeCategory === "all"
      ? teamSlots
      : teamSlots.filter((slot) => slot.category === activeCategory);

  return (
    <div className="relative min-h-screen bg-[#070b14] text-foreground selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      {/* RETRO GRID & SCANLINE TEXTURE */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0, 229, 255, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 229, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 10%, rgba(0, 229, 255, 0.15), transparent 60%)",
        }}
      />

      {/* TOP FLOATING NAV BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-3 sm:px-6 pointer-events-none">
        <nav className="mx-auto max-w-7xl pointer-events-auto border-2 border-stone-700/80 bg-stone-950/90 backdrop-blur-md px-5 sm:px-7 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 group text-foreground hover:text-cyan-300 transition-colors shrink-0"
          >
            <span className="inline-block w-3 h-3 bg-cyan-400 border border-cyan-200 shadow-[0_0_10px_#00e5ff] group-hover:rotate-45 transition-transform" />
            <span className="font-display font-bold text-sm tracking-wide">SYNAPSE 1.0</span>
            <span className="text-[10px] font-hud text-foreground/50 border border-stone-800 px-1 py-0.2 hidden sm:inline-block">
              SIT PUNE
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-xs font-hud px-3 py-1.5 border border-stone-700 hover:border-cyan-400 text-foreground/80 hover:text-cyan-300 bg-stone-900/60 transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span className="hidden sm:inline">MAIN WORLD</span>
              <span className="sm:hidden">HOME</span>
            </Link>

            <a
              href={UNSTOP_REGISTER_URL}
              target="_blank"
              rel="noreferrer"
              className="pixel-btn-diamond text-xs py-1.5 px-3 whitespace-nowrap shrink-0"
            >
              <span>REGISTER ↗</span>
            </a>
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-32 pb-24">
        {/* HERO BANNER */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="badge-pill inline-flex items-center gap-2 mb-4">
            <span className="inline-block w-2 h-2 bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
            <span>ORGANIZING GUILD // CREDITS & ROSTER</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_20px_rgba(0,229,255,0.35)]">
            MEET THE BUILDERS
          </h1>

          <p className="mt-4 text-sm sm:text-base text-foreground/80 font-sans max-w-2xl mx-auto leading-relaxed">
            The visionary minds, mentors, engineers, and student leaders behind{" "}
            <span className="text-cyan-300 font-semibold">Synapse 1.0</span> at Symbiosis Institute
            of Technology, Pune, in association with the IEEE Student Branch.
          </p>

          {/* STATUS CALLOUT NOTICE */}
          <div className="mt-6 quest-row inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 py-2 px-4 max-w-xl border-amber-500/50 bg-amber-950/20 text-amber-200 text-xs font-hud">
            <span className="text-base">✦</span>
            <span>ROSTER INITIALIZATION IN PROGRESS · OFFICIAL MEMBER PROFILES REVEALED SOON</span>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs font-hud px-3.5 py-2 border transition-all ${
                activeCategory === cat.id
                  ? "border-cyan-400 bg-cyan-950/70 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                  : "border-stone-800 bg-stone-900/60 text-foreground/70 hover:border-stone-700 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* GRID OF PLACEHOLDER PLAYER CARDS */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filteredSlots.map((member) => (
            <div
              key={member.id}
              className="biome-card group relative p-4 flex flex-col justify-between border-2 border-stone-800 hover:border-cyan-400 transition-all duration-200"
            >
              {/* TOP CARD BAR */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-hud text-[11px] text-amber-400 font-bold tracking-wider">
                  SLOT #{member.slotNumber}
                </span>
                <span
                  className={`text-[9px] px-2 py-0.5 font-hud font-bold uppercase border ${member.badgeColor}`}
                >
                  {member.badge}
                </span>
              </div>

              {/* AVATAR PLACEHOLDER FRAME */}
              <div className="my-2 aspect-square w-full max-w-[140px] mx-auto border-2 border-dashed border-stone-700 group-hover:border-cyan-400/80 bg-stone-950/80 flex flex-col items-center justify-center gap-2 p-3 transition-colors shadow-inner">
                <span className="text-3xl filter drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">
                  {member.icon}
                </span>
                <div className="text-center">
                  <div className="font-hud text-[10px] text-cyan-300/80 tracking-widest">
                    [ RESERVED ]
                  </div>
                  <div className="text-[9px] font-mono text-foreground/40 mt-0.5">
                    AVATAR PENDING
                  </div>
                </div>
              </div>

              {/* MEMBER DETAILS */}
              <div className="mt-3 text-center">
                <h3 className="font-display font-semibold text-base text-foreground group-hover:text-cyan-200 transition-colors">
                  [ Member Name ]
                </h3>
                <p className="mt-1 text-xs font-hud text-cyan-400/90 font-medium">{member.role}</p>
                <p className="mt-1 text-[11px] text-foreground/60 font-sans leading-tight">
                  {member.affiliation}
                </p>
              </div>

              {/* BOTTOM PLACEHOLDER SOCIALS */}
              <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-center gap-2 text-[10px] font-hud text-foreground/40">
                <span className="px-1.5 py-0.5 border border-stone-800 bg-stone-900/40">
                  LINKEDIN
                </span>
                <span className="px-1.5 py-0.5 border border-stone-800 bg-stone-900/40">
                  GITHUB
                </span>
                <span className="px-1.5 py-0.5 border border-stone-800 bg-stone-900/40">MAIL</span>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM CALLOUT / JOIN GUILD CARD */}
        <div className="mt-16 biome-card p-6 sm:p-8 text-center max-w-2xl mx-auto border-cyan-500/30 bg-stone-950/70">
          <div className="text-2xl mb-2">🤝</div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            WANT TO JOIN THE GUILD?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-foreground/75 font-sans leading-relaxed">
            Interested in volunteering, community outreach, or partnering for future editions of
            Synapse? Connect with the student leadership team at SIT Pune.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link to="/" className="pixel-btn-stone text-xs py-2 px-4">
              <span>← RETURN TO HOMEPAGE</span>
            </Link>
            <a
              href={UNSTOP_REGISTER_URL}
              target="_blank"
              rel="noreferrer"
              className="pixel-btn-diamond text-xs py-2 px-4"
            >
              <span>REGISTER FOR SYNAPSE 1.0 ↗</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
