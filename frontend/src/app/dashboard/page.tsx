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
        className="w-72 border-r border-spidey-border bg-white/80 backdrop-blur-xl z-10 flex flex-col shadow-xl"
      >
        <div className="p-8 border-b border-spidey-border">
          <h1 className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-spidey-red to-spidey-blue uppercase italic">
            Root-Claim
          </h1>
          <p className="text-xs text-spidey-blue font-bold tracking-widest mt-1">SYSTEM ONLINE</p>
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
                  ? 'bg-spidey-red/10 border-l-4 border-spidey-red text-spidey-red font-bold shadow-sm' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-spidey-text border-l-4 border-transparent font-semibold'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-spidey-red' : 'text-spidey-blue'} />
                <span className="uppercase text-sm tracking-wider">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-spidey-border">
          <a href="/" className="w-full flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-spidey-red transition-colors font-semibold uppercase text-sm tracking-wider">
            <LogOut size={20} />
            <span>Return to Home</span>
          </a>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col bg-transparent">
        {/* Header */}
        <header className="h-20 border-b border-spidey-border bg-white/70 backdrop-blur-md flex items-center px-8 justify-between shadow-sm">
          <h2 className="text-xl font-black uppercase tracking-widest text-spidey-blue">
            {navItems.find(i => i.id === activeTab)?.label}
          </h2>
          <div className="flex items-center gap-4 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 shadow-inner">
            <div className="h-2 w-2 rounded-full bg-spidey-red animate-pulse"></div>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Network Connected</span>
          </div>
        </header>

        {/* Dynamic Workspace */}
        <div className="flex-1 p-8 overflow-y-auto">
          {activeTab === 'chat' && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-full flex flex-col bg-white border border-spidey-border rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-gray-50/50">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-spidey-red/10 border border-spidey-red/30 flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck size={20} className="text-spidey-red" />
                  </div>
                  <div className="bg-white border border-spidey-border p-5 rounded-2xl rounded-tl-none max-w-[80%] shadow-md">
                    <p className="text-sm leading-relaxed text-gray-800 font-medium">System initialized. I am IP-SAKTI, your RAG-based AI assistant for Intellectual Property. How can I assist you with your patent or Ayurvedic research today?</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border-t border-spidey-border bg-white">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="ENTER QUERY DIRECTIVE..." 
                    className="w-full bg-gray-50 border border-gray-300 rounded-xl py-4 pl-6 pr-24 text-spidey-text focus:outline-none focus:border-spidey-blue focus:ring-2 focus:ring-spidey-blue/20 transition-all font-mono text-sm shadow-inner"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-spidey-red to-red-700 hover:from-red-600 hover:to-spidey-red text-white px-6 rounded-lg font-bold tracking-wider transition-all shadow-md">
                    SEND
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab !== 'chat' && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 rounded-full bg-blue-50 border-2 border-spidey-blue flex items-center justify-center mb-6 shadow-lg shadow-spidey-blue/10">
                <Radar size={40} className="text-spidey-blue" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-widest text-spidey-text mb-2">Module Offline</h3>
              <p className="text-gray-500 max-w-md font-medium">This module is currently being initialized by the engineering team. Please check back later.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
