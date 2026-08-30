"use client"

import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

export default function AdminLogin() {
  const router = useRouter()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    setTimeout(() => {
      if (email === 'rootclaim@gov.in' && password === 'rootclaim#94') {
        router.push('/admin-dashboard')
      } else {
        setError('Unauthorized Access: Invalid Credentials.')
        setLoading(false)
      }
    }, 800) // Simulated network delay for effect
  }

  return (
    <div className="min-h-screen bg-gov-blue flex items-center justify-center p-4 sm:p-6 relative bg-mandala font-serif">
      <div className="w-full max-w-md bg-white border-t-4 border-gov-gold p-6 sm:p-10 shadow-xl relative z-10">
        
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Logo type="admin" size={64} className="ring-2 ring-red-100" />
          </div>
          <h1 className="text-2xl font-cinzel font-bold text-gov-blue mb-2">Admin Portal</h1>
          <p className="text-sm text-gray-500 italic">Ministry of Ayush Officials Only.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleAdminLogin}>
          <div>
            <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Government ID / Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gov-light py-3 focus:outline-none focus:border-red-700 transition-colors text-gov-text bg-transparent"
              placeholder="official@ayush.gov.in"
              required
            />
          </div>
          
          <div className="relative">
            <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Secure Passkey</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b-2 border-gov-light py-3 pr-10 focus:outline-none focus:border-red-700 transition-colors text-gov-text bg-transparent"
                placeholder="••••••••"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-gray-400 hover:text-red-700 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full bg-gov-blue text-white hover:bg-gov-gold font-cinzel font-bold tracking-widest uppercase py-4 transition-colors disabled:opacity-50">
              {loading ? 'Authenticating...' : 'Authorize Login'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center border-t border-gov-light pt-6 space-y-4">
          <p className="text-[10px] text-gray-400 font-cinzel uppercase tracking-widest">
            Unauthorized access is strictly prohibited.
          </p>
          <div>
            <Link href="/" className="text-xs text-gov-gold hover:text-gov-blue font-cinzel font-bold uppercase tracking-widest transition-colors">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
