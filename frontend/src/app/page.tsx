"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, ArrowRight, Zap, Database, Search } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-spidey-bg text-spidey-text font-sans relative overflow-x-hidden">
      <div className="bg-spidey-web"></div>

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-spidey-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={32} className="text-spidey-red" />
            <h1 className="text-2xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-spidey-red to-spidey-blue uppercase italic">
              Root-Claim
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm tracking-wider text-gray-600">
            <a href="#features" className="hover:text-spidey-blue transition-colors">Features</a>
            <a href="#about" className="hover:text-spidey-blue transition-colors">About</a>
            <a href="#contact" className="hover:text-spidey-blue transition-colors">Contact</a>
          </nav>

          <Link href="/dashboard">
            <button className="bg-spidey-red hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-sm transition-all shadow-[0_4px_14px_0_rgba(226,54,54,0.39)] hover:shadow-[0_6px_20px_rgba(226,54,54,0.23)] hover:-translate-y-0.5 flex items-center gap-2">
              Launch App <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-blue-50 border border-spidey-blue/20 text-spidey-blue px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 shadow-sm"
        >
          <Zap size={14} className="text-spidey-red" /> 
          <span>Introducing IP-SAKTI 2099</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-6 text-gray-900 uppercase leading-[0.9]"
        >
          Protect Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-spidey-red via-red-500 to-spidey-blue">
            Intellectual Property
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mb-12 font-medium"
        >
          The ultimate Enterprise IP Analytics & Management Suite. Powered by RAG AI, Blockchain Vaults, and Real-Time Patent Radars to secure traditional knowledge globally.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/dashboard">
            <button className="w-full sm:w-auto bg-gradient-to-r from-spidey-blue to-blue-700 hover:from-blue-600 hover:to-spidey-blue text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-xl hover:shadow-spidey-blue/30 flex items-center justify-center gap-3">
              Enter Dashboard <ArrowRight size={18} />
            </button>
          </Link>
          <button className="w-full sm:w-auto bg-white border-2 border-gray-200 hover:border-spidey-red text-gray-800 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-sm">
            Read Documentation
          </button>
        </motion.div>

        {/* Feature Cards */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full text-left">
          {[
            { title: "RAG AI Assistant", icon: Database, color: "text-spidey-blue", bg: "bg-blue-50" },
            { title: "Collision Scanner", icon: Search, color: "text-spidey-red", bg: "bg-red-50" },
            { title: "Blockchain Vault", icon: ShieldCheck, color: "text-spidey-text", bg: "bg-gray-100" }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + (idx * 0.1) }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                <feature.icon size={28} className={feature.color} />
              </div>
              <h3 className="text-xl font-black mb-3">{feature.title}</h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                Experience ultra-fast processing and secure data management tailored specifically for Ayurvedic and traditional intellectual property.
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <ShieldCheck size={24} className="text-spidey-red" />
            <span className="font-black italic text-lg tracking-tighter">ROOT-CLAIM</span>
          </div>
          
          <div className="text-gray-400 text-sm font-medium">
            &copy; {new Date().getFullYear()} Root-Claim Enterprise. All rights reserved.
          </div>
          
          <div className="text-gray-300 text-xs tracking-widest uppercase">
            Developed by <span className="font-bold">Abhijeet Kangane</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
