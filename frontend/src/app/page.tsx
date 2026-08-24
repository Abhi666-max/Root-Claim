"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Hexagon, ArrowRight, ShieldCheck, Cpu, Layers, Radar } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen text-cyber-text font-sans relative overflow-x-hidden">
      {/* Glowing Orbs */}
      <div className="orb-container">
        <div className="orb orb-cyan"></div>
        <div className="orb orb-pink"></div>
        <div className="orb orb-purple"></div>
      </div>

      {/* Frosted Glass Navbar */}
      <header className="sticky top-6 z-50 mx-6 md:mx-auto max-w-6xl cyber-glass rounded-full px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyber-cyan to-cyber-pink flex items-center justify-center text-white shadow-lg shadow-cyber-cyan/30">
            <ShieldCheck size={16} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-cyber-text">
            Root-Claim
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-cyber-gray">
          <a href="#features" className="hover:text-cyber-text transition-colors">Neural Core</a>
          <a href="#architecture" className="hover:text-cyber-text transition-colors">Architecture</a>
          <a href="#about" className="hover:text-cyber-text transition-colors">Enterprise</a>
        </nav>

        <Link href="/dashboard">
          <button className="cyber-btn px-6 py-2.5 text-sm flex items-center gap-2">
            Launch Platform <ArrowRight size={14} />
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 pt-40 pb-20 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 bg-white/60 border border-white/80 backdrop-blur-xl px-5 py-2 rounded-full text-xs font-bold tracking-wide mb-10 text-cyber-gray shadow-sm"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-pink opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyber-cyan"></span>
          </span>
          V2.0 Core Intelligence Online
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-cyber-text leading-[1.05]"
        >
          Hyper-Intelligent <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan via-purple-500 to-cyber-pink">
            Asset Protection.
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-cyber-gray max-w-2xl mb-12 font-medium leading-relaxed"
        >
          The absolute pinnacle of enterprise intellectual property management. Merging semantic RAG vector search with immutable blockchain verification.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/dashboard">
            <button className="w-full sm:w-auto cyber-btn px-10 py-4 text-lg flex items-center justify-center gap-3">
              Enter Dashboard <ArrowRight size={18} />
            </button>
          </Link>
          <button className="w-full sm:w-auto bg-white/60 hover:bg-white/90 border border-white/80 backdrop-blur-md text-cyber-text px-10 py-4 rounded-full font-bold text-lg transition-all shadow-sm flex items-center justify-center gap-2">
            <Hexagon size={18} /> Read Docs
          </button>
        </motion.div>

        {/* Floating Glass Cards */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-40 w-full text-left">
          {[
            { title: "Semantic Retrieval", icon: Cpu, desc: "Instantaneous contextual vector search across global IP nodes." },
            { title: "Infringement Radar", icon: Radar, desc: "Aggressive pre-filing collision detection and pattern mapping." },
            { title: "Decentralized Vault", icon: Layers, desc: "Cryptographic hash generation anchored to the Polygon network." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + (idx * 0.1) }}
              className="cyber-glass-card p-8 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyber-cyan/10 to-transparent rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center mb-6 shadow-sm text-cyber-text group-hover:text-cyber-cyan transition-colors">
                <feature.icon size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight text-cyber-text">{feature.title}</h3>
              <p className="text-cyber-gray font-medium text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 pb-8 px-6 relative z-10">
        <div className="max-w-6xl mx-auto cyber-glass rounded-[32px] px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-bold tracking-tight text-cyber-text text-lg">
            Root-Claim
          </div>
          
          <div className="text-cyber-gray text-xs font-bold uppercase tracking-widest">
            Architected by <span className="text-cyber-text">Abhijeet Kangane</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
