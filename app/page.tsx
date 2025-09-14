'use client';

import React from 'react';

import Image from 'next/image';
import { motion } from 'framer-motion';

const page = () => {
  // Smooth scroll to a target Y position over a specified duration (default 1000ms)
  const smoothScrollTo = (targetY: number, duration = 1000) => {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo({ top: startY + distance * easeInOutCubic(progress), left: 0 });
      if (elapsed < duration) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // Scroll to the Mission section smoothly over 1 second
  const handleSeeMore = () => {
    const el = document.getElementById('mission');
    const targetY = el ? el.getBoundingClientRect().top + window.scrollY : window.scrollY + window.innerHeight;
    smoothScrollTo(targetY, 1000);
  };

  return (
    <>
    <div className="min-h-screen text-slate-900">

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        {/* background layers */}
        <div className="absolute inset-0 -z-10">
          {/* soft left-to-right gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#d0ebf4]/95 to-[#f8d6cc]/95" />
          {/* background image overlay */}
          <div className="absolute inset-0 bg-center bg-cover opacity-70" style={{ backgroundImage: "url('https://www.transparentpng.com/download/pattern/p3NBVZ-data-security-and-privacy-software-services-safe-data.png')" }} />
        </div>

        <div className="max-w-[1150px] min-h-screen mx-auto flex flex-col sm:flex-row items-center gap-8 py-36 px-4 my-[70px]">

          <div className="order-2 sm:order-1 w-full sm:w-7/12">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold gap-5 tracking-tight flex flex-col"
            >
              We are the
              <motion.span
                className="text-7xl"
                initial={{ x: 24, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
              >
                Student Council
              </motion.span>
            </h1>
            <p className="mt-4 max-w-[46ch] text-slate-800/90">
              The Student Council is to provide and serve the students of NAIS Dublin and members of staff to create a thriving learning environment and fun events where students can BELONG.
            </p>
            <button onClick={handleSeeMore} className="mt-6 inline-flex items-center rounded bg-slate-700 px-4 py-2 font-semibold text-white hover:opacity-90 cursor-pointer">See More</button>
          </div>

            {/* illustrative image */}
          <div className="order-1 sm:order-2 w-full sm:w-6/12 z-10 flex justify-center">
            <motion.div
              initial={{ scale: 0.7, y: 20, rotate: -1.8, boxShadow: '0 0 0 rgba(0,0,0,0)', opacity: 0 }}
              animate={{ scale: 1, y: 0, rotate: 0, boxShadow: '0 12px 28px rgba(0,0,0,0.15)', opacity: 1 }}
            //   whileHover={{ scale: 1.03, y: -4 }}
              transition={{ delay: 1.6, duration: 1, ease: 'easeOut' }}
              className="rounded-2xl overflow-hidden"
              aria-hidden
            >
              <Image
                src="/Studentcouncil.jpg"
                alt="Student Council"
                width={600}
                height={450}
                className="block w-full h-auto"
                priority
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="relative overflow-hidden">
        {/* colorful blurred radial backgrounds */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* base soft beige → cool tint gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5E9E2] via-[#F0F4F9] to-[#EAF3FF]" />
          {/* merged color washes */}
          <div className="absolute inset-0 bg-[radial-gradient(95%_95%_at_0%_0%,rgba(244,63,94,0.35),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(97%_97%_at_80%_20%,rgba(59,130,246,0.35),transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_60%_80%,rgba(16,185,129,0.35),transparent_60%)]" />
          {/* blur the background layers so colors merge smoothly */}
          <div className="absolute inset-0 backdrop-blur-0 blur-xl" />
        </div>

        <div className="relative max-w-[1100px] mx-auto py-40 px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-8">Mission and Vision</h2>

          <div className="max-w-[75ch] mb-9">
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-2">Vision Statement</h3>
            <p className="text-slate-900/90">
              The Student Council envisions a school community where every student feels heard, valued, and empowered to create positive change. We aim to foster a spirit of unity, leadership, and service that strengthens the connection between the students, staff, and the wider community.
            </p>
          </div>

          <div className="max-w-[75ch] mb-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 mb-2">Mission Statement</h3>
            <p className="text-slate-900/90">
              Our mission is to represent the student body with integrity and enthusiasm, to promote inclusivity and school spirit, and to lead initiatives that enhance student life. Through collaboration, creativity, and responsible leadership, we strive to turn student ideas into action, organise meaningful events, and ensure all voices are considered in shaping our school environment.
            </p>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-[#F5E9E2] border-top border-[#E7D9D0]">
        <div className="max-w-[1100px] mx-auto px-4">
          {/* inner top rule */}
          <div className="border-t border-[#E7D9D0]" />
          <div className="grid md:grid-cols-2 gap-8 py-12">
            <div>
              <div className="text-slate-900 mb-5">Student Council</div>
              <h3 className="text-2xl md:text-3xl font-extrabold">Connecting<br/>Students Together</h3>
            </div>
            <div className="md:justify-self-end md:border-l md:border-[#E7D9D0] md:pl-8">
              <div className="mb-3">Studentcouncil.nais.fun</div>
              <address className="not-italic leading-relaxed text-slate-900">
                South County Business<br/>
                Park, Carmanhall And<br/>
                Leopardstown, Dublin,<br/>
                D18 T672
              </address>
              <div className="mt-3 flex gap-2" aria-label="social links">
                <span className="inline-block h-[18px] w-[18px] rounded-full bg-slate-900" />
                <span className="inline-block h-[18px] w-[18px] rounded-full bg-slate-900" />
              </div>
            </div>
          </div>
          {/* inner bottom rule */}
          <div className="border-b border-[#E7D9D0]" />
        </div>
        <div className="border-t border-[#E7D9D0] text-center text-slate-700 text-sm py-4">© 2025-26 by Student Council</div>
      </footer>
    </div>
    </>
  );
};

export default page;