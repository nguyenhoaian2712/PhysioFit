import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const Sparkles: React.FC<{ enabled?: boolean }> = ({ enabled = true }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!enabled) {
      setParticles([]);
      return;
    }

    // Generate gentle particles
    const items: Particle[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 3,
      duration: Math.random() * 6 + 6,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.4 + 0.15
    }));
    setParticles(items);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-gradient-to-r from-[#C7DFA3] via-[#89B9E6] to-[#D9F0FF] animate-pulse"
          style={{
            top: `${p.y}%`,
            left: `${p.x}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            filter: 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
};
