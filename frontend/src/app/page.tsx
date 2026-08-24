"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, BookOpen, Search, AlertOctagon, Quote, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gov-ivory text-gov-text font-serif relative overflow-x-hidden bg-mandala selection:bg-gov-gold selection:text-white">
      
      {/* Accessibility Top Bar */}
      <div className="bg-gov-blue text-white py-1.5 px-8 text-[10px] uppercase tracking-widest font-cinzel flex justify-between items-center z-50 relative border-b border-white/20">
        <div className="flex items-center gap-4 opacity-90">
          <span>Government of India</span>
          <span className="hidden sm:inline text-gov-gold">|</span>
          <span className="hidden sm:inline">Ministry of Ayush</span>
        </div>
        <div className="flex items-center gap-4 opacity-90">
          <button className="hover:text-gov-gold transition-colors font-bold">Skip to Main Content</button>
          <span className="text-gov-gold">|</span>
          <button className="hover:text-gov-gold transition-colors">A-</button>
          <button className="hover:text-gov-gold transition-colors font-bold">A</button>
          <button className="hover:text-gov-gold transition-colors">A+</button>
          <span className="text-gov-gold">|</span>
          <button className="hover:text-gov-gold transition-colors font-bold">English</button>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 bg-gov-ivory max-w-7xl mx-auto px-8 h-20 flex items-center justify-between border-b border-gov-light z-40 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="text-gov-gold">
            <ShieldCheck size={36} strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-2xl font-cinzel font-bold tracking-widest text-gov-blue leading-none">
              Root-Claim
            </h1>
            <p className="text-[9px] uppercase tracking-[0.2em] text-gov-gold font-cinzel mt-1">
              Traditional Knowledge Protection Portal
            </p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 font-cinzel text-xs font-semibold tracking-widest text-gov-blue uppercase">
          <a href="#mandate" className="hover:text-gov-gold transition-colors">Official Mandate</a>
          <a href="#services" className="hover:text-gov-gold transition-colors">Citizen Services</a>
          <a href="#stats" className="hover:text-gov-gold transition-colors">Public Reports</a>
        </nav>
      </header>

      {/* SECTION 1: HERO (Clear, Unambiguous Message) */}
      <section className="relative z-10 pt-20 pb-24 px-8 max-w-5xl mx-auto text-center border-b border-gov-light">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="w-px h-16 bg-gov-gold mx-auto mb-8"></div>
          
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold tracking-wide mb-6 text-gov-blue leading-[1.2]">
            Securing India's <br/>
            <span className="text-gov-gold">Traditional Knowledge.</span>
          </h2>

          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12 leading-relaxed italic">
            Welcome to the official registry for Indian citizens to protect ancestral wisdom. Submit your knowledge, get it verified by the Ministry, and lock it forever on the blockchain to prevent foreign bio-piracy.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/login">
              <button className="gov-btn px-10 py-4 text-sm w-full sm:w-auto shadow-lg hover:shadow-xl">
                Login as Citizen
              </button>
            </Link>
            <Link href="/admin-login">
              <button className="gov-btn-outline px-10 py-4 text-sm w-full sm:w-auto">
                Ministry Login
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: THE MANDATE (Authority & Trust) */}
      <section id="mandate" className="bg-gov-light py-20 px-8 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-gov-gold/20 absolute -top-10 -left-10">
            <Quote size={120} strokeWidth={1} />
          </div>
          
          <div className="relative z-20 text-center pl-8 md:pl-0">
            <h3 className="font-cinzel text-xs font-bold uppercase tracking-widest text-gov-blue mb-6">
              Official Government Mandate
            </h3>
            <p className="text-2xl text-gov-blue leading-relaxed font-medium italic mb-8">
              "The objective of this portal is to ensure that India's vast heritage of traditional medicine and practices remains the sovereign intellectual property of the nation. No foreign entity shall patent what belongs to our ancestors."
            </p>
            <div className="w-16 h-px bg-gov-gold mx-auto"></div>
          </div>
        </div>
      </section>

      {/* SECTION 3: CITIZEN SERVICES (What can a citizen actually do?) */}
      <section id="services" className="py-24 px-8 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-cinzel font-bold text-gov-blue mb-4">Citizen Services</h3>
          <p className="text-gray-500 italic max-w-xl mx-auto">How citizens and researchers can interact with the Root-Claim portal.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Submit a Claim", 
              icon: BookOpen, 
              desc: "Register a traditional medicine formulation or practice. Requires proof (texts, historical documents).",
              action: "Register Now",
              link: "/login"
            },
            { 
              title: "Search Registry", 
              icon: Search, 
              desc: "Publicly search the database to check if a formulation is already protected by the Government of India.",
              action: "Search Database",
              link: "/login"
            },
            { 
              title: "Report Piracy", 
              icon: AlertOctagon, 
              desc: "File a red-flag report if you suspect a foreign entity is attempting to patent Indian traditional knowledge.",
              action: "File a Report",
              link: "/login"
            }
          ].map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="gov-card flex flex-col h-full"
            >
              <div className="text-gov-gold mb-6">
                <service.icon size={40} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-cinzel font-bold mb-4 text-gov-blue">{service.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-8 flex-1">
                {service.desc}
              </p>
              
              <Link href={service.link}>
                <span className="inline-flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-widest text-gov-gold hover:text-gov-blue transition-colors cursor-pointer border-b border-transparent hover:border-gov-blue pb-1">
                  {service.action} <ChevronRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: LIVE STATISTICS (Transparency) */}
      <section id="stats" className="border-y border-gov-light py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gov-light">
          <div className="px-4 py-4">
            <h4 className="text-5xl font-cinzel font-bold text-gov-blue mb-3">4,281</h4>
            <p className="text-xs uppercase tracking-widest text-gov-gold font-cinzel font-bold">Approved Claims</p>
          </div>
          <div className="px-4 py-4">
            <h4 className="text-5xl font-cinzel font-bold text-gov-blue mb-3">142</h4>
            <p className="text-xs uppercase tracking-widest text-gov-gold font-cinzel font-bold">Patents Prevented</p>
          </div>
          <div className="px-4 py-4">
            <h4 className="text-5xl font-cinzel font-bold text-gov-blue mb-3">100%</h4>
            <p className="text-xs uppercase tracking-widest text-gov-gold font-cinzel font-bold">Blockchain Verified</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: FOOTER (Proper Government Standards) */}
      <footer className="bg-gov-blue text-white relative z-10 pt-16 pb-8 border-t-4 border-gov-gold">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck size={36} className="text-gov-gold" strokeWidth={1.5} />
              <div>
                <h1 className="text-2xl font-cinzel font-bold tracking-widest text-white leading-none">Root-Claim</h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gov-gold font-cinzel mt-1">Ministry of Ayush</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-sm mb-6">
              An official initiative to empower citizens in protecting India's traditional knowledge. Backed by immutable blockchain technology to ensure global recognition and prevent bio-piracy.
            </p>
          </div>

          <div>
            <h4 className="font-cinzel font-bold tracking-widest uppercase text-gov-gold mb-6 text-sm">Important Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/login" className="hover:text-white transition-colors">Citizen Login</Link></li>
              <li><Link href="/admin-login" className="hover:text-white transition-colors">Ministry Official Login</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Submit a Claim</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel font-bold tracking-widest uppercase text-gov-gold mb-6 text-sm">Government & Legal</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Copyright Act</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Right to Information (RTI)</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-10 border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Ministry of Ayush, Government of India. All rights reserved.
          </p>
          <p className="text-[10px] text-gray-400 font-cinzel uppercase tracking-[0.2em]">
            Designed & Developed by <span className="font-bold text-gov-gold">Abhijeet Kangane</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
