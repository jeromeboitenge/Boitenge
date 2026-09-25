'use client';

import { useState, useEffect } from 'react';

interface TypewriterProps {
  words: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function Typewriter({
  words,
  className = '',
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 1800,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (subIndex === words[index].length && !deleting) {
      const timeout = setTimeout(() => setDeleting(true), pauseTime);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pauseTime, mounted]);

  if (!mounted) {
    return <span className={className}>{words[0]}</span>;
  }

  return (
    <span className={className} aria-label={words[index]}>
      {words[index].substring(0, subIndex)}
      <span className="inline-block w-0.5 h-[0.9em] align-middle bg-primary ml-0.5 animate-pulse" aria-hidden="true" />
    </span>
  );
}