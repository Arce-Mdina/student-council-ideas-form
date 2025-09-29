import React from 'react'

import { eventsData } from '@/lib/eventsData'

const page = () => {

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
                </div>

              </div>

              <footer className="px-6 pb-5 pt-3 text-xs text-slate-500 border-t border-slate-100 bg-slate-50/50">
                Led by: {event.organiser}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default page