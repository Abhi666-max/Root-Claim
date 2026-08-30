"use client"

import React, { useState } from 'react'
import { User, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'

export default function CitizenLogin() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      router.push('/citizen-dashboard')
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
      } else {
        console.error(String(err))
      }
      setError("Invalid Email or Password.")
    } finally {
      setLoading(false)
    }
  }

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

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b-2 border-gov-light py-3 focus:outline-none focus:border-gov-gold transition-colors text-gov-text bg-transparent"
              placeholder="name@example.com"
              required
            />
          </div>
          
          <div className="relative">
            <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b-2 border-gov-light py-3 pr-10 focus:outline-none focus:border-gov-gold transition-colors text-gov-text bg-transparent"
                placeholder="••••••••"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-gray-400 hover:text-gov-blue"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" disabled={loading} className="w-full gov-btn disabled:opacity-50">
              {loading ? 'Authenticating...' : 'Login as Citizen'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-xs text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-gov-gold hover:text-gov-blue font-bold transition-colors">
              Sign up here
            </Link>
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
