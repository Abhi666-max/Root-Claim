"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight, Database, Search, Lock } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen text-apple-text font-sans relative overflow-x-hidden">
      {/* Animated Pastel Blobs */}
      <div className="blob-container">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Glass Navbar */}
      <header className="sticky top-4 z-50 mx-4 md:mx-auto max-w-7xl vision-glass rounded-full px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck size={24} className="text-apple-text" />
          <h1 className="text-xl font-bold tracking-tight text-apple-text">
            Root-Claim
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-apple-gray">
          <a href="#features" className="hover:text-apple-text transition-colors">Features</a>
          <a href="#technology" className="hover:text-apple-text transition-colors">Technology</a>
          <a href="#about" className="hover:text-apple-text transition-colors">About</a>
        </nav>

        <Link href="/dashboard">
          <button className="apple-button px-5 py-2 text-sm flex items-center gap-2">
            Open Dashboard <ArrowRight size={14} />
          </button>
        </Link>
      </header>

      {/* Ethereal Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 bg-white/40 border border-white/60 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide mb-8 text-apple-gray shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          IP-SAKTI Intelligence Active
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tight mb-6 text-apple-text leading-[1.05]"
        >
          Absolute clarity. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Ultimate protection.
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-apple-gray max-w-2xl mb-12 font-medium leading-relaxed"
        >
          The enterprise Intellectual Property suite designed for the future. Effortlessly secure, analyze, and manage traditional knowledge with ultra-fast RAG AI and cryptographic vaults.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/dashboard">
            <button className="w-full sm:w-auto apple-button px-8 py-4 text-lg flex items-center justify-center gap-3">
              Enter Workspace <ArrowRight size={18} />
            </button>
          </Link>
          <button className="w-full sm:w-auto bg-white/50 hover:bg-white/80 border border-white/60 backdrop-blur-md text-apple-text px-8 py-4 rounded-[980px] font-semibold text-lg transition-all shadow-sm">
            Read Whitepaper
          </button>
        </motion.div>

        {/* Vision Glass Feature Cards */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 w-full text-left">
          {[
            { title: "RAG Intelligence", icon: Database, desc: "Instant contextual retrieval powered by advanced vector search." },
            { title: "Collision Radar", icon: Search, desc: "Proactive infringement scanning across global patent databases." },
            { title: "Blockchain Vault", icon: Lock, desc: "Immutable timestamping on the Polygon cryptographic network." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + (idx * 0.1) }}
              className="vision-glass-card p-8 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 shadow-inner">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
              <p className="text-apple-gray font-medium text-sm leading-relaxed">
                {feature.desc} Experience the seamless integration of high-performance analytics in a remarkably intuitive interface.
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Elegant Footer */}
      <footer className="mt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto vision-glass rounded-3xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-apple-text" />
            <span className="font-bold tracking-tight">Root-Claim</span>
          </div>
          
          <div className="text-apple-gray text-sm font-medium">
            &copy; {new Date().getFullYear()} Enterprise Systems. Designed with precision.
          </div>
          
          <div className="text-apple-gray text-xs font-medium uppercase tracking-widest">
            Developed by <span className="font-bold text-apple-text">Abhijeet Kangane</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
