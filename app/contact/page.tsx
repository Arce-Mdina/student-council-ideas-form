"use client";

import { useState } from "react";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("../api/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => ({ ok: false, error: "Bad response" }));
    if (json.ok) {
      setStatus("success");
      form.reset();
    } else {
      setStatus("error");
      setError(json.error || "Something went wrong");
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 justify-center align-items-center flex flex-col">
      <div className="mx-auto w-xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-semibold">Contact the Student Council</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Honeypot (hidden) — bots tend to fill everything */}
          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              name="name"
              required
              maxLength={100}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              required
              maxLength={200}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              maxLength={2000}
              rows={6}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-black focus:outline-none"
              placeholder="How can we help?"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-black px-4 py-2 text-white transition active:scale-[.99] disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "success" && <p className="text-green-600">Thanks! We’ll get back to you soon.</p>}
          {status === "error" && <p className="text-red-600">Oops: {error}</p>}
        </form>
      </div>
    </main>
  );
}