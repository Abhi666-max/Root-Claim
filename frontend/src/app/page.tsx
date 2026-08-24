"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Feather, Shield, Search, Database, Globe, Lock, Code, FileText } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen text-aww-charcoal bg-aww-bg relative selection:bg-aww-sage selection:text-aww-charcoal font-sans">
      <div className="noise-overlay"></div>

      {/* Editorial Navbar */}
      <header className="fixed w-full top-0 z-50 bg-aww-bg/90 backdrop-blur-md border-b border-aww-charcoal/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif italic tracking-wide font-black">Root-Claim.</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 text-xs font-bold tracking-widest uppercase text-aww-charcoal/70">
            <a href="#mission" className="editorial-link hover:text-aww-charcoal">Mission</a>
            <a href="#capabilities" className="editorial-link hover:text-aww-charcoal">Capabilities</a>
            <a href="#technology" className="editorial-link hover:text-aww-charcoal">Technology</a>
          </nav>

          <Link href="/dashboard">
            <button className="bg-aww-charcoal text-aww-bg px-6 py-2.5 text-xs font-bold tracking-widest uppercase hover:bg-aww-terra transition-colors duration-300">
              Access System
            </button>
          </Link>
        </div>
      </header>

      <main className="relative pt-32">
        {/* Massive Editorial Hero */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-block border border-aww-charcoal/20 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-8 text-aww-sage bg-aww-charcoal/5"
            >
              Enterprise IP Analytics v2.0
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[110px] font-serif leading-[0.9] tracking-tighter text-aww-charcoal mb-8"
            >
              Securing <br/>
              <span className="italic text-aww-sage">Ancient</span> <br/>
              Wisdom.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl leading-relaxed font-light text-aww-charcoal/80 max-w-xl mb-10"
            >
              The avant-garde approach to Intellectual Property. Fusing RAG artificial intelligence with immutable blockchain ledgers for modern enterprises and the Ministry of Ayush.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link href="/dashboard">
                <button className="w-full sm:w-auto bg-aww-terra hover:bg-aww-charcoal text-white px-10 py-4 font-bold uppercase tracking-widest text-sm transition-colors duration-300 flex items-center justify-center gap-3">
                  Enter Dashboard <ArrowRight size={18} />
                </button>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex-1 w-full hidden lg:block"
          >
            <div className="w-full h-[600px] bg-aww-sand rounded-tl-[100px] rounded-br-[100px] border border-aww-charcoal/10 relative overflow-hidden flex items-center justify-center p-12">
               <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-gradient-to-br from-aww-sage to-aww-terra"></div>
               <Shield size={200} strokeWidth={0.5} className="text-aww-charcoal/20 relative z-10" />
            </div>
          </motion.div>
        </section>

        {/* Full Capabilities Section */}
        <section id="capabilities" className="bg-aww-charcoal text-aww-bg py-32 mt-20">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row items-baseline gap-8 mb-24 border-b border-aww-bg/20 pb-12">
              <span className="text-aww-terra text-sm font-bold">01 // System Specs</span>
              <h3 className="text-5xl font-serif italic">Enterprise Capabilities.</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {[
                { title: "Linguistic RAG", icon: Feather, desc: "Deciphering complex traditional texts through advanced vector embeddings. A seamless conversation with history." },
                { title: "Collision Radar", icon: Search, desc: "Proactive scanning of global databases. Identifying infringements before they manifest into legal disputes." },
                { title: "Immutable Vault", icon: Lock, desc: "Cryptographic timestamping on the Polygon network. Absolute proof of existence and ownership." },
                { title: "Vector Analytics", icon: Database, desc: "High-dimensional similarity search across millions of patent documents in milliseconds." },
                { title: "Global Intel", icon: Globe, desc: "Real-time tracking of international IP filings to protect indigenous knowledge." },
                { title: "API Integration", icon: Code, desc: "Seamless RESTful connections to existing enterprise legal software and databases." }
              ].map((item, idx) => (
                <div key={idx} className="group border-t border-aww-bg/10 pt-8 hover:border-aww-sage transition-colors duration-500">
                  <item.icon size={32} className="text-aww-sage mb-8 group-hover:scale-110 transition-transform duration-500" />
                  <h4 className="text-2xl font-serif mb-4 text-white">{item.title}</h4>
                  <p className="text-sm text-aww-bg/60 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep Dive Section */}
        <section id="mission" className="max-w-[1400px] mx-auto px-6 md:px-12 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
               <h3 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
                 Protecting the <span className="italic text-aww-terra">Roots</span> of Knowledge.
               </h3>
               <p className="text-lg text-aww-charcoal/70 leading-relaxed font-light mb-8">
                 Root-Claim was engineered to fight bio-piracy. By digitizing ancient Ayurvedic manuscripts and securing them via modern cryptography, we ensure that traditional Indian knowledge remains protected globally.
               </p>
               <Link href="/dashboard">
                 <button className="editorial-link font-bold uppercase tracking-widest text-sm text-aww-sage">
                   Read the Full Manifesto &rarr;
                 </button>
               </Link>
            </div>
            <div className="bg-aww-sand p-16 flex flex-col gap-8 border border-aww-charcoal/10">
               <div className="flex gap-6 items-start">
                 <div className="text-3xl font-serif text-aww-charcoal/20">01</div>
                 <div>
                   <h4 className="text-xl font-bold mb-2">Ingestion</h4>
                   <p className="text-aww-charcoal/70 text-sm">Automated OCR and parsing of ancient texts.</p>
                 </div>
               </div>
               <div className="flex gap-6 items-start">
                 <div className="text-3xl font-serif text-aww-charcoal/20">02</div>
                 <div>
                   <h4 className="text-xl font-bold mb-2">Vectorization</h4>
                   <p className="text-aww-charcoal/70 text-sm">Converting text semantics into a Supabase pgvector database.</p>
                 </div>
               </div>
               <div className="flex gap-6 items-start">
                 <div className="text-3xl font-serif text-aww-charcoal/20">03</div>
                 <div>
                   <h4 className="text-xl font-bold mb-2">Blockchain Proof</h4>
                   <p className="text-aww-charcoal/70 text-sm">Hashing the document to Polygon for immutable legal proof.</p>
                 </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* Massive Editorial Footer */}
      <footer className="border-t border-aww-charcoal/20 bg-aww-sand relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
            <div className="md:col-span-6">
              <h1 className="text-5xl md:text-7xl font-serif italic tracking-tighter mb-6 text-aww-charcoal">Root-Claim.</h1>
              <p className="text-sm font-bold tracking-[0.2em] uppercase text-aww-charcoal/50">Enterprise Intellectual Property System</p>
            </div>
            <div className="md:col-span-3 flex flex-col gap-4">
              <h5 className="font-bold uppercase tracking-widest text-xs mb-4">Navigation</h5>
              <a href="#" className="text-sm text-aww-charcoal/70 hover:text-aww-charcoal">Dashboard</a>
              <a href="#" className="text-sm text-aww-charcoal/70 hover:text-aww-charcoal">Capabilities</a>
              <a href="#" className="text-sm text-aww-charcoal/70 hover:text-aww-charcoal">Manifesto</a>
            </div>
            <div className="md:col-span-3 flex flex-col gap-4">
              <h5 className="font-bold uppercase tracking-widest text-xs mb-4">Legal</h5>
              <a href="#" className="text-sm text-aww-charcoal/70 hover:text-aww-charcoal">Privacy Policy</a>
              <a href="#" className="text-sm text-aww-charcoal/70 hover:text-aww-charcoal">Terms of Service</a>
              <a href="#" className="text-sm text-aww-charcoal/70 hover:text-aww-charcoal">Security</a>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-aww-charcoal/10 gap-6">
            <p className="text-xs text-aww-charcoal/50 font-bold tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Root-Claim Enterprise.
            </p>
            <p className="text-xs text-aww-charcoal/70 uppercase tracking-widest font-medium">
              Designed & Engineered by <span className="font-bold text-aww-terra text-sm">Abhijeet Kangane</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
