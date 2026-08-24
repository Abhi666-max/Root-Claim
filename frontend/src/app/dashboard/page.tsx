"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Fingerprint, Radar, Lock, LogOut, Command, Hexagon } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat')

  const navItems = [
    { id: 'chat', label: 'Neural Uplink', icon: Terminal },
    { id: 'scanner', label: 'Collision Radar', icon: Radar },
    { id: 'vault', label: 'Decentralized Vault', icon: Lock },
  ]

  return (
    <div className="flex h-screen w-full bg-metal-bg text-white font-sans selection:bg-neon-cyan selection:text-black p-6 gap-6">
      
      {/* Tactical Sidebar */}
      <aside className="w-72 neu-outset flex flex-col overflow-hidden">
        
        {/* Workspace Brand */}
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="neu-inset p-2.5 rounded-xl text-neon-purple shadow-[inset_0_0_10px_rgba(181,0,255,0.1)]">
              <Hexagon size={24} />
            </div>
            <div>
              <h1 className="font-bold tracking-widest uppercase text-sm">Root-Claim</h1>
              <p className="text-[10px] text-neon-cyan font-bold tracking-[0.3em] uppercase mt-1 animate-pulse">
                System Active
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-4">
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 pl-2">
            Control Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 transition-all duration-300 rounded-xl uppercase text-xs tracking-widest font-bold ${
                  isActive 
                  ? 'neu-inset text-neon-cyan' 
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-neon-cyan' : 'text-gray-600'} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/5">
          <Link href="/">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-4 text-gray-600 hover:text-red-500 transition-colors uppercase text-xs font-bold tracking-widest neu-button">
              <LogOut size={16} />
              <span>Terminate Session</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Command Area */}
      <main className="flex-1 flex flex-col overflow-hidden neu-outset">
        
        {/* Module Header */}
        <header className="h-24 border-b border-white/5 flex items-center px-10 justify-between">
          <h2 className="text-xl font-bold tracking-widest uppercase text-gray-300">
            // {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="neu-inset px-4 py-2 rounded-lg flex items-center gap-3 border border-white/5">
            <div className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_10px_#00f0ff] animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Secure Channel
            </span>
          </div>
        </header>

        {/* Module Content */}
        <div className="flex-1 p-10 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'chat' && (
              <motion.div 
                key="chat"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col"
              >
                <div className="neu-inset p-6 rounded-2xl mb-8 flex items-start gap-5 border border-white/5">
                  <div className="neu-outset w-12 h-12 flex items-center justify-center shrink-0 text-neon-cyan">
                    <Command size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-widest text-sm mb-2 text-gray-300">IP-SAKTI Interface</h3>
                    <p className="text-sm text-gray-500 font-medium leading-relaxed tracking-wide">
                      Awaiting directives. The semantic vector engine is calibrated and connected to the global intellectual property matrix.
                    </p>
                  </div>
                </div>

                <div className="mt-auto relative">
                  <div className="neu-inset rounded-2xl p-2 flex items-center border border-white/5">
                    <input 
                      type="text" 
                      placeholder="Input query parameters..." 
                      className="w-full bg-transparent border-none focus:outline-none text-gray-300 px-6 py-4 placeholder-gray-600 text-sm tracking-wide"
                    />
                    <button className="neu-button neon-edge px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-300 hover:text-white shrink-0 mr-1">
                      Execute
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab !== 'chat' && (
              <motion.div 
                key="other"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <div className="neu-inset w-24 h-24 rounded-full flex items-center justify-center mb-8 text-gray-600 border border-white/5 shadow-[inset_0_0_20px_rgba(255,0,0,0.1)]">
                  <Fingerprint size={40} className="text-red-500/50" />
                </div>
                <h3 className="text-2xl font-bold tracking-widest uppercase text-gray-400 mb-3">Access Restricted</h3>
                <p className="text-gray-600 max-w-md font-medium text-sm tracking-wide leading-relaxed">
                  Cryptographic verification required. Please authenticate via the primary command interface to access this sector.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
