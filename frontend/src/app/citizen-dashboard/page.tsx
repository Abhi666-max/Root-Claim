"use client"

import React, { useState, useEffect } from 'react'
import { 
  ShieldCheck, User, Download, 
  CheckCircle, Clock, Home, FileText, 
  AlertTriangle, UploadCloud, 
  CheckSquare, FileWarning, SearchCheck, MessageSquare, Send,
  Sparkles, ShieldAlert, Cpu, Link as LinkIcon, Globe, Activity
} from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Real-time Overview Simulation
  const [liveClaims, setLiveClaims] = useState(84725)
  const [liveBlocked, setLiveBlocked] = useState(14)
  const [dataSynced, setDataSynced] = useState(4.2)
  const [liveSubmissions, setLiveSubmissions] = useState(24)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) setLiveClaims(prev => prev + 1)
      if (Math.random() > 0.8) setLiveBlocked(prev => prev + 1)
      if (Math.random() > 0.6) setDataSynced(prev => +(prev + 0.1).toFixed(1))
      if (Math.random() > 0.4) setLiveSubmissions(prev => prev + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
  
  // State for AI Smart Draft
  const [rawText, setRawText] = useState('')
  const [formattedClaim, setFormattedClaim] = useState<string | null>(null)
  const [isDrafting, setIsDrafting] = useState(false)
  
  // State for Radar Pre-Check
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [radarResult, setRadarResult] = useState<any>(null)
  const [isCheckingRadar, setIsCheckingRadar] = useState(false)

  // State for OCR Digitizer
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ocrResult, setOcrResult] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)

  // State for IP-SAKTI RAG Chatbot
  const [chatInput, setChatInput] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'bot', content: string, sources?: any[]}[]>([
    {role: 'bot', content: 'Namaste! I am IP-SAKTI Sahayak (A Multilingual RAG-based AI Assistant). Ask me any question regarding Indian Intellectual Property Laws, Biopiracy, or Traditional Knowledge.'}
  ])
  const [isChatting, setIsChatting] = useState(false)
  const [jurisdiction, setJurisdiction] = useState<'india'|'international'>('india')

  // Real DB Claims
  const [myClaims, setMyClaims] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const fetchMyClaims = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/claims')
      if (res.data.status === 'success') {
        setMyClaims(res.data.claims)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMyClaims()
  }, [])

  // Modal States
  const [showSubmitModal, setShowSubmitModal] = useState(false)
  const [showCertificateModal, setShowCertificateModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Report Bio-Piracy States
  const [reportUrl, setReportUrl] = useState('')
  const [reportContext, setReportContext] = useState('')
  const [reportError, setReportError] = useState('')
  const [hasReported, setHasReported] = useState(false)

  // Ministry Broadcast Alerts
  const [ministryAlerts, setMinistryAlerts] = useState<{msg: string, time: string}[]>([])
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0)
  const [showBroadcasts, setShowBroadcasts] = useState(true)

  useEffect(() => {
    // Poll for alerts broadcasted by Admin Dashboard via localStorage
    const checkAlert = () => {
      const alertData = localStorage.getItem('ministry_alerts_array')
      if (alertData) {
        try {
          const parsed = JSON.parse(alertData)
          setMinistryAlerts(parsed)
        } catch(e) {}
      }
    }
    checkAlert()
    const alertInterval = setInterval(checkAlert, 2000)
    return () => clearInterval(alertInterval)
  }, [])

  const handleReportSubmit = () => {
    // Basic validation to reject random gibberish (must contain spaces, be somewhat long)
    if (!reportUrl.trim() || !reportContext.trim()) {
      setReportError("Error: Both Patent Number/URL and Context fields are mandatory.");
      return;
    }
    if (reportUrl.length < 5) {
      setReportError("Error: Invalid Patent Number or URL. Must be at least 5 characters.");
      return;
    }
    if (reportContext.length < 30 || !reportContext.includes(' ')) {
      setReportError("Error: Please provide a proper, detailed justification with multiple words for the Ministry to investigate.");
      return;
    }
    setReportError("");
    setHasReported(true);
    setShowReportModal(true);
  }

  // API Call: Feature 2 - AI Smart Draft
  const handleAiEnhance = async () => {
    if (!rawText) return;
    setIsDrafting(true);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/draft', { raw_text: rawText });
      setFormattedClaim(response.data.formatted_claim);
    } catch (error) {
      console.error("AI Draft Error:", error);
      setErrorMsg("Failed to connect to AI Engine. Make sure the backend server is running and API keys are set.");
    } finally {
      setIsDrafting(false);
    }
  }

  // API Call: Feature 3 - Collision Radar Pre-Check
  const handleRadarCheck = async () => {
    const textToCheck = formattedClaim || rawText;
    if (!textToCheck) {
      setErrorMsg("Please generate a draft or enter text first.");
      return;
    }
    setIsCheckingRadar(true);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/radar', { claim_text: textToCheck });
      setRadarResult(response.data);
    } catch (error) {
      console.error("Radar Error:", error);
      setErrorMsg("Failed to run collision radar. Make sure the backend server is running.");
    } finally {
      setIsCheckingRadar(false);
    }
  }

  // Feature: Submit to Vault
  const handleSubmitToVault = async () => {
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:8000/api/v1/claims', {
        user_id: "UID-992-881",
        title: rawText.split('\n')[0].substring(0, 50) || "Untitled Knowledge",
        raw_description: rawText,
        ai_formatted_claim: formattedClaim || "",
        collision_score: radarResult ? radarResult.similarity_percentage : 0
      });
      fetchMyClaims();
      setShowSubmitModal(true);
      
      // Reset form
      setRawText('');
      setFormattedClaim(null);
      setRadarResult(null);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to submit claim. Database connection might be down.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // API Call: Feature 4 - OCR Digitizer
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    setIsUploading(true);
    setOcrResult(null);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/ocr', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setOcrResult(response.data);
      // Auto-fill raw text with OCR text so they can run AI Enhance
      setRawText((prev) => prev + "\n" + response.data.raw_ocr_text);
    } catch (error) {
      console.error("OCR Error:", error);
      setErrorMsg("Failed to process image. Make sure backend is running and file is a valid image.");
    } finally {
      setIsUploading(false);
    }
  }

  // API Call: Feature 1 - IP-SAKTI Chat
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setChatInput('');
    setIsChatting(true);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/ip-sakti', { query: `[Jurisdiction: ${jurisdiction.toUpperCase()}] ${userMsg}` });
      setChatHistory(prev => [...prev, { role: 'bot', content: response.data.reply, sources: response.data.sources }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setChatHistory(prev => [...prev, { role: 'bot', content: 'Error connecting to IP-SAKTI backend.' }]);
    } finally {
      setIsChatting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gov-text font-sans flex">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-gov-blue text-white flex flex-col fixed h-full z-20 shadow-xl print:hidden">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-white/10 bg-gov-blue">
          <ShieldCheck size={32} className="text-gov-gold" />
          <div>
            <h1 className="font-serif-official font-bold tracking-widest uppercase text-sm">Root-Claim</h1>
            <p className="text-[8px] uppercase tracking-widest text-gov-gold">Citizen Portal</p>
          </div>
        </div>

        <nav className="flex-1 py-8 flex flex-col gap-2 px-4">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'overview' ? 'bg-gov-gold text-white shadow-md' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
          >
            <Home size={16} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('ip-sakti')}
            className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'ip-sakti' ? 'bg-gov-gold text-white shadow-md' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
          >
            <MessageSquare size={16} /> IP-SAKTI Sahayak
          </button>
          <button 
            onClick={() => setActiveTab('submit')}
            className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'submit' ? 'bg-gov-gold text-white shadow-md' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
          >
            <FileText size={16} /> Submit Knowledge
          </button>

          <button 
            onClick={() => setActiveTab('vault')}
            className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'vault' ? 'bg-gov-gold text-white shadow-md' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
          >
            <ShieldCheck size={16} /> My Digital Vault
          </button>
          <button 
            onClick={() => setActiveTab('whistleblower')}
            className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 'whistleblower' ? 'bg-red-600 text-white shadow-md' : 'text-red-400 hover:bg-red-500/10 hover:text-red-300'}`}
          >
            <ShieldAlert size={16} /> Report Bio-Piracy
          </button>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="bg-white/5 p-4 rounded mb-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1 font-bold">Logged in as</p>
            <p className="text-sm font-bold text-white flex items-center gap-2 mb-2"><User size={14}/> UID-992-881</p>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-[9px] text-green-400 font-bold uppercase tracking-widest">
              <CheckCircle size={10} /> Verified TKDL Contributor
            </div>
          </div>
          <Link href="/">
            <button className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              Logout &rarr;
            </button>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 print:ml-0 flex flex-col min-h-screen">
        
        {/* Top Header */}
        {activeTab !== 'ip-sakti' && (
          <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 sticky top-0 z-10 shadow-sm shrink-0 print:hidden">
            <h2 className="text-xl font-serif-official font-bold text-gov-blue">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'submit' && 'Submit Traditional Knowledge'}
              {activeTab === 'vault' && 'My Secure Digital Vault'}
              {activeTab === 'whistleblower' && 'Whistleblower: Report Bio-Piracy'}
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Network: Secure
              </div>
            </div>
          </header>
        )}

        {/* Dynamic Content Body */}
        <div className={`flex-1 flex flex-col bg-gray-50 ${activeTab === 'ip-sakti' ? 'p-0' : 'p-10'} print:p-0 print:bg-white`}>
          
          {/* ====================================================== */}
          {/* TAB: OVERVIEW */}
          {/* ====================================================== */}
          {activeTab === 'overview' && (
            <div className="max-w-6xl">
              
              {/* Ministry Broadcast Alerts (Global) */}
              {showBroadcasts && ministryAlerts.length > 0 && (
                <div className="mb-8 bg-red-50 border-l-4 border-red-600 p-6 shadow-sm rounded-r flex items-start gap-4 relative">
                  <div className="bg-red-100 p-2 rounded-full shrink-0">
                    <AlertTriangle size={24} className="text-red-600" />
                  </div>
                  <div className="flex-1 pr-32">
                    <h3 className="font-serif font-bold text-red-800 text-lg mb-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                      MINISTRY BROADCAST ALERT
                      <span className="text-[10px] text-red-500 font-mono tracking-widest bg-red-100 px-2 py-0.5 rounded ml-2">{ministryAlerts[currentAlertIndex].time}</span>
                    </h3>
                    <p className="text-red-700 text-sm font-medium">{ministryAlerts[currentAlertIndex].msg}</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 absolute top-6 right-6">
                    <button 
                      onClick={() => setShowBroadcasts(false)}
                      className="text-red-400 hover:text-red-700 font-bold text-xl leading-none mb-1"
                      title="Hide Alerts"
                    >
                      &times;
                    </button>
                    {ministryAlerts.length > 1 && (
                      <div className="flex gap-1.5 mt-2 bg-red-100 p-1.5 rounded-full border border-red-200 shadow-inner">
                        {ministryAlerts.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentAlertIndex(idx)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                              currentAlertIndex === idx 
                                ? 'bg-red-600 scale-110 shadow-[0_0_5px_rgba(220,38,38,0.5)]' 
                                : 'bg-red-300 hover:bg-red-400'
                            }`}
                            aria-label={`Go to alert ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Personal Impact Section */}
              <div className="mb-10">
                <h3 className="font-serif-official font-bold text-xl text-gov-blue mb-4 flex items-center gap-2">
                  <User className="text-gov-gold" /> My Personal Contributions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 border-l-4 border-gov-blue shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">My Drafted Claims</p>
                    <h3 className="text-3xl font-serif-official font-bold text-gov-blue">02</h3>
                  </div>
                  <div className="bg-white p-6 border-l-4 border-yellow-500 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Under Verification</p>
                    <h3 className="text-3xl font-serif-official font-bold text-yellow-600">01</h3>
                  </div>
                  <div className="bg-white p-6 border-l-4 border-green-600 shadow-sm">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">My Secured Vault Items</p>
                    <h3 className="text-3xl font-serif-official font-bold text-green-700">01</h3>
                  </div>
                </div>
              </div>

              {/* System Status / Network */}
              <div className="bg-white border border-gray-200 shadow-sm p-8">
                  <h3 className="font-serif-official font-bold text-xl text-gov-blue mb-6 border-b border-gray-100 pb-4">Digital Ecosystem Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="text-gov-gold" />
                        <div>
                          <p className="font-bold text-sm text-gray-800">IP-SAKTI RAG Chatbot</p>
                          <p className="text-xs text-gray-500 font-mono">Ministry Legal Database Connection</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-green-100 text-green-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>ONLINE</span>
                        <p className="text-[9px] text-gray-400 mt-1 font-mono">Uptime: 99.99% | Latency: 12ms</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Cpu className="text-gov-blue" />
                        <div>
                          <p className="font-bold text-sm text-gray-800">AI Collision Radar</p>
                          <p className="text-xs text-gray-500 font-mono">Scanning USPTO, EPO, and TKDL Databases</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2"><span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>ACTIVE</span>
                        <p className="text-[9px] text-gray-400 mt-1 font-mono">1.2M Vectors Checked/sec</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="text-purple-600" />
                        <div>
                          <p className="font-bold text-sm text-gray-800">Polygon Blockchain Vault</p>
                          <p className="text-xs text-gray-500 font-mono">Cryptographic Anchoring System</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full flex items-center gap-2"><span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></span>SYNCED</span>
                        <p className="text-[9px] text-gray-400 mt-1 font-mono">Block height: 61,048,291</p>
                      </div>
                    </div>
                  </div>
                </div>

            </div>
          )}

          {/* ====================================================== */}
          {/* TAB: SUBMIT KNOWLEDGE (Smart Draft + Pre-Check) */}
          {/* ====================================================== */}
          {activeTab === 'submit' && (
            <div className="max-w-4xl">
              <div className="bg-white border border-gray-200 shadow-sm p-8">
                
                <div className="mb-8 border-b border-gray-100 pb-6">
                  <h3 className="font-serif-official font-bold text-2xl text-gov-blue mb-2 flex items-center gap-3">
                    <Sparkles className="text-gov-gold" /> Step 1: AI Smart Draft
                  </h3>
                  <p className="text-sm text-gray-500">Describe the traditional knowledge in your own words. Our AI will automatically structure it to match international IP and botanical standards.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gov-blue mb-2">Claim Title</label>
                    <input type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-gov-gold text-sm" placeholder="e.g., Turmeric Paste for Wound Healing" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gov-blue mb-2">Your Raw Description (Hinglish/English)</label>
                    <textarea 
                      className="w-full border border-gray-300 p-3 focus:outline-none focus:border-gov-gold text-sm h-32" 
                      placeholder="Haldi aur neem ko mix karke lagane se infection nahi hota aur ghaav jaldi bharta hai..."
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                    ></textarea>
                  </div>

                  {/* AI Formatted Output */}
                  {formattedClaim && (
                    <div className={`border-l-4 p-4 mt-4 relative ${formattedClaim.startsWith('REJECTED:') ? 'bg-red-50 border-red-500' : 'bg-gov-blue/5 border-gov-gold'}`}>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${formattedClaim.startsWith('REJECTED:') ? 'text-red-700' : 'text-gov-blue'}`}>
                        {formattedClaim.startsWith('REJECTED:') ? <AlertTriangle size={14}/> : <Sparkles size={14} className="text-gov-gold"/>} 
                        {formattedClaim.startsWith('REJECTED:') ? 'AI Rejection (Non-Botanical / Toxic)' : 'AI Enhanced Legal Claim'}
                      </h4>
                      <div className={`text-sm whitespace-pre-wrap font-serif mb-4 ${formattedClaim.startsWith('REJECTED:') ? 'text-red-700 font-bold' : 'text-gray-700'}`}>
                        {formattedClaim}
                      </div>
                      
                      {!formattedClaim.startsWith('REJECTED:') && (
                        <button 
                          onClick={() => setRawText(formattedClaim)}
                          className="bg-gov-gold text-gov-blue px-3 py-1.5 text-xs font-bold uppercase hover:bg-yellow-500 transition-colors shadow-sm"
                        >
                          Apply AI Text to Description
                        </button>
                      )}
                    </div>
                  )}

                  {/* Radar Result UI */}
                  {radarResult && (
                    <div className={`border p-4 mt-4 ${radarResult.risk_level === 'HIGH' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2 ${radarResult.risk_level === 'HIGH' ? 'text-red-700' : 'text-green-700'}`}>
                        {radarResult.risk_level === 'HIGH' ? <ShieldAlert size={14}/> : <CheckCircle size={14}/>} 
                        Collision Radar: {radarResult.risk_level} RISK ({radarResult.similarity_percentage}% Match)
                      </h4>
                      {radarResult.risk_level === 'HIGH' && (
                        <p className="text-sm text-red-600 font-mono">
                          Flagged Prior Art: {radarResult.flagged_patent} - {radarResult.patent_title}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Multi-Media Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gov-blue mb-2">Upload Historical Proof (Manuscripts, Images, PDFs)</label>
                    <label className="border-2 border-dashed border-gray-300 bg-gray-50 p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center relative">
                      <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileUpload} disabled={isUploading} />
                      <UploadCloud className={`mx-auto text-gray-400 mb-3 ${isUploading ? 'animate-bounce text-gov-gold' : ''}`} size={32} />
                      <p className="text-sm text-gray-500 font-bold mb-1">{isUploading ? 'Extracting Text...' : 'Click to upload or drag & drop'}</p>
                      <p className="text-xs text-gray-400">AI OCR will extract text automatically (JPG, PNG)</p>
                    </label>
                  </div>

                  {/* OCR Result UI */}
                  {ocrResult && !ocrResult.error && (
                    <div className="bg-white border border-gov-gold p-4 mt-4 shadow-sm">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gov-gold mb-2 flex items-center gap-2">
                        <FileText size={14}/> Digitized Manuscript Data
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="font-bold text-gray-700">Identified Herbs</p>
                          <p className="text-gray-600">{ocrResult.identified_herbs?.join(", ") || "None"}</p>
                        </div>
                        <div>
                          <p className="font-bold text-gray-700">Symptoms</p>
                          <p className="text-gray-600">{ocrResult.symptoms_targeted?.join(", ") || "None"}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="font-bold text-gray-700">Raw OCR Text Added to Description Above</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4 border-t border-gray-100">
                    <button 
                      onClick={handleAiEnhance}
                      disabled={isDrafting}
                      className="flex-1 bg-gov-blue text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-[#081729] transition-colors flex justify-center items-center gap-2 shadow-md disabled:opacity-50"
                    >
                      <Sparkles size={16} className={isDrafting ? "animate-spin text-gov-gold" : "text-gov-gold"} /> 
                      {isDrafting ? 'Drafting...' : 'Enhance with AI'}
                    </button>
                    
                    {!formattedClaim?.startsWith('REJECTED:') && (
                      <button 
                        onClick={handleRadarCheck}
                        disabled={isCheckingRadar}
                        className="flex-1 bg-white border border-gov-blue text-gov-blue py-4 text-xs font-bold tracking-widest uppercase hover:bg-gov-blue hover:text-white transition-colors flex justify-center items-center gap-2 shadow-sm disabled:opacity-50"
                      >
                        <Cpu size={16} className={isCheckingRadar ? "animate-pulse" : ""} /> 
                        {isCheckingRadar ? 'Scanning Patents...' : 'Run Patent Pre-Check'}
                      </button>
                    )}
                  </div>
                  
                  {/* Submit to Vault Action */}
                  {radarResult && !formattedClaim?.startsWith('REJECTED:') && (
                    <div className="pt-4 mt-2">
                      <button 
                        onClick={handleSubmitToVault}
                        disabled={isSubmitting}
                        className="w-full bg-green-600 text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-green-700 transition-colors flex justify-center items-center gap-2 shadow-md disabled:opacity-50"
                      >
                        <ShieldCheck size={16} /> {isSubmitting ? 'Submitting to Vault...' : 'Submit & Anchor to Digital Vault'}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ====================================================== */}
          {/* TAB: MY DIGITAL VAULT (Timeline & Certificates) */}
          {/* ====================================================== */}
          {activeTab === 'vault' && (
            <div className="max-w-6xl">
              <div className="bg-white border border-gray-200 shadow-sm">
                <div className="bg-gray-900 px-6 py-5 border-b border-gray-800 flex justify-between items-center">
                  <h3 className="font-serif-official font-bold text-white text-lg flex items-center gap-2">
                    <ShieldCheck size={20} className="text-gov-gold"/> My Secured Claims
                  </h3>
                </div>
                
                <div className="p-0 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 text-[10px] uppercase tracking-widest font-bold text-gray-500 bg-gray-50">
                        <th className="p-5 pl-8">Claim ID & Title</th>
                        <th className="p-5">Timeline Status</th>
                        <th className="p-5">Ministry Remarks</th>
                        <th className="p-5 pr-8 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      
                      {myClaims.map(claim => (
                        <tr key={claim.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="p-5 pl-8">
                            <p className="font-mono text-xs text-gray-500 mb-1">TK-{claim.id.substring(0,8)}</p>
                            <p className="font-bold text-gov-blue">{claim.title}</p>
                          </td>
                          <td className="p-5">
                            {claim.status === 'Blockchain Anchored' ? (
                              <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                <CheckCircle size={12} /> Blockchain Anchored
                              </span>
                            ) : claim.status === 'Verified' ? (
                              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                <ShieldCheck size={12} /> Verified
                              </span>
                            ) : claim.status === 'Rejected' ? (
                              <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                <AlertTriangle size={12} /> Rejected
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                                <Clock size={12} /> Pending Ministry Review
                              </span>
                            )}
                          </td>
                          <td className="p-5">
                            <p className="text-xs text-gray-600 line-clamp-2 italic">
                              {claim.status === 'Blockchain Anchored' ? `"Verified against ancient Ayurvedic texts. No prior patents found. Cleared for IP lock."` :
                               claim.status === 'Verified' ? `"Awaiting final blockchain lock."` :
                               claim.status === 'Rejected' ? `"Claim rejected. High similarity with existing prior art or insufficient traditional context."` :
                               `"Awaiting official verification."`}
                            </p>
                          </td>
                          <td className="p-5 pr-8 text-right">
                            {claim.status === 'Blockchain Anchored' ? (
                              <button 
                                onClick={() => setShowCertificateModal(true)}
                                className="bg-gov-blue text-white border border-gov-blue px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-[#081729] transition-colors ml-auto flex items-center gap-2 justify-center"
                              >
                                <Download size={12} /> View Certificate
                              </button>
                            ) : (
                              <button disabled className="bg-gray-100 text-gray-400 border border-gray-200 px-4 py-2 text-[10px] font-bold tracking-widest uppercase cursor-not-allowed ml-auto">
                                Processing...
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}

                      {myClaims.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-10 text-center text-gray-400">
                            No claims found in your secure vault.
                          </td>
                        </tr>
                      )}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ====================================================== */}
          {/* TAB: WHISTLEBLOWER (Report Piracy) */}
          {/* ====================================================== */}
          {activeTab === 'whistleblower' && (
            <div className="max-w-4xl">
              {hasReported ? (
                <div className="bg-white border-t-4 border-yellow-500 shadow-sm p-8">
                  <div className="mb-8 border-b border-gray-100 pb-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif-official font-bold text-2xl text-gov-blue mb-2 flex items-center gap-3">
                        <ShieldAlert className="text-yellow-500" /> Report Status Tracking
                      </h3>
                      <p className="text-sm text-gray-600">Track the investigation status of your submitted bio-piracy reports.</p>
                    </div>
                    <button onClick={() => setHasReported(false)} className="text-xs font-bold text-gov-blue border border-gov-blue px-4 py-2 hover:bg-gov-blue hover:text-white transition-colors">Submit Another Report</button>
                  </div>
                  
                  <div className="border border-gray-200 rounded">
                    <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Target</p>
                        <p className="text-sm font-bold text-gov-blue">{reportUrl}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-yellow-200 animate-pulse">Under Investigation</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Investigation Timeline</h4>
                      <div className="relative pl-6 border-l-2 border-gray-200 space-y-6">
                        <div className="relative">
                          <span className="absolute -left-[31px] bg-yellow-500 w-4 h-4 rounded-full border-4 border-white"></span>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Just Now</p>
                          <p className="text-sm font-bold text-gov-blue">Collision Radar Analysis Initiated</p>
                          <p className="text-xs text-gray-500 mt-1">Cross-referencing foreign patent claims against TKDL database and user-provided context.</p>
                        </div>
                        <div className="relative">
                          <span className="absolute -left-[31px] bg-green-500 w-4 h-4 rounded-full border-4 border-white"></span>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Just Now</p>
                          <p className="text-sm font-bold text-gov-blue">Report Received</p>
                          <p className="text-xs text-gray-500 mt-1">Securely transmitted to Ministry of Ayush.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border-t-4 border-red-600 shadow-sm p-8">
                  
                  <div className="mb-8 border-b border-gray-100 pb-6">
                    <h3 className="font-serif-official font-bold text-2xl text-red-700 mb-2 flex items-center gap-3">
                      <ShieldAlert /> Report Bio-Piracy
                    </h3>
                    <p className="text-sm text-gray-600">If you have found a foreign entity or corporation attempting to patent or illegally sell traditional Indian medicine, report it here. The Ministry will investigate using the Collision Radar.</p>
                  </div>

                  <div className="space-y-6">
                    {reportError && (
                      <div className="bg-red-50 text-red-700 p-4 border-l-4 border-red-500 text-sm font-bold">
                        {reportError}
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gov-blue mb-2">Foreign Patent Number / Product URL <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={reportUrl}
                        onChange={(e) => setReportUrl(e.target.value)}
                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-red-500 text-sm" 
                        placeholder="e.g., US Patent #5,401,504 or www.example.com/product" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gov-blue mb-2">Why is this Bio-Piracy? (Provide context) <span className="text-red-500">*</span></label>
                      <textarea 
                        value={reportContext}
                        onChange={(e) => setReportContext(e.target.value)}
                        className="w-full border border-gray-300 p-3 focus:outline-none focus:border-red-500 text-sm h-32" 
                        placeholder="Please provide detailed justification. This formulation has been used in India for centuries as documented in..."
                      ></textarea>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                      <button 
                        onClick={handleReportSubmit}
                        className="w-full bg-red-600 text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-red-700 transition-colors flex justify-center items-center gap-2 shadow-md mt-4"
                      >
                        <AlertTriangle size={16} /> Submit Red-Flag Report to Ministry
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ====================================================== */}
          {/* TAB: IP-SAKTI SAHAYAK (RAG Chatbot) */}
          {/* ====================================================== */}
          {activeTab === 'ip-sakti' && (
            <div className="w-full h-screen flex flex-col bg-white border-l border-gray-200">
              <div className="bg-gov-blue p-6 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="font-serif-official font-bold text-white text-xl flex items-center gap-2 mb-1">
                    <MessageSquare size={24} className="text-gov-gold"/> IP-SAKTI Sahayak
                  </h3>
                  <p className="text-xs text-gray-300">SIH26045: A Multilingual, RAG-based AI assistant for Intellectual Property</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/10 text-white p-1 rounded-full border border-white/20">
                  <button 
                    onClick={() => setJurisdiction('india')} 
                    className={`px-4 py-1.5 rounded-full transition-colors ${jurisdiction === 'india' ? 'bg-gov-gold text-white shadow' : 'hover:bg-white/10'}`}
                  >
                    India
                  </button>
                  <button 
                    onClick={() => setJurisdiction('international')} 
                    className={`px-4 py-1.5 rounded-full transition-colors ${jurisdiction === 'international' ? 'bg-gov-gold text-white shadow' : 'hover:bg-white/10'}`}
                  >
                    International
                  </button>
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col gap-4">
                {chatHistory.length === 1 && (
                  <div className="flex flex-col items-center justify-center my-8 text-center text-gray-500 opacity-70">
                    <ShieldCheck size={48} className="mb-4 text-gov-gold" />
                    <p className="text-sm font-bold uppercase tracking-widest mb-2">Suggested Queries</p>
                    <div className="flex flex-col gap-2 text-xs">
                      <button onClick={() => setChatInput("What is TKDL and why is it important?")} className="bg-white px-4 py-2 border border-gray-200 hover:border-gov-gold transition-colors">"What is TKDL and why is it important?"</button>
                      <button onClick={() => setChatInput("Classify my Ayurvedic product")} className="bg-white px-4 py-2 border border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors flex items-center justify-center gap-2">
                        <Activity size={14}/> Classify Formulation
                      </button>
                      <button onClick={() => setChatInput("How does India protect Turmeric from foreign patents?")} className="bg-white px-4 py-2 border border-gray-200 hover:border-gov-gold transition-colors">"How does India protect Turmeric from foreign patents?"</button>
                      <button onClick={() => setChatInput("Can I patent an Ayurvedic herbal extract?")} className="bg-white px-4 py-2 border border-gray-200 hover:border-gov-gold transition-colors">"Can I patent an Ayurvedic herbal extract?"</button>
                    </div>
                  </div>
                )}
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 text-sm rounded shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-gov-blue text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none font-serif'
                    }`}>
                      {msg.role === 'bot' && <strong className="block text-xs uppercase tracking-widest text-gov-gold mb-2">IP-SAKTI Assistant</strong>}
                      <p className="leading-relaxed">{msg.content}</p>
                      
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-2">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sources Cited</p>
                          {msg.sources.map((src, sIdx) => (
                            <div key={sIdx} className="bg-gray-50 border border-gray-200 p-2 rounded flex items-center justify-between text-xs">
                              <span className="text-gov-blue font-bold truncate max-w-[70%]">{src.title}</span>
                              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-green-200">
                                {src.confidence}% Confidence
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isChatting && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 p-4 text-sm rounded shadow-sm rounded-bl-none italic text-gray-500">
                      IP-SAKTI is searching the legal database...
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white border-t border-gray-200">
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask about IP Laws, Patents, or Bio-Piracy (English/Hindi)..." 
                    className="flex-1 border border-gray-300 p-4 focus:outline-none focus:border-gov-gold text-sm bg-gray-50"
                  />
                  <button 
                    type="submit"
                    disabled={isChatting || !chatInput.trim()}
                    className="bg-gov-gold text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-[#9a7b3b] transition-colors flex justify-center items-center gap-2 shadow-sm disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </form>
                <p className="text-[10px] text-gray-400 mt-2 text-center">Powered by Groq LLM & Supabase Vector RAG</p>
              </div>
            </div>
          )}

          {/* ====================================================== */}
          {/* MODALS */}
          {/* ====================================================== */}
          
          {/* Error Modal */}
          {errorMsg && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <div className="bg-white max-w-md w-full p-8 shadow-2xl relative border-t-4 border-red-600">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="text-red-600" size={32} />
                  </div>
                  <h2 className="font-serif-official text-2xl font-bold text-gov-blue mb-2">Notice</h2>
                  <p className="text-sm text-gray-600 mb-6">{errorMsg}</p>
                  <button 
                    onClick={() => setErrorMsg(null)}
                    className="w-full bg-gov-blue text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#081729]"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit Success Modal */}
          {showSubmitModal && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <div className="bg-white max-w-md w-full p-8 shadow-2xl relative border-t-4 border-green-600">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="text-green-600" size={32} />
                  </div>
                  <h2 className="font-serif-official text-2xl font-bold text-gov-blue mb-2">Knowledge Secured</h2>
                  <p className="text-sm text-gray-600 mb-6">Your traditional knowledge claim has been successfully cryptographically hashed and anchored to the Blockchain Vault.</p>
                  <p className="text-xs font-mono bg-gray-100 p-2 mb-6 break-all border border-gray-200">TxHash: 0x8f7d9a...4b2c1</p>
                  <button 
                    onClick={() => {
                      setShowSubmitModal(false);
                      setActiveTab('vault');
                    }}
                    className="w-full bg-gov-blue text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#081729]"
                  >
                    Go to My Vault
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Certificate Modal */}
          {showCertificateModal && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto pt-10 pb-20 print:static print:bg-white print:p-0 print:m-0 print:h-screen print:w-full print:block print:z-50">
              <div className="bg-white max-w-3xl w-full p-2 shadow-2xl relative border border-gray-200 my-8 shrink-0 print:shadow-none print:border-none print:m-0 print:p-0 print:w-full print:max-w-none">
                
                {/* Print wrapper to enforce exact styling for PDF */}
                <div id="printable-certificate" className="bg-[#fdfbf7] p-8 md:p-12 border-8 border-double border-gov-gold relative overflow-hidden flex flex-col print:border-8 print:p-8 print:h-[285mm] print:w-[210mm] print:scale-95 print:origin-top print:flex print:items-center print:justify-center mx-auto">
                  
                  {/* Subtle Background Watermark */}
                  <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                    <ShieldCheck size={300} />
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center flex-1">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 border-4 border-gov-blue rounded-full flex flex-col items-center justify-center bg-white shadow-md">
                        <span className="text-lg font-serif font-bold text-gov-blue leading-none tracking-tighter">सत्यमेव</span>
                        <span className="text-[10px] font-serif font-bold text-gov-blue leading-none tracking-tighter mt-1">जयते</span>
                      </div>
                    </div>
                    
                    <h1 className="font-serif-official text-2xl md:text-4xl font-bold text-gov-blue mb-2 uppercase tracking-widest">Certificate of Authorship</h1>
                    <h2 className="text-xs md:text-sm font-bold text-gov-gold uppercase tracking-[0.2em] mb-6 md:mb-10 border-b border-gov-gold pb-4 inline-block px-4 md:px-12">Ministry of Ayush • Government of India</h2>
                    
                    <p className="text-md md:text-lg text-gray-700 italic mb-2 font-serif-official">This is to officially certify that</p>
                    <h3 className="text-xl md:text-2xl font-bold text-gov-blue mb-4 md:mb-6 uppercase tracking-wider underline decoration-gov-gold decoration-2 underline-offset-8">Abhijeet Kangane</h3>
                    
                    <p className="text-md md:text-lg text-gray-700 italic mb-2 font-serif-official">has successfully documented the traditional knowledge claim titled:</p>
                    <h3 className="text-lg md:text-xl font-bold text-gov-blue mb-6 md:mb-10 px-4 md:px-8 leading-snug">"{formattedClaim ? formattedClaim.split('\n')[0].replace('TITLE:', '').trim() : 'Traditional Ayurvedic Botanical Formulation'}"</h3>
                    
                    <p className="text-xs md:text-sm text-gray-600 italic mb-8 md:mb-12 font-serif-official max-w-2xl px-4 md:px-12 leading-relaxed">
                      This formulation has been digitally verified, cryptographically hashed, and securely anchored to the decentralized vault under the Traditional Knowledge Digital Library (TKDL) framework to protect against bio-piracy.
                    </p>
                    
                    <div className="w-full flex justify-between items-end mt-auto border-t-2 border-gray-200 pt-6 md:pt-8 px-4 md:px-8">
                      <div className="text-left">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Registration ID</p>
                        <p className="font-mono text-md font-bold text-gov-blue tracking-wider">TK-2026-8472</p>
                      </div>
                      
                      {/* Premium CSS Seal */}
                      <div className="w-32 h-32 relative flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border-4 border-dashed border-gov-gold animate-spin-slow" style={{animationDuration: '20s'}}></div>
                        <div className="absolute inset-2 rounded-full border-2 border-solid border-gov-gold bg-gov-gold/10 flex items-center justify-center flex-col">
                          <p className="text-[10px] font-bold text-gov-gold uppercase tracking-widest text-center leading-tight">Officially<br/>Verified</p>
                          <CheckCircle size={14} className="text-gov-gold mt-1" />
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date of Registry</p>
                        <p className="font-mono text-md font-bold text-gov-blue tracking-wider">AUG 26, 2026</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Non-printable UI Actions */}
                <div className="absolute top-4 right-4 z-50 print:hidden">
                  <button onClick={() => setShowCertificateModal(false)} className="bg-black/50 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold transition-colors">✕</button>
                </div>
                
                <div className="mt-4 flex justify-center bg-gray-50 p-4 border border-gray-200 print:hidden">
                  <button 
                    onClick={() => {
                      setTimeout(() => {
                        window.print();
                      }, 100);
                    }}
                    className="bg-gov-blue text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#081729] flex items-center gap-2 shadow-md transition-all"
                  >
                    <Download size={16} /> Download PDF
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Report Bio-Piracy Success Modal */}
          {showReportModal && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
              <div className="bg-white max-w-md w-full p-8 shadow-2xl relative border-t-4 border-red-600">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <ShieldAlert className="text-red-600" size={32} />
                  </div>
                  <h2 className="font-serif-official text-2xl font-bold text-gov-blue mb-2">Report Submitted</h2>
                  <p className="text-sm text-gray-600 mb-6">Your whistle-blower report has been securely transmitted to the Ministry of Ayush. A high-priority investigation has been initiated via the Collision Radar.</p>
                  <button 
                    onClick={() => {
                      setShowReportModal(false);
                      setActiveTab('overview');
                    }}
                    className="w-full bg-red-600 text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-red-700"
                  >
                    Return to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
