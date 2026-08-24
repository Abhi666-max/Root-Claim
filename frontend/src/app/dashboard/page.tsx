"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Shield, Database, Activity, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat')

  const modules = [
    { id: 'chat', label: 'RAG Intelligence', num: '01', icon: Database },
    { id: 'scanner', label: 'Collision Radar', num: '02', icon: Search },
    { id: 'vault', label: 'Immutable Vault', num: '03', icon: Shield },
    { id: 'radar', label: 'Global Monitor', num: '04', icon: Activity },
  ]

  return (
    <div className="min-h-screen w-full bg-aww-bg text-aww-charcoal relative font-sans selection:bg-aww-sage selection:text-aww-charcoal">
      <div className="noise-overlay"></div>

      <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col md:flex-row relative z-10">
        
        {/* Editorial Sidebar / Index */}
        <aside className="w-full md:w-[400px] border-r border-aww-charcoal/20 flex flex-col justify-between py-12 px-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-aww-charcoal/50 hover:text-aww-charcoal transition-colors mb-16">
              <ArrowLeft size={14} /> Return
            </Link>
            
            <h1 className="text-4xl font-serif italic mb-2">Workspace.</h1>
            <p className="text-sm font-light text-aww-charcoal/60 mb-16">IP-SAKTI Analysis Interface</p>

            <nav className="flex flex-col gap-8">
              {modules.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="text-left group"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className={`text-xs font-bold transition-colors ${isActive ? 'text-aww-terra' : 'text-aww-charcoal/30'}`}>
                        {item.num}
                      </span>
                      <span className={`text-2xl font-serif transition-colors ${isActive ? 'italic' : 'text-aww-charcoal/70 group-hover:text-aww-charcoal'}`}>
                        {item.label}
                      </span>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="mt-16 pt-8 border-t border-aww-charcoal/20 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-aww-sage animate-pulse"></div>
            <span className="text-xs uppercase tracking-widest text-aww-charcoal/60">System Synced</span>
          </div>
        </aside>

        {/* Editorial Main Workspace */}
        <main className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {activeTab === 'chat' && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex flex-col h-screen"
              >
                {/* Minimal Header */}
                <header className="h-32 border-b border-aww-charcoal/20 flex items-end pb-8 px-12">
                  <h2 className="text-5xl font-serif">RAG <span className="italic text-aww-sage">Intelligence</span></h2>
                </header>

                {/* Chat Flow */}
                <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12">
                  <div className="flex items-start gap-8 max-w-3xl">
                    <div className="w-12 h-12 shrink-0 border border-aww-charcoal/20 rounded-full flex items-center justify-center bg-aww-bg">
                      <Database size={18} className="text-aww-charcoal/60" />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-widest mb-4 text-aww-charcoal/50">IP-SAKTI Engine</p>
                      <p className="text-xl font-serif leading-relaxed text-aww-charcoal">
                        Greetings. I am connected to the Ayurvedic Vector Database. Please provide your query regarding traditional formulations or patent validations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="p-12 border-t border-aww-charcoal/20 bg-aww-bg">
                  <div className="relative max-w-4xl mx-auto flex items-end">
                    <textarea 
                      placeholder="Enter your directive here..." 
                      className="w-full bg-transparent border-b border-aww-charcoal/30 pb-4 text-lg font-serif focus:outline-none focus:border-aww-terra transition-colors resize-none overflow-hidden h-12"
                      rows={1}
                    ></textarea>
                    <button className="ml-8 pb-4 text-sm font-bold uppercase tracking-widest text-aww-terra editorial-link shrink-0">
                      Submit
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab !== 'chat' && (
              <motion.div 
                key="other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col items-center justify-center h-screen text-center px-12"
              >
                <div className="mb-12">
                  <Shield size={64} strokeWidth={1} className="text-aww-charcoal/20" />
                </div>
                <h3 className="text-5xl font-serif italic mb-6">Restricted Archive.</h3>
                <p className="text-lg text-aww-charcoal/60 max-w-xl font-light leading-relaxed">
                  Authentication is required to access this specialized module. Please verify your legal credentials with the system administrator.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

      </div>
    </div>
  )
}
