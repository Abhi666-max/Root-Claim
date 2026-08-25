"use client"

import React, { useState } from 'react'
import { 
  ShieldCheck, User, Search, Activity, Download, 
  ChevronRight, CheckCircle, Clock, Home, FileText, 
  AlertTriangle, UploadCloud, FileSignature, 
  Sparkles, ShieldAlert, Cpu, MessageSquare, Send, Link as LinkIcon
} from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'

export default function CitizenDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  
  // State for AI Smart Draft
  const [rawText, setRawText] = useState('')
  const [formattedClaim, setFormattedClaim] = useState('')
  const [isDrafting, setIsDrafting] = useState(false)
  
  // State for Radar Pre-Check
  const [radarResult, setRadarResult] = useState<any>(null)
  const [isCheckingRadar, setIsCheckingRadar] = useState(false)

  // State for OCR Digitizer
  const [ocrResult, setOcrResult] = useState<any>(null)
  const [isUploading, setIsUploading] = useState(false)

  // State for IP-SAKTI RAG Chatbot
  const [chatInput, setChatInput] = useState('')
  const [chatHistory, setChatHistory] = useState<{role: 'user'|'bot', content: string}[]>([
    {role: 'bot', content: 'Namaste! I am IP-SAKTI Sahayak (A Multilingual RAG-based AI Assistant). Ask me any question regarding Indian Intellectual Property Laws, Biopiracy, or Traditional Knowledge.'}
  ])
  const [isChatting, setIsChatting] = useState(false)

  // API Call: Feature 2 - AI Smart Draft
  const handleAiEnhance = async () => {
    if (!rawText) return;
    setIsDrafting(true);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/draft', { raw_text: rawText });
      setFormattedClaim(response.data.formatted_claim);
    } catch (error) {
      console.error("AI Draft Error:", error);
      alert("Failed to connect to AI Engine.");
    } finally {
      setIsDrafting(false);
    }
  }

  // API Call: Feature 3 - Collision Radar Pre-Check
  const handleRadarCheck = async () => {
    const textToCheck = formattedClaim || rawText;
    if (!textToCheck) {
      alert("Please generate a draft or enter text first.");
      return;
    }
    setIsCheckingRadar(true);
    try {
      const response = await axios.post('http://localhost:8000/api/v1/radar', { claim_text: textToCheck });
      setRadarResult(response.data);
    } catch (error) {
      console.error("Radar Error:", error);
      alert("Failed to run collision radar.");
    } finally {
      setIsCheckingRadar(false);
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
      alert("Failed to process image. Make sure backend is running and file is an image.");
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
      const response = await axios.post('http://localhost:8000/api/v1/ip-sakti', { query: userMsg });
      setChatHistory(prev => [...prev, { role: 'bot', content: response.data.reply }]);
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
      <aside className="w-64 bg-gov-blue text-white flex flex-col fixed h-full z-20 shadow-xl">
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
            <p className="text-sm font-bold text-white flex items-center gap-2"><User size={14}/> UID-992-881</p>
          </div>
          <Link href="/">
            <button className="w-full text-left flex items-center gap-3 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
              Logout &rarr;
            </button>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-10 sticky top-0 z-10 shadow-sm">
          <h2 className="text-xl font-serif-official font-bold text-gov-blue">
            {activeTab === 'overview' && 'Dashboard Overview'}
            {activeTab === 'submit' && 'Submit Traditional Knowledge'}
            {activeTab === 'ip-sakti' && 'IP-SAKTI Sahayak (RAG AI Assistant)'}
            {activeTab === 'vault' && 'My Secure Digital Vault'}
            {activeTab === 'whistleblower' && 'Whistleblower: Report Bio-Piracy'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-green-50 text-green-700 px-3 py-1.5 rounded-full border border-green-200">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Network: Secure
            </div>
          </div>
        </header>

        {/* Dynamic Content Body */}
        <div className="p-10 flex-1 bg-gray-50">
          
          {/* ====================================================== */}
          {/* TAB: OVERVIEW */}
          {/* ====================================================== */}
          {activeTab === 'overview' && (
            <div className="max-w-6xl">
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 border-t-4 border-gov-blue shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Total Claims Submitted</p>
                  <h3 className="text-4xl font-serif-official font-bold text-gov-blue">02</h3>
                </div>
                <div className="bg-white p-6 border-t-4 border-green-600 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Blockchain Verified</p>
                  <h3 className="text-4xl font-serif-official font-bold text-green-700">01</h3>
                </div>
                <div className="bg-white p-6 border-t-4 border-yellow-500 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Knowledge Digitized</p>
                  <h3 className="text-4xl font-serif-official font-bold text-yellow-600">4.2<span className="text-sm">TB</span></h3>
                </div>
                <div className="bg-white p-6 border-t-4 border-red-600 shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Bio-Piracy Blocked</p>
                  <h3 className="text-4xl font-serif-official font-bold text-red-700">14</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                {/* System Status / Network */}
                <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm p-8">
                  <h3 className="font-serif-official font-bold text-xl text-gov-blue mb-6 border-b border-gray-100 pb-4">Digital Ecosystem Status</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="text-gov-gold" />
                        <div>
                          <p className="font-bold text-sm text-gray-800">IP-SAKTI RAG Chatbot</p>
                          <p className="text-xs text-gray-500">Connected to Ministry Legal Database</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">Online</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <Cpu className="text-gov-blue" />
                        <div>
                          <p className="font-bold text-sm text-gray-800">AI Collision Radar</p>
                          <p className="text-xs text-gray-500">Scanning USPTO, EPO, and TKDL Databases</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">Active</span>
                    </div>

                    <div className="flex justify-between items-center p-4 bg-gray-50 border border-gray-100">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="text-purple-600" />
                        <div>
                          <p className="font-bold text-sm text-gray-800">Polygon Blockchain Vault</p>
                          <p className="text-xs text-gray-500">Cryptographic Anchoring System</p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">Synced</span>
                    </div>
                  </div>
                </div>

                {/* Notifications / Directives */}
                <div className="bg-white border border-gray-200 shadow-sm p-8">
                  <h3 className="font-serif-official font-bold text-xl text-gov-blue mb-6 border-b border-gray-100 pb-4 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-yellow-500"/> Ministry Directives
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Today, 09:00 AM</p>
                      <p className="text-sm text-gray-700 font-bold leading-snug">New Patent Guidelines Released for Ayurvedic Extracts</p>
                      <p className="text-xs text-gray-500 mt-1">Check the IP-SAKTI Chatbot for detailed summaries.</p>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Yesterday</p>
                      <p className="text-sm text-gray-700 font-bold leading-snug">Blockchain Node Upgrade Complete</p>
                      <p className="text-xs text-gray-500 mt-1">All digital vault certificates are now instantly verifiable.</p>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">21 Aug 2026</p>
                      <p className="text-sm text-red-600 font-bold leading-snug flex items-center gap-1"><ShieldAlert size={14}/> Bio-Piracy Alert</p>
                      <p className="text-xs text-gray-500 mt-1">High volume of fake turmeric patents detected from EU regions.</p>
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
                    <div className="bg-gov-blue/5 border-l-4 border-gov-gold p-4 mt-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-gov-blue mb-2 flex items-center gap-2">
                        <Sparkles size={14} className="text-gov-gold"/> AI Enhanced Legal Claim
                      </h4>
                      <div className="text-sm text-gray-700 whitespace-pre-wrap font-serif">
                        {formattedClaim}
                      </div>
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
                    <button 
                      onClick={handleRadarCheck}
                      disabled={isCheckingRadar}
                      className="flex-1 bg-white border border-gov-blue text-gov-blue py-4 text-xs font-bold tracking-widest uppercase hover:bg-gov-blue hover:text-white transition-colors flex justify-center items-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      <Cpu size={16} className={isCheckingRadar ? "animate-pulse" : ""} /> 
                      {isCheckingRadar ? 'Scanning Patents...' : 'Run Patent Pre-Check'}
                    </button>
                  </div>
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
                      
                      {/* Verified Claim */}
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-5 pl-8">
                          <p className="font-mono text-xs text-gray-500 mb-1">TK-2026-1142</p>
                          <p className="font-bold text-gov-blue">Neem Anti-Bacterial Extract</p>
                        </td>
                        <td className="p-5">
                          <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                            <CheckCircle size={12} /> Blockchain Anchored
                          </span>
                        </td>
                        <td className="p-5">
                          <p className="text-xs text-gray-600 line-clamp-2 italic">"Verified against ancient Ayurvedic texts. No prior patents found. Cleared for IP lock."</p>
                        </td>
                        <td className="p-5 pr-8 text-right">
                          <button 
                            onClick={() => {
                              alert("Generating securely signed Blockchain PDF Certificate...");
                              setTimeout(() => alert("Certificate Downloaded: TK-2026-1142_Verified.pdf"), 1000);
                            }}
                            className="bg-gov-gold text-white px-4 py-2 text-[10px] font-bold tracking-widest uppercase hover:bg-[#9a7b3b] transition-colors flex items-center gap-2 ml-auto shadow-sm"
                          >
                            <Download size={14} /> Official Certificate
                          </button>
                        </td>
                      </tr>

                      {/* Pending Claim */}
                      <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="p-5 pl-8">
                          <p className="font-mono text-xs text-gray-500 mb-1">TK-2026-9081</p>
                          <p className="font-bold text-gov-blue">Turmeric Wound Healing Paste</p>
                        </td>
                        <td className="p-5">
                          <span className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                            <Clock size={12} /> Pending Ministry Review
                          </span>
                        </td>
                        <td className="p-5">
                          <p className="text-xs text-gray-400">Awaiting official verification.</p>
                        </td>
                        <td className="p-5 pr-8 text-right">
                          <button disabled className="bg-gray-100 text-gray-400 border border-gray-200 px-4 py-2 text-[10px] font-bold tracking-widest uppercase cursor-not-allowed ml-auto">
                            Processing...
                          </button>
                        </td>
                      </tr>

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
              <div className="bg-white border-t-4 border-red-600 shadow-sm p-8">
                
                <div className="mb-8 border-b border-gray-100 pb-6">
                  <h3 className="font-serif-official font-bold text-2xl text-red-700 mb-2 flex items-center gap-3">
                    <ShieldAlert /> Report Bio-Piracy
                  </h3>
                  <p className="text-sm text-gray-600">If you have found a foreign entity or corporation attempting to patent or illegally sell traditional Indian medicine, report it here. The Ministry will investigate using the Collision Radar.</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gov-blue mb-2">Foreign Patent Number / Product URL</label>
                    <input type="text" className="w-full border border-gray-300 p-3 focus:outline-none focus:border-red-500 text-sm" placeholder="e.g., US Patent #5,401,504 or www.example.com/product" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gov-blue mb-2">Why is this Bio-Piracy? (Provide context)</label>
                    <textarea 
                      className="w-full border border-gray-300 p-3 focus:outline-none focus:border-red-500 text-sm h-32" 
                      placeholder="This formulation has been used in India for centuries as documented in..."
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button className="w-full bg-red-600 text-white py-4 text-xs font-bold tracking-widest uppercase hover:bg-red-700 transition-colors shadow-md flex justify-center items-center gap-2">
                      <AlertTriangle size={16} /> Submit Red-Flag Report to Ministry
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ====================================================== */}
          {/* TAB: IP-SAKTI SAHAYAK (RAG Chatbot) */}
          {/* ====================================================== */}
          {activeTab === 'ip-sakti' && (
            <div className="max-w-4xl h-[700px] flex flex-col bg-white border border-gray-200 shadow-sm">
              <div className="bg-gov-blue p-6 border-b border-gray-800 flex justify-between items-center">
                <div>
                  <h3 className="font-serif-official font-bold text-white text-xl flex items-center gap-2 mb-1">
                    <MessageSquare size={24} className="text-gov-gold"/> IP-SAKTI Sahayak
                  </h3>
                  <p className="text-xs text-gray-300">SIH26045: A Multilingual, RAG-based AI assistant for Intellectual Property</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/10 text-white px-3 py-1.5 rounded-full border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> RAG Online
                </div>
              </div>
              
              <div className="flex-1 p-6 overflow-y-auto bg-gray-50 flex flex-col gap-4">
                {chatHistory.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-4 text-sm rounded shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-gov-blue text-white rounded-br-none' 
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none font-serif'
                    }`}>
                      {msg.role === 'bot' && <strong className="block text-xs uppercase tracking-widest text-gov-gold mb-2">IP-SAKTI Assistant</strong>}
                      {msg.content}
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

        </div>
      </main>
    </div>
  )
}
