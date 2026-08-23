"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquareText, FileSearch, ShieldCheck, Radar, LogOut } from 'lucide-react'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat')

  const navItems = [
    { id: 'chat', label: 'IP-SAKTI Chat', icon: MessageSquareText },
    { id: 'scanner', label: 'Collision Scanner', icon: FileSearch },
    { id: 'vault', label: 'Blockchain Vault', icon: ShieldCheck },
    { id: 'radar', label: 'Patent Radar', icon: Radar },
  ]

  return (
    <div className="flex h-screen w-full bg-spidey-bg text-spidey-text overflow-hidden relative">
      <div className="bg-spidey-web"></div>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-72 border-r border-spidey-blue/20 bg-[#050a1f]/80 backdrop-blur-xl z-10 flex flex-col"
      >
        <div className="p-8 border-b border-spidey-blue/20">
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-spidey-red to-spidey-blue text-glow-red uppercase italic">
            Root-Claim
          </h1>
          <p className="text-xs text-spidey-blue tracking-widest mt-1 opacity-70">SYSTEM 2099</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive 
                  ? 'bg-gradient-to-r from-spidey-red/20 to-transparent border-l-2 border-spidey-red text-white shadow-[inset_0_0_20px_rgba(255,0,60,0.1)]' 
                  : 'hover:bg-spidey-blue/10 text-gray-400 hover:text-white border-l-2 border-transparent'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-spidey-red' : 'text-spidey-blue'} />
                <span className="font-semibold uppercase text-sm tracking-wider">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-spidey-blue/20">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-red-500 transition-colors">
            <LogOut size={20} />
            <span className="font-semibold uppercase text-sm tracking-wider">Disconnect</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col">
        {/* Header */}
        <header className="h-20 border-b border-spidey-blue/20 bg-[#050a1f]/50 backdrop-blur-md flex items-center px-8 justify-between">
          <h2 className="text-xl font-bold uppercase tracking-widest text-spidey-blue text-glow-blue">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-spidey-red animate-pulse shadow-[0_0_10px_rgba(255,0,60,1)]"></div>
            <span className="text-xs uppercase tracking-widest text-gray-400">Network Connected</span>
          </div>
        </header>

        {/* Dynamic Workspace */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'chat' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col bg-black/40 border border-spidey-blue/20 rounded-2xl shadow-[0_0_30px_rgba(0,210,255,0.05)] overflow-hidden"
            >
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-spidey-red/20 border border-spidey-red flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="text-spidey-red" />
                  </div>
                  <div className="bg-[#050a1f] border border-spidey-red/30 p-4 rounded-2xl rounded-tl-none max-w-[80%] shadow-[0_0_15px_rgba(255,0,60,0.1)]">
                    <p className="text-sm leading-relaxed">System initialized. I am IP-SAKTI, your RAG-based AI assistant for Intellectual Property. How can I assist you with your patent or Ayurvedic research today?</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-spidey-blue/20 bg-[#050a1f]">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="ENTER QUERY DIRECTIVE..." 
                    className="w-full bg-black/50 border border-spidey-blue/40 rounded-xl py-4 pl-6 pr-16 text-white focus:outline-none focus:border-spidey-red focus:shadow-[0_0_20px_rgba(255,0,60,0.2)] transition-all font-mono text-sm"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-spidey-red hover:bg-red-600 text-white px-4 rounded-lg font-bold tracking-wider transition-colors shadow-[0_0_10px_rgba(255,0,60,0.4)]">
                    SEND
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== 'chat' && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-spidey-blue/10 border border-spidey-blue flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,210,255,0.2)]">
                <Radar size={40} className="text-spidey-blue" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest text-white mb-2">Module Offline</h3>
              <p className="text-gray-400 max-w-md">This module is currently being initialized by the engineering team. Please check back later.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
