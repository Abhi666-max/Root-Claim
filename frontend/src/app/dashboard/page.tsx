"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Lock, Database, Radar, LogOut, ChevronRight, FileText } from 'lucide-react'
import Link from 'next/link'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('chat')

  const navItems = [
    { id: 'chat', label: 'Semantic Analysis', icon: Database },
    { id: 'scanner', label: 'Document Collision', icon: Search },
    { id: 'vault', label: 'Blockchain Vault', icon: Lock },
    { id: 'radar', label: 'Patent Radar', icon: Radar },
  ]

  return (
    <div className="flex h-screen w-full bg-notion-bg text-notion-text font-sans selection:bg-gray-200">
      
      {/* Minimalist Sidebar */}
      <aside className="w-64 bg-gray-50/50 border-r border-notion-border flex flex-col">
        {/* Workspace Header */}
        <div className="px-4 py-4 border-b border-notion-border">
          <div className="flex items-center gap-2 hover:bg-notion-hover p-1 -ml-1 rounded cursor-pointer transition-colors">
            <div className="w-5 h-5 bg-notion-text text-white rounded flex items-center justify-center font-bold text-xs">
              R
            </div>
            <span className="font-semibold text-sm">Root-Claim Workspace</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-0.5">
          <div className="px-4 text-xs font-semibold text-notion-gray uppercase tracking-wider mb-2">
            Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-4 py-1.5 transition-colors text-sm ${
                  isActive 
                  ? 'bg-gray-200/50 text-notion-text font-medium' 
                  : 'hover:bg-notion-hover text-notion-gray hover:text-notion-text'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-notion-text' : 'text-notion-gray'} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-notion-border">
          <Link href="/">
            <button className="w-full flex items-center gap-2.5 px-2 py-1.5 hover:bg-notion-hover text-notion-gray hover:text-red-600 rounded transition-colors text-sm">
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content Document */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden">
        
        {/* Breadcrumb Header */}
        <header className="h-12 border-b border-notion-border flex items-center px-6">
          <div className="flex items-center gap-2 text-sm text-notion-gray">
            <span className="hover:underline cursor-pointer">Root-Claim Workspace</span>
            <ChevronRight size={14} />
            <span className="text-notion-text font-medium">
              {navItems.find(i => i.id === activeTab)?.label}
            </span>
          </div>
        </header>

        {/* Workspace Canvas */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-10 py-12">
            
            {/* Page Title */}
            <h1 className="text-4xl font-serif font-semibold mb-8 text-notion-text flex items-center gap-3">
              <span className="text-4xl border-b-2 border-transparent">
                {navItems.find(i => i.id === activeTab)?.icon({ size: 36, className: "text-notion-gray" })}
              </span>
              {navItems.find(i => i.id === activeTab)?.label}
            </h1>

            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div 
                  key="chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <p className="text-notion-gray font-serif text-lg border-b border-notion-border pb-6">
                    Utilize the Semantic Analysis module to query the global intellectual property vector database. Type `/` for commands.
                  </p>

                  <div className="space-y-6 py-4">
                    {/* Mock Chat / Document block */}
                    <div className="flex gap-4">
                      <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center shrink-0 mt-0.5">
                        <FileText size={14} className="text-notion-gray" />
                      </div>
                      <div>
                        <div className="font-medium text-sm mb-1">System Status</div>
                        <p className="text-sm text-notion-text font-serif leading-relaxed">
                          IP-SAKTI intelligence engine is active. The vector database is currently indexing 4.2 million patents and traditional knowledge manuscripts. How may I assist your research today?
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Input Block */}
                  <div className="mt-8">
                    <input 
                      type="text" 
                      placeholder="Type a query, or press '/' for commands..." 
                      className="w-full text-base font-serif bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-300 py-2"
                    />
                    <div className="h-px bg-notion-border w-full mt-2"></div>
                  </div>
                </motion.div>
              )}

              {activeTab !== 'chat' && (
                <motion.div 
                  key="other"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-10 border-t border-notion-border"
                >
                  <div className="notion-card bg-gray-50/50">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Lock size={16} /> Restricted Access
                    </h3>
                    <p className="text-sm text-notion-gray leading-relaxed font-serif">
                      This workspace block requires elevated permissions. Please authenticate with your credentials to unlock this module.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </main>
    </div>
  )
}
