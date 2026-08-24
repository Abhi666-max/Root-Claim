"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Fingerprint, Activity, Hexagon, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-metal-bg text-white font-sans relative overflow-x-hidden selection:bg-neon-cyan selection:text-black">
      
      {/* Header */}
      <header className="sticky top-6 z-50 mx-6 md:mx-auto max-w-7xl neu-outset px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="neu-inset p-2 rounded-lg text-neon-cyan">
            <Shield size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-widest uppercase">
            Root-Claim
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-10 font-medium text-sm tracking-widest text-gray-400 uppercase">
          <a href="#features" className="hover:text-neon-cyan transition-colors">Core Specs</a>
          <a href="#about" className="hover:text-neon-cyan transition-colors">Architecture</a>
          <a href="#contact" className="hover:text-neon-cyan transition-colors">Telemetry</a>
        </nav>

        <Link href="/dashboard">
          <button className="neu-button px-6 py-3 font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:text-neon-cyan group">
            Ignite System <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="neu-inset px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.3em] mb-10 text-gray-400 flex items-center gap-3"
        >
          <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse shadow-[0_0_10px_#b500ff]"></span>
          Neural Engine Connected
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-8 uppercase leading-[1.1] text-gray-200"
        >
          Secure Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500 font-black">
            Intellectual Assets
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-500 max-w-2xl mb-14 font-medium tracking-wide leading-relaxed"
        >
          The tactile command center for Enterprise IP Analytics. Engineered with RAG neural retrieval and immutable blockchain architecture.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/dashboard">
            <button className="neu-button neon-edge px-12 py-5 text-sm uppercase tracking-widest font-bold flex items-center justify-center gap-3 text-white">
              <Fingerprint size={18} className="text-neon-cyan" /> Authenticate
            </button>
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 w-full text-left">
          {[
            { title: "RAG Engine", icon: Activity, desc: "Sub-millisecond retrieval powered by high-density vector processing." },
            { title: "Collision Scan", icon: Hexagon, desc: "Aggressive scanning to eliminate IP infringement instantly." },
            { title: "Vault Armor", icon: Shield, desc: "Immutable cryptographic locking on the decentralized network." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + (idx * 0.1) }}
              className="neu-outset p-8 group"
            >
              <div className="w-16 h-16 neu-inset flex items-center justify-center mb-8 text-gray-500 group-hover:text-neon-cyan transition-colors duration-300">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4 tracking-widest uppercase">{feature.title}</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed tracking-wide">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto neu-inset rounded-[24px] px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-gray-500" />
            <span className="font-bold tracking-widest uppercase text-sm">Root-Claim // 2.0</span>
          </div>
          
          <div className="text-gray-600 text-xs font-bold tracking-widest uppercase">
            Engineered by <span className="text-gray-300">Abhijeet Kangane</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
