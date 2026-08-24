"use client"

import React, { useEffect } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Feather, Shield, Search } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 300])
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div className="min-h-screen text-aww-charcoal bg-aww-bg relative selection:bg-aww-sage selection:text-aww-charcoal">
      <div className="noise-overlay"></div>

      {/* Editorial Navbar */}
      <header className="fixed w-full top-0 z-50 bg-aww-bg/80 backdrop-blur-md border-b border-aww-sand">
        <div className="max-w-[1400px] mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-serif italic tracking-wide">Root-Claim.</h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-12 text-sm font-medium tracking-widest uppercase">
            <a href="#manifesto" className="editorial-link">Manifesto</a>
            <a href="#capabilities" className="editorial-link">Capabilities</a>
            <a href="#journal" className="editorial-link">Journal</a>
          </nav>

          <Link href="/dashboard">
            <button className="bg-aww-charcoal text-aww-bg px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-aww-terra transition-colors duration-500 rounded-sm">
              Initialize
            </button>
          </Link>
        </div>
      </header>

      {/* Massive Editorial Hero */}
      <main className="relative pt-40 pb-32">
        <div className="max-w-[1400px] mx-auto px-8 relative h-[70vh] flex flex-col justify-center">
          
          <motion.div 
            style={{ y: yImage }}
            className="absolute top-10 right-10 w-[400px] h-[500px] bg-aww-sand overflow-hidden hidden lg:block rounded-t-full"
          >
            {/* Abstract Placeholder for Artistic Image */}
            <div className="w-full h-full bg-gradient-to-br from-aww-sage/40 to-aww-terra/20 opacity-80 mix-blend-multiply"></div>
          </motion.div>

          <motion.h2 
            style={{ y: yTitle }}
            className="text-[120px] lg:text-[180px] font-serif leading-[0.85] tracking-tighter z-10 mix-blend-difference text-aww-bg"
          >
            Securing <br/>
            <span className="italic text-aww-sage">Ancient</span> <br/>
            Wisdom.
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 max-w-md z-10"
          >
            <p className="text-lg leading-relaxed font-light text-aww-charcoal/80 mb-8">
              An avant-garde approach to Intellectual Property. Fusing RAG artificial intelligence with immutable blockchain ledgers for the modern enterprise.
            </p>
            <Link href="/dashboard">
              <button className="group flex items-center gap-4 text-sm font-medium tracking-widest uppercase editorial-link pb-1">
                Explore the System <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Asymmetric Features Section */}
        <section id="capabilities" className="max-w-[1400px] mx-auto px-8 mt-48">
          <div className="flex items-baseline gap-4 mb-24">
            <span className="text-aww-terra text-sm font-bold">01</span>
            <h3 className="text-4xl font-serif italic">Capabilities</h3>
            <div className="flex-1 h-px bg-aww-charcoal/20 ml-8"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-4 flex flex-col justify-between border-t border-aww-charcoal/20 pt-8">
              <Feather size={32} className="text-aww-sage mb-12" />
              <div>
                <h4 className="text-2xl font-serif mb-4">Linguistic RAG</h4>
                <p className="text-sm text-aww-charcoal/70 leading-relaxed">
                  Deciphering complex traditional texts through advanced vector embeddings. A seamless conversation with history.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 md:mt-24 flex flex-col justify-between border-t border-aww-charcoal/20 pt-8">
              <Search size={32} className="text-aww-terra mb-12" />
              <div>
                <h4 className="text-2xl font-serif mb-4">Collision Radar</h4>
                <p className="text-sm text-aww-charcoal/70 leading-relaxed">
                  Proactive scanning of global databases. Identifying infringements before they manifest into legal disputes.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 md:mt-48 flex flex-col justify-between border-t border-aww-charcoal/20 pt-8">
              <Shield size={32} className="text-aww-charcoal mb-12" />
              <div>
                <h4 className="text-2xl font-serif mb-4">Immutable Vault</h4>
                <p className="text-sm text-aww-charcoal/70 leading-relaxed">
                  Cryptographic timestamping on the Polygon network. Absolute proof of existence and ownership.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-aww-sand bg-aww-bg mt-32">
        <div className="max-w-[1400px] mx-auto px-8 py-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          <div>
            <h1 className="text-6xl font-serif italic tracking-tighter mb-4 text-aww-charcoal">Root-Claim.</h1>
            <p className="text-xs tracking-[0.2em] uppercase text-aww-charcoal/50">Enterprise Intellectual Property</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-aww-charcoal/70 mb-2">Designed and Engineered by</p>
            <p className="font-serif text-xl italic text-aww-terra">Abhijeet Kangane</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
