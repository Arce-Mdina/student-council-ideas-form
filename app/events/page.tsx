'use client'

import React, { useEffect, useState } from 'react'

import { eventsData } from '@/lib/eventsData'

function Page() {

  const [selectedEvent, setSelectedEvent] = useState<unknown | null>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedEvent(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-16 flex flex-col">

      <div className="p-10"></div>

      <div className="container mx-auto px-4">

        <header className="mb-10 justify-center items-center flex flex-col">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Student Council <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Events</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsData.map((event) => (
            <article
              key={event.title}
              className="relative rounded-2xl border border-slate-200 bg-white/90 shadow-sm hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              {/* Accent bar */}
              <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />

              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-semibold text-slate-900 leading-snug">
                    {event.title}
                  </h3>
                  {event.status === 'Ongoing' ? (
                    <div
                      aria-label="Event status: Ongoing"
                      className="shrink-0 inline-flex items-center gap-2 rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-xs font-semibold ring-1 ring-inset ring-emerald-200"
                    >
                      <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
                      Ongoing
                    </div>
                  ) : (
                    <div
                      aria-label="Event status: Done"
                      className="shrink-0 inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-700 px-3 py-1 text-xs font-semibold ring-1 ring-inset ring-slate-300"
                    >
                      <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
                      Done
                    </div>
                  )}
                </div>

                <div className="mt-4 text-[15px] leading-relaxed text-slate-700">
                  {event.description}
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="mt-3 text-sm font-medium text-emerald-700 underline hover:text-emerald-800"
                  >
                    {event.status === 'Ongoing' ? 'Progress' : 'Result'}
                  </button>
                </div>

              </div>

              <footer className="px-6 pb-5 pt-3 text-xs text-slate-500 border-t border-slate-100 bg-slate-50/50">
                Led by: {event.organiser}
              </footer>
            </article>
          ))}
        </div>
      </div>
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${(selectedEvent as any).title} details`}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/** Safe alias for selected event fields */}
          {(() => { /* no-op wrapper to allow const in JSX */ })()}

          {/* Backdrop closes on click */}
          <button
            aria-label="Close overlay"
            onClick={() => setSelectedEvent(null)}
            className="absolute inset-0 bg-black/50"
          />

          {/* Modal card */}
          <div className="relative z-10 w-[min(92vw,800px)] max-h-[80vh] overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 rounded px-2 py-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              ✕
            </button>

            {(() => {
              const se = (selectedEvent as unknown) as Record<string, unknown>;
              const title = typeof se['title'] === 'string' ? (se['title'] as string) : '';
              const status = typeof se['status'] === 'string' ? (se['status'] as string) : '';
              const organiser = typeof se['organiser'] === 'string' ? (se['organiser'] as string) : '';
              const description = se['description'] as React.ReactNode;
              const details = se['details'] as React.ReactNode | undefined;
              const progress = typeof se['progress'] === 'string' ? (se['progress'] as string) : undefined;
              const result = typeof se['result'] === 'string' ? (se['result'] as string) : undefined;

              const outcomeLabel = status === 'Ongoing' ? 'Progress' : 'Result';
              const outcomeText =
                status === 'Ongoing'
                  ? (progress ?? result ?? '')
                  : (result ?? progress ?? '');

              return (
                <>
                  <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
                  <p className="mt-1 text-xs font-medium text-slate-500">{status}</p>

                  <div className="mt-5">
                    <h3 className="text-base font-semibold text-slate-900">What this event did</h3>
                    <div className="prose prose-sm max-w-none text-slate-700">
                      {details ? (
                        <div>{details}</div>
                      ) : (
                        <p className="whitespace-pre-line">{outcomeText}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-base font-semibold text-slate-900">Overview</h3>
                    <div className="prose prose-sm max-w-none text-slate-700">{description}</div>
                  </div>

                  <div className="mt-6 text-xs text-slate-500">Led by: {organiser}</div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default Page