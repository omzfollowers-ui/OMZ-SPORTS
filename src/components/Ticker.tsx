import React from 'react';

interface TickerProps {
  headlines: string[];
}

export function Ticker({ headlines }: TickerProps) {
  const doubled = [...headlines, ...headlines];

  return (
    <div className="ticker overflow-hidden border-b" style={{ backgroundColor: 'var(--ink-2)', borderColor: 'var(--line)' }}>
      <div className="mx-auto flex max-w-6xl items-center">
        <span className="kicker z-10 shrink-0 px-4 py-2.5 text-[0.62rem] text-black"
          style={{ backgroundColor: 'var(--flame)' }}>
          Breaking
        </span>
        <div className="relative overflow-hidden py-2.5">
          <div className="ticker-track">
            {doubled.map((h, i) => (
              <span key={i} className="mx-6 text-sm" style={{ color: 'var(--muted)' }}>
                <span className="mr-2" style={{ color: 'var(--flame)' }}>●</span>
                {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
