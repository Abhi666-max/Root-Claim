"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cpu, Search, Lock, ShieldAlert, LogOut, ChevronRight, MessageSquare, Terminal } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat')

  const navItems = [
    { id: 'chat', label: 'Semantic Engine', icon: Cpu },
    { id: 'scanner', label: 'Collision Matrix', icon: Search },
    { id: 'vault', label: 'Crypto Vault', icon: Lock },
    { id: 'radar', label: 'Threat Radar', icon: ShieldAlert },
  ]

  return (
    <div className="flex h-screen w-full bg-cyber-bg text-cyber-text font-sans overflow-hidden relative">
      
      {/* Glowing Orbs */}
      <div className="orb-container">
        <div className="orb orb-cyan" style={{opacity: 0.3}}></div>
        <div className="orb orb-pink" style={{opacity: 0.3}}></div>
      </div>

      {/* Glass Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-72 cyber-glass border-y-0 border-l-0 z-10 flex flex-col m-4 rounded-[32px] overflow-hidden"
      >
        <div className="p-8 pb-4">
          <h1 className="text-2xl font-black tracking-tight text-cyber-text flex items-center gap-2">
            Root-Claim
          </h1>
          <div className="mt-3 flex items-center gap-2 bg-white/60 border border-white px-3 py-1.5 rounded-full shadow-sm w-max">
            <div className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_8px_#00f0ff] animate-pulse"></div>
            <p className="text-[10px] text-cyber-text font-bold tracking-widest uppercase">
              Uplink Active
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-semibold text-sm ${
                  isActive 
                  ? 'bg-white shadow-md text-cyber-text border border-white scale-[1.02]' 
                  : 'hover:bg-white/50 text-cyber-gray hover:text-cyber-text border border-transparent'
                }`}
              >
                <div className={`${isActive ? 'text-cyber-pink' : 'text-cyber-gray'}`}>
                  <Icon size={20} />
                </div>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4">
          <Link href="/">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-white/50 hover:bg-white text-cyber-gray hover:text-red-500 rounded-2xl transition-all font-bold text-sm border border-transparent hover:border-red-100 shadow-sm">
              <LogOut size={16} />
              <span>Disconnect</span>
            </button>
          </Link>
        </div>
      </motion.aside>

      {/* Main Glass Workspace */}
      <main className="flex-1 relative z-10 flex flex-col p-4 pl-0">
        <div className="flex-1 cyber-glass-card flex flex-col overflow-hidden bg-white/70">
          
          {/* Header */}
          <header className="h-20 border-b border-white/80 flex items-center px-8 justify-between bg-white/30 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-cyber-text">
                {navItems.find(i => i.id === activeTab)?.label}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-cyber-gray uppercase tracking-widest">
                Network: Polygon Amoy
              </span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyber-cyan to-cyber-pink p-[2px]">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Terminal size={14} className="text-cyber-text" />
                </div>
              </div>
            </div>
          </header>

          {/* Dynamic Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col bg-white rounded-[24px] shadow-sm border border-white overflow-hidden"
                >
                  <div className="flex-1 p-8 space-y-6 overflow-y-auto">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-cyber-cyan to-cyber-pink flex items-center justify-center shrink-0 shadow-lg text-white">
                        <MessageSquare size={20} />
                      </div>
                      <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl rounded-tl-none max-w-[80%] shadow-sm">
                        <h4 className="font-bold text-xs uppercase tracking-widest text-cyber-gray mb-2">System Initialized</h4>
                        <p className="text-sm leading-relaxed text-cyber-text font-medium">
                          I am IP-SAKTI, your advanced semantic interface. The vector space is fully loaded with global patent data and traditional knowledge repositories. Awaiting your inquiry.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        placeholder="Initialize semantic query..." 
                        className="w-full bg-white border border-gray-200 rounded-full py-4 pl-6 pr-32 text-cyber-text focus:outline-none focus:border-cyber-cyan focus:ring-4 focus:ring-cyber-cyan/10 transition-all text-sm shadow-sm font-medium"
                      />
                      <button className="absolute right-2 cyber-btn px-8 py-3 text-sm">
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
                  className="h-full flex flex-col items-center justify-center text-center bg-white rounded-[24px] border border-white shadow-sm relative overflow-hidden"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyber-pink/5 rounded-full blur-3xl"></div>
                  
                  <div className="w-24 h-24 rounded-[32px] bg-gray-50 flex items-center justify-center mb-8 text-gray-300 relative z-10 shadow-inner">
                    <Lock size={40} />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-cyber-text mb-3 relative z-10">Module Locked</h3>
                  <p className="text-cyber-gray max-w-md font-medium text-sm leading-relaxed relative z-10">
                    This sector requires cryptographic authorization. Please verify your Web3 identity to access this intelligence tier.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>
    </div>
  )
}
