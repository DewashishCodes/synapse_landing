import { createFileRoute } from "@tanstack/react-router";

import { HackScene } from "@/components/hack/HackScene";
import { Overlay } from "@/components/hack/Overlay";
import { SiteLoader } from "@/components/hack/SiteLoader";
import { useScrollProgress } from "@/components/hack/useScrollProgress";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Synapse 1.0 | SIT Flagship Hackathon 2026 | 8-Hour AI Hackathon" },
      {
        name: "description",
        content:
          "Synapse 1.0 | SIT Flagship Hackathon 2026: 8-Hour offline AI Hackathon at Symbiosis Institute of Technology (SIT), Pune in association with IEEE Student Branch, SIT Pune.",
      },
      {
        property: "og:title",
        content: "Synapse 1.0 | SIT Flagship Hackathon 2026 | 8-Hour AI Hackathon",
      },
      {
        property: "og:description",
        content:
          "Symbiosis Institute of Technology (SIT), Pune presents Synapse 1.0 — 8-Hour offline AI hackathon. Team size 2-4.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useScrollProgress();
  return (
    <>
      <SiteLoader />
      <HackScene />
      <Overlay />
    </>
  );
}
