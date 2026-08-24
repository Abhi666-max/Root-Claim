"use client"

import React from 'react'
import { ShieldCheck, Lock } from 'lucide-react'
import Link from 'next/link'

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gov-blue flex items-center justify-center p-6 relative bg-mandala font-serif">
      <div className="w-full max-w-md bg-white border-t-4 border-gov-gold p-10 shadow-xl relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 text-red-700 mb-4 border border-red-100">
            <Lock size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-cinzel font-bold text-gov-blue mb-2">Admin Portal</h1>
          <p className="text-sm text-gray-500 italic">Ministry of Ayush Officials Only.</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href='/dashboard'; }}>
          <div>
            <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Government ID / Email</label>
            <input 
              type="email" 
              className="w-full border-b-2 border-gov-light py-3 focus:outline-none focus:border-red-700 transition-colors text-gov-text"
              placeholder="official@ayush.gov.in"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Secure Passkey</label>
            <input 
              type="password" 
              className="w-full border-b-2 border-gov-light py-3 focus:outline-none focus:border-red-700 transition-colors text-gov-text"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-gov-blue text-white hover:bg-gov-gold font-cinzel font-bold tracking-widest uppercase py-4 transition-colors">
              Authorize Login
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-gov-light pt-6">
          <p className="text-[10px] text-gray-400 font-cinzel uppercase tracking-widest mb-4">
            Unauthorized access is strictly prohibited.
          </p>
          <Link href="/" className="text-xs text-gov-gold hover:text-gov-blue font-cinzel font-bold uppercase tracking-widest transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
