"use client"

import React, { useState } from 'react'
import { UserPlus, Eye, EyeOff, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'

export default function CitizenSignup() {
  const router = useRouter()
  
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    setLoading(true)
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (signUpError) {
        throw signUpError
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)

    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message)
        setError(err.message)
      } else {
        console.error(String(err))
        setError("Failed to sign up.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gov-ivory flex items-center justify-center p-6 relative bg-mandala font-serif">
      <div className="w-full max-w-lg bg-white border border-gov-light p-10 shadow-sm relative z-10">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gov-blue/5 text-gov-blue mb-4">
            <UserPlus size={32} strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-cinzel font-bold text-gov-blue mb-2">Citizen Registration</h1>
          <p className="text-sm text-gray-500 italic">Create your secure digital IP account.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-xs font-bold text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="mb-6 p-6 bg-green-50 border border-green-200 text-center flex flex-col items-center">
            <ShieldCheck size={48} className="text-green-600 mb-4" />
            <h3 className="text-green-800 font-bold text-lg mb-2">Registration Successful!</h3>
            <p className="text-green-700 text-sm">Redirecting to login page...</p>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSignup}>
            <div>
              <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border-b-2 border-gov-light py-3 focus:outline-none focus:border-gov-gold transition-colors text-gov-text bg-transparent"
                placeholder="As per official records"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Email Address <span className="text-red-500">*</span></label>
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
              <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Password <span className="text-red-500">*</span></label>
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

            <div className="relative">
              <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Confirm Password <span className="text-red-500">*</span></label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border-b-2 border-gov-light py-3 pr-10 focus:outline-none focus:border-gov-gold transition-colors text-gov-text bg-transparent"
                  placeholder="••••••••"
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-3 text-gray-400 hover:text-gov-blue"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" disabled={loading} className="w-full gov-btn disabled:opacity-50">
                {loading ? 'Processing...' : 'Register Account'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-8 text-center space-y-4">
          <p className="text-xs text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-gov-gold hover:text-gov-blue font-bold transition-colors">
              Login here
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

