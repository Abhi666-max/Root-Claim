"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, BookOpen, Link as LinkIcon, FileSearch, ArrowRight, Activity, Globe, Users } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gov-ivory text-gov-text font-serif relative overflow-x-hidden bg-mandala selection:bg-gov-gold selection:text-white">
      
      {/* Top Utility Bar (Government Standard) */}
      <div className="bg-gov-blue text-white py-1.5 px-8 text-[10px] uppercase tracking-widest font-cinzel flex justify-between items-center z-50 relative">
        <div className="flex items-center gap-4 opacity-80">
          <span>Government of India</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Ministry of Ayush</span>
        </div>
        <div className="flex items-center gap-4 opacity-80">
          <button className="hover:text-gov-gold transition-colors">Skip to Main Content</button>
          <span>|</span>
          <button className="hover:text-gov-gold transition-colors">A-</button>
          <button className="hover:text-gov-gold transition-colors">A</button>
          <button className="hover:text-gov-gold transition-colors">A+</button>
          <span>|</span>
          <button className="hover:text-gov-gold transition-colors">English</button>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 bg-gov-ivory/95 backdrop-blur-md max-w-7xl mx-auto px-8 h-20 flex items-center justify-between border-b border-gov-light z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-gov-gold">
            <ShieldCheck size={36} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-cinzel font-bold tracking-widest text-gov-blue leading-none">
              Root-Claim
            </h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-gov-gold font-cinzel mt-1">
              Traditional Knowledge Registry
            </p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-cinzel text-xs font-semibold tracking-widest text-gov-blue uppercase">
          <a href="#how-it-works" className="hover:text-gov-gold transition-colors">How it Works</a>
          <a href="#database" className="hover:text-gov-gold transition-colors">Public Database</a>
          <a href="#about" className="hover:text-gov-gold transition-colors">About Us</a>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <button className="gov-btn-outline px-6 py-2 text-[10px]">
              Citizen Login
            </button>
          </Link>
          <Link href="/admin-login">
            <button className="gov-btn px-6 py-2 text-[10px]">
              Admin Portal
            </button>
          </Link>
        </div>
      </header>

      {/* Authoritative Hero Section */}
      <main className="relative z-10 pt-20 pb-20 px-8 max-w-6xl mx-auto">
        
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-8"
          >
            <div className="w-px h-12 bg-gov-gold mx-auto mb-6 opacity-50"></div>
            <span className="font-cinzel text-[10px] font-bold uppercase tracking-[0.3em] text-gov-gold border border-gov-gold px-4 py-1.5 rounded-full">
              Official Digital Infrastructure
            </span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-6xl font-cinzel font-bold tracking-wide mb-6 text-gov-blue leading-tight"
          >
            Protecting India's <br/>
            <span className="text-gov-gold">Traditional Knowledge.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg text-gray-700 max-w-2xl mb-12 leading-relaxed italic"
          >
            A secure digital registry where citizens can submit their ancient wisdom, and the Ministry verifies and locks it on the blockchain to prevent global bio-piracy.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <Link href="/login">
              <button className="gov-btn px-10 py-4 text-sm flex items-center gap-3">
                Register a Claim <ArrowRight size={16} />
              </button>
            </Link>
            <button className="gov-btn-outline px-10 py-4 text-sm flex items-center gap-3">
              Search Database <SearchIcon size={16} />
            </button>
          </motion.div>
        </div>

        {/* Live Statistics Section */}
        <div className="mt-32 mb-16 border-y border-gov-light py-10 bg-white/50 backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gov-light">
          <div className="px-4">
            <h4 className="text-4xl font-cinzel font-bold text-gov-blue mb-2">4,281</h4>
            <p className="text-xs uppercase tracking-widest text-gov-gold font-cinzel font-semibold">Registered Claims</p>
          </div>
          <div className="px-4 pt-8 md:pt-0">
            <h4 className="text-4xl font-cinzel font-bold text-gov-blue mb-2">142</h4>
            <p className="text-xs uppercase tracking-widest text-gov-gold font-cinzel font-semibold">Bio-Piracy Attempts Prevented</p>
          </div>
          <div className="px-4 pt-8 md:pt-0">
            <h4 className="text-4xl font-cinzel font-bold text-gov-blue mb-2">100%</h4>
            <p className="text-xs uppercase tracking-widest text-gov-gold font-cinzel font-semibold">Blockchain Immutability</p>
          </div>
        </div>

        {/* How It Works (Simple 3 Steps) */}
        <div id="how-it-works" className="mt-24 w-full">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-cinzel font-bold text-gov-blue mb-4">How The System Works</h3>
            <div className="w-24 h-px bg-gov-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "01", 
                title: "Citizen Submits Claim", 
                icon: Users, 
                desc: "Any citizen or Vaidya can log in and submit details about traditional medicine or knowledge along with historical proofs." 
              },
              { 
                step: "02", 
                title: "Ministry Verifies & Audits", 
                icon: FileSearch, 
                desc: "Our AI scans global patents to ensure no one has stolen it. Then, a Ministry Official manually verifies the proof." 
              },
              { 
                step: "03", 
                title: "Locked on Blockchain", 
                icon: LinkIcon, 
                desc: "Once approved, the claim is permanently locked on the decentralized blockchain. It becomes undeniable proof for India." 
              }
            ].map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="gov-card text-center relative"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gov-ivory border border-gov-gold rounded-full flex items-center justify-center font-cinzel font-bold text-gov-gold text-lg">
                  {feature.step}
                </div>
                <div className="text-gov-blue mt-8 mb-6 flex justify-center">
                  <feature.icon size={40} strokeWidth={1} />
                </div>
                <h3 className="text-xl font-cinzel font-bold mb-4 text-gov-blue tracking-wide">{feature.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Public Entries Preview */}
        <div id="database" className="mt-32 bg-white border border-gov-light p-10 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-gov-gold"></div>
          <h3 className="text-2xl font-cinzel font-bold text-gov-blue mb-2">Recent Approved Claims</h3>
          <p className="text-sm text-gray-500 italic mb-8">Live data from the public blockchain ledger.</p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-gov-light text-xs uppercase tracking-widest text-gov-blue font-cinzel">
                  <th className="pb-4 pr-4">Claim ID</th>
                  <th className="pb-4 px-4">Subject Matter</th>
                  <th className="pb-4 px-4">Submitted By</th>
                  <th className="pb-4 px-4">Status</th>
                  <th className="pb-4 pl-4 text-right">Blockchain Hash</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  { id: "RC-2026-081", subject: "Turmeric (Haldi) for Wound Healing", by: "Dr. Sharma", hash: "0x8f2a...391c" },
                  { id: "RC-2026-080", subject: "Neem Extracts for Pest Control", by: "Rural Coop.", hash: "0x4a9b...772f" },
                  { id: "RC-2026-079", subject: "Ashwagandha Stress Relief Formulation", by: "Ayush Dept.", hash: "0x11c3...884a" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gov-light hover:bg-gov-ivory transition-colors">
                    <td className="py-4 pr-4 font-cinzel font-bold text-gov-blue">{row.id}</td>
                    <td className="py-4 px-4 font-medium">{row.subject}</td>
                    <td className="py-4 px-4 text-gray-600">{row.by}</td>
                    <td className="py-4 px-4">
                      <span className="bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">Verified</span>
                    </td>
                    <td className="py-4 pl-4 text-right font-mono text-xs text-gray-500">{row.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
            <button className="text-gov-gold text-sm font-cinzel font-bold tracking-widest uppercase hover:text-gov-blue transition-colors">
              View Entire Registry &rarr;
            </button>
          </div>
        </div>

      </main>

      {/* 10/10 Prestige Footer */}
      <footer className="mt-20 border-t-4 border-gov-gold bg-gov-blue text-white relative z-10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={32} className="text-gov-gold" strokeWidth={1.5} />
              <div>
                <h1 className="text-xl font-cinzel font-bold tracking-widest text-white leading-none">Root-Claim</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gov-gold font-cinzel mt-1">Ministry of Ayush</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              Empowering citizens to protect India's traditional knowledge. Our blockchain-backed registry ensures global recognition and prevents bio-piracy.
            </p>
          </div>

          <div>
            <h4 className="font-cinzel font-bold tracking-widest uppercase text-gov-gold mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Citizen Portal Login</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ministry Admin Login</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Search Public Registry</a></li>
              <li><a href="#" className="hover:text-white transition-colors">How to Submit a Claim</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel font-bold tracking-widest uppercase text-gov-gold mb-6 text-sm">Legal</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Copyright Act</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Right to Information (RTI)</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-10 border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
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

function SearchIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )
}
