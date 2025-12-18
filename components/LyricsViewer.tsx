"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { LyricSection, LyricToken } from "@/types";
import TokenSpan from "./TokenSpan";
import Tooltip from "./Tooltip";

interface LyricsViewerProps {
  sections: LyricSection[];
  showPinyin: boolean;
  showTranslations: boolean;
  fontSize: number;
}

export default function LyricsViewer({
  sections,
  showPinyin,
  showTranslations,
  fontSize,
}: LyricsViewerProps) {
  const [hoveredToken, setHoveredToken] = useState<LyricToken | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringTooltipRef = useRef(false);

  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleTokenHover = useCallback(
    (token: LyricToken | null, x: number, y: number) => {
      clearHideTimeout();

      if (token) {
        setHoveredToken(token);
        setTooltipPos({ x, y });
        isHoveringTooltipRef.current = false;
      } else if (!isHoveringTooltipRef.current) {
        hideTimeoutRef.current = setTimeout(() => {
          if (!isHoveringTooltipRef.current) {
            setHoveredToken(null);
          }
        }, 100);
      }
    },
    []
  );

  const handleTooltipEnter = useCallback(() => {
    isHoveringTooltipRef.current = true;
    clearHideTimeout();
  }, []);

  const handleTooltipLeave = useCallback(() => {
    isHoveringTooltipRef.current = false;
    hideTimeoutRef.current = setTimeout(() => {
      setHoveredToken(null);
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  const filteredSections = sections.map((section) => ({
    ...section,
    lines: section.lines.filter((line) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return line.tokens.some(
        (token) =>
          token.t.toLowerCase().includes(query) ||
          token.py.toLowerCase().includes(query)
      );
    }),
  })).filter((section) => section.lines.length > 0);

  return (
    <div className="w-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search lyrics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-6 pb-20">
        {filteredSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <div className="text-sm font-semibold text-gray-600 mb-2 uppercase">
              {section.label}
            </div>
            <div className="space-y-4">
              {section.lines.map((line, lineIndex) => (
                <div key={lineIndex} className="space-y-1">
                  <div
                    className="leading-relaxed flex flex-wrap gap-x-2 gap-y-1"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {line.tokens.map((token, tokenIndex) => (
                      <TokenSpan
                        key={tokenIndex}
                        token={token}
                        showPinyin={showPinyin}
                        onHover={handleTokenHover}
                        fontSize={fontSize}
                      />
                    ))}
                  </div>
                  {showTranslations && (line.en || line.vi) && (
                    <div className="text-sm text-gray-600 space-y-0.5 ml-1">
                      {line.en && (
                        <div><span className="text-gray-500">EN:</span> {line.en}</div>
                      )}
                      {line.vi && (
                        <div><span className="text-gray-500">VI:</span> {line.vi}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hoveredToken && (
        <>
          <Tooltip
            token={hoveredToken}
            showTranslations={showTranslations}
            x={tooltipPos.x}
            y={tooltipPos.y}
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          />
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => {
              setHoveredToken(null);
            }}
          />
        </>
      )}
    </div>
  );
}

