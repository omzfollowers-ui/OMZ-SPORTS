import React, { useState } from 'react';

const INTERESTS = ['Sponsored editorial', 'Matchday takeover', 'Newsletter partnership', 'Display & video', 'Something else'];
const BUDGETS = ['Under £5k', '£5k – £25k', '£25k – £100k', '£100k+'];

const initialForm = { company: '', name: '', email: '', interest: INTERESTS[0], budget: BUDGETS[1], message: '' };

export function AdvertisePage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const body = Object.entries({ 'form-name': 'advertising-inquiry', ...form })
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join('&');
      const res = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('done');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  const inputCls = "w-full rounded-xl border px-4 py-3 text-sm bg-transparent outline-none focus:border-[var(--flame)] transition-colors";

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Hero */}
      <div className="mb-16 max-w-2xl">
        <p className="kicker text-[0.62rem]" style={{ color: 'var(--flame)' }}>Advertising & Partnerships</p>
        <h1 className="display text-5xl md:text-7xl mt-4" style={{ color: 'var(--paper)' }}>
          Reach millions of sports fans
        </h1>
        <p className="font-serif text-xl mt-6" style={{ color: 'var(--muted)' }}>
          OMZ Sports reaches 4.7 million engaged sports fans every month. Our brand studio creates
          editorial partnerships that feel native and perform.
        </p>
      </div>

      {/* Packages */}
      <div className="grid gap-6 sm:grid-cols-3 mb-16">
        {[
          { name: 'Sponsored Editorial', desc: 'Long-form content created with our editorial team, labelled clearly, distributed to our full audience.' },
          { name: 'Matchday Takeover', desc: 'Own the coverage around a major fixture — from pre-match preview through to post-match analysis.' },
          { name: 'Newsletter Partnership', desc: 'Weekly sponsor slot in our newsletter, reaching 180,000 subscribers directly in their inbox.' },
        ].map(pkg => (
          <div key={pkg.name} className="rounded-2xl border p-6"
            style={{ borderColor: 'var(--line)', backgroundColor: 'var(--ink-2)' }}>
            <p className="kicker text-[0.62rem]" style={{ color: 'var(--flame)' }}>{pkg.name}</p>
            <p className="font-serif mt-3" style={{ color: 'var(--muted)' }}>{pkg.desc}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <p className="kicker text-[0.62rem] mb-6" style={{ color: 'var(--muted)' }}>Get in touch</p>
        {status === 'done' ? (
          <div className="rounded-2xl border p-10 text-center"
            style={{ borderColor: 'rgba(255,83,38,0.4)', backgroundColor: 'var(--ink-2)' }}>
            <p className="display text-4xl" style={{ color: 'var(--flame)' }}>You're in.</p>
            <p className="font-serif text-lg mt-4" style={{ color: 'var(--muted)' }}>
              Thanks — the partnerships team will be in touch within two working days with a tailored media plan.
            </p>
            <button onClick={() => setStatus('idle')}
              className="kicker mt-6 rounded-full border px-5 py-2.5 text-[0.62rem] transition-colors"
              style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
              Send another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} name="advertising-inquiry" data-netlify="true"
            className="rounded-2xl border p-6 md:p-8"
            style={{ borderColor: 'var(--line)', backgroundColor: 'var(--ink-2)' }}>
            <input type="hidden" name="form-name" value="advertising-inquiry" />
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="kicker text-[0.58rem] mb-2 block" style={{ color: 'var(--muted)' }}>Company / brand</label>
                <input required name="company" value={form.company} onChange={handleChange('company')}
                  className={inputCls} style={{ borderColor: 'var(--line)', color: 'var(--paper)' }}
                  placeholder="Apex Nutrition" />
              </div>
              <div>
                <label className="kicker text-[0.58rem] mb-2 block" style={{ color: 'var(--muted)' }}>Your name</label>
                <input required name="name" value={form.name} onChange={handleChange('name')}
                  className={inputCls} style={{ borderColor: 'var(--line)', color: 'var(--paper)' }}
                  placeholder="Jordan Vega" />
              </div>
              <div>
                <label className="kicker text-[0.58rem] mb-2 block" style={{ color: 'var(--muted)' }}>Work email</label>
                <input required type="email" name="email" value={form.email} onChange={handleChange('email')}
                  className={inputCls} style={{ borderColor: 'var(--line)', color: 'var(--paper)' }}
                  placeholder="jordan@apexnutrition.com" />
              </div>
              <div>
                <label className="kicker text-[0.58rem] mb-2 block" style={{ color: 'var(--muted)' }}>Estimated budget</label>
                <select name="budget" value={form.budget} onChange={handleChange('budget')}
                  className={inputCls} style={{ borderColor: 'var(--line)', color: 'var(--paper)' }}>
                  {BUDGETS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="kicker text-[0.58rem] mb-2 block" style={{ color: 'var(--muted)' }}>I'm interested in</label>
                <select name="interest" value={form.interest} onChange={handleChange('interest')}
                  className={inputCls} style={{ borderColor: 'var(--line)', color: 'var(--paper)' }}>
                  {INTERESTS.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="kicker text-[0.58rem] mb-2 block" style={{ color: 'var(--muted)' }}>Tell us about your campaign</label>
                <textarea required name="message" value={form.message} onChange={handleChange('message')} rows={4}
                  className={inputCls} style={{ borderColor: 'var(--line)', color: 'var(--paper)', resize: 'vertical' }}
                  placeholder="Describe your goals, target audience, and any specific ideas..." />
              </div>
            </div>
            {status === 'error' && (
              <p className="mt-4 text-sm font-serif" style={{ color: 'var(--flame)' }}>
                Something went wrong. Please email us at contact@omzsports.com
              </p>
            )}
            <button type="submit" disabled={status === 'sending'}
              className="kicker mt-6 rounded-full px-8 py-3 text-[0.66rem] text-black transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              style={{ backgroundColor: 'var(--flame)' }}>
              {status === 'sending' ? 'Sending...' : 'Submit enquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
