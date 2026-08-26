"use client"
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Globe, 
  AlertTriangle, 
  Database,
  FileText,
  Search,
  CheckCircle,
  XCircle,
  Map,
  Eye,
  LogOut,
  Network,
  Link as LinkIcon,
  CheckSquare,
  XSquare,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('command_center');
  const [liveNodes, setLiveNodes] = useState(1284);
  const [threatCount, setThreatCount] = useState(14);
  const [claimsSecured, setClaimsSecured] = useState(84725);
  
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);
  
  const handleBroadcast = () => {
    if(!broadcastMessage.trim()) return;
    
    // Save to array
    const existing = localStorage.getItem('ministry_alerts_array');
    let alerts = [];
    if(existing) {
      try { alerts = JSON.parse(existing); } catch(e){}
    }
    alerts.unshift({
      msg: broadcastMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    localStorage.setItem('ministry_alerts_array', JSON.stringify(alerts));
    
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 3000);
    setBroadcastMessage('');
  };
  
  const [isLocking, setIsLocking] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blockchainResult, setBlockchainResult] = useState<any>(null);
  
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

  // Real-time simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveNodes(prev => prev + Math.floor(Math.random() * 3) - 1);
      if (Math.random() > 0.8) setClaimsSecured(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex overflow-hidden">
      <Head>
        <title>Minister Command Center | Root-Claim</title>
      </Head>

      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shrink-0 z-20 shadow-xl relative">
        <div className="h-24 flex items-center gap-4 px-8 border-b border-gray-200 bg-gov-blue">
          <div className="w-12 h-12 rounded-full border-2 border-gov-gold flex flex-col items-center justify-center bg-white shrink-0 shadow-md">
            <span className="text-[10px] font-serif font-bold text-gov-blue leading-none">सत्यमेव</span>
            <span className="text-[10px] font-serif font-bold text-gov-blue leading-none mt-0.5">जयते</span>
          </div>
          <div>
            <h1 className="font-serif-official font-bold text-white tracking-widest uppercase text-sm leading-tight">Ministry of Ayush</h1>
            <p className="text-[9px] uppercase tracking-widest text-gov-gold mt-1">Central Command Center</p>
          </div>
        </div>

        <nav className="flex-1 py-8 flex flex-col gap-2 px-4 relative z-10 bg-gray-50">
          <button 
            onClick={() => setActiveTab('command_center')}
            className={`flex items-center gap-4 px-6 py-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'command_center' ? 'bg-gov-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-200 border border-transparent'}`}
          >
            <Activity size={18} /> Command Center
          </button>
          
          <button 
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-4 px-6 py-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'radar' ? 'bg-gov-blue text-white shadow-md' : 'text-gray-600 hover:bg-gray-200 border border-transparent'}`}
          >
            <Globe size={18} /> Global Threat Radar
          </button>
          
          <button 
            onClick={() => setActiveTab('whistleblower')}
            className={`flex items-center gap-4 px-6 py-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'whistleblower' ? 'bg-red-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-200 border border-transparent'}`}
          >
            <AlertTriangle size={18} /> Threat Reports <span className="bg-red-100 text-red-700 border border-red-200 text-[9px] px-2 py-0.5 rounded-full ml-auto animate-pulse">3 NEW</span>
          </button>

          <button 
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-4 px-6 py-4 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'database' ? 'bg-gov-gold text-gov-blue shadow-md' : 'text-gray-600 hover:bg-gray-200 border border-transparent'}`}
          >
            <Database size={18} /> TKDL Master Queue
          </button>
        </nav>

        <div className="p-6 border-t border-gray-200 bg-white relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gov-blue flex items-center justify-center text-white font-bold border-2 border-gov-gold shadow-sm">M</div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Authorized User</p>
              <p className="text-sm font-bold text-gov-blue">Hon. Minister Desk</p>
            </div>
          </div>
          <Link href="/">
            <button className="w-full bg-white text-gray-600 border border-gray-300 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-gray-50 hover:text-red-600 transition-colors flex justify-center items-center gap-2">
              <LogOut size={14} /> Secure Logout
            </button>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative z-0 bg-gray-50 overflow-y-auto">
        
        <header className="h-24 px-10 flex items-center justify-between border-b border-gray-200 bg-white shadow-sm sticky top-0 z-20 shrink-0">
          <div>
            <h2 className="text-2xl font-serif-official font-bold text-gov-blue flex items-center gap-3">
              {activeTab === 'command_center' && <><Activity className="text-gov-gold" /> Ministry Command Center</>}
              {activeTab === 'radar' && <><Globe className="text-gov-gold" /> Global Patent Collision Radar</>}
              {activeTab === 'whistleblower' && <><AlertTriangle className="text-red-600" /> Active Threat Intelligence</>}
              {activeTab === 'database' && <><Database className="text-gov-blue" /> TKDL Master Database</>}
            </h2>
            <p className="text-[10px] text-gray-500 font-mono mt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              SYSTEM LIVE &bull; LAST SYNC: {new Date().toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-white border border-gray-200 rounded p-3 px-6 text-right shadow-sm">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Network Nodes</p>
              <p className="text-xl font-mono text-gov-blue font-bold">{liveNodes.toLocaleString()}</p>
            </div>
            <div className="bg-white border border-gray-200 rounded p-3 px-6 text-right shadow-sm">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1 font-bold">Secured Claims</p>
              <p className="text-xl font-mono text-green-600 font-bold">{claimsSecured.toLocaleString()}</p>
            </div>
          </div>
        </header>

        <div className="p-10 relative z-10">
          
          {/* TAB: COMMAND CENTER */}
          {activeTab === 'command_center' && (
            <div className="space-y-6 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white border-t-4 border-gov-blue p-6 rounded shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Global Database Size</p>
                  <h3 className="text-4xl font-serif-official font-bold text-gov-blue">2,005 <span className="text-sm font-sans text-gray-500">patents</span></h3>
                </div>
                <div className="bg-white border-t-4 border-red-600 p-6 rounded shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Active Bio-Piracy Threats</p>
                  <h3 className="text-4xl font-serif-official font-bold text-red-700">14</h3>
                </div>
                <div className="bg-white border-t-4 border-green-600 p-6 rounded shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">System Health</p>
                  <h3 className="text-4xl font-serif-official font-bold text-green-700">99.9%</h3>
                </div>
              </div>

              {/* Broadcast System */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-8 shadow-sm relative">
                <h3 className="text-sm font-bold text-red-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} /> Ministry Emergency Broadcast System
                </h3>
                <p className="text-xs text-red-600 mb-6">Push instant alerts to all active Citizen Dashboards.</p>
                
                {broadcastSuccess && (
                  <div className="absolute top-8 right-8 bg-green-100 text-green-800 px-4 py-2 rounded text-xs font-bold flex items-center gap-2 animate-pulse border border-green-300 shadow-sm">
                    <CheckCircle size={14} /> Broadcast Sent Successfully!
                  </div>
                )}
                
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="E.g., WARNING: High volume of bio-piracy attempts detected in Ayurveda section..." 
                    className="flex-1 bg-white border border-red-200 p-4 rounded text-sm outline-none focus:ring-2 focus:ring-red-500 shadow-inner"
                  />
                  <button onClick={handleBroadcast} className="bg-red-600 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs rounded shadow-md hover:bg-red-700 transition-colors flex items-center gap-2 shrink-0">
                    <Activity size={16} /> Broadcast Now
                  </button>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('ministry_alerts_array');
                      alert('All broadcasts cleared.');
                    }} 
                    className="bg-white text-red-600 border border-red-200 px-4 py-4 font-bold uppercase tracking-widest text-xs rounded hover:bg-red-50 transition-colors shrink-0"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: RADAR */}
          {activeTab === 'radar' && (
            <div className="space-y-6 flex flex-col">
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white border border-gray-200 rounded-xl p-8 shadow-sm relative overflow-hidden h-[450px]">
                  <h3 className="text-sm font-bold text-gov-blue uppercase tracking-widest mb-6 relative z-10 flex items-center justify-between border-b border-gray-100 pb-4">
                    Live Global Monitoring
                    <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-[10px]">VECTOR SEARCH ACTIVE</span>
                  </h3>
                  <div className="flex items-center justify-center h-full relative z-10 pb-12">
                    {/* Simulated Map / Radar visualization in Light Mode */}
                    <div className="relative w-80 h-80 rounded-full border border-blue-100 flex items-center justify-center bg-blue-50/30 shadow-inner">
                      <div className="absolute inset-0 rounded-full border border-blue-200 animate-ping" style={{ animationDuration: '4s' }}></div>
                      <div className="absolute w-56 h-56 rounded-full border border-blue-200"></div>
                      <div className="absolute w-32 h-32 rounded-full border border-gov-gold/40 bg-white flex items-center justify-center shadow-lg">
                        <Globe size={48} className="text-gov-blue animate-spin-slow" style={{ animationDuration: '20s' }} />
                      </div>
                      
                      {/* Threat Dots */}
                      <div className="absolute top-16 left-16 w-3 h-3 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse">
                        <span className="absolute top-4 left-4 text-[10px] font-mono font-bold text-red-600 w-32 bg-white px-2 py-1 rounded shadow border border-red-100">EPO MATCH: 98%</span>
                      </div>
                      <div className="absolute bottom-20 right-10 w-2 h-2 bg-yellow-500 rounded-full shadow-[0_0_5px_rgba(234,179,8,0.5)]">
                        <span className="absolute top-4 left-2 text-[9px] font-mono font-bold text-yellow-700 w-24 bg-white px-2 py-1 rounded shadow border border-yellow-100">USPTO: 74%</span>
                      </div>
                      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm flex flex-col">
                  <h3 className="text-sm font-bold text-gov-blue uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                    <AlertTriangle size={16} className="text-red-500"/> Recent Collision Alerts
                  </h3>
                  <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    
                    <div className="bg-red-50 border border-red-100 p-4 rounded hover:bg-red-100/50 transition-colors cursor-pointer shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] font-mono font-bold text-red-700">EP-0436257 (EPO)</p>
                        <span className="bg-red-600 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">98% SIMILARITY</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 leading-snug mb-1">Method for controlling fungi on plants</p>
                      <p className="text-[10px] text-gray-600">Matched against TKDL: Neem (Azadirachta indica) traditional uses.</p>
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded hover:bg-yellow-100/50 transition-colors cursor-pointer shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-[10px] font-mono font-bold text-yellow-700">US-884612 (USPTO)</p>
                        <span className="bg-yellow-500 text-white text-[9px] px-2 py-0.5 rounded-full font-bold">74% SIMILARITY</span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 leading-snug mb-1">Adaptogenic herbal blend for anxiety</p>
                      <p className="text-[10px] text-gray-600">Matched against TKDL: Ashwagandha (Withania somnifera).</p>
                    </div>

                  </div>
                  <button className="w-full mt-4 bg-white hover:bg-gray-50 text-gov-blue text-[10px] font-bold uppercase tracking-widest py-3 border border-gray-200 rounded transition-colors shadow-sm">
                    View Full Logs
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: WHISTLEBLOWER THREATS */}
          {activeTab === 'whistleblower' && (
            <div className="space-y-6">
               <div className="bg-white border-t-4 border-red-600 rounded-xl p-8 shadow-sm">
                 <h3 className="text-sm font-bold text-red-700 uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                   <AlertTriangle size={16} /> Incoming Citizen Reports
                 </h3>
                 
                 <div className="overflow-x-auto">
                   <table className="w-full text-left">
                     <thead>
                       <tr className="border-b border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-50">
                         <th className="py-4 pl-4 rounded-tl-lg">Citizen ID</th>
                         <th className="py-4">Target Patent/URL</th>
                         <th className="py-4">Report Context snippet</th>
                         <th className="py-4">Risk Level</th>
                         <th className="py-4 rounded-tr-lg">Action</th>
                       </tr>
                     </thead>
                     <tbody className="text-sm">
                       <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                         <td className="py-4 pl-4 font-mono text-[10px] text-gray-600">UID-992-881</td>
                         <td className="py-4 font-bold text-gray-900 text-sm">US Patent #5,401,504</td>
                         <td className="py-4 text-gray-600 text-xs truncate max-w-[250px]">Turmeric is being used for wound healing in this patent which is a known Indian traditional...</td>
                         <td className="py-4">
                           <span className="bg-red-100 text-red-700 border border-red-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest animate-pulse inline-block">Critical</span>
                         </td>
                         <td className="py-4">
                           <button className="bg-white hover:bg-gray-50 text-gov-blue border border-gray-300 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-sm">
                             <Eye size={12} /> Review
                           </button>
                         </td>
                       </tr>
                       <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                         <td className="py-4 pl-4 font-mono text-[10px] text-gray-600">UID-112-409</td>
                         <td className="py-4 font-bold text-gray-900 text-sm">www.biocorp.eu/neem-extract</td>
                         <td className="py-4 text-gray-600 text-xs truncate max-w-[250px]">European company selling neem as their own invention for pesticides...</td>
                         <td className="py-4">
                           <span className="bg-yellow-100 text-yellow-800 border border-yellow-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest inline-block">High</span>
                         </td>
                         <td className="py-4">
                           <button className="bg-white hover:bg-gray-50 text-gov-blue border border-gray-300 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-sm">
                             <Eye size={12} /> Review
                           </button>
                         </td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>
            </div>
          )}

          {/* TAB: DATABASE (Old view integrated here) */}
          {activeTab === 'database' && (
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* LEFT COLUMN: Pending Queue */}
              <div className="lg:w-1/3 flex flex-col gap-6">
                <div className="bg-white border-t-4 border-gov-gold rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-serif-official font-bold text-gov-blue text-xs tracking-widest uppercase flex items-center gap-2">
                      <Database size={14} className="text-gov-gold"/> Pending Verification
                    </h3>
                    <span className="bg-gov-gold text-white px-2 py-0.5 rounded text-[9px] font-bold shadow-sm">12 IN QUEUE</span>
                  </div>
                  <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
                    
                    {/* Queue Item (Active) */}
                    <div className="p-4 bg-blue-50/50 border-l-4 border-gov-blue cursor-pointer">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-[10px] font-bold text-gov-blue">TK-2026-9081</span>
                        <span className="text-[9px] font-bold text-gray-500 uppercase">22 Aug 2026</span>
                      </div>
                      <h4 className="font-bold text-gray-900 text-sm mb-1 leading-snug">Turmeric Wound Healing Formulation</h4>
                      <p className="text-xs text-gray-600 line-clamp-2">A paste made of Curcuma longa mixed with clarified butter used for rapid healing of deep cuts.</p>
                    </div>

                    {/* Queue Item (Idle) */}
                    <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors border-l-4 border-transparent">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-[10px] font-bold text-gray-400">TK-2026-9082</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">23 Aug 2026</span>
                      </div>
                      <h4 className="font-bold text-gray-600 text-sm mb-1 leading-snug">Ashwagandha Sleep Aid Decoction</h4>
                      <p className="text-xs text-gray-500 line-clamp-2">Root extraction process using milk reduction to treat severe insomnia.</p>
                    </div>

                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Action & Radar */}
              <div className="lg:w-2/3 flex flex-col gap-6">
                
                {/* Claim Details */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
                  <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                    <div>
                      <h2 className="text-2xl font-serif-official font-bold text-gray-900 mb-2">Turmeric Wound Healing Formulation</h2>
                      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Citizen ID: UID-992-881-22A &bull; Date: 22 Aug 2026</p>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Formulation Details</h4>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 border border-gray-200 rounded shadow-inner">
                      A paste made of Curcuma longa mixed with clarified butter used for rapid healing of deep cuts. 
                      Documented in historical Ayurvedic texts of the Kerala region, passed down through generations.
                    </p>
                  </div>

                  {/* AI COLLISION RADAR (The core tech) */}
                  <div className="bg-red-50 border border-red-100 rounded-lg p-6 mb-8 relative overflow-hidden">
                    <div className="absolute right-0 top-0 text-red-500/10 pointer-events-none">
                      <Network size={160} />
                    </div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-red-700 mb-4 flex items-center gap-2">
                      <ShieldAlert size={14} /> AI Collision Radar Analysis
                    </h4>
                    
                    <div className="bg-white p-4 border border-red-200 rounded mb-4 shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gray-700">USPTO Database Match</span>
                        <span className="text-xs font-black text-red-600">82% SIMILARITY</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                        <div className="bg-red-500 h-2 rounded-full shadow-[0_0_5px_rgba(239,68,68,0.5)]" style={{width: '82%'}}></div>
                      </div>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        <span className="font-bold text-gray-900">Flag:</span> US Patent #5,401,504 (Use of turmeric in wound healing). Note: This patent was historically revoked due to CSIR intervention, but is flagged as prior art.
                      </p>
                    </div>
                  </div>

                  {/* Verification Actions */}
                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Ministry Actions</h4>
                    <div className="flex gap-4">
                      <button onClick={() => alert('Claim Rejected. Notifying citizen UID-992-881.')} className="flex-1 bg-white border-2 border-red-200 text-red-600 px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-red-50 hover:border-red-300 transition-colors flex items-center justify-center gap-2 rounded">
                        <XSquare size={16} /> Reject Claim
                      </button>
                      <button onClick={() => alert('Claim Verified successfully. Awaiting Blockchain Anchoring.')} className="flex-1 bg-green-600 border border-transparent text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-green-700 transition-colors flex items-center justify-center gap-2 rounded shadow-md">
                        <CheckSquare size={16} /> Verify Claim
                      </button>
                    </div>
                  </div>

                </div>

                {/* BLOCKCHAIN VAULT (Nuclear Button) */}
                <div className="bg-white border-2 border-gov-gold shadow-sm rounded-xl p-8 relative overflow-hidden group">
                  <div className="absolute right-0 top-0 text-gov-gold/10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                    <LinkIcon size={200} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-lg font-serif-official font-bold mb-2 flex items-center gap-2 text-gov-blue">
                      <AlertTriangle size={18} className="text-gov-gold"/> Cryptographic Lock
                    </h3>
                    <p className="text-xs text-gray-600 mb-6 max-w-xl leading-relaxed">
                      Warning: Anchoring this claim to the Polygon blockchain is an irreversible action. It will permanently establish this formulation as the sovereign IP of the Government of India.
                    </p>
                    <button 
                      onClick={handleBlockchainLock}
                      disabled={isLocking || blockchainResult}
                      className={`px-8 py-3 rounded font-black uppercase tracking-widest text-xs transition-all ${
                        blockchainResult 
                          ? 'bg-green-50 text-green-700 border border-green-200 cursor-default shadow-sm' 
                          : 'bg-gov-gold text-white hover:bg-yellow-600 shadow-md hover:shadow-lg disabled:opacity-50'
                      }`}
                    >
                      {isLocking ? 'Anchoring to Polygon...' : blockchainResult ? 'Successfully Anchored' : 'Lock on Blockchain Now'}
                    </button>

                    {blockchainResult && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-[10px] font-mono">
                        <p className="text-green-700 mb-2 font-bold text-xs flex items-center gap-2"><CheckCircle size={14}/> Immutable Proof Generated</p>
                        <p className="mb-1"><span className="text-gray-500">Tx Hash:</span> <span className="text-blue-600 break-all">{blockchainResult.polygon_tx_hash}</span></p>
                        <p className="mb-1"><span className="text-gray-500">Block:</span> {blockchainResult.block_number}</p>
                        <p><span className="text-gray-500">SHA-256 Claim Hash:</span> <span className="text-gray-800 font-bold break-all">{blockchainResult.sha256_hash}</span></p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
