"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight, Zap, Database, Search } from 'lucide-react'
import Link from 'next/link'
import PlasmaBackground from '@/components/PlasmaBackground'

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white font-sans relative overflow-x-hidden selection:bg-plasma-red selection:text-white">
      {/* 3D Interactive Plasma Background */}
      <PlasmaBackground />

      {/* Navbar - Glassmorphism */}
      <header className="sticky top-0 z-50 glass-panel border-b-0 border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck size={32} className="text-plasma-red" />
            <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-plasma-red to-plasma-purple uppercase italic">
              Root-Claim
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm tracking-wider text-gray-300 uppercase">
            <a href="#features" className="hover:text-white hover:text-glow-plasma transition-all">Features</a>
            <a href="#about" className="hover:text-white hover:text-glow-plasma transition-all">About</a>
            <a href="#contact" className="hover:text-white hover:text-glow-plasma transition-all">Contact</a>
          </nav>

          <Link href="/dashboard">
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white px-8 py-2.5 rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:shadow-[0_0_30px_rgba(255,42,95,0.4)] flex items-center gap-2 group">
              Initialize <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 glass-panel px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border-plasma-red/30"
        >
          <Zap size={14} className="text-plasma-red animate-pulse" /> 
          <span className="text-gray-200">System v2.0 Online</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase leading-[0.9] text-glow-plasma"
        >
          Protect Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Intellectual Property
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mb-12 font-medium"
        >
          The ultimate Enterprise IP Analytics & Management Suite. Powered by RAG AI, Blockchain Vaults, and Real-Time Patent Radars.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/dashboard">
            <button className="w-full sm:w-auto bg-gradient-to-r from-plasma-red to-plasma-purple hover:from-plasma-purple hover:to-plasma-red text-white px-12 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all shadow-[0_0_40px_rgba(255,42,95,0.6)] hover:scale-105 flex items-center justify-center gap-3">
              Enter System <ArrowRight size={18} />
            </button>
          </Link>
        </motion.div>

        {/* Feature Cards - Glassmorphism */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 w-full text-left">
          {[
            { title: "RAG AI Assistant", icon: Database, color: "text-plasma-blue" },
            { title: "Collision Scanner", icon: Search, color: "text-plasma-red" },
            { title: "Blockchain Vault", icon: ShieldCheck, color: "text-plasma-purple" }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + (idx * 0.1) }}
              className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon size={28} className={feature.color} />
              </div>
              <h3 className="text-xl font-black mb-3 tracking-wide">{feature.title}</h3>
              <p className="text-gray-400 font-medium text-sm leading-relaxed">
                Experience ultra-fast processing and secure data management tailored specifically for Ayurvedic and traditional intellectual property.
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/10 glass-panel relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={24} className="text-plasma-red" />
            <span className="font-black italic text-lg tracking-tighter">ROOT-CLAIM</span>
          </div>
          
          <div className="text-gray-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Root-Claim Enterprise. All rights reserved.
          </div>
          
          <div className="text-gray-500 text-xs tracking-widest uppercase">
            Developed by <span className="font-bold text-gray-300">Abhijeet Kangane</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
