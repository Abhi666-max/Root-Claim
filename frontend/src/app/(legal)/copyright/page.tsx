import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';

export default function CopyrightAct() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <header className="bg-white border-b border-gov-light shrink-0 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
        </div>
        <Link href="/" className="text-xs font-bold text-gov-blue uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 px-3 py-2 rounded transition-colors">
          <ArrowLeft size={16} /> Return Home
        </Link>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-8 my-8 bg-white border border-gov-light shadow-sm rounded-lg">
        <h1 className="text-3xl font-serif-official text-gov-blue font-bold mb-6 border-b pb-4">Copyright & IP Protection Act</h1>
        
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <p>
            The IP-SAKTI platform enforces the protection of Traditional Knowledge (TK) under the existing Intellectual Property frameworks of the Government of India, working in tandem with the Traditional Knowledge Digital Library (TKDL).
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">Defensive Protection of TK</h2>
          <p>
            Traditional Knowledge is protected defensively to prevent misappropriation. IP-SAKTI leverages cryptographic blockchain anchoring to establish undeniable prior art. This ensures that foreign entities cannot falsely patent indigenous Indian knowledge.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">Copyright of Platform Materials</h2>
          <p>
            All content, designs, algorithms (including the AI Claim Drafter and Collision Radar), and text present on the IP-SAKTI portal are the exclusive property of the Ministry of Ayush. Unauthorized reproduction, distribution, or modification of this platform's assets is strictly prohibited under the Copyright Act, 1957.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">Reporting Infringement</h2>
          <p>
            Citizens observing any bio-piracy or copyright infringement of Indian Traditional Knowledge should use the "Report Bio-Piracy" tool in the Citizen Dashboard for immediate Ministry intervention.
          </p>
        </div>
      </main>

      <footer className="bg-gov-blue text-white py-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Ministry of Ayush, Government of India. All rights reserved.</p>
      </footer>
    </div>
  );
}
