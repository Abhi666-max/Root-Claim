"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Target, Crosshair, ShieldAlert, Zap, LogOut, TerminalSquare } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat')

  const navItems = [
    { id: 'chat', label: 'Command Terminal', icon: TerminalSquare },
    { id: 'scanner', label: 'Collision Radar', icon: Crosshair },
    { id: 'vault', label: 'Blockchain Armor', icon: ShieldAlert },
    { id: 'radar', label: 'Threat Radar', icon: Target },
  ]

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden relative selection:bg-iqoo-orange selection:text-white font-sans">
      {/* Aggressive Carbon Fiber Background */}
      <div className="bg-carbon"></div>

      {/* Sidebar - Tactical */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-72 bg-black/90 border-r-2 border-iqoo-orange/30 z-10 flex flex-col relative"
      >
        <div className="p-8 border-b-2 border-iqoo-orange/30 relative">
          <h1 className="text-3xl font-black tracking-widest text-white uppercase italic">
            ROOT<span className="text-iqoo-orange">-</span>CLAIM
          </h1>
          <p className="text-xs text-iqoo-yellow font-bold tracking-[0.3em] mt-2 font-mono-tech flex items-center gap-2">
            <Zap size={12} className="animate-pulse" /> ONLINE
          </p>
        </div>

        <nav className="flex-1 p-6 space-y-4 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 transition-all duration-200 relative ${
                  isActive 
                  ? 'bg-iqoo-orange/20 text-iqoo-orange shadow-[inset_4px_0_0_0_#ff4500]' 
                  : 'hover:bg-white/5 text-gray-500 hover:text-white glitch-hover'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-iqoo-orange shadow-[0_0_10px_#ff4500]"></div>
                )}
                <Icon size={20} className={isActive ? 'text-iqoo-orange' : ''} />
                <span className="uppercase text-sm tracking-[0.15em] font-black">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t-2 border-iqoo-orange/30">
          <Link href="/">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-transparent border border-gray-700 text-gray-500 hover:border-iqoo-orange hover:text-iqoo-orange hover:shadow-[0_0_15px_rgba(255,69,0,0.4)] transition-all font-black uppercase text-xs tracking-[0.2em] glitch-hover">
              <LogOut size={16} />
              <span>Abort Mission</span>
            </button>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col bg-transparent">
        {/* Header */}
        <header className="h-20 border-b-2 border-iqoo-orange/30 bg-black/80 backdrop-blur-md flex items-center px-8 justify-between">
          <h2 className="text-xl font-black uppercase tracking-[0.2em] text-white">
            // {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-3 bg-black border border-iqoo-orange/50 px-4 py-1.5 shadow-[0_0_10px_rgba(255,69,0,0.2)]">
            <div className="h-2 w-2 bg-iqoo-orange animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-iqoo-orange font-mono-tech">Secure Uplink Active</span>
          </div>
        </header>

        {/* Dynamic Workspace */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'chat' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col iqoo-panel"
            >
              <div className="flex-1 p-8 space-y-6 overflow-y-auto">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-black border-2 border-iqoo-orange flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,69,0,0.4)]">
                    <TerminalSquare size={24} className="text-iqoo-orange" />
                  </div>
                  <div className="bg-black/80 border border-iqoo-orange/30 p-6 max-w-[80%] relative">
                    <div className="absolute -top-1 -left-1 w-2 h-2 bg-iqoo-orange"></div>
                    <p className="text-sm leading-relaxed text-gray-300 font-bold tracking-wider font-mono-tech">
                      &gt; SYSTEM BOOT COMPLETE.
                      <br/>&gt; I AM IP-SAKTI, YOUR TACTICAL RAG ASSISTANT.
                      <br/>&gt; READY TO PROCESS INTELLECTUAL PROPERTY DIRECTIVES.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t-2 border-iqoo-orange/30 bg-black">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="[ INPUT TACTICAL DIRECTIVE ]" 
                    className="w-full bg-black border-2 border-gray-700 py-4 pl-6 pr-36 text-iqoo-orange focus:outline-none focus:border-iqoo-orange transition-colors font-mono-tech text-sm tracking-widest placeholder-gray-600"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-iqoo-orange hover:bg-orange-600 text-black px-8 font-black tracking-[0.2em] uppercase transition-all glitch-hover">
                    Execute
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== 'chat' && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-black border-2 border-red-600 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                <ShieldAlert size={48} className="text-red-600 animate-pulse" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-[0.2em] text-white mb-3 text-glow-orange">Access Denied</h3>
              <p className="text-gray-500 max-w-md font-bold font-mono-tech tracking-wider">
                &gt; MODULE ENCRYPTED. <br/>
                &gt; AWAITING LEVEL 4 ENGINEERING OVERRIDE.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
