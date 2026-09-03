"use client"

import React, { useState } from 'react'
import { UserPlus, Eye, EyeOff, ShieldCheck, Mail, CheckCircle2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/utils/supabase'

export default function CitizenSignup() {
  const router = useRouter()
  
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Step 1: Send OTP
  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      setError("Only @gmail.com email addresses are allowed.")
      return
    }
    if (fullName.trim().length < 3) {
      setError("Please enter a valid full name.")
      return
    }

    setLoading(true)
    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true
        }
      })

      if (otpError) throw otpError

      setStep(2)
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError("Failed to send OTP.")
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (otp.length !== 6) {
      setError("OTP must be 6 digits.")
      return
    }

    setLoading(true)
    try {
      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      })

      if (verifyError) throw verifyError

      // OTP is correct, user is temporarily logged in. Move to password setup.
      setStep(3)
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError("Failed to verify OTP.")
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Set Password & Finalize Signup
  const handleFinalizeSignup = async (e: React.FormEvent) => {
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
      // Update the user's password and metadata since they are already authenticated via OTP
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
        data: {
          full_name: fullName
        }
      })

      if (updateError) throw updateError

      // Sign them out so they can log in normally via the login page
      await supabase.auth.signOut()

      setSuccess(true)
      setTimeout(() => {
        router.push('/login')
      }, 2000)

    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message)
      else setError("Failed to finalize registration.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gov-ivory flex items-center justify-center p-4 sm:p-6 relative bg-mandala font-serif">
      <div className="w-full max-w-md bg-white border border-gov-light p-6 sm:p-10 shadow-sm relative z-10">
        
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
          <div className="space-y-6">
            
            <button 
              onClick={async () => {
                setLoading(true);
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: 'google',
                  options: { redirectTo: `${window.location.origin}/citizen-dashboard` }
                });
                if (error) {
                  setError(error.message);
                  setLoading(false);
                }
              }}
              disabled={loading} 
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 hover:border-gov-blue hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-700 font-bold text-sm"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Sign up with Google
            </button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gov-light"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-4 text-gray-500 font-cinzel tracking-widest">OR</span>
              </div>
            </div>

            {/* EMAIL AND NAME SECTION (Always visible but disabled after step 1) */}
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Full Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={step > 1}
                  className="w-full border-b-2 border-gov-light py-3 focus:outline-none focus:border-gov-gold transition-colors text-gov-text bg-transparent disabled:opacity-50"
                  placeholder="As per official records"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Email Address <span className="text-red-500">*</span></label>
                <div className="flex items-center">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={step > 1}
                    className="w-full border-b-2 border-gov-light py-3 focus:outline-none focus:border-gov-gold transition-colors text-gov-text bg-transparent disabled:opacity-50"
                    placeholder="name@gmail.com"
                    required
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">* Must be a @gmail.com address</p>
              </div>

              {step === 1 && (
                <button type="submit" disabled={loading} className="w-full gov-btn mt-4 flex items-center justify-center gap-2">
                  <Mail size={18} />
                  {loading ? 'Sending OTP...' : 'Verify Email'}
                </button>
              )}
            </form>

            {/* OTP SECTION */}
            {step === 2 && (
              <form onSubmit={handleVerifyOTP} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300 border-t border-gov-light pt-6">
                <div>
                  <label className="block text-xs font-cinzel font-bold uppercase tracking-widest text-gov-blue mb-2">Enter OTP <span className="text-red-500">*</span></label>
                  <p className="text-xs text-gray-500 mb-3">A 6-digit code has been sent to {email}</p>
                  <input 
                    type="text" 
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border-b-2 border-gov-light py-3 text-center tracking-[1em] text-xl focus:outline-none focus:border-gov-gold transition-colors text-gov-text bg-transparent"
                    placeholder="••••••"
                    required
                  />
                </div>
                <button type="submit" disabled={loading} className="w-full gov-btn bg-gov-gold hover:bg-yellow-600 mt-4 flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} />
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            )}

            {/* PASSWORD SECTION */}
            {step === 3 && (
              <form onSubmit={handleFinalizeSignup} className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300 border-t border-gov-light pt-6">
                <div className="bg-green-50 text-green-700 text-xs p-3 flex items-center gap-2 border border-green-200">
                  <CheckCircle2 size={16} /> Email verified successfully. Please set your password.
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
                    {loading ? 'Processing...' : 'Complete Registration'}
                  </button>
                </div>
              </form>
            )}

          </div>
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

