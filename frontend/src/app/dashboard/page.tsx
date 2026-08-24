"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquareText, FileSearch, ShieldCheck, Radar, LogOut, TerminalSquare } from 'lucide-react'
import Link from 'next/link'
import PlasmaBackground from '@/components/PlasmaBackground'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat')

  const navItems = [
    { id: 'chat', label: 'IP-SAKTI Terminal', icon: TerminalSquare },
    { id: 'scanner', label: 'Collision Scanner', icon: FileSearch },
    { id: 'vault', label: 'Blockchain Vault', icon: ShieldCheck },
    { id: 'radar', label: 'Patent Radar', icon: Radar },
  ]

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden relative selection:bg-plasma-red selection:text-white font-sans">
      {/* 3D Interactive Plasma Background */}
      <PlasmaBackground />

      {/* Sidebar - Glassmorphism */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-72 glass-panel border-y-0 border-l-0 border-r border-white/10 z-10 flex flex-col"
      >
        <div className="p-8 border-b border-white/10">
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-plasma-red to-plasma-purple uppercase italic">
            Root-Claim
          </h1>
          <p className="text-xs text-plasma-blue font-bold tracking-widest mt-1">SYSTEM V2.0</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 ${
                  isActive 
                  ? 'bg-gradient-to-r from-plasma-red/20 to-transparent border-l-4 border-plasma-red text-white shadow-[inset_0_0_20px_rgba(255,42,95,0.2)]' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white border-l-4 border-transparent font-medium'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-plasma-red' : 'text-gray-500'} />
                <span className="uppercase text-sm tracking-wider font-bold">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/">
            <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-plasma-red transition-colors font-bold uppercase text-sm tracking-wider">
              <LogOut size={20} />
              <span>Disconnect</span>
            </button>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col bg-transparent">
        {/* Header - Glassmorphism */}
        <header className="h-20 border-b border-white/10 glass-panel flex items-center px-8 justify-between shadow-sm">
          <h2 className="text-xl font-black uppercase tracking-widest text-glow-plasma">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4 bg-black/50 px-5 py-2 rounded-full border border-white/10 shadow-inner">
            <div className="h-2 w-2 rounded-full bg-plasma-red animate-pulse shadow-[0_0_10px_rgba(255,42,95,1)]"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-300">Secure Uplink</span>
          </div>
        </header>

        {/* Dynamic Workspace */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'chat' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="h-full flex flex-col glass-card rounded-2xl shadow-2xl overflow-hidden border border-white/10"
            >
              <div className="flex-1 p-8 space-y-6 overflow-y-auto">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-plasma-red/20 border border-plasma-red flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,42,95,0.4)]">
                    <TerminalSquare size={24} className="text-plasma-red" />
                  </div>
                  <div className="bg-black/60 border border-white/10 p-6 rounded-2xl rounded-tl-none max-w-[80%] shadow-lg backdrop-blur-md">
                    <p className="text-sm leading-relaxed text-gray-200 font-medium tracking-wide">
                      Neural interface established. I am IP-SAKTI, your Enterprise RAG Assistant. Secure database connected. How can I process your intellectual property query today?
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder="ENTER DIRECTIVE..." 
                    className="w-full bg-black/50 border border-white/20 rounded-xl py-5 pl-6 pr-32 text-white focus:outline-none focus:border-plasma-purple focus:ring-1 focus:ring-plasma-purple transition-all font-mono text-sm shadow-inner group-hover:border-white/30"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-plasma-purple to-plasma-red hover:from-plasma-red hover:to-plasma-purple text-white px-8 rounded-lg font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(157,0,255,0.5)]">
                    Execute
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== 'chat' && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-28 h-28 rounded-full bg-plasma-blue/10 border border-plasma-blue flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,210,255,0.3)]">
                <Radar size={48} className="text-plasma-blue" />
              </div>
              <h3 className="text-3xl font-black uppercase tracking-widest text-white mb-3 text-shadow">Module Encrypted</h3>
              <p className="text-gray-400 max-w-md font-medium">This module requires Level 4 authorization. Initialization sequence pending.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
