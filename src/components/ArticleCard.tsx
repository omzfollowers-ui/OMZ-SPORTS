import React from 'react';
import { Link } from '@tanstack/react-router';
import type { Post } from '../routeTree';

interface ArticleCardProps {
  post: Post;
  layout?: 'card' | 'horizontal';
}

export function ArticleCard({ post, layout = 'card' }: ArticleCardProps) {
  const readTime = Math.max(1, Math.ceil(post.content.split(' ').length / 200));

  if (layout === 'horizontal') {
    return (
      <Link to="/posts/$slug" params={{ slug: post.slug }}
        className="group flex items-start gap-6 rounded-2xl border p-6 transition-colors hover:border-[var(--flame)]/40"
        style={{ borderColor: 'var(--line)', backgroundColor: 'var(--ink-2)' }}>
        <div className="display text-5xl w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-lg"
          style={{ backgroundColor: 'var(--ink-3)', color: 'var(--flame)' }}>
          {post.categories[0][0]}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {post.categories.map(cat => (
              <span key={cat} className="kicker text-[0.58rem]" style={{ color: 'var(--flame)' }}>{cat}</span>
            ))}
            <span className="kicker text-[0.58rem]" style={{ color: 'var(--muted)' }}>{readTime} min read</span>
          </div>
          <h3 className="font-serif text-xl group-hover:text-[var(--flame)] transition-colors"
            style={{ color: 'var(--paper)' }}>
            {post.title}
          </h3>
          <p className="mt-2 text-sm font-serif line-clamp-2" style={{ color: 'var(--muted)' }}>
            {post.summary}
          </p>
          <p className="kicker mt-3 text-[0.58rem]" style={{ color: 'var(--muted-2)' }}>
            {post.author} · {post.date}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link to="/posts/$slug" params={{ slug: post.slug }}
      className="group flex flex-col rounded-2xl border overflow-hidden transition-colors hover:border-[var(--flame)]/40"
      style={{ borderColor: 'var(--line)', backgroundColor: 'var(--ink-2)' }}>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          {post.sponsored && (
            <span className="kicker text-[0.55rem] rounded-full px-2 py-0.5"
              style={{ backgroundColor: 'var(--gold)', color: 'var(--ink)' }}>
              Sponsored
            </span>
          )}
          {post.categories.map(cat => (
            <span key={cat} className="kicker text-[0.58rem]" style={{ color: 'var(--flame)' }}>{cat}</span>
          ))}
          <span className="kicker text-[0.58rem] ml-auto" style={{ color: 'var(--muted)' }}>
            {readTime} min read
          </span>
        </div>
        <h3 className="font-serif text-xl group-hover:text-[var(--flame)] transition-colors flex-1"
          style={{ color: 'var(--paper)' }}>
          {post.title}
        </h3>
        <p className="mt-3 text-sm font-serif line-clamp-3" style={{ color: 'var(--muted)' }}>
          {post.summary}
        </p>
        <p className="kicker mt-4 text-[0.58rem]" style={{ color: 'var(--muted-2)' }}>
          {post.author} · {post.date}
        </p>
      </div>
    </Link>
  );
}
