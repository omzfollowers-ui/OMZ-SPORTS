import React from 'react';
import { Link } from '@tanstack/react-router';

const CATEGORIES = ['Football', 'Basketball', 'Tennis', 'Transfers'];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b backdrop-blur-md"
      style={{ borderColor: 'var(--line)', backgroundColor: 'rgba(12,13,17,0.85)' }}>
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link to="/" className="group flex items-baseline gap-2">
          <span className="display text-2xl tracking-tight" style={{ color: 'var(--paper)' }}>OMZ</span>
          <span className="display text-2xl tracking-tight transition-transform group-hover:translate-x-0.5"
            style={{ color: 'var(--flame)' }}>SPORTS</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-1 md:flex">
          {CATEGORIES.map(cat => (
            <Link key={cat} to="/category/$category" params={{ category: cat }}
              className="kicker rounded-full px-3 py-2 text-[0.66rem] transition-colors hover:text-[var(--paper)]"
              style={{ color: 'var(--muted)' }}>
              {cat}
            </Link>
          ))}
        </nav>
        <Link to="/advertise"
          className="kicker ml-auto rounded-full px-4 py-2 text-[0.66rem] text-black transition-transform hover:-translate-y-0.5 md:ml-2"
          style={{ backgroundColor: 'var(--flame)' }}>
          Advertise
        </Link>
      </div>
    </header>
  );
}
