import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Council | NAIS Dublin",
  description: "We are the Student Council of NAIS Dublin. Contact us for any questions or suggestions!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        {/* Navigation */}
        <header className="fixed w-screen top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-[#4bc4cfff]/90 bg-[#4bc4cfff] border-b border-[#E7D9D0]">
          <nav className="max-w-[1100px] mx-auto px-4">
            {/* Mobile toggle controller (peer) */}
            <input id="nav-toggle" type="checkbox" className="peer hidden" aria-hidden="true" />
            <div className="flex h-16 items-center justify-between z-70">
              {/* Logo / Brand */}
              <Link href="/" className="group inline-flex items-center gap-2">
                {/* <span className="inline-block h-8 w-8 rounded-md bg-white/80 shadow-sm ring-1 ring-black/5 transition-transform group-hover:rotate-6" /> */}
                <Image
                  src="/favicon.png"
                  alt="NAIS Dublin Student Council"
                  width={32}
                  height={32}
                  priority
                  className="transition-transform group-hover:rotate-6"
                  // className="h-8 w-8 rounded-md bg-white/90 p-1 shadow-sm ring-1 ring-black/5"
                />
                <span className="font-extrabold tracking-tight text-slate-900 text-xl">NAIS Dublin Student Council</span>
              </Link>

              {/* Mobile toggle (checkbox/peer, no JS) */}
              <label htmlFor="nav-toggle" aria-label="Toggle navigation" aria-controls="mobile-menu" className="md:hidden relative z-10 h-10 w-10 grid place-items-center rounded-md ring-1 ring-black/10 bg-white/80 active:scale-95 transition">
                <span className="sr-only">Open menu</span>
                {/* animated hamburger */}
                <div className="pointer-events-none relative h-4 w-6">
                  <span className="absolute inset-x-0 top-0 h-0.5 bg-slate-900 origin-left transition-all duration-300 peer-checked:translate-y-1.5 peer-checked:rotate-45" />
                  <span className="absolute inset-x-0 top-1/2 -mt-[1px] h-0.5 bg-slate-900 transition-all duration-300 peer-checked:opacity-0" />
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-slate-900 origin-left transition-all duration-300 peer-checked:-translate-y-1.5 peer-checked:-rotate-45" />
                </div>
              </label>

              {/* Desktop menu */}
              <ul className="hidden md:flex items-center gap-8">
                <li>
                  <Link href="/" className="text-slate-900 text-lg font-semibold transition hover:opacity-70">Home</Link>
                </li>
                <li>
                  <Link href="/events" className="text-slate-900 text-lg font-semibold transition hover:opacity-70">Events</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-slate-900 text-lg font-semibold transition hover:opacity-70">Contact Us</Link>
                </li>
              </ul>
            </div>

            {/* Mobile dropdown (simple) */}
            <div id="mobile-menu" className="md:hidden relative z-50 overflow-hidden origin-top transform-gpu transition-[max-height,transform] duration-450 ease-in-out max-h-0 scale-y-95 peer-checked:max-h-80 peer-checked:scale-y-100">
              <ul className="my-2">
                <li>
                  <Link href="/" className="block px-4 py-3 font-semibold text-slate-900 hover:text-slate-600">Home</Link>
                </li>
                <li>
                  <Link href="/events" className="block px-4 py-3 font-semibold text-slate-900 hover:text-slate-600">Events</Link>
                </li>
                <li>
                  <Link href="/contact" className="block px-4 py-3 font-semibold text-slate-900 hover:text-slate-600">Contact Us</Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>

        {children}
      </body>
    </html>
  );
}
