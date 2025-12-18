"use client";

import { SongProvider } from "@/types";

interface SongPlayerProps {
  provider: SongProvider;
}

export default function SongPlayer({ provider }: SongPlayerProps) {
  if (provider.type !== "youtube") {
    return <div>Unsupported provider: {provider.type}</div>;
  }

  const embedUrl = `https://www.youtube.com/embed/${provider.id}`;

  return (
    <div className="w-full aspect-video">
      <iframe
        src={embedUrl}
        title="Song Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded"
      />
    </div>
  );
}
