import { createFileRoute, Link } from "@tanstack/react-router";

import { SHORTLISTED_TEAMS_DATA, ShortlistedTeamNodeCard } from "@/components/hack/Overlay";

const UNSTOP_REGISTER_URL =
  "https://unstop.com/hackathons/sit-flagship-hackathon-2026-8-hour-ai-hackathon-symbiosis-institute-of-technology-sit-pune-1746836";

export const Route = createFileRoute("/shortlisted-teams")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Shortlisted Teams | Synapse 1.0 | SIT Flagship Hackathon 2026" },
      {
        name: "description",
        content:
          "The 68 teams shortlisted for the Synapse 1.0 offline Grand Finale at Symbiosis Institute of Technology (SIT), Pune.",
      },
      {
        property: "og:title",
        content: "Shortlisted Teams | Synapse 1.0 | SIT Flagship Hackathon 2026",
      },
      {
        property: "og:description",
        content: "68 teams shortlisted for the Synapse 1.0 offline Grand Finale at SIT Pune.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ShortlistedTeamsPage,
});

function ShortlistedTeamsPage() {
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
            "radial-gradient(circle at 50% 10%, rgba(251, 191, 36, 0.15), transparent 60%)",
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
      <main className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-24">
        {/* HERO BANNER */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="badge-pill inline-flex items-center gap-2 mb-4">
            <span className="inline-block w-2 h-2 bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
            <span>NEURAL MATRIX // 68 NODES ACTIVE</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-300 drop-shadow-[0_0_20px_rgba(251,191,36,0.35)]">
            Shortlisted Teams
          </h1>

          <p className="mt-4 text-sm sm:text-base text-foreground/80 font-sans max-w-2xl mx-auto leading-relaxed">
            68 shortlisted teams selected for the{" "}
            <span className="text-amber-300 font-semibold">Synapse 1.0</span> offline Grand Finale
            at SIT Pune.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/40 bg-amber-950/30 text-amber-300 font-hud text-xs tracking-wider shadow-[0_0_12px_rgba(251,191,36,0.15)]">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#fbbf24]" />
            <span>68 / 68 TEAMS SHORTLISTED</span>
          </div>
        </div>

        {/* 68 TEAMS NEURAL MATRIX GRID */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 text-left w-full">
          {SHORTLISTED_TEAMS_DATA.map((slot) => (
            <ShortlistedTeamNodeCard key={slot.id} slot={slot} />
          ))}
        </div>

        {/* BOTTOM CALLOUT */}
        <div className="mt-20 biome-card p-6 sm:p-8 text-center max-w-2xl mx-auto border-amber-500/30 bg-stone-950/70">
          <div className="text-2xl mb-2">🏁</div>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
            See You At The Grand Finale
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-foreground/75 font-sans leading-relaxed">
            All shortlisted teams will compete in the 8-hour offline sprint at SIT Pune. Check the
            timeline for what's next.
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
