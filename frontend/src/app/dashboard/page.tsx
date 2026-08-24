"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Lock, Database, Radar, LogOut, Command } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat')

  const navItems = [
    { id: 'chat', label: 'Intelligence', icon: Command },
    { id: 'scanner', label: 'Radar Scan', icon: Search },
    { id: 'vault', label: 'Secure Vault', icon: Lock },
    { id: 'radar', label: 'Global Monitor', icon: Radar },
  ]

  return (
    <div className="flex h-screen w-full bg-apple-bg text-apple-text overflow-hidden relative font-sans">
      {/* Animated Pastel Blobs */}
      <div className="blob-container">
        <div className="blob blob-1" style={{opacity: 0.3}}></div>
        <div className="blob blob-2" style={{opacity: 0.3}}></div>
        <div className="blob blob-3" style={{opacity: 0.3}}></div>
      </div>

      {/* Elegant Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-72 vision-glass border-y-0 border-l-0 z-10 flex flex-col m-4 rounded-3xl"
      >
        <div className="p-8 pb-4">
          <h1 className="text-2xl font-bold tracking-tight text-apple-text flex items-center gap-2">
            <ShieldIcon /> Root-Claim
          </h1>
          <p className="text-xs text-apple-gray font-medium tracking-wide mt-2">WORKSPACE V2.0</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                  isActive 
                  ? 'bg-white shadow-sm text-blue-600 font-semibold' 
                  : 'hover:bg-white/40 text-apple-gray hover:text-apple-text font-medium'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-blue-600' : ''} />
                <span className="text-sm tracking-tight">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4">
          <Link href="/">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/50 hover:bg-white text-apple-gray hover:text-red-500 rounded-2xl transition-all font-medium text-sm">
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </Link>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col p-4 pl-0">
        <div className="flex-1 vision-glass-card flex flex-col overflow-hidden">
          
          {/* Header */}
          <header className="h-20 border-b border-white/40 flex items-center px-8 justify-between">
            <h2 className="text-lg font-bold tracking-tight text-apple-text">
              {navItems.find(i => i.id === activeTab)?.label}
            </h2>
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 shadow-sm">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs font-semibold text-green-700">Online</span>
            </div>
          </header>

          {/* Dynamic Workspace */}
          <div className="flex-1 p-8 overflow-y-auto bg-white/30">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="flex-1 p-8 space-y-6 overflow-y-auto">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0 shadow-md text-white">
                        <Command size={18} />
                      </div>
                      <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl rounded-tl-none max-w-[80%]">
                        <p className="text-sm leading-relaxed text-apple-text font-medium">
                          Welcome to your Intelligence workspace. I am IP-SAKTI, securely connected to the global vector database. How may I assist you with your patent analysis today?
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                    <div className="relative flex items-center">
                      <input 
                        type="text" 
                        placeholder="Message IP-SAKTI..." 
                        className="w-full bg-white border border-gray-200 rounded-full py-3.5 pl-6 pr-32 text-apple-text focus:outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all text-sm shadow-sm"
                      />
                      <button className="absolute right-1.5 apple-button px-6 py-2.5 text-sm">
                        Send
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
                  className="h-full flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-gray-300">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-apple-text mb-2">Module Secured</h3>
                  <p className="text-apple-gray max-w-md font-medium text-sm">
                    This module requires authentication. Please verify your credentials to access this intelligence tier.
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

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
