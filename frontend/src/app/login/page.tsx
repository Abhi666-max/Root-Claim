"use client"

import React from 'react'
import { ShieldCheck, User } from 'lucide-react'
import Link from 'next/link'

export default function CitizenLogin() {
  return (
    <div className="min-h-screen bg-gov-ivory flex items-center justify-center p-6 relative bg-mandala font-serif">
      <div className="w-full max-w-md bg-white border border-gov-light p-10 shadow-sm relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gov-blue/5 text-gov-blue mb-4">
            <User size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-cinzel font-bold text-gov-blue mb-2">Citizen Portal</h1>
          <p className="text-sm text-gray-500 italic">Login to submit traditional knowledge claims.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href='/dashboard'; }}>
          <div>
            <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Aadhaar Number / Mobile</label>
            <input 
              type="text" 
              className="w-full border-b-2 border-gov-light py-3 focus:outline-none focus:border-gov-gold transition-colors text-gov-text"
              placeholder="Enter your registered ID"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Password / OTP</label>
            <input 
              type="password" 
              className="w-full border-b-2 border-gov-light py-3 focus:outline-none focus:border-gov-gold transition-colors text-gov-text"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full gov-btn">
              Login as Citizen
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <Link href="/" className="text-xs text-gov-gold hover:text-gov-blue font-cinzel font-bold uppercase tracking-widest transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
