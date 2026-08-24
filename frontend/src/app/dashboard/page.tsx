"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Shield, Database, Activity, ArrowLeft, Send, Clock, FileText, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const modules = [
    { id: 'overview', label: 'System Overview', num: '01', icon: Activity },
    { id: 'chat', label: 'RAG Intelligence', num: '02', icon: Database },
    { id: 'scanner', label: 'Collision Radar', num: '03', icon: Search },
    { id: 'vault', label: 'Immutable Vault', num: '04', icon: Shield },
  ]

  return (
    <div className="min-h-screen w-full bg-aww-bg text-aww-charcoal relative font-sans selection:bg-aww-sage selection:text-aww-charcoal">
      <div className="noise-overlay"></div>

      <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col md:flex-row relative z-10">
        
        {/* Editorial Sidebar / Index */}
        <aside className="w-full md:w-[350px] lg:w-[400px] border-r border-aww-charcoal/20 flex flex-col justify-between py-12 px-8 bg-aww-sand/30">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-aww-charcoal/50 hover:text-aww-terra transition-colors mb-16">
              <ArrowLeft size={14} /> Return to Home
            </Link>
            
            <h1 className="text-4xl font-serif italic mb-2">Workspace.</h1>
            <p className="text-sm font-light text-aww-charcoal/60 mb-16 uppercase tracking-[0.2em]">IP-SAKTI Analysis Interface</p>

            <nav className="flex flex-col gap-6">
              {modules.map((item) => {
                const isActive = activeTab === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className="text-left group"
                  >
                    <div className="flex items-baseline gap-4 pb-2 border-b border-aww-charcoal/10 group-hover:border-aww-sage transition-colors">
                      <span className={`text-xs font-bold transition-colors ${isActive ? 'text-aww-terra' : 'text-aww-charcoal/30'}`}>
                        {item.num}
                      </span>
                      <span className={`text-xl font-serif transition-colors ${isActive ? 'italic font-bold' : 'text-aww-charcoal/70 group-hover:text-aww-charcoal'}`}>
                        {item.label}
                      </span>
                    </div>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="mt-16 pt-8 border-t border-aww-charcoal/20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-aww-sage animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-aww-charcoal/60">System Synced</span>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-aww-terra">v2.4.1</span>
          </div>
        </aside>

        {/* Editorial Main Workspace */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-aww-bg">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB (Full Dashboard Feel) */}
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-1 overflow-y-auto px-12 py-12"
              >
                <header className="mb-12 border-b border-aww-charcoal/20 pb-8">
                  <h2 className="text-5xl font-serif">System <span className="italic text-aww-sage">Overview</span></h2>
                  <p className="mt-4 text-aww-charcoal/60 font-light">Real-time telemetry and indexing status for the Ayush Database.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="p-8 border border-aww-charcoal/10 bg-aww-sand hover:border-aww-terra transition-colors">
                    <Database size={24} className="text-aww-terra mb-6" />
                    <h3 className="text-4xl font-serif mb-2">245,091</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-aww-charcoal/50">Vectors Indexed</p>
                  </div>
                  <div className="p-8 border border-aww-charcoal/10 bg-aww-sand hover:border-aww-sage transition-colors">
                    <Shield size={24} className="text-aww-sage mb-6" />
                    <h3 className="text-4xl font-serif mb-2">1,024</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-aww-charcoal/50">Documents Secured on Polygon</p>
                  </div>
                  <div className="p-8 border border-aww-charcoal/10 bg-aww-sand hover:border-aww-charcoal transition-colors">
                    <Activity size={24} className="text-aww-charcoal mb-6" />
                    <h3 className="text-4xl font-serif mb-2">12ms</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-aww-charcoal/50">Average Query Latency (Groq)</p>
                  </div>
                </div>

                <div className="border border-aww-charcoal/10 bg-white/50 p-8">
                  <h3 className="text-2xl font-serif mb-8 flex items-center gap-4">
                    <Clock size={20} className="text-aww-sage" /> Recent Operations
                  </h3>
                  <div className="space-y-6">
                    {[
                      { doc: "Ashwagandha Formulation Patent #IND45", action: "Vectorized", time: "2 mins ago", icon: FileText, color: "text-aww-terra" },
                      { doc: "Neem Leaf Extract (US Patent Cross-check)", action: "Collision Scanned", time: "15 mins ago", icon: Search, color: "text-aww-sage" },
                      { doc: "Tulsi Extract Manufacturing Process", action: "Blockchain Hashed", time: "1 hour ago", icon: Shield, color: "text-blue-500" },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between pb-6 border-b border-aww-charcoal/10 last:border-0 last:pb-0">
                        <div className="flex items-center gap-4">
                          <div className={`p-2 bg-aww-sand rounded-sm ${row.color}`}>
                            <row.icon size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-sm">{row.doc}</p>
                            <p className="text-xs text-aww-charcoal/50 mt-1">{row.action}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold tracking-widest text-aww-charcoal/40 uppercase">{row.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* CHAT TAB (RAG Intelligence) */}
            {activeTab === 'chat' && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col h-full relative"
              >
                <header className="h-32 border-b border-aww-charcoal/20 flex items-end pb-8 px-12 bg-aww-bg/80 backdrop-blur-sm z-10 shrink-0">
                  <h2 className="text-5xl font-serif">RAG <span className="italic text-aww-sage">Intelligence</span></h2>
                </header>

                <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12 pb-40">
                  <div className="flex items-start gap-8 max-w-4xl">
                    <div className="w-12 h-12 shrink-0 border border-aww-charcoal/20 rounded-full flex items-center justify-center bg-aww-sand">
                      <Database size={18} className="text-aww-charcoal/60" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-3 text-aww-charcoal/50">IP-SAKTI Engine</p>
                      <p className="text-2xl font-serif leading-relaxed text-aww-charcoal bg-white/50 p-6 border border-aww-charcoal/10">
                        Greetings. I am connected to the Ayurvedic Vector Database. Please provide your query regarding traditional formulations or patent validations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-8 max-w-4xl ml-auto flex-row-reverse">
                    <div className="w-12 h-12 shrink-0 border border-aww-terra rounded-full flex items-center justify-center bg-aww-terra text-white">
                      <span className="font-bold text-sm">AK</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold uppercase tracking-widest mb-3 text-aww-charcoal/50">Legal Researcher</p>
                      <p className="text-xl font-serif leading-relaxed text-aww-charcoal bg-aww-sand p-6 border border-aww-charcoal/10 text-left">
                        Has there been any patent filed globally regarding the extraction of Curcumin using method XYZ? Check against the Ayurvedic texts.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-8 max-w-4xl">
                    <div className="w-12 h-12 shrink-0 border border-aww-charcoal/20 rounded-full flex items-center justify-center bg-aww-sand">
                      <Database size={18} className="text-aww-charcoal/60" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest mb-3 text-aww-charcoal/50">IP-SAKTI Engine</p>
                      <div className="text-lg font-sans font-light leading-relaxed text-aww-charcoal bg-white/50 p-6 border border-aww-charcoal/10 space-y-4">
                        <p>I have scanned the global patent database and the Ayurvedic vectors.</p>
                        <p className="flex items-center gap-2 text-aww-sage font-bold"><CheckCircle size={16} /> Similar formulation found in Sushruta Samhita (Vector ID: 0x8F2A)</p>
                        <p>There is a pending US Patent application (US20240981) which closely resembles this traditional method. I recommend flagging this for collision review.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-0 w-full p-8 bg-gradient-to-t from-aww-bg via-aww-bg to-transparent">
                  <div className="max-w-4xl mx-auto bg-white border border-aww-charcoal/20 shadow-2xl flex items-center p-2">
                    <input 
                      type="text" 
                      placeholder="Enter your legal directive..." 
                      className="w-full bg-transparent p-4 text-lg font-serif focus:outline-none text-aww-charcoal placeholder:text-aww-charcoal/30"
                    />
                    <button className="bg-aww-charcoal hover:bg-aww-terra text-white px-8 py-4 text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                      <Send size={16} /> Submit
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* RESTRICTED TABS */}
            {activeTab !== 'chat' && activeTab !== 'overview' && (
              <motion.div 
                key="other"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex-1 flex flex-col items-center justify-center h-full text-center px-12"
              >
                <div className="mb-12 p-8 border border-aww-charcoal/10 bg-aww-sand rounded-full">
                  <Shield size={64} strokeWidth={1} className="text-aww-terra" />
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
