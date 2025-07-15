"use client";

import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";

interface WordType {
  text: string | React.ReactNode; // Allow React nodes (like icons)
  className?: string;
  delay?: number;
}

interface CustomTypewriterEffectProps {
  words: WordType[];
  cursorClassName?: string;
  delay?: number;
}

export const CustomTypewriterEffect = ({
  words,
  cursorClassName = "",
  delay = 0,
}: CustomTypewriterEffectProps) => {
  const [displayedText, setDisplayedText] = useState<(string | React.ReactNode)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= words.length) return;

    const currentWord = words[currentIndex];
    const timeout = setTimeout(() => {
      setDisplayedText((prev) => [...prev, currentWord.text]);
      setCurrentIndex((prev) => prev + 1);
    }, currentWord.delay || 100 + delay);

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, words]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {displayedText.map((item, index) => (
        <span key={index} className={words[index]?.className || ""}>
          {item}
        </span>
      ))}
      <span className={`ml-1 h-6 w-1 bg-white ${cursorClassName}`} />
    </div>
  );
};