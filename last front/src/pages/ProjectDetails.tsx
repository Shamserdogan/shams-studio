import React from "react";
import { ArrowLeft, ExternalLink } from "lucide-react";

export default function ProjectDetails() {
  return (
    <section className="min-h-screen bg-[#020617] text-white py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-cyan-400 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Portfolio
        </button>

        <div className="rounded-2xl bg-white/5 border border-white/10 p-8">

          <h1 className="text-4xl font-bold mb-4">
            Project Title
          </h1>

          <p className="text-gray-400 leading-relaxed mb-8">
            Project description will appear here.
          </p>

          <img
            src="/images/projects/design-project-1.jpg"
            alt="Project"
            className="w-full rounded-xl mb-8"
          />

          <h2 className="text-2xl font-bold mb-3">
            Technologies Used
          </h2>

          <div className="flex flex-wrap gap-3 mb-8">
            <span className="px-4 py-2 rounded-full bg-white/10">
              React
            </span>

            <span className="px-4 py-2 rounded-full bg-white/10">
              AI Tools
            </span>

            <span className="px-4 py-2 rounded-full bg-white/10">
              Design
            </span>
          </div>

          <a
            href="https://wa.me/923429225675"
            target="_blank"
            className="inline-flex items-center gap-2 bg-cyan-400 text-black px-6 py-3 rounded-xl font-bold"
          >
            Contact on WhatsApp
            <ExternalLink className="w-4 h-4" />
          </a>

        </div>

      </div>
    </section>
  );
}