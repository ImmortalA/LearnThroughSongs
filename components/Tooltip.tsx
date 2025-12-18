"use client";

import { LyricToken } from "@/types";

interface TooltipProps {
  token: LyricToken | null;
  showTranslations: boolean;
  x: number;
  y: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function Tooltip({ token, showTranslations, x, y, onMouseEnter, onMouseLeave }: TooltipProps) {
  if (!token) return null;

  const verticalOffset = 8;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const tooltipWidth = isMobile ? Math.min(280, window.innerWidth - 20) : 280;
  const padding = 10;
  const tooltipHeight = showTranslations && token.hv ? 180 : 150;

  let adjustedY = y + verticalOffset;
  let leftPosition = x;

  if (typeof window !== 'undefined') {
    const halfWidth = tooltipWidth / 2;

    if (x - halfWidth < padding) {
      leftPosition = padding + halfWidth;
    } else if (x + halfWidth > window.innerWidth - padding) {
      leftPosition = window.innerWidth - padding - halfWidth;
    }

    if (adjustedY + tooltipHeight > window.innerHeight - padding) {
      adjustedY = y - tooltipHeight - verticalOffset;
    }
    if (adjustedY < padding) {
      adjustedY = padding;
    }
  }

  return (
    <div
      className="fixed z-50 bg-gray-900 text-white p-3 rounded shadow-lg pointer-events-auto"
      style={{
        left: `${leftPosition}px`,
        top: `${adjustedY}px`,
        width: `${tooltipWidth}px`,
        boxSizing: 'border-box',
        transform: 'translateX(-50%)',
        WebkitTransform: 'translateX(-50%)',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="text-lg font-semibold mb-1">{token.t}</div>
      <div className="text-sm text-gray-300 mb-2">{token.py}</div>
      {showTranslations && (
        <div className="space-y-1 pt-2 border-t border-gray-700">
          {token.hv && (
            <div className="text-sm">
              <span className="text-gray-400">HV:</span> {token.hv}
            </div>
          )}
          <div className="text-sm">
            <span className="text-gray-400">EN:</span> {token.en}
          </div>
          <div className="text-sm">
            <span className="text-gray-400">VI:</span> {token.vi}
          </div>
        </div>
      )}
    </div>
  );
}

