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
          "Meet the organizing council, domain leads, and student builders behind Synapse 1.0 at Symbiosis Institute of Technology (SIT), Pune.",
      },
      {
        property: "og:title",
        content: "The Team Behind Synapse 1.0 | SIT Flagship Hackathon 2026",
      },
      {
        property: "og:description",
        content:
          "The guild behind Synapse 1.0 — Heads, Tech, Design, Events, Logistics, and Creative crews.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: TeamPage,
});

type Category =
  | "all"
  | "heads"
  | "tech_design"
  | "events_logistics"
  | "docs_anchor"
  | "media_creative";

interface TeamMember {
  id: string;
  slotNumber: string;
  name: string;
  domain: string;
  role: string;
  category: Category;
  affiliation: string;
  badge: string;
  badgeColor: string;
  icon: string;
  quote?: string;
  photoUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  isHead?: boolean;
  isPlaceholder?: boolean;
}

const teamMembers: TeamMember[] = [
  // ==========================================
  // TIER 1: HEADS (3 POSITIONS)
  // ==========================================
  {
    id: "head-01",
    slotNumber: "01",
    name: "Revanth Sai Sreerangam",
    domain: "Head",
    role: "Head",
    category: "heads",
    affiliation: "Synapse 1.0 Organizing Council · SIT Pune",
    badge: "HEAD",
    badgeColor:
      "border-amber-400 text-amber-300 bg-amber-950/70 shadow-[0_0_12px_rgba(251,191,36,0.4)]",
    icon: "👑",
    quote: "I like to driveeee!!",
    photoUrl: "/team/revanth_sai_sreerangam.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/revanth-sai-sreerangam-74516421a?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    isHead: true,
  },
  {
    id: "head-02",
    slotNumber: "02",
    name: "Dewashish Lambore",
    domain: "Head",
    role: "Head",
    category: "heads",
    affiliation: "Synapse 1.0 Organizing Council · SIT Pune",
    badge: "HEAD",
    badgeColor:
      "border-amber-400 text-amber-300 bg-amber-950/70 shadow-[0_0_12px_rgba(251,191,36,0.4)]",
    icon: "👑",
    quote: "The quieter I am, the more trouble you are in.",
    photoUrl: "/team/dewashish_lambore.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/dewashish-lambore-927048318?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    isHead: true,
  },
  {
    id: "head-03",
    slotNumber: "03",
    name: "[ Head Position 03 ]",
    domain: "Head",
    role: "Head",
    category: "heads",
    affiliation: "Synapse 1.0 Organizing Council · SIT Pune",
    badge: "HEAD",
    badgeColor:
      "border-amber-400/80 text-amber-300/80 bg-amber-950/40 border-dashed",
    icon: "👑",
    isHead: true,
    isPlaceholder: true,
  },

  // ==========================================
  // TIER 2: TECH & DESIGN
  // ==========================================
  {
    id: "tech-01",
    slotNumber: "04",
    name: "Jayvee Shah",
    domain: "Tech",
    role: "Tech",
    category: "tech_design",
    affiliation: "Technical Guild · SIT Pune",
    badge: "TECH",
    badgeColor:
      "border-emerald-400 text-emerald-300 bg-emerald-950/60 shadow-[0_0_8px_rgba(80,250,123,0.3)]",
    icon: "⚡",
    quote: "Till the last commit do us part",
    photoUrl: "/team/jayvee_shah.jpg",
    linkedinUrl: "https://www.linkedin.com/in/jayvee-shah-b113a0369/",
  },
  {
    id: "design-01",
    slotNumber: "05",
    name: "Arya M. Shukla",
    domain: "Design",
    role: "Design",
    category: "tech_design",
    affiliation: "Design Guild · SIT Pune",
    badge: "DESIGN",
    badgeColor:
      "border-purple-400 text-purple-300 bg-purple-950/60 shadow-[0_0_8px_rgba(192,132,252,0.3)]",
    icon: "🎨",
    quote: "High on Good Sprit",
    photoUrl: "/team/arya_shukla.png",
    linkedinUrl:
      "https://www.linkedin.com/in/arya-shukla-683610418?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },

  // ==========================================
  // TIER 3: EVENTS & LOGISTICS
  // ==========================================
  {
    id: "event-01",
    slotNumber: "06",
    name: "Swarali Deshpande",
    domain: "Events",
    role: "Event Management",
    category: "events_logistics",
    affiliation: "Events Crew · SIT Pune",
    badge: "EVENTS",
    badgeColor:
      "border-cyan-400 text-cyan-300 bg-cyan-950/60 shadow-[0_0_8px_rgba(0,229,255,0.4)]",
    icon: "🎯",
    quote: "Kinda chic to be chaotic",
    photoUrl: "/team/swarali_deshpande.jpg",
  },
  {
    id: "event-02",
    slotNumber: "07",
    name: "Utsav Tyagi",
    domain: "Events",
    role: "Events",
    category: "events_logistics",
    affiliation: "Events Crew · SIT Pune",
    badge: "EVENTS",
    badgeColor:
      "border-cyan-400 text-cyan-300 bg-cyan-950/60 shadow-[0_0_8px_rgba(0,229,255,0.4)]",
    icon: "🎯",
    quote: "404: Limits Not Found.",
    photoUrl: "/team/utsav_tyagi.jpg",
    instagramUrl: "https://instagram.com/Utsav.tyagi2",
  },
  {
    id: "event-03",
    slotNumber: "08",
    name: "Dhairya Raajpura",
    domain: "Events",
    role: "Events",
    category: "events_logistics",
    affiliation: "Events Crew · SIT Pune",
    badge: "EVENTS",
    badgeColor:
      "border-cyan-400 text-cyan-300 bg-cyan-950/60 shadow-[0_0_8px_rgba(0,229,255,0.4)]",
    icon: "🎯",
    quote: "probably planning my next trip",
    photoUrl: "/team/dhairya_raajpura.png",
  },
  {
    id: "event-04",
    slotNumber: "09",
    name: "Arnav Mehta",
    domain: "Events",
    role: "Events",
    category: "events_logistics",
    affiliation: "Events Crew · SIT Pune",
    badge: "EVENTS",
    badgeColor:
      "border-cyan-400 text-cyan-300 bg-cyan-950/60 shadow-[0_0_8px_rgba(0,229,255,0.4)]",
    icon: "🎯",
    quote: "I am a dedicated and resourceful problem-solver",
    photoUrl: "/team/arnav_mehta.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/arnav-mehta-508416429?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: "logistics-01",
    slotNumber: "10",
    name: "Debsuvra Sinha",
    domain: "Logistics",
    role: "Logistics",
    category: "events_logistics",
    affiliation: "Logistics Crew · SIT Pune",
    badge: "LOGISTICS",
    badgeColor:
      "border-blue-400 text-blue-300 bg-blue-950/60 shadow-[0_0_8px_rgba(96,165,250,0.3)]",
    icon: "📦",
  },
  {
    id: "logistics-02",
    slotNumber: "11",
    name: "Shaumik Ahlawat",
    domain: "Logistics",
    role: "Logistics",
    category: "events_logistics",
    affiliation: "Logistics Crew · SIT Pune",
    badge: "LOGISTICS",
    badgeColor:
      "border-blue-400 text-blue-300 bg-blue-950/60 shadow-[0_0_8px_rgba(96,165,250,0.3)]",
    icon: "📦",
    quote: "“Always up for a new place, a new idea, or a good conversation.”",
    photoUrl: "/team/shaumik_ahlawat.png",
  },

  // ==========================================
  // TIER 4: DOCUMENTATION & ANCHORS
  // ==========================================
  {
    id: "doc-01",
    slotNumber: "12",
    name: "Novera Zahid",
    domain: "Documentation",
    role: "Documentation",
    category: "docs_anchor",
    affiliation: "Editorial Guild · SIT Pune",
    badge: "DOCUMENTATION",
    badgeColor:
      "border-amber-400/80 text-amber-300 bg-amber-950/60 shadow-[0_0_8px_rgba(251,191,36,0.3)]",
    icon: "📜",
    quote: "Collecting skills, stories, and deadlines.",
    photoUrl: "/team/novera_zahid.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/novera-zahid?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    id: "doc-02",
    slotNumber: "13",
    name: "Aishani Gupta",
    domain: "Documentation",
    role: "Documentation",
    category: "docs_anchor",
    affiliation: "Editorial Guild · SIT Pune",
    badge: "DOCUMENTATION",
    badgeColor:
      "border-amber-400/80 text-amber-300 bg-amber-950/60 shadow-[0_0_8px_rgba(251,191,36,0.3)]",
    icon: "📜",
    quote: "Powered by caffeine and blue light.",
    photoUrl: "/team/aishani_gupta.png",
    linkedinUrl:
      "https://www.linkedin.com/in/aishani-gupta-68703b409?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: "anchor-01",
    slotNumber: "14",
    name: "Avni Singh",
    domain: "Anchor",
    role: "Anchoring Team",
    category: "docs_anchor",
    affiliation: "Anchoring Guild · SIT Pune",
    badge: "ANCHOR",
    badgeColor:
      "border-pink-400 text-pink-300 bg-pink-950/60 shadow-[0_0_8px_rgba(244,114,182,0.3)]",
    icon: "🎙️",
    quote: "To Be Audacious",
    photoUrl: "/team/avni_singh.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/avni-singh-6760a4433?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: "anchor-02",
    slotNumber: "15",
    name: "Zachariah Bobby",
    domain: "Anchor",
    role: "Anchor",
    category: "docs_anchor",
    affiliation: "Anchoring Guild · SIT Pune",
    badge: "ANCHOR",
    badgeColor:
      "border-pink-400 text-pink-300 bg-pink-950/60 shadow-[0_0_8px_rgba(244,114,182,0.3)]",
    icon: "🎙️",
    quote: "Procrastination at its peak!",
    photoUrl: "/team/zachariah_bobby.jpg",
  },
  {
    id: "anchor-03",
    slotNumber: "16",
    name: "Triguna Khati",
    domain: "Anchor",
    role: "Anchor",
    category: "docs_anchor",
    affiliation: "Anchoring Guild · SIT Pune",
    badge: "ANCHOR",
    badgeColor:
      "border-pink-400 text-pink-300 bg-pink-950/60 shadow-[0_0_8px_rgba(244,114,182,0.3)]",
    icon: "🎙️",
    quote:
      "A work in progress with main-character energy, but the plot is getting interesting.",
    photoUrl: "/team/triguna_khati.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/triguna-khati-6553a4411?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },

  // ==========================================
  // TIER 5: MEDIA, CREATIVE & EDITORIAL
  // ==========================================
  {
    id: "social-01",
    slotNumber: "17",
    name: "Arhan Nair",
    domain: "Social Media",
    role: "Social Media",
    category: "media_creative",
    affiliation: "Media & Outreach Guild · SIT Pune",
    badge: "SOCIAL MEDIA",
    badgeColor:
      "border-violet-400 text-violet-300 bg-violet-950/60 shadow-[0_0_8px_rgba(167,139,250,0.3)]",
    icon: "📱",
    quote: "Ready for cheos",
    photoUrl: "/team/arhan_nair.jpg",
  },
  {
    id: "social-02",
    slotNumber: "18",
    name: "Sukhman Kaur",
    domain: "Social Media",
    role: "Social Media",
    category: "media_creative",
    affiliation: "Media & Outreach Guild · SIT Pune",
    badge: "SOCIAL MEDIA",
    badgeColor:
      "border-violet-400 text-violet-300 bg-violet-950/60 shadow-[0_0_8px_rgba(167,139,250,0.3)]",
    icon: "📱",
    quote: "Trust the plot twist✨",
    photoUrl: "/team/sukhman_kaur.jpg",
  },
  {
    id: "editor-01",
    slotNumber: "19",
    name: "Gaurav Singh Verma",
    domain: "Editor",
    role: "Editor",
    category: "media_creative",
    affiliation: "Editorial Guild · SIT Pune",
    badge: "EDITOR",
    badgeColor:
      "border-indigo-400 text-indigo-300 bg-indigo-950/60 shadow-[0_0_8px_rgba(129,140,248,0.3)]",
    icon: "🎬",
  },
  {
    id: "photo-01",
    slotNumber: "20",
    name: "Samik Dorlikar",
    domain: "Photographers",
    role: "Photographer",
    category: "media_creative",
    affiliation: "Photography Guild · SIT Pune",
    badge: "PHOTO",
    badgeColor:
      "border-teal-400 text-teal-300 bg-teal-950/60 shadow-[0_0_8px_rgba(45,212,191,0.3)]",
    icon: "📷",
    quote: "“Capturing moments, one frame at a time.” 📸",
    photoUrl: "/team/samik_dorlikar.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/samik-dorlikar-b67356386?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
  },
  {
    id: "photo-02",
    slotNumber: "21",
    name: "Srishti Raj",
    domain: "Photographers",
    role: "Photographer",
    category: "media_creative",
    affiliation: "Photography Guild · SIT Pune",
    badge: "PHOTO",
    badgeColor:
      "border-teal-400 text-teal-300 bg-teal-950/60 shadow-[0_0_8px_rgba(45,212,191,0.3)]",
    icon: "📷",
  },
  {
    id: "photo-03",
    slotNumber: "22",
    name: "Akshit Joglekar",
    domain: "Photographers",
    role: "Photographer",
    category: "media_creative",
    affiliation: "Photography Guild · SIT Pune",
    badge: "PHOTO",
    badgeColor:
      "border-teal-400 text-teal-300 bg-teal-950/60 shadow-[0_0_8px_rgba(45,212,191,0.3)]",
    icon: "📷",
    quote:
      "The only person at Synapse 2026 who focus on something other than a laptop screen.",
    photoUrl: "/team/akshit_joglekar.png",
    linkedinUrl:
      "https://www.linkedin.com/in/akshit-joglekar-5623b5422?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: "decoration-01",
    slotNumber: "23",
    name: "Krishita Biradar",
    domain: "Decoration",
    role: "Decoration",
    category: "media_creative",
    affiliation: "Creative & Decor Crew · SIT Pune",
    badge: "DECOR",
    badgeColor:
      "border-amber-300 text-amber-200 bg-amber-950/60 shadow-[0_0_8px_rgba(252,211,77,0.3)]",
    icon: "✨",
    quote: "Explorer",
    photoUrl: "/team/krishita_biradar.jpg",
    linkedinUrl:
      "https://www.linkedin.com/in/krishita-biradar-429941415?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
];

const categories: { id: Category; label: string; count: number }[] = [
  { id: "all", label: "ALL GUILDS", count: teamMembers.length },
  {
    id: "heads",
    label: "HEADS",
    count: teamMembers.filter((m) => m.category === "heads").length,
  },
  {
    id: "tech_design",
    label: "TECH & DESIGN",
    count: teamMembers.filter((m) => m.category === "tech_design").length,
  },
  {
    id: "events_logistics",
    label: "EVENTS & LOGISTICS",
    count: teamMembers.filter((m) => m.category === "events_logistics").length,
  },
  {
    id: "docs_anchor",
    label: "DOCS & ANCHOR",
    count: teamMembers.filter((m) => m.category === "docs_anchor").length,
  },
  {
    id: "media_creative",
    label: "MEDIA & CREATIVE",
    count: teamMembers.filter((m) => m.category === "media_creative").length,
  },
];

function getCandidateImageUrls(url?: string): string[] {
  if (!url) return [];
  const driveIdMatch =
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (driveIdMatch && driveIdMatch[1]) {
    const id = driveIdMatch[1];
    return [
      `https://lh3.googleusercontent.com/d/${id}`,
      `https://drive.google.com/thumbnail?id=${id}&sz=w800`,
      `https://drive.google.com/uc?export=view&id=${id}`,
    ];
  }
  return [url];
}

function MemberAvatar({
  name,
  photoUrl,
  icon,
  isPlaceholder,
  isHead,
}: {
  name: string;
  photoUrl?: string;
  icon: string;
  isPlaceholder?: boolean;
  isHead?: boolean;
}) {
  const candidates = getCandidateImageUrls(photoUrl);
  const [candidateIndex, setCandidateIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const currentSrc = candidates[candidateIndex];

  const handleError = () => {
    if (candidateIndex < candidates.length - 1) {
      setCandidateIndex((prev) => prev + 1);
    } else {
      setHasError(true);
    }
  };

  if (isPlaceholder || !photoUrl || hasError) {
    return (
      <div
        className={`aspect-square w-full max-w-[130px] mx-auto border-2 ${
          isPlaceholder
            ? "border-dashed border-amber-500/50 bg-amber-950/20"
            : "border-dashed border-stone-700/80 group-hover:border-cyan-400/80 bg-stone-950/80"
        } flex flex-col items-center justify-center gap-2 p-3 transition-colors shadow-inner`}
      >
        <span
          className={`text-3xl filter ${
            isHead
              ? "drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]"
              : "drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]"
          }`}
        >
          {icon}
        </span>
        <div className="text-center">
          <div
            className={`font-hud text-[10px] tracking-widest ${
              isPlaceholder ? "text-amber-300/80" : "text-cyan-300/80"
            }`}
          >
            {isPlaceholder ? "[ RESERVED ]" : name.slice(0, 2).toUpperCase()}
          </div>
          <div className="text-[9px] font-mono text-foreground/40 mt-0.5">
            {isPlaceholder ? "HEAD POSITION" : "MEMBER"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative aspect-square w-full max-w-[130px] mx-auto border-2 ${
        isHead
          ? "border-amber-400/70 group-hover:border-amber-300 shadow-[0_0_14px_rgba(251,191,36,0.3)]"
          : "border-cyan-500/40 group-hover:border-cyan-400 shadow-[0_0_12px_rgba(0,229,255,0.15)]"
      } overflow-hidden bg-stone-950 transition-all group-hover:shadow-[0_0_18px_rgba(0,229,255,0.35)]`}
    >
      <img
        src={currentSrc}
        alt={name}
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
        onError={handleError}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div
      className={`biome-card group relative p-4 flex flex-col justify-between border-2 transition-all duration-200 ${
        member.isHead
          ? "border-amber-500/60 hover:border-amber-400 bg-gradient-to-b from-amber-950/20 via-stone-950/90 to-stone-950 shadow-[0_0_20px_rgba(251,191,36,0.1)] hover:shadow-[0_0_25px_rgba(251,191,36,0.25)]"
          : "border-stone-800 hover:border-cyan-400 bg-stone-950/80 hover:bg-stone-900/60"
      }`}
    >
      {/* TOP CARD BAR */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span
          className={`font-hud text-[11px] font-bold tracking-wider ${
            member.isHead ? "text-amber-300" : "text-cyan-400"
          }`}
        >
          SLOT #{member.slotNumber}
        </span>
        <span
          className={`text-[9px] px-2 py-0.5 font-hud font-bold uppercase border ${member.badgeColor}`}
        >
          {member.badge}
        </span>
      </div>

      {/* AVATAR */}
      <div className="my-2">
        <MemberAvatar
          name={member.name}
          photoUrl={member.photoUrl}
          icon={member.icon}
          isPlaceholder={member.isPlaceholder}
          isHead={member.isHead}
        />
      </div>

      {/* MEMBER DETAILS */}
      <div className="mt-3 text-center flex-1 flex flex-col justify-start">
        <h3
          className={`font-display font-semibold text-base transition-colors ${
            member.isHead
              ? "text-amber-100 group-hover:text-amber-300"
              : "text-foreground group-hover:text-cyan-200"
          }`}
        >
          {member.name}
        </h3>
        <p
          className={`mt-0.5 text-xs font-hud font-medium ${
            member.isHead ? "text-amber-400/90" : "text-cyan-400/90"
          }`}
        >
          {member.role}
        </p>
        <p className="mt-1 text-[11px] text-foreground/60 font-sans leading-tight">
          {member.affiliation}
        </p>

        {/* YEARBOOK QUOTE */}
        {member.quote && (
          <div className="mt-3 px-2.5 py-1.5 bg-stone-900/80 border-l-2 border-cyan-400/80 text-left rounded-sm">
            <p className="text-[11px] font-mono text-cyan-200/90 italic leading-snug">
              &ldquo;{member.quote.replace(/^["“]|["”]$/g, "")}&rdquo;
            </p>
          </div>
        )}
      </div>

      {/* BOTTOM SOCIALS / ACTION BAR */}
      <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-center gap-2">
        {member.linkedinUrl ? (
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-hud border border-cyan-500/50 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400 hover:bg-cyan-900/60 hover:text-white transition-all shadow-[0_0_8px_rgba(0,229,255,0.2)]"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.89 0-1.61.72-1.61 1.61 0 .89.72 1.61 1.61 1.61.89 0 1.61-.72 1.61-1.61 0-.89-.72-1.61-1.61-1.61Z" />
            </svg>
            <span>LINKEDIN ↗</span>
          </a>
        ) : member.instagramUrl ? (
          <a
            href={member.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-hud border border-pink-500/50 bg-pink-950/40 text-pink-300 hover:border-pink-400 hover:bg-pink-900/60 hover:text-white transition-all shadow-[0_0_8px_rgba(244,114,182,0.2)]"
          >
            <span>INSTAGRAM ↗</span>
          </a>
        ) : (
          <div className="text-[10px] font-hud text-foreground/30 px-2 py-0.5 border border-stone-800/60 bg-stone-900/20">
            {member.isPlaceholder ? "RESERVED" : "PROFILE"}
          </div>
        )}
      </div>
    </div>
  );
}

function TeamPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const headsList = teamMembers.filter((m) => m.category === "heads");
  const nonHeadsList = teamMembers.filter((m) => m.category !== "heads");

  const filteredMembers =
    activeCategory === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.category === activeCategory);

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
            <span className="font-display font-bold text-sm tracking-wide">
              SYNAPSE 1.0
            </span>
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
      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-24">
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
            The visionary heads, engineers, organizers, and creative minds behind{" "}
            <span className="text-cyan-300 font-semibold">Synapse 1.0</span> at
            Symbiosis Institute of Technology (SIT), Pune.
          </p>

        </div>

        {/* HIERARCHICAL TIER 1: THE HEADS SHOWCASE (ALWAYS DISPLAYED AT THE TOP ON 'ALL' OR 'HEADS' VIEW) */}
        {(activeCategory === "all" || activeCategory === "heads") && (
          <section className="mt-14 pt-6 border-t border-amber-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xl">👑</span>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-amber-300 tracking-wide">
                    HACKATHON HEADS & LEADERSHIP
                  </h2>
                  <p className="text-xs font-hud text-amber-200/70">
                    TIER 01 // OVERALL SYNAPSE 1.0 DIRECTORS & CONVENERS
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {headsList.map((head) => (
                <MemberCard key={head.id} member={head} />
              ))}
            </div>
          </section>
        )}

        {/* CATEGORY FILTER TABS */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-2">
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
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* TIER 2: DOMAIN GUILD MEMBERS GRID */}
        {activeCategory !== "heads" && (
          <section className="mt-8">
            {activeCategory === "all" && (
              <div className="flex items-center gap-2 mb-6">
                <span className="text-lg">🛡️</span>
                <h2 className="font-display text-lg sm:text-xl font-bold text-cyan-300 tracking-wide">
                  DOMAIN GUILDS & TEAMS
                </h2>
                <span className="text-xs font-hud text-foreground/50 ml-2">
                  TIER 02 // TECH, DESIGN, EVENTS, LOGISTICS & MEDIA
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {(activeCategory === "all" ? nonHeadsList : filteredMembers).map(
                (member) => (
                  <MemberCard key={member.id} member={member} />
                )
              )}
            </div>
          </section>
        )}

        {/* BOTTOM CALLOUT / JOIN GUILD CARD */}
        <div className="mt-20 biome-card p-6 sm:p-8 text-center max-w-2xl mx-auto border-cyan-500/30 bg-stone-950/70">
          <div className="text-2xl mb-2">🤝</div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            WANT TO JOIN THE GUILD?
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-foreground/75 font-sans leading-relaxed">
            Interested in volunteering, community outreach, or partnering for future
            editions of Synapse? Connect with the student leadership team at SIT
            Pune.
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
