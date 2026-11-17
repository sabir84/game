import React from 'react';

interface ConfettiBurstProps {
  active: boolean;
}

const PIECES = [
  { left: '8%', delay: '0ms', color: '#D49B2A', size: 'w-2 h-3' },
  { left: '16%', delay: '90ms', color: '#156B49', size: 'w-2.5 h-2.5' },
  { left: '24%', delay: '40ms', color: '#EAB308', size: 'w-2 h-3' },
  { left: '33%', delay: '130ms', color: '#B45309', size: 'w-2 h-2' },
  { left: '42%', delay: '20ms', color: '#145C43', size: 'w-2.5 h-3' },
  { left: '51%', delay: '110ms', color: '#F59E0B', size: 'w-2 h-2.5' },
  { left: '60%', delay: '60ms', color: '#0F766E', size: 'w-2.5 h-2.5' },
  { left: '69%', delay: '150ms', color: '#D97706', size: 'w-2 h-3' },
  { left: '78%', delay: '30ms', color: '#156B49', size: 'w-2 h-2' },
  { left: '88%', delay: '100ms', color: '#FBBF24', size: 'w-2.5 h-3' },
];

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({ active }) => {
  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <style>{`
        @keyframes oasis-confetti-fall {
          0% {
            transform: translate3d(0, -24px, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate3d(18px, 90vh, 0) rotate(320deg);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .oasis-confetti-piece {
            animation: none !important;
            display: none;
          }
        }
      `}</style>
      {PIECES.map((piece, idx) => (
        <span
          key={idx}
          className={`oasis-confetti-piece absolute top-0 rounded-sm ${piece.size}`}
          style={{
            left: piece.left,
            backgroundColor: piece.color,
            animation: `oasis-confetti-fall 1.8s cubic-bezier(0.2, 0.8, 0.3, 1) ${piece.delay} forwards`,
          }}
        />
      ))}
    </div>
  );
};
