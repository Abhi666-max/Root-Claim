"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, BookOpen, Link as LinkIcon, FileSearch } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gov-ivory text-gov-text font-serif relative overflow-x-hidden bg-mandala selection:bg-gov-gold selection:text-white">
      
      {/* Majestic Header */}
      <header className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between border-b border-gov-light relative z-10">
        <div className="flex items-center gap-4">
          <div className="text-gov-gold">
            <ShieldCheck size={32} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-cinzel font-bold tracking-widest text-gov-blue leading-none">
              Root-Claim
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-gov-gold font-cinzel mt-1">
              Ministry of Ayush Initiative
            </p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-10 font-cinzel text-sm font-semibold tracking-widest text-gov-blue uppercase">
          <a href="#overview" className="hover:text-gov-gold transition-colors">Overview</a>
          <a href="#infrastructure" className="hover:text-gov-gold transition-colors">Infrastructure</a>
          <a href="#directory" className="hover:text-gov-gold transition-colors">Directory</a>
        </nav>

        <Link href="/dashboard">
          <button className="gov-btn text-xs">
            Access Portal
          </button>
        </Link>
      </header>

      {/* Authoritative Hero Section */}
      <main className="relative z-10 pt-24 pb-20 px-8 max-w-5xl mx-auto flex flex-col items-center text-center">
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="mb-8"
        >
          <div className="w-px h-16 bg-gov-gold mx-auto mb-8 opacity-50"></div>
          <span className="font-cinzel text-xs font-bold uppercase tracking-[0.3em] text-gov-gold">
            Department of Intellectual Property
          </span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-6xl font-cinzel font-bold tracking-wide mb-8 text-gov-blue leading-tight"
        >
          Securing the Heritage of <br/>
          <span className="text-gov-gold">Traditional Knowledge.</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg text-gray-700 max-w-3xl mb-14 leading-relaxed italic"
        >
          "A unified, decentralized registry designed to protect ancient manuscripts and traditional formulations through state-of-the-art cryptographic immutability and semantic retrieval."
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Link href="/dashboard">
            <button className="gov-btn px-10 py-4 text-sm">
              Enter Secure Registry
            </button>
          </Link>
          <button className="gov-btn-outline px-10 py-4 text-sm">
            Read Mandate
          </button>
        </motion.div>

        <div className="w-full mt-32 mb-16">
          <div className="gov-divider"></div>
        </div>

        {/* Flat Elegance Cards */}
        <div id="infrastructure" className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full text-left">
          {[
            { title: "Semantic Indexing", icon: BookOpen, desc: "Rigorous contextual search across translated ancient texts using advanced RAG methodologies." },
            { title: "Collision Detection", icon: FileSearch, desc: "Automated auditing against global patent databases to identify and prevent biopiracy." },
            { title: "Immutable Ledger", icon: LinkIcon, desc: "Cryptographic anchoring on the decentralized Polygon network to guarantee data integrity." }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 + (idx * 0.2) }}
              className="gov-card group"
            >
              <div className="text-gov-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                <feature.icon size={36} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-cinzel font-bold mb-4 text-gov-blue tracking-wide">{feature.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Prestige Footer */}
      <footer className="mt-20 border-t border-gov-light bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-cinzel font-bold text-gov-blue text-lg tracking-widest">Root-Claim</span>
            <span className="text-xs text-gray-500 font-cinzel uppercase tracking-widest">Digital Infrastructure</span>
          </div>
          
          <div className="text-gray-500 text-xs font-cinzel uppercase tracking-widest">
            Architected by <span className="font-bold text-gov-blue">Abhijeet Kangane</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
