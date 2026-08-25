"use client"

import React, { useState } from 'react'
import { ShieldAlert, Fingerprint, Database, CheckSquare, XSquare, Link as LinkIcon, Network, AlertTriangle } from 'lucide-react'
import axios from 'axios'

export default function AdminDashboard() {
  const [isLocking, setIsLocking] = useState(false)
  const [blockchainResult, setBlockchainResult] = useState<any>(null)

  const handleBlockchainLock = async () => {
    setIsLocking(true)
    try {
      const mockClaimData = {
        title: "Turmeric Wound Healing Formulation",
        description: "A paste made of Curcuma longa mixed with clarified butter used for rapid healing of deep cuts.",
        verified_by: "Ministry of Ayush",
        timestamp: new Date().toISOString()
      }
      
      const response = await axios.post('http://localhost:8000/api/v1/anchor', {
        claim_data: mockClaimData
      })
      
      setBlockchainResult(response.data)
    } catch (error) {
      console.error("Blockchain error:", error)
      alert("Failed to anchor to blockchain.")
    } finally {
      setIsLocking(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 text-gov-text font-sans flex flex-col">
      
      {/* HEADER: War Room Vibe */}
      <header className="bg-gray-900 text-white px-8 h-16 flex items-center justify-between shadow-xl border-b-2 border-red-900">
        <div className="flex items-center gap-3">
          <Fingerprint size={24} className="text-red-500" />
          <h1 className="font-serif-official font-bold tracking-widest uppercase text-sm text-red-100">
            Ministry War Room
          </h1>
        </div>
        <div className="flex items-center gap-6 text-xs font-bold tracking-widest uppercase">
          <div className="flex items-center gap-2 text-green-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Blockchain: Synced
          </div>
          <span className="text-gray-400">|</span>
          <span className="text-red-300">Admin: admin@rootclaim.gov.in</span>
          <button className="hover:text-red-400 transition-colors border-l border-white/20 pl-6">Logout</button>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] w-full mx-auto px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Pending Queue */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="bg-white border border-gray-200 shadow-sm flex-1 flex flex-col">
            <div className="bg-gray-900 px-6 py-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="font-serif-official font-bold text-white text-sm tracking-widest uppercase flex items-center gap-2">
                <Database size={16} className="text-red-500"/> Pending Verification
              </h3>
              <span className="bg-red-900 text-red-100 px-2 py-0.5 rounded text-[10px] font-bold">12 IN QUEUE</span>
            </div>
            <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
              
              {/* Queue Item (Active) */}
              <div className="p-4 bg-red-50 border-l-4 border-red-500 cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs font-bold text-red-700">TK-2026-9081</span>
                  <span className="text-[9px] font-bold text-gray-500 uppercase">22 Aug 2026</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm mb-1">Turmeric Wound Healing Formulation</h4>
                <p className="text-xs text-gray-500 line-clamp-2">A paste made of Curcuma longa mixed with clarified butter used for rapid healing of deep cuts.</p>
              </div>

              {/* Queue Item (Idle) */}
              <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs font-bold text-gray-500">TK-2026-9082</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">23 Aug 2026</span>
                </div>
                <h4 className="font-bold text-gray-700 text-sm mb-1">Ashwagandha Sleep Aid Decoction</h4>
                <p className="text-xs text-gray-400 line-clamp-2">Root extraction process using milk reduction to treat severe insomnia.</p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Action & Radar */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          
          {/* Claim Details */}
          <div className="bg-white border border-gray-200 shadow-sm p-8">
            <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
              <div>
                <h2 className="text-2xl font-serif-official font-bold text-gray-900 mb-2">Turmeric Wound Healing Formulation</h2>
                <p className="text-xs font-mono text-gray-500">Citizen ID: UID-992-881-22A &bull; Date: 22 Aug 2026</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Formulation Details</h4>
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 border border-gray-100 rounded">
                A paste made of Curcuma longa mixed with clarified butter used for rapid healing of deep cuts. 
                Documented in historical Ayurvedic texts of the Kerala region, passed down through generations.
              </p>
            </div>

            {/* AI COLLISION RADAR (The core tech) */}
            <div className="bg-red-50 border border-red-100 rounded p-6 mb-8 relative overflow-hidden">
              <div className="absolute right-0 top-0 text-red-500/10 pointer-events-none">
                <Network size={160} />
              </div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-red-800 mb-4 flex items-center gap-2">
                <ShieldAlert size={16} /> AI Collision Radar Analysis
              </h4>
              
              <div className="bg-white p-4 border border-red-100 rounded mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-gray-900">USPTO Database Match</span>
                  <span className="text-sm font-black text-red-600">82% SIMILARITY</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                  <div className="bg-red-500 h-1.5 rounded-full" style={{width: '82%'}}></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  <span className="font-bold">Flag:</span> US Patent #5,401,504 (Use of turmeric in wound healing). Note: This patent was historically revoked due to CSIR intervention, but is flagged as prior art.
                </p>
              </div>
            </div>

            {/* Verification Actions */}
            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Ministry Actions</h4>
              <div className="flex gap-4">
                <button className="flex-1 bg-white border-2 border-red-600 text-red-700 px-6 py-4 font-bold uppercase tracking-widest text-xs hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                  <XSquare size={18} /> Reject Claim
                </button>
                <button className="flex-1 bg-green-700 text-white px-6 py-4 font-bold uppercase tracking-widest text-xs hover:bg-green-800 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                  <CheckSquare size={18} /> Verify Claim
                </button>
              </div>
            </div>

          </div>

          {/* BLOCKCHAIN VAULT (Nuclear Button) */}
          <div className="bg-gray-900 border border-gray-800 shadow-xl p-8 text-white relative overflow-hidden group">
            <div className="absolute right-0 top-0 text-white/5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
              <LinkIcon size={200} />
            </div>
            <div className="relative z-10">
              <h3 className="text-lg font-serif-official font-bold mb-2 flex items-center gap-2 text-yellow-500">
                <AlertTriangle size={20}/> Cryptographic Lock
              </h3>
              <p className="text-sm text-gray-400 mb-6 max-w-xl">
                Warning: Anchoring this claim to the Polygon blockchain is an irreversible action. It will permanently establish this formulation as the sovereign IP of the Government of India.
              </p>
              <button 
                onClick={handleBlockchainLock}
                disabled={isLocking || blockchainResult}
                className={`px-8 py-4 font-black uppercase tracking-widest text-sm transition-colors shadow-[0_0_20px_rgba(234,179,8,0.3)] ${
                  blockchainResult 
                    ? 'bg-green-500 text-white cursor-default' 
                    : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 disabled:opacity-50'
                }`}
              >
                {isLocking ? 'Anchoring to Polygon...' : blockchainResult ? 'Successfully Anchored' : 'Lock on Blockchain Now'}
              </button>

              {blockchainResult && (
                <div className="mt-6 p-4 bg-gray-800 border border-gray-700 rounded text-xs font-mono">
                  <p className="text-green-400 mb-2">✅ Immutable Proof Generated</p>
                  <p className="mb-1"><span className="text-gray-500">Tx Hash:</span> <span className="text-blue-400 break-all">{blockchainResult.polygon_tx_hash}</span></p>
                  <p className="mb-1"><span className="text-gray-500">Block:</span> {blockchainResult.block_number}</p>
                  <p><span className="text-gray-500">SHA-256 Claim Hash:</span> <span className="text-yellow-400 break-all">{blockchainResult.sha256_hash}</span></p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
