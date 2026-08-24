"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert, ArrowRight, Zap, Target, Crosshair } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen text-iqoo-white font-sans relative overflow-hidden selection:bg-iqoo-orange selection:text-white">
      {/* Aggressive Carbon Fiber Background */}
      <div className="bg-carbon"></div>
      
      {/* Decorative Diagonal Slashes */}
      <div className="slash-accent top-20 -left-10"></div>
      <div className="slash-accent bottom-40 -right-20"></div>

      {/* Extreme Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b-2 border-iqoo-orange/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert size={36} className="text-iqoo-orange" />
            <h1 className="text-3xl font-black tracking-widest text-white uppercase font-sans">
              ROOT<span className="text-iqoo-orange">-</span>CLAIM
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 font-bold text-sm tracking-[0.2em] text-gray-400 uppercase">
            <a href="#features" className="hover:text-iqoo-yellow glitch-hover transition-colors">Armory</a>
            <a href="#about" className="hover:text-iqoo-yellow glitch-hover transition-colors">Specs</a>
            <a href="#contact" className="hover:text-iqoo-yellow glitch-hover transition-colors">Comms</a>
          </nav>

          <Link href="/dashboard">
            <button className="bg-transparent border-2 border-iqoo-orange text-iqoo-orange hover:bg-iqoo-orange hover:text-black px-8 py-2 font-black uppercase tracking-[0.2em] text-sm transition-all shadow-[0_0_15px_rgba(255,69,0,0.3)] hover:shadow-[0_0_25px_rgba(255,69,0,0.8)] flex items-center gap-3 glitch-hover">
              Deploy <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </header>

      {/* Adrenaline Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 1.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center gap-3 bg-iqoo-orange/10 border border-iqoo-orange px-6 py-2 text-xs font-bold uppercase tracking-[0.3em] mb-8 font-mono-tech"
        >
          <Zap size={16} className="text-iqoo-yellow animate-pulse" /> 
          <span className="text-iqoo-orange">System Overclocked</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-4 uppercase leading-[0.9] text-white"
        >
          Absolute <br/>
          <span className="text-iqoo-orange text-glow-orange font-black">
            Protection
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mb-12 font-bold tracking-wide font-mono-tech"
        >
          // THE APEX ENTERPRISE IP MANAGEMENT SUITE // HIGH-OCTANE RAG AI // BLOCKCHAIN SECURED //
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link href="/dashboard" className="w-full sm:w-auto">
            <button className="w-full bg-iqoo-orange hover:bg-orange-600 text-black px-14 py-5 font-black uppercase tracking-[0.2em] text-lg transition-all shadow-[0_0_30px_rgba(255,69,0,0.6)] hover:shadow-[0_0_50px_rgba(255,69,0,1)] flex items-center justify-center gap-3 glitch-hover border border-iqoo-orange">
              Engage System <Target size={22} />
            </button>
          </Link>
        </motion.div>

        {/* Tactical UI Panels */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 w-full text-left">
          {[
            { title: "RAG Intel Core", icon: Target, desc: "Sub-millisecond retrieval powered by vector overclocking." },
            { title: "Collision Radar", icon: Crosshair, desc: "Aggressive scanning to eliminate IP infringement instantly." },
            { title: "Blockchain Armor", icon: ShieldAlert, desc: "Immutable cryptographic locking on the Polygon network." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + (idx * 0.1) }}
              className="iqoo-panel p-8 hover:-translate-y-2 transition-transform duration-200 group cursor-crosshair"
            >
              <div className="w-16 h-16 bg-black border border-iqoo-orange/40 flex items-center justify-center mb-6 group-hover:border-iqoo-orange group-hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] transition-all">
                <feature.icon size={32} className="text-iqoo-orange" />
              </div>
              <h3 className="text-2xl font-black mb-3 tracking-widest uppercase text-white group-hover:text-iqoo-yellow transition-colors">{feature.title}</h3>
              <p className="text-gray-400 font-bold font-mono-tech text-sm leading-relaxed tracking-wider">
                &gt; {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Industrial Footer */}
      <footer className="mt-20 border-t-2 border-iqoo-orange/40 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <ShieldAlert size={20} className="text-iqoo-orange" />
            <span className="font-black tracking-widest text-lg uppercase">ROOT-CLAIM // 2026</span>
          </div>
          
          <div className="text-gray-500 font-mono-tech text-xs tracking-[0.2em] uppercase">
            Developed By: <span className="text-iqoo-white font-bold">Abhijeet Kangane</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
