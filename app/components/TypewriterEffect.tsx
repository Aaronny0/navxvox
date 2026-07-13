"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function TypewriterEffect({
  words,
  typingSpeed = 80,
  deletingSpeed = 50,
  pauseTime = 2000,
}: TypewriterEffectProps) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentWord.substring(0, text.length - 1)
              : currentWord.substring(0, text.length + 1)
          );
        },
        isDeleting ? deletingSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span>
      <span className="nv-text-gradient-hero">{text}</span>
      <span
        style={{
          display: "inline-block",
          width: "3px",
          height: "1em",
          background: "var(--nv-accent-violet)",
          marginLeft: "2px",
          verticalAlign: "text-bottom",
          animation: "blink 0.8s infinite",
        }}
      />
    </span>
  );
}
