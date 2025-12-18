"use client";

import { useState } from "react";
import { LyricToken } from "@/types";

interface TokenSpanProps {
  token: LyricToken;
  showPinyin: boolean;
  onHover: (token: LyricToken | null, x: number, y: number) => void;
  fontSize: number;
}

export default function TokenSpan({
  token,
  showPinyin,
  onHover,
  fontSize,
}: TokenSpanProps) {
  const [isActive, setIsActive] = useState(false);

  const updatePosition = (e: React.MouseEvent | React.TouchEvent) => {
    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const bottomY = rect.bottom;
    onHover(token, centerX, bottomY);
    setIsActive(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    updatePosition(e);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    updatePosition(e);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isActive) {
      updatePosition(e);
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    onHover(null, 0, 0);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    setTimeout(() => {
      setIsActive(false);
      onHover(null, 0, 0);
    }, 3000);
  };

  return (
    <span
      className="inline-block cursor-pointer touch-manipulation"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ minHeight: '44px', display: 'inline-flex', flexDirection: 'column', justifyContent: 'flex-start' }}
    >
      <span className={`${isActive ? 'underline' : 'hover:underline'}`}>{token.t}</span>
      {showPinyin && (
        <span
          className="block text-gray-500 leading-tight mt-0.5"
          style={{ fontSize: `${fontSize * 0.6}px` }}
        >
          {token.py}
        </span>
      )}
    </span>
  );
}

