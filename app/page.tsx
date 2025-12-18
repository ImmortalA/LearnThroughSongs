"use client";

import { useState, useEffect } from "react";
import SongData from "@/data/huanghun.json";
import { SongData as SongDataType } from "@/types";
import SongPlayer from "@/components/SongPlayer";
import LyricsViewer from "@/components/LyricsViewer";

export default function Home() {
  const [songData] = useState<SongDataType>(SongData as SongDataType);
  const [showPinyin, setShowPinyin] = useState(true);
  const [showTranslations, setShowTranslations] = useState(true);
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const savedShowPinyin = localStorage.getItem("showPinyin");
    const savedShowTranslations = localStorage.getItem("showTranslations");
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedShowPinyin !== null) {
      setShowPinyin(savedShowPinyin === "true");
    }
    if (savedShowTranslations !== null) {
      setShowTranslations(savedShowTranslations === "true");
    }
    if (savedFontSize !== null) {
      setFontSize(Number(savedFontSize));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("showPinyin", showPinyin.toString());
  }, [showPinyin]);

  useEffect(() => {
    localStorage.setItem("showTranslations", showTranslations.toString());
  }, [showTranslations]);

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize.toString());
  }, [fontSize]);

  return (
    <main className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {songData.title}
          </h1>
          <p className="text-base md:text-lg text-gray-600">{songData.artist}</p>
        </header>

        <div className="mb-4 md:mb-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
          <label className="flex items-center gap-2 cursor-pointer touch-manipulation" style={{ minHeight: '44px' }}>
            <input
              type="checkbox"
              checked={showPinyin}
              onChange={(e) => setShowPinyin(e.target.checked)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-gray-700 text-sm sm:text-base">Show Pinyin</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer touch-manipulation" style={{ minHeight: '44px' }}>
            <input
              type="checkbox"
              checked={showTranslations}
              onChange={(e) => setShowTranslations(e.target.checked)}
              className="w-5 h-5 cursor-pointer"
            />
            <span className="text-gray-700 text-sm sm:text-base">Show Translations</span>
          </label>
          <label className="flex items-center gap-2 touch-manipulation" style={{ minHeight: '44px' }}>
            <span className="text-gray-700 text-sm sm:text-base">Font Size:</span>
            <input
              type="range"
              min="12"
              max="32"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-24 sm:w-32 cursor-pointer"
            />
            <span className="text-gray-700 text-sm w-10">{fontSize}px</span>
          </label>
        </div>

        <div className="flex flex-col gap-6 md:gap-8">
          <div className="w-full">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Song Player</h2>
            <SongPlayer provider={songData.provider} />
          </div>

          <div className="w-full">
            <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Lyrics</h2>
            <LyricsViewer
              sections={songData.sections}
              showPinyin={showPinyin}
              showTranslations={showTranslations}
              fontSize={fontSize}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

