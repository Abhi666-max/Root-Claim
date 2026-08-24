"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Database, Shield, FileSearch, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-notion-bg text-notion-text font-sans relative selection:bg-gray-200">
      
      {/* Minimal Header */}
      <header className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between border-b border-notion-border">
        <div className="flex items-center gap-2 text-notion-text">
          <Shield size={18} />
          <span className="font-semibold text-sm">Root-Claim</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm text-notion-gray">
          <a href="#overview" className="hover:text-notion-text transition-colors">Overview</a>
          <a href="#features" className="hover:text-notion-text transition-colors">Capabilities</a>
          <a href="#docs" className="hover:text-notion-text transition-colors">Docs</a>
        </nav>

        <Link href="/dashboard">
          <button className="notion-btn text-xs">
            Log in
          </button>
        </Link>
      </header>

      {/* Editorial Hero Section */}
      <main className="max-w-3xl mx-auto px-6 pt-24 pb-20">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="notion-tag mb-4">Enterprise Edition</span>
          <h1 className="text-5xl md:text-6xl font-serif font-medium leading-tight mb-6 text-notion-text">
            The intellectual property workspace.
          </h1>
          <p className="text-lg text-notion-gray font-serif leading-relaxed max-w-2xl mb-10">
            A single, secure environment to write, analyze, and protect traditional knowledge. Powered by RAG retrieval and cryptographic vaulting.
          </p>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="notion-btn-primary flex items-center gap-2">
                Open Workspace <ArrowRight size={14} />
              </button>
            </Link>
            <button className="notion-btn flex items-center gap-2">
              <FileText size={14} /> Read Whitepaper
            </button>
          </div>
        </motion.div>

        {/* Minimal Feature List */}
        <div id="features" className="mt-32 space-y-4">
          <h3 className="text-sm font-semibold text-notion-gray uppercase tracking-wider mb-6">Core Capabilities</h3>
          
          {[
            { 
              title: "Semantic Analysis (RAG)", 
              icon: Database, 
              desc: "Instantaneous retrieval across global vector spaces. Find precise prior-art without keyword matching limitations." 
            },
            { 
              title: "Collision Detection", 
              icon: FileSearch, 
              desc: "Automated document scanning to highlight potential IP infringements before filing." 
            },
            { 
              title: "Blockchain Immutability", 
              icon: Shield, 
              desc: "Cryptographic hashing on the Polygon network to establish undeniable proof of existence and timestamping." 
            }
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + (idx * 0.1) }}
              className="notion-card flex items-start gap-4 cursor-default"
            >
              <div className="mt-1 text-notion-gray">
                <feature.icon size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-base mb-1">{feature.title}</h4>
                <p className="text-sm text-notion-gray leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-12 border-t border-notion-border mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-notion-gray">
          <div className="flex items-center gap-2">
            <Shield size={14} />
            <span>&copy; {new Date().getFullYear()} Root-Claim.</span>
          </div>
          
          <div>
            Design & Architecture by <span className="font-medium text-notion-text">Abhijeet Kangane</span>.
          </div>
        </div>
      </footer>
    </div>
  )
}
