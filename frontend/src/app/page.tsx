"use client"

import React from 'react'
import { User, Building, ChevronRight, FileText, Globe, Link as LinkIcon, FileSearch, Quote, Network } from 'lucide-react'
import Logo from '@/components/Logo'
import Link from 'next/link'

export default function LandingPage() {
  const [fontSize, setFontSize] = React.useState(16);
  const changeFontSize = (delta: number) => {
    const newSize = Math.max(12, Math.min(24, fontSize + delta));
    setFontSize(newSize);
    document.documentElement.style.fontSize = `px`;
  };
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
            <button onClick={() => changeFontSize(-2)} className="hover:text-gov-gold transition-colors">A-</button>
            <button onClick={() => { setFontSize(16); document.documentElement.style.fontSize = "16px"; }} className="hover:text-gov-gold transition-colors">A</button>
            <button onClick={() => changeFontSize(2)} className="hover:text-gov-gold transition-colors">A+</button>
            <span className="text-gov-gold">|</span>
            <button className="hover:text-gov-gold transition-colors">English</button>
          </div>
        </div>

        {/* Main Navbar */}
        <header className="bg-gov-ivory/95 backdrop-blur-md px-6 md:px-12 h-20 flex items-center justify-between border-b border-gov-light">
          <div className="flex items-center gap-4">
            <div className="text-gov-gold">
              <Logo type="citizen" size={36} />
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

