import React from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  Link,
  useParams,
  useSearch,
  redirect,
} from '@tanstack/react-router';
import { posts } from 'virtual:posts';
import { marked } from 'marked';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ArticleCard } from './components/ArticleCard';
import { Ticker } from './components/Ticker';
import { AdvertisePage } from './components/AdvertisePage';

// Types
export interface Post {
  title: string;
  summary: string;
  categories: string[];
  date: string;
  author: string;
  sponsored: boolean;
  featured: boolean;
  content: string;
  slug: string;
  filepath: string;
}

const typedPosts = posts as Post[];

// Root layout
const rootRoute = createRootRoute({
  component: () => (
    <div>
      <div className="grain-overlay" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-6xl px-4 py-32 text-center">
      <p className="kicker text-sm" style={{ color: 'var(--flame)' }}>Out of bounds</p>
      <h1 className="display mt-4 text-7xl" style={{ color: 'var(--paper)' }}>404</h1>
      <p className="mt-4 font-serif text-lg" style={{ color: 'var(--muted)' }}>
        That page has left the pitch. Let's get you back in the game.
      </p>
      <Link to="/" className="kicker mt-8 inline-block rounded-full px-6 py-3 text-xs text-black"
        style={{ backgroundColor: 'var(--flame)' }}>
        Back to the feed
      </Link>
    </div>
  ),
});

// Home page
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => {
    const allPosts = typedPosts;
    const lead = allPosts.find(p => !p.sponsored) || allPosts[0];
    const sidebar = allPosts.filter(p => !p.sponsored && p.slug !== lead?.slug).slice(0, 4);
    const feed = allPosts.filter(p => p.slug !== lead?.slug).slice(0, 9);
    const headlines = allPosts.map(p => p.title);

    return (
      <div>
        <Ticker headlines={headlines} />
        <section className="mx-auto max-w-6xl px-4 pt-10">
          <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr]">
            {lead && (
              <Link to="/posts/$slug" params={{ slug: lead.slug }}
                className="group relative overflow-hidden rounded-2xl border rise"
                style={{ borderColor: 'var(--line)', backgroundColor: 'var(--ink-2)' }}>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="kicker text-[0.62rem]" style={{ color: 'var(--flame)' }}>
                      Lead story
                    </span>
                    <span className="kicker text-[0.62rem]" style={{ color: 'var(--muted)' }}>·</span>
                    <span className="kicker text-[0.62rem]" style={{ color: 'var(--muted)' }}>
                      {lead.categories[0]}
                    </span>
                  </div>
                  <h2 className="display text-4xl md:text-5xl mt-3 group-hover:text-[var(--flame)] transition-colors"
                    style={{ color: 'var(--paper)' }}>
                    {lead.title}
                  </h2>
                  <p className="mt-4 font-serif text-lg" style={{ color: 'var(--muted)' }}>
                    {lead.summary}
                  </p>
                  <p className="kicker mt-6 text-[0.62rem]" style={{ color: 'var(--muted-2)' }}>
                    {lead.author} · {lead.date} · {Math.max(1, Math.ceil(lead.content.split(' ').length / 200))} min read
                  </p>
                </div>
              </Link>
            )}
            <div className="flex flex-col">
              <p className="kicker text-[0.62rem] mb-4" style={{ color: 'var(--muted)' }}>Top stories</p>
              <ol className="space-y-4">
                {sidebar.map((post, i) => (
                  <li key={post.slug}>
                    <Link to="/posts/$slug" params={{ slug: post.slug }}
                      className="group flex items-start gap-4 rounded-xl p-3 transition-colors"
                      style={{}}>
                      <span className="display text-3xl w-8 shrink-0" style={{ color: 'var(--line)' }}>
                        {i + 1}
                      </span>
                      <div>
                        <span className="kicker text-[0.58rem]" style={{ color: 'var(--flame)' }}>
                          {post.categories[0]}
                        </span>
                        <h3 className="font-serif text-base mt-1 group-hover:text-[var(--flame)] transition-colors"
                          style={{ color: 'var(--paper)' }}>
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Advertise CTA */}
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="rounded-2xl border p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            style={{ borderColor: 'var(--line)', backgroundColor: 'var(--ink-2)' }}>
            <div>
              <p className="kicker text-[0.62rem] mb-2" style={{ color: 'var(--flame)' }}>Partner with OMZ Sports</p>
              <h2 className="display text-3xl md:text-4xl" style={{ color: 'var(--paper)' }}>
                Reach 4.7M sports fans every month
              </h2>
              <p className="mt-3 font-serif" style={{ color: 'var(--muted)' }}>
                Sponsored editorial, matchday takeovers and newsletter partnerships built with our brand studio.
              </p>
            </div>
            <Link to="/advertise"
              className="kicker shrink-0 rounded-full px-6 py-3 text-[0.62rem] text-black transition-transform hover:-translate-y-0.5"
              style={{ backgroundColor: 'var(--flame)' }}>
              Get a media deal →
            </Link>
          </div>
        </section>

        {/* Feed */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="flex items-center gap-4 mb-8 border-b pb-4" style={{ borderColor: 'var(--line)' }}>
            <p className="display text-2xl" style={{ color: 'var(--paper)' }}>The Feed</p>
            {['Football', 'Basketball', 'Tennis', 'Transfers'].map(cat => (
              <Link key={cat} to="/category/$category" params={{ category: cat }}
                className="kicker rounded-full px-3 py-1.5 text-[0.62rem] transition-colors"
                style={{ color: 'var(--muted)', borderColor: 'var(--line)', border: '1px solid' }}>
                {cat}
              </Link>
            ))}
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {feed.map(post => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </div>
    );
  },
});

// Category page
const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/category/$category',
  component: () => {
    const { category } = useParams({ from: '/category/$category' });
    const filtered = typedPosts.filter(p => p.categories.includes(category));

    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10">
          <p className="kicker text-[0.62rem]" style={{ color: 'var(--flame)' }}>Section</p>
          <h1 className="display text-5xl mt-2" style={{ color: 'var(--paper)' }}>{category}</h1>
          <p className="kicker text-[0.62rem] mt-2" style={{ color: 'var(--muted)' }}>
            {filtered.length} {filtered.length === 1 ? 'story' : 'stories'}
          </p>
        </div>
        <div className="space-y-6">
          {filtered.map(post => (
            <ArticleCard key={post.slug} post={post} layout="horizontal" />
          ))}
        </div>
      </div>
    );
  },
});

// Article page
const postRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/posts/$slug',
  component: () => {
    const { slug } = useParams({ from: '/posts/$slug' });
    const post = typedPosts.find(p => p.slug === slug);

    if (!post) {
      return (
        <div className="mx-auto max-w-6xl px-4 py-32 text-center">
          <p className="kicker text-sm" style={{ color: 'var(--flame)' }}>Not found</p>
          <h1 className="display mt-4 text-5xl" style={{ color: 'var(--paper)' }}>Article not found</h1>
          <Link to="/" className="kicker mt-8 inline-block rounded-full px-6 py-3 text-xs text-black"
            style={{ backgroundColor: 'var(--flame)' }}>
            Back to the feed
          </Link>
        </div>
      );
    }

    const related = typedPosts
      .filter(p => p.slug !== post.slug && p.categories.some(c => post.categories.includes(c)))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);

    const html = marked.parse(post.content) as string;
    const readTime = Math.max(1, Math.ceil(post.content.split(' ').length / 200));

    return (
      <div>
        <article className="mx-auto max-w-3xl px-4 py-12">
          <Link to="/category/$category" params={{ category: post.categories[0] }}
            className="kicker text-[0.62rem] mb-6 inline-block"
            style={{ color: 'var(--muted)' }}>
            ← {post.categories[0]}
          </Link>
          {post.sponsored && (
            <p className="kicker text-[0.58rem] mb-4 rounded-full inline-block px-3 py-1"
              style={{ color: 'var(--ink)', backgroundColor: 'var(--gold)' }}>
              Sponsored
            </p>
          )}
          <h1 className="display text-4xl md:text-6xl mt-4 rise" style={{ color: 'var(--paper)' }}>
            {post.title}
          </h1>
          <p className="font-serif text-xl mt-6" style={{ color: 'var(--muted)' }}>
            {post.summary}
          </p>
          <div className="flex items-center gap-3 mt-6 pt-6 border-t" style={{ borderColor: 'var(--line)' }}>
            <span className="display text-2xl w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{ backgroundColor: 'var(--ink-3)', color: 'var(--paper)' }}>
              {post.author[0]}
            </span>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--paper)' }}>{post.author}</p>
              <p className="kicker text-[0.58rem]" style={{ color: 'var(--muted)' }}>
                {post.date} · {readTime} min read
              </p>
            </div>
            {post.categories.map(cat => (
              <Link key={cat} to="/category/$category" params={{ category: cat }}
                className="kicker ml-auto rounded-full px-3 py-1 text-[0.58rem]"
                style={{ backgroundColor: 'var(--ink-3)', color: 'var(--muted)' }}>
                {cat}
              </Link>
            ))}
          </div>
          <div className="article-body mt-10"
            dangerouslySetInnerHTML={{ __html: html }} />

          {/* Advertise CTA */}
          <div className="mt-12 rounded-2xl border p-8"
            style={{ borderColor: 'var(--line)', backgroundColor: 'var(--ink-2)' }}>
            <p className="kicker text-[0.62rem]" style={{ color: 'var(--flame)' }}>Advertise with us</p>
            <p className="font-serif mt-2" style={{ color: 'var(--muted)' }}>
              Want your brand in front of millions of engaged fans? Explore sponsorships and media deals with the OMZ Brand Studio.
            </p>
            <Link to="/advertise"
              className="kicker mt-4 inline-block text-[0.62rem]"
              style={{ color: 'var(--flame)' }}>
              See partnership options →
            </Link>
          </div>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mx-auto max-w-6xl px-4 pb-16">
            <div className="border-t pt-10" style={{ borderColor: 'var(--line)' }}>
              <p className="kicker text-[0.62rem] mb-6" style={{ color: 'var(--muted)' }}>
                More from {post.categories[0]}
              </p>
              <div className="grid gap-6 sm:grid-cols-3">
                {related.map(p => (
                  <ArticleCard key={p.slug} post={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  },
});

// Advertise page
const advertiseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/advertise',
  component: AdvertisePage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  categoryRoute,
  postRoute,
  advertiseRoute,
]);
