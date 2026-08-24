"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, User, Building, AlertCircle, ChevronRight, FileText, Globe, Link as LinkIcon, FileSearch, Quote, Network } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gov-ivory text-gov-text font-sans relative overflow-x-hidden selection:bg-gov-gold selection:text-white flex flex-col">
      
      {/* 1. FIXED HEADER BLOCK */}
      <div className="fixed w-full top-0 z-50 shadow-md">
        
        {/* Accessibility Top Bar */}
        <div className="bg-gov-blue text-white py-1.5 px-6 md:px-12 text-[10px] uppercase tracking-widest flex justify-between items-center border-b border-white/20">
          <div className="flex items-center gap-4 opacity-90 font-semibold">
            <span>Government of India</span>
            <span className="hidden sm:inline text-gov-gold">|</span>
            <span className="hidden sm:inline">Ministry of Ayush</span>
          </div>
          <div className="flex items-center gap-4 opacity-90 font-semibold">
            <button className="hover:text-gov-gold transition-colors">Skip to Main Content</button>
            <span className="text-gov-gold">|</span>
            <button className="hover:text-gov-gold transition-colors">A-</button>
            <button className="hover:text-gov-gold transition-colors">A</button>
            <button className="hover:text-gov-gold transition-colors">A+</button>
            <span className="text-gov-gold">|</span>
            <button className="hover:text-gov-gold transition-colors">English</button>
          </div>
        </div>

        {/* Main Navbar */}
        <header className="bg-gov-ivory/95 backdrop-blur-md px-6 md:px-12 h-20 flex items-center justify-between border-b border-gov-light">
          <div className="flex items-center gap-4">
            <div className="text-gov-gold">
              <ShieldCheck size={36} strokeWidth={1.5} />
            </div>
            <div>
              <h1 className="text-2xl font-serif-official font-bold tracking-widest text-gov-blue leading-none uppercase">
                Root-Claim
              </h1>
              <p className="text-[9px] uppercase tracking-[0.2em] text-gov-gold mt-1 font-bold">
                Traditional Knowledge Protection Portal
              </p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold tracking-widest text-gov-blue uppercase">
            <a href="#about" className="hover:text-gov-gold transition-colors">About Mission</a>
            <a href="#services" className="hover:text-gov-gold transition-colors">Citizen Services</a>
            <a href="#architecture" className="hover:text-gov-gold transition-colors">Architecture</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="bg-gov-gold text-white px-5 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-[#9a7b3b] transition-colors shadow-sm">
                Citizen Portal
              </button>
            </Link>
            <Link href="/admin-login">
              <button className="bg-gov-blue text-white px-5 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-[#081729] transition-colors shadow-sm">
                Ministry Login
              </button>
            </Link>
          </div>
        </header>
      </div>

      {/* spacer for fixed header */}
      <div className="h-28"></div>

      {/* SECTION 1: HERO BANNER */}
      <section className="bg-gov-blue relative text-white border-b-4 border-gov-gold overflow-hidden">
        <div className="absolute inset-0 bg-mandala opacity-10"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="inline-block border border-gov-gold text-gov-gold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold mb-6">
              Official Digital Infrastructure
            </div>
            <h2 className="text-4xl md:text-6xl font-serif-official font-bold leading-tight mb-6">
              Securing India's <br/>
              <span className="text-gov-gold">Traditional Knowledge.</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-xl mb-10 leading-relaxed">
              A sovereign registry designed to protect ancient wisdom, medicinal formulations, and cultural practices from global bio-piracy through cryptographic verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <button className="bg-gov-gold text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-gov-blue transition-colors flex items-center justify-center gap-2">
                  Submit a Claim <ChevronRight size={16} />
                </button>
              </Link>
              <button className="bg-transparent border border-white text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-gov-blue transition-colors">
                Search Public Database
              </button>
            </div>
          </div>
          
          <div className="hidden md:flex w-96 h-96 bg-gov-ivory/5 border border-white/10 rounded-full items-center justify-center relative shadow-2xl backdrop-blur-sm">
            <div className="absolute w-full h-full border border-gov-gold/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
            <ShieldCheck size={120} className="text-gov-gold opacity-80" strokeWidth={1} />
          </div>
        </div>
      </section>

      {/* SECTION 2: THE MANDATE */}
      <section id="about" className="py-20 px-6 md:px-12 bg-gov-ivory">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="text-gov-gold/20 absolute -top-8 -left-4 md:-left-12">
            <Quote size={80} strokeWidth={1} />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-gov-gold mb-6">Official Government Mandate</h3>
          <p className="text-2xl md:text-3xl font-serif-official font-bold text-gov-blue leading-relaxed">
            "The objective of this portal is to ensure that India's vast heritage of traditional medicine and practices remains the sovereign intellectual property of the nation. No foreign entity shall patent what rightfully belongs to our ancestors."
          </p>
          <div className="w-16 h-1 bg-gov-gold mx-auto mt-8"></div>
        </div>
      </section>

      {/* SECTION 3: TECHNICAL ARCHITECTURE */}
      <section id="architecture" className="py-24 px-6 md:px-12 bg-white border-y border-gov-light">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gov-gold mb-2">Technical Infrastructure</h3>
            <h2 className="text-3xl font-serif-official font-bold text-gov-blue">How The System Protects Data</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Network,
                title: "Semantic RAG Engine",
                desc: "Advanced AI ingests historical texts and formulations, enabling contextual prior-art searches to instantly flag similarities."
              },
              {
                icon: FileSearch,
                title: "Collision Radar",
                desc: "Automated auditing against global patent databases (USPTO, WIPO) to detect and alert on potential bio-piracy attempts."
              },
              {
                icon: LinkIcon,
                title: "Blockchain Vault",
                desc: "Verified traditional knowledge is cryptographically hashed and anchored to the decentralized Polygon network, ensuring absolute immutability."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-gov-ivory border border-gov-light p-8 hover:border-gov-gold transition-colors group">
                <div className="w-14 h-14 bg-gov-blue text-gov-gold flex items-center justify-center rounded mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h4 className="text-xl font-serif-official font-bold text-gov-blue mb-3">{feature.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: STAKEHOLDER SERVICES */}
      <section id="services" className="py-24 px-6 md:px-12 bg-gov-ivory">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gov-gold mb-2">Stakeholders</h3>
            <h2 className="text-3xl font-serif-official font-bold text-gov-blue mb-6">Portal Services</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              The Root-Claim platform connects citizens, researchers, and government officials into a unified, secure ecosystem for IP protection.
            </p>
            <div className="bg-white border-l-4 border-gov-blue p-6 shadow-sm">
              <h4 className="font-bold text-gov-blue text-sm uppercase tracking-widest mb-2 flex items-center gap-2"><Globe size={16} className="text-gov-gold"/> Live Network Status</h4>
              <p className="text-xs text-gray-500 mb-2">Polygon Mainnet: <span className="text-green-600 font-bold">Synchronized</span></p>
              <p className="text-xs text-gray-500">Vector Engine: <span className="text-green-600 font-bold">Active</span></p>
            </div>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-gov-light p-8">
              <User size={32} className="text-gov-gold mb-4" />
              <h4 className="text-lg font-serif-official font-bold text-gov-blue mb-2">For Citizens</h4>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Submit traditional knowledge claims.</li>
                <li>Upload historical proofs & documentation.</li>
                <li>Track verification status.</li>
              </ul>
              <Link href="/login" className="inline-block mt-6 text-xs font-bold uppercase tracking-widest text-gov-blue hover:text-gov-gold transition-colors">Citizen Portal &rarr;</Link>
            </div>

            <div className="bg-white border border-gov-light p-8">
              <Building size={32} className="text-gov-gold mb-4" />
              <h4 className="text-lg font-serif-official font-bold text-gov-blue mb-2">For Ministry Officials</h4>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Review AI collision reports.</li>
                <li>Verify citizen submissions.</li>
                <li>Authorize cryptographic blockchain locks.</li>
              </ul>
              <Link href="/admin-login" className="inline-block mt-6 text-xs font-bold uppercase tracking-widest text-gov-blue hover:text-gov-gold transition-colors">Admin Portal &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TRANSPARENCY STATS */}
      <section className="bg-gov-blue text-white py-16 border-y-4 border-gov-gold">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="py-4">
            <h4 className="text-5xl font-serif-official font-bold text-white mb-3">4,281</h4>
            <p className="text-xs uppercase tracking-widest text-gov-gold font-bold">Verified Claims Secured</p>
          </div>
          <div className="py-4">
            <h4 className="text-5xl font-serif-official font-bold text-white mb-3">142</h4>
            <p className="text-xs uppercase tracking-widest text-gov-gold font-bold">Bio-Piracy Attempts Prevented</p>
          </div>
          <div className="py-4">
            <h4 className="text-5xl font-serif-official font-bold text-white mb-3">100%</h4>
            <p className="text-xs uppercase tracking-widest text-gov-gold font-bold">Blockchain Immutability</p>
          </div>
        </div>
      </section>

      {/* MEGA FOOTER */}
      <footer className="bg-white text-gov-text relative z-10 pt-16 pb-8 border-t border-gov-light">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={36} className="text-gov-gold" strokeWidth={1.5} />
              <div>
                <h1 className="text-xl font-serif-official font-bold tracking-widest text-gov-blue leading-none uppercase">Root-Claim</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gov-gold mt-1 font-bold">Ministry of Ayush</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
              An official initiative to empower citizens in protecting India's traditional knowledge. Backed by immutable blockchain technology to ensure global recognition and prevent bio-piracy.
            </p>
          </div>

          <div>
            <h4 className="font-bold tracking-widest uppercase text-gov-blue mb-4 text-xs border-b border-gov-light pb-2 inline-block">Important Links</h4>
            <ul className="space-y-2 text-xs text-gray-600 font-semibold">
              <li><Link href="/login" className="hover:text-gov-gold transition-colors flex items-center gap-2"><FileText size={12}/> Citizen Login</Link></li>
              <li><Link href="/admin-login" className="hover:text-gov-gold transition-colors flex items-center gap-2"><FileText size={12}/> Ministry Login</Link></li>
              <li><a href="#" className="hover:text-gov-gold transition-colors flex items-center gap-2"><FileText size={12}/> Submit a Claim</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold tracking-widest uppercase text-gov-blue mb-4 text-xs border-b border-gov-light pb-2 inline-block">Government & Legal</h4>
            <ul className="space-y-2 text-xs text-gray-600 font-semibold">
              <li><a href="#" className="hover:text-gov-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gov-gold transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gov-gold transition-colors">Copyright Act</a></li>
              <li><a href="#" className="hover:text-gov-gold transition-colors">Right to Information (RTI)</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-gov-light pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-500 font-semibold">
            &copy; {new Date().getFullYear()} Ministry of Ayush, Government of India. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
            Designed & Developed by <span className="text-gov-gold">Abhijeet Kangane</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
