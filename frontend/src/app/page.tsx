"use client"

import React from 'react'
import { ShieldCheck, User, Building, AlertCircle, ChevronRight, FileText } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gov-ivory text-gov-text font-serif relative overflow-x-hidden bg-mandala selection:bg-gov-gold selection:text-white flex flex-col">
      
      {/* 1. FIXED HEADER BLOCK */}
      <div className="fixed w-full top-0 z-50 shadow-md">
        
        {/* Accessibility Top Bar */}
        <div className="bg-gov-blue text-white py-1.5 px-6 md:px-12 text-[10px] uppercase tracking-widest font-cinzel flex justify-between items-center border-b border-white/20">
          <div className="flex items-center gap-4 opacity-90">
            <span>Government of India</span>
            <span className="hidden sm:inline text-gov-gold">|</span>
            <span className="hidden sm:inline">Ministry of Ayush</span>
          </div>
          <div className="flex items-center gap-4 opacity-90">
            <button className="hover:text-gov-gold transition-colors font-bold">Skip to Main Content</button>
            <span className="text-gov-gold">|</span>
            <button className="hover:text-gov-gold transition-colors">A-</button>
            <button className="hover:text-gov-gold transition-colors font-bold">A</button>
            <button className="hover:text-gov-gold transition-colors">A+</button>
            <span className="text-gov-gold">|</span>
            <button className="hover:text-gov-gold transition-colors font-bold">English</button>
          </div>
        </div>

        {/* Main Navbar */}
        <header className="bg-gov-ivory/95 backdrop-blur-md px-6 md:px-12 h-20 flex items-center justify-between border-b border-gov-light">
          <div className="flex items-center gap-4">
            <div className="text-gov-gold">
              <ShieldCheck size={36} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-cinzel font-bold tracking-widest text-gov-blue leading-none">
                Root-Claim
              </h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gov-gold font-cinzel mt-1">
                Traditional Knowledge Protection Portal
              </p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-cinzel text-xs font-bold tracking-widest text-gov-blue uppercase">
            <Link href="/" className="hover:text-gov-gold transition-colors">Home</Link>
            <a href="#" className="hover:text-gov-gold transition-colors">About Ministry</a>
            <a href="#" className="hover:text-gov-gold transition-colors">Contact Us</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="text-[10px] font-cinzel font-bold tracking-widest uppercase text-gov-gold hover:text-gov-blue transition-colors">
                Sign Up
              </button>
            </Link>
            <span className="text-gov-light">|</span>
            <Link href="/login">
              <button className="bg-gov-blue text-white px-6 py-2 text-[10px] font-cinzel font-bold tracking-widest uppercase hover:bg-gov-gold transition-colors">
                Login
              </button>
            </Link>
          </div>
        </header>
      </div>

      {/* 2. MAIN CONTENT (Utility-First 2-Column Layout) */}
      {/* pt-32 ensures content starts below the fixed 2-part header */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-20 relative z-10 flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Column: Information & News */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl font-cinzel font-bold tracking-wide mb-6 leading-[1.2] text-gov-blue">
            Securing India's <br/>
            <span className="text-gov-gold">Traditional Knowledge.</span>
          </h2>
          <p className="text-base text-gray-700 leading-relaxed mb-10 text-justify border-l-4 border-gov-gold pl-6">
            Welcome to the official registry of the Ministry of Ayush. This portal allows citizens to securely register ancestral wisdom and traditional medicine formulations. All verified claims are permanently anchored to an immutable blockchain ledger, preventing unauthorized global patents and bio-piracy.
          </p>

          {/* Official News Ticker Box */}
          <div className="bg-white border border-gov-light shadow-sm">
            <div className="bg-gov-blue text-white px-4 py-2 text-xs font-cinzel font-bold tracking-widest uppercase flex items-center gap-2">
              <AlertCircle size={14} />
              Latest Updates & Circulars
            </div>
            <div className="p-4 space-y-3 h-48 overflow-y-auto">
              {[
                { date: "24 Aug 2026", text: "Portal is now live for Citizen Submissions." },
                { date: "20 Aug 2026", text: "New guidelines for submitting historical proofs issued." },
                { date: "15 Aug 2026", text: "Ministry successfully prevented 142 illegal patents this year." },
                { date: "10 Aug 2026", text: "Blockchain synchronization maintenance completed." },
              ].map((news, i) => (
                <div key={i} className="flex gap-4 items-start border-b border-gray-50 pb-2 last:border-0">
                  <span className="text-[10px] font-bold text-gov-gold whitespace-nowrap pt-0.5">{news.date}</span>
                  <p className="text-sm text-gray-700 hover:text-gov-blue cursor-pointer transition-colors flex-1">
                    {news.text}
                  </p>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 border-t border-gov-light px-4 py-2 text-right">
              <button className="text-[10px] font-cinzel font-bold tracking-widest uppercase text-gov-blue hover:text-gov-gold transition-colors">
                View All &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Actions (Logins) */}
        <div className="w-full lg:w-[450px] flex flex-col gap-6 justify-center">
          
          {/* Citizen Portal Box */}
          <div className="bg-white border-t-4 border-gov-gold p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gov-ivory flex items-center justify-center text-gov-gold border border-gov-light">
                <User size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-cinzel font-bold text-gov-blue">Citizen Portal</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-cinzel font-bold">Public Access</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Log in using your registered Mobile Number or Aadhaar to submit and track your traditional knowledge claims.
            </p>
            <Link href="/login">
              <button className="w-full bg-gov-gold text-white px-6 py-3 text-sm font-cinzel font-bold tracking-widest uppercase hover:bg-[#9a7b3b] transition-colors flex items-center justify-between">
                Login / Register <ChevronRight size={16} />
              </button>
            </Link>
          </div>

          {/* Ministry Portal Box */}
          <div className="bg-white border-t-4 border-gov-blue p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-gov-ivory flex items-center justify-center text-gov-blue border border-gov-light">
                <Building size={24} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xl font-cinzel font-bold text-gov-blue">Ministry Portal</h3>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-cinzel font-bold">Authorized Officials Only</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Secure login for Ministry of Ayush officials to review, verify, and digitally lock submitted claims onto the blockchain.
            </p>
            <Link href="/admin-login">
              <button className="w-full bg-gov-blue text-white px-6 py-3 text-sm font-cinzel font-bold tracking-widest uppercase hover:bg-[#081729] transition-colors flex items-center justify-between">
                Official Login <ChevronRight size={16} />
              </button>
            </Link>
          </div>

        </div>
      </main>

      {/* 3. MEGA FOOTER (Utility format) */}
      <footer className="bg-gov-blue text-white relative z-10 pt-12 pb-6 border-t border-gov-gold mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={28} className="text-gov-gold" strokeWidth={1.5} />
              <div>
                <h1 className="text-lg font-cinzel font-bold tracking-widest text-white leading-none">Root-Claim</h1>
                <p className="text-[9px] uppercase tracking-[0.2em] text-gov-gold font-cinzel mt-1">Ministry of Ayush</p>
              </div>
            </div>
            <p className="text-gray-300 text-xs leading-relaxed max-w-sm">
              An official initiative to empower citizens in protecting India's traditional knowledge. Backed by immutable blockchain technology to ensure global recognition and prevent bio-piracy.
            </p>
          </div>

          <div>
            <h4 className="font-cinzel font-bold tracking-widest uppercase text-gov-gold mb-4 text-xs border-b border-white/20 pb-2 inline-block">Important Links</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><Link href="/login" className="hover:text-white transition-colors flex items-center gap-2"><FileText size={12}/> Submit a Claim</Link></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><FileText size={12}/> Search Public Registry</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-2"><FileText size={12}/> Read the Mandate (PDF)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel font-bold tracking-widest uppercase text-gov-gold mb-4 text-xs border-b border-white/20 pb-2 inline-block">Government & Legal</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy & Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Copyright Act</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Right to Information (RTI)</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-400">
            &copy; {new Date().getFullYear()} Ministry of Ayush, Government of India. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-400 font-cinzel uppercase tracking-[0.2em]">
            Designed & Developed by <span className="font-bold text-gov-gold">Abhijeet Kangane</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
