import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Check, FileText, MessageSquare, Play, ShieldCheck, Sparkles } from 'lucide-react';

const highlights = [
  { icon: MessageSquare, title: 'Instant answers', text: 'Ask questions in natural language and keep every useful response in one focused workspace.' },
  { icon: FileText, title: 'Document intelligence', text: 'Upload a PDF, ask about the details, and turn dense information into clear next steps.' },
  { icon: Sparkles, title: 'No-code chatbots', text: 'Define your best answers once, preview the experience, and embed it on any website.' },
];

function LandingPage() {
  return (
    <div className="overflow-hidden bg-[#f7fbfc] text-slate-900">
      <section className="relative bg-[#081f24] px-4 pb-20 pt-16 text-white sm:px-6 sm:pb-28 lg:px-8">
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-cyan-100">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" /> Your AI workbench for better conversations
            </div>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Turn questions into <span className="text-cyan-300">momentum.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Weblave brings research, document analysis, and lightweight chatbot creation into one calm, simple workspace.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/direct-chat" className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-5 py-3.5 text-sm font-bold text-[#082329] transition hover:bg-white">
                Start a conversation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/chatbot-generator" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10">
                <Play className="h-4 w-4 fill-current" /> Build a chatbot
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" /> No-code setup</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" /> PDF-ready</span>
              <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-cyan-300" /> Embeddable output</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-300/10 blur-2xl" />
            <div className="relative rounded-[1.75rem] border border-white/15 bg-white/[0.08] p-3 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl bg-[#f8fcfc] p-4 text-slate-900 sm:p-5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0b2e33] text-cyan-200"><Bot className="h-5 w-5" /></div><div><p className="text-sm font-bold">Weblave workspace</p><p className="text-xs text-slate-500">Ready to help you think</p></div></div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700">ONLINE</span>
                </div>
                <div className="space-y-4 py-5">
                  <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-md bg-[#0b2e33] px-4 py-3 text-sm leading-6 text-white">Summarize the key risks in this document.</div>
                  <div className="flex max-w-[86%] gap-3 rounded-2xl rounded-tl-md bg-slate-100 px-4 py-3 text-sm leading-6 text-slate-700"><Sparkles className="mt-1 h-4 w-4 shrink-0 text-[#4f7c82]" /><span>I found three key risks and grouped them by impact, owner, and suggested next action.</span></div>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2"><div className="h-2 flex-1 rounded-full bg-slate-100" /><span className="rounded-lg bg-cyan-100 px-3 py-2 text-xs font-bold text-[#0b2e33]">Ask AI</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="text-sm font-semibold text-slate-500">Built for focused work, not noisy dashboards.</p>
          <div className="flex flex-wrap gap-8 text-sm font-semibold text-slate-400"><span>Research</span><span>Support</span><span>Education</span><span>Operations</span></div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#4f7c82]">One workspace, many possibilities</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#0b2e33] sm:text-4xl">Move from blank page to useful answer faster.</h2><p className="mt-4 text-base leading-7 text-slate-500">Weblave gives you a fast path from a question to a repeatable workflow.</p></div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {highlights.map(({ icon: Icon, title, text }, index) => (
              <div key={title} className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl hover:shadow-cyan-900/5">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${index === 1 ? 'bg-amber-100 text-amber-700' : 'bg-cyan-100 text-[#0b2e33]'}`}><Icon className="h-6 w-6" /></div>
                <h3 className="mt-6 text-lg font-bold text-[#0b2e33]">{title}</h3><p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <div className="rounded-3xl bg-[#dff5f7] p-8 sm:p-10"><ShieldCheck className="h-8 w-8 text-[#0b2e33]" /><h2 className="mt-8 max-w-sm text-3xl font-semibold tracking-tight text-[#0b2e33]">Start simple. Scale when the workflow proves itself.</h2><p className="mt-4 max-w-md text-sm leading-7 text-slate-600">Use Direct Chat for exploration, then turn your best answers into a repeatable assistant with the chatbot builder.</p><Link to="/direct-chat" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#0b2e33]">Explore Direct Chat <ArrowRight className="h-4 w-4" /></Link></div>
          <div className="rounded-3xl bg-[#0b2e33] p-8 text-white sm:p-10"><p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">The Weblave loop</p><div className="mt-8 grid gap-6 sm:grid-cols-3"><div><p className="text-4xl font-semibold">01</p><p className="mt-3 text-sm font-semibold">Ask</p><p className="mt-1 text-sm leading-6 text-slate-400">Start with a question or document.</p></div><div><p className="text-4xl font-semibold">02</p><p className="mt-3 text-sm font-semibold">Refine</p><p className="mt-1 text-sm leading-6 text-slate-400">Shape the answer into a useful response.</p></div><div><p className="text-4xl font-semibold">03</p><p className="mt-3 text-sm font-semibold">Reuse</p><p className="mt-1 text-sm leading-6 text-slate-400">Turn it into a chatbot for your site.</p></div></div><div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">Ready when you are.</div></div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
