import React from 'react';
import { Link } from '@tanstack/react-router';

export function Footer() {
  return (
    <footer className="border-t mt-16" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--ink-2)' }}>
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 sm:grid-cols-[1fr_auto_auto]">
        <div>
          <Link to="/" className="flex items-baseline gap-2">
            <span className="display text-xl" style={{ color: 'var(--paper)' }}>OMZ</span>
            <span className="display text-xl" style={{ color: 'var(--flame)' }}>SPORTS</span>
          </Link>
          <p className="mt-3 text-sm font-serif" style={{ color: 'var(--muted)' }}>
            Every sport. Every day. Latest news, transfers, scores and highlights from around the world.
          </p>
        </div>
        <div>
          <p className="kicker text-[0.62rem] mb-4" style={{ color: 'var(--muted)' }}>Sections</p>
          <ul className="space-y-2">
            {['Football', 'Basketball', 'Tennis', 'Transfers'].map(cat => (
              <li key={cat}>
                <Link to="/category/$category" params={{ category: cat }}
                  className="text-sm transition-colors hover:text-[var(--paper)]"
                  style={{ color: 'var(--muted)' }}>
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker text-[0.62rem] mb-4" style={{ color: 'var(--muted)' }}>Partner with us</p>
          <ul className="space-y-2">
            <li>
              <Link to="/advertise"
                className="text-sm transition-colors hover:text-[var(--paper)]"
                style={{ color: 'var(--muted)' }}>
                Advertise & Sponsorships
              </Link>
            </li>
            <li>
              <a href="mailto:contact@omzsports.com"
                className="text-sm transition-colors hover:text-[var(--paper)]"
                style={{ color: 'var(--muted)' }}>
                contact@omzsports.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t mx-auto max-w-6xl px-4 py-4" style={{ borderColor: 'var(--line)' }}>
        <p className="text-xs" style={{ color: 'var(--muted-2)' }}>
          © 2026 OMZ Sports. Editorial coverage is produced independently of commercial partnerships.
        </p>
      </div>
    </footer>
  );
}
