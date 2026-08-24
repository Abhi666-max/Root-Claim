"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, ShieldCheck, Lock, FileText, LogOut, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat')

  const navItems = [
    { id: 'chat', label: 'Semantic Registry', icon: BookOpen },
    { id: 'scanner', label: 'Collision Audit', icon: FileText },
    { id: 'vault', label: 'Blockchain Ledger', icon: LinkIcon },
    { id: 'radar', label: 'Threat Monitoring', icon: ShieldCheck },
  ]

  return (
    <div className="flex h-screen w-full bg-white text-gov-text font-serif selection:bg-gov-gold selection:text-white">
      
      {/* Prestigious Sidebar */}
      <aside className="w-72 bg-gov-ivory border-r border-gov-light flex flex-col bg-mandala relative">
        
        {/* Ministry Header */}
        <div className="px-8 py-10 text-center border-b border-gov-light">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-gov-gold text-gov-gold mb-4">
            <ShieldCheck size={24} strokeWidth={1} />
          </div>
          <h1 className="font-cinzel font-bold tracking-widest text-gov-blue text-sm uppercase">
            Root-Claim
          </h1>
          <p className="text-[9px] text-gov-gold font-cinzel tracking-[0.2em] uppercase mt-1">
            Authorized Personnel Only
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-6 py-4 transition-all duration-300 font-cinzel text-xs tracking-widest uppercase border ${
                  isActive 
                  ? 'border-gov-gold bg-white text-gov-blue shadow-sm' 
                  : 'border-transparent text-gray-500 hover:border-gov-light hover:text-gov-blue'
                }`}
              >
                <Icon size={16} strokeWidth={1.5} className={isActive ? 'text-gov-gold' : 'text-gray-400'} />
                <span className="font-semibold">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-8 border-t border-gov-light">
          <Link href="/">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 text-gray-500 hover:text-red-700 transition-colors uppercase text-xs font-cinzel font-bold tracking-widest">
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Registry Area */}
      <main className="flex-1 flex flex-col bg-white">
        
        {/* Official Header */}
        <header className="h-24 border-b border-gov-light flex items-center px-12 justify-between">
          <h2 className="text-xl font-cinzel font-bold tracking-widest uppercase text-gov-blue">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          
          <div className="flex items-center gap-3 border border-gov-light px-4 py-2 bg-gov-ivory">
            <div className="h-2 w-2 rounded-full bg-green-700"></div>
            <span className="text-[10px] font-cinzel font-bold text-gov-text uppercase tracking-widest">
              Secure Ledger Active
            </span>
          </div>
        </header>

        {/* Module Content */}
        <div className="flex-1 px-12 py-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'chat' && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="h-full flex flex-col max-w-4xl mx-auto"
              >
                
                {/* System Message */}
                <div className="mb-10 border border-gov-light p-8 bg-gov-ivory relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gov-gold"></div>
                  <h3 className="font-cinzel font-bold uppercase tracking-widest text-sm mb-4 text-gov-blue">
                    IP-SAKTI Interface
                  </h3>
                  <p className="text-base text-gray-700 leading-relaxed italic">
                    "Welcome to the central semantic registry. The vector database is currently synchronized with the national traditional knowledge archive. Please enter your query for prior-art examination."
                  </p>
                </div>

                {/* Query Input Box */}
                <div className="mt-auto pt-10 border-t border-gov-light">
                  <div className="relative flex flex-col">
                    <label className="text-[10px] font-cinzel font-bold uppercase tracking-[0.2em] text-gray-500 mb-2">
                      Enter Audit Query
                    </label>
                    <div className="flex items-center">
                      <input 
                        type="text" 
                        placeholder="E.g., Turmeric formulations for wound healing..." 
                        className="flex-1 bg-transparent border-b border-gov-gold py-4 text-gov-text focus:outline-none focus:border-gov-blue transition-colors text-lg italic placeholder-gray-300"
                      />
                      <button className="gov-btn ml-6 px-10 py-3 text-xs">
                        Audit
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab !== 'chat' && (
              <motion.div 
                key="other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto"
              >
                <div className="mb-8 text-gov-gold opacity-50">
                  <Lock size={64} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-cinzel font-bold tracking-widest uppercase text-gov-blue mb-4">
                  Restricted Archive
                </h3>
                <div className="gov-divider mb-6"></div>
                <p className="text-gray-600 italic leading-relaxed">
                  Access to this specific module requires secondary clearance. Please authenticate your cryptographic signature to view these classified records.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
