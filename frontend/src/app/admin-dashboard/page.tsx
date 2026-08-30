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
  ShieldAlert,
  RefreshCcw,
  Sparkles,
  Trash2
} from 'lucide-react';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('command_center');
  const [liveNodes, setLiveNodes] = useState(1284);
  const [threatCount, setThreatCount] = useState(14);
  const [claimsSecured, setClaimsSecured] = useState(84725);
  
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  // Real DB Claims
  const [claims, setClaims] = useState<unknown[]>([]);
  const [activeClaim, setActiveClaim] = useState<unknown>(null);
  
  const fetchClaims = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/claims');
      if(res.data.status === 'success') {
        setClaims(res.data.claims);
        if(res.data.claims.length > 0 && !activeClaim) {
          setActiveClaim(res.data.claims[0]);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleEnhanceBroadcast = async () => {
    if(!broadcastMessage.trim()) return;
    setIsEnhancing(true);
    try {
      const res = await axios.post('http://localhost:8000/api/v1/enhance-broadcast', {
        raw_message: broadcastMessage
      });
      setBroadcastMessage(res.data.enhanced_message);
    } catch (e) {
      console.error(e);
      setShowConfirmModal({isOpen: true, action: 'Error', meta: "Failed to connect to the Groq LLM API. Make sure the backend server is running and the GROQ_API_KEY is properly set in the backend .env file."});
    } finally {
      setIsEnhancing(false);
    }
  };
  
  const [ministryAlerts, setMinistryAlerts] = useState<{msg: string, time: string, id: number}[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [stats, setStats] = useState<unknown>({ total_patents: '...', active_threats: '...', system_health: '99.9' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reports, setReports] = useState<unknown[]>([]);

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/stats');
      setStats(res.data);
    } catch(e) {}
  };

  const fetchReports = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/reports');
      setReports(res.data.reports || []);
    } catch(e) {}
  };

  const [patents, setPatents] = useState<unknown[]>([]);
  const fetchPatents = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/v1/patents');
      setPatents(res.data.patents || []);
    } catch (e) {}
  };

  const handleBroadcast = () => {
    if(!broadcastMessage.trim()) return;
    const newAlert = {
      msg: broadcastMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: Date.now()
    };
    const updated = [newAlert, ...ministryAlerts];
    setMinistryAlerts(updated);
    localStorage.setItem('ministry_alerts_array', JSON.stringify(updated));
    setBroadcastSuccess(true);
    setTimeout(() => setBroadcastSuccess(false), 3000);
    setBroadcastMessage('');
  };

  const handleDeleteAlert = (id: number) => {
    const updated = ministryAlerts.filter(a => a.id !== id);
    setMinistryAlerts(updated);
    localStorage.setItem('ministry_alerts_array', JSON.stringify(updated));
    setShowConfirmModal({isOpen: false, action: null});
  };
  
  const [isLocking, setIsLocking] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [blockchainResult, setBlockchainResult] = useState<unknown>(null);
  
  const handleBlockchainLock = async () => {
    setIsLocking(true)
    try {
      const mockClaimData = {
        title: activeClaim ? activeClaim.title : "Unknown Formulation",
        description: activeClaim ? activeClaim.raw_description : "No description available",
        verified_by: "Ministry of Ayush",
        timestamp: new Date().toISOString()
      }
      
      const response = await axios.post('http://localhost:8000/api/v1/anchor', {
        claim_data: mockClaimData
      })
      
      if(activeClaim) {
        await axios.patch(`http://localhost:8000/api/v1/claims/${activeClaim.id}`, { 
          status: 'Blockchain Anchored',
          polygon_tx_hash: response.data.txHash 
        });
        fetchClaims();
      }
      
      setBlockchainResult(response.data)
    } catch (error) {
      console.error("Blockchain error:", error)
      setShowConfirmModal({isOpen: true, action: 'Error', meta: "Failed to anchor to the Polygon Blockchain. Please verify network connectivity."})
    } finally {
      setIsLocking(false)
    }
  }

  // Real-time simulation & Fetching
  useEffect(() => {
    // eslint-disable-next-line`n    setMounted(true);
    fetchClaims();
    fetchStats();
    fetchReports();
    fetchPatents();
    
    const interval = setInterval(() => {
      fetchClaims();
      fetchStats();
      fetchReports();
      fetchPatents();
      setLiveNodes(prev => prev + Math.floor(Math.random() * 3) - 1);
      if (Math.random() > 0.8) setClaimsSecured(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Modals state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [showConfirmModal, setShowConfirmModal] = useState<{isOpen: boolean, action: 'Reject' | 'Verify' | 'Lock' | 'DeleteAlert' | 'Error' | 'Broadcast' | 'ReviewReport' | null, meta?: unknown}>({isOpen: false, action: null});

  const handleStatusUpdate = async (status: string) => {
    if(!activeClaim) return;
    try {
      await axios.patch(`http://localhost:8000/api/v1/claims/${activeClaim.id}`, { status });
      fetchClaims(); // refresh
      setActiveClaim({...activeClaim, status}); // optimistic update
      setShowConfirmModal({isOpen: false, action: null});
    } catch (e) {
      setShowConfirmModal({isOpen: true, action: 'Error', meta: "Failed to securely update claim status. Please try again later."});
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-white to-slate-50 text-gray-900 font-sans flex overflow-hidden">
      <Head>
        <title>Minister Command Center | Root-Claim</title>
      </Head>

      {/* SIDEBAR */}
      <aside className="w-72 bg-[#f8f9fa] border-r border-slate-200 flex flex-col shrink-0 z-20 shadow-xl relative text-slate-700">
        <div className="h-24 flex items-center gap-4 px-8 border-b border-slate-200 bg-[#f8f9fa]">
          <div className="w-12 h-12 rounded-full border-2 border-gov-gold flex flex-col items-center justify-center bg-white shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <span className="text-[10px] font-serif font-bold text-gov-blue leading-none">सत्यमेव</span>
            <span className="text-[10px] font-serif font-bold text-gov-blue leading-none mt-0.5">जयते</span>
          </div>
          <div>
            <h1 className="font-serif-official font-bold text-gov-blue tracking-widest uppercase text-sm leading-tight">Ministry of Ayush</h1>
            <p className="text-[9px] uppercase tracking-widest text-gov-gold font-bold mt-1">Central Command Center</p>
          </div>
        </div>

        <nav className="flex-1 py-8 flex flex-col px-4 relative z-10 bg-[#f8f9fa]">
          <button 
            onClick={() => setActiveTab('command_center')}
            className={`flex items-center gap-4 px-6 py-4 rounded-r-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 mb-2 ${activeTab === 'command_center' ? 'bg-white text-gov-blue border-l-4 border-gov-blue shadow-sm' : 'text-slate-500 hover:text-gov-blue hover:bg-slate-200 border-l-4 border-transparent'}`}
          >
            <Activity size={18} /> Command Center
          </button>
          
          <button 
            onClick={() => setActiveTab('radar')}
            className={`flex items-center gap-4 px-6 py-4 rounded-r-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 mb-2 ${activeTab === 'radar' ? 'bg-white text-gov-blue border-l-4 border-gov-blue shadow-sm' : 'text-slate-500 hover:text-gov-blue hover:bg-slate-200 border-l-4 border-transparent'}`}
          >
            <Globe size={18} /> Global Threat Radar
          </button>
          
          <button 
            onClick={() => setActiveTab('whistleblower')}
            className={`flex items-center gap-4 px-6 py-4 rounded-r-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 mb-2 ${activeTab === 'whistleblower' ? 'bg-white text-red-600 border-l-4 border-red-600 shadow-sm' : 'text-slate-500 hover:text-red-600 hover:bg-slate-200 border-l-4 border-transparent'}`}
          >
            <AlertTriangle size={18} /> Threat Reports {reports.length > 0 && <span className="bg-red-100 text-red-600 border border-red-200 text-[9px] px-2 py-0.5 rounded-full ml-auto animate-pulse">{reports.length} NEW</span>}
          </button>

          <button 
            onClick={() => setActiveTab('queue')}
            className={`flex items-center gap-4 px-6 py-4 rounded-r-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 mb-2 ${activeTab === 'queue' ? 'bg-white text-gov-blue border-l-4 border-gov-blue shadow-sm' : 'text-slate-500 hover:text-gov-blue hover:bg-slate-200 border-l-4 border-transparent'}`}
          >
            <CheckSquare size={18} /> Citizen Submissions
          </button>

          <button 
            onClick={() => setActiveTab('database')}
            className={`flex items-center gap-4 px-6 py-4 rounded-r-lg text-xs font-bold uppercase tracking-widest transition-all duration-300 mb-2 ${activeTab === 'database' ? 'bg-white text-gov-blue border-l-4 border-gov-blue shadow-sm' : 'text-slate-500 hover:text-gov-blue hover:bg-slate-200 border-l-4 border-transparent'}`}
          >
            <Database size={18} /> TKDL Master DB
          </button>
        </nav>

        <div className="p-6 border-t border-slate-200 bg-[#f8f9fa] relative z-10">
          <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded shadow-sm border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-gov-blue flex items-center justify-center text-white font-bold border-2 border-gov-gold shadow-[0_0_10px_rgba(212,175,55,0.2)] shrink-0">M</div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Authorized User</p>
              <p className="text-sm font-bold text-gov-blue">Hon. Minister Desk</p>
            </div>
          </div>
          <Link href="/">
            <button className="w-full bg-white text-slate-500 border border-slate-200 py-3 rounded text-xs font-bold uppercase tracking-widest hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300 flex justify-center items-center gap-2">
              <LogOut size={14} /> Secure Logout
            </button>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col relative z-0 bg-transparent h-screen overflow-hidden">
        <div className="p-4 pl-0 relative z-10 w-full h-full flex">
          
          {/* TAB: COMMAND CENTER */}
          {activeTab === 'command_center' && (
            <div className="w-full h-full flex flex-col bg-white/80 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-gov-blue p-6 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="font-serif-official font-bold text-white text-xl flex items-center gap-2 mb-1">
                    <Activity size={24} className="text-gov-gold" /> Ministry Command Center
                  </h3>
                  <p className="text-xs text-blue-100 uppercase tracking-widest font-bold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    SYSTEM LIVE &bull; LAST SYNC: {mounted ? new Date().toLocaleTimeString() : '...'}
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="bg-[#07162b] border border-[#152e4d] rounded p-2 px-4 text-right shadow-sm">
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-0.5 font-bold">Network Nodes</p>
                    <p className="text-lg font-mono text-gov-gold font-bold">{stats.total_patents ? stats.total_patents.toLocaleString() : liveNodes.toLocaleString()}</p>
                  </div>
                  <div className="bg-[#07162b] border border-[#152e4d] rounded p-2 px-4 text-right shadow-sm">
                    <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-0.5 font-bold">Secured Claims</p>
                    <p className="text-lg font-mono text-green-400 font-bold">{claims.filter(c => c.status === 'Verified' || c.status === 'Blockchain Anchored').length.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto space-y-6 flex flex-col custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                
                {/* Stat Card 1 */}
                <div className="relative overflow-hidden bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-xl group">
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 text-gov-blue/5 transition-transform duration-500 group-hover:scale-110">
                    <Database size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Global TKDL Size</p>
                      <span className="w-8 h-8 rounded-full bg-gov-blue/10 flex items-center justify-center text-gov-blue"><Database size={14}/></span>
                    </div>
                    <div className="flex items-end gap-3">
                      <h3 className="text-4xl font-serif-official font-bold text-gov-blue tracking-tight">{stats.total_patents}</h3>
                      <p className="text-xs text-gray-500 mb-1 font-medium">patents indexed</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-green-600">
                      <span className="flex items-center gap-1"><Sparkles size={12}/> Auto-Sync Active</span>
                    </div>
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-800 p-6 rounded-xl shadow-lg shadow-red-900/20 text-white group">
                  <div className="absolute top-0 right-0 -mr-4 -mt-4 text-black/10 transition-transform duration-500 group-hover:rotate-12">
                    <AlertTriangle size={140} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-200">Active Bio-Piracy Threats</p>
                      <span className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center"><ShieldAlert size={14} className="text-red-100"/></span>
                    </div>
                    <div className="flex items-end gap-3">
                      <h3 className="text-5xl font-serif-official font-bold tracking-tight text-white">{stats.active_threats}</h3>
                      <p className="text-xs text-red-200 mb-1.5 font-medium">critical flags</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-red-500/30 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-red-200">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></span> Requires Action</span>
                    </div>
                  </div>
                </div>

                {/* Stat Card 3 */}
                <div className="relative overflow-hidden bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-white/60 shadow-xl group">
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 text-green-600/5 transition-transform duration-500 group-hover:scale-110">
                    <Activity size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">System Health</p>
                      <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600"><Activity size={14}/></span>
                    </div>
                    <div className="flex items-end gap-3">
                      <h3 className="text-4xl font-serif-official font-bold text-green-600 tracking-tight">{stats.system_health}%</h3>
                      <p className="text-xs text-gray-500 mb-1 font-medium">uptime</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <span>All Nodes Operational</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Broadcast System */}
              <div className="bg-white/80 backdrop-blur-md border-l-4 border-red-600 rounded-2xl p-8 shadow-xl relative">
                <h3 className="text-sm font-bold text-red-700 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} /> Ministry Emergency Broadcast System
                </h3>
                <p className="text-xs text-red-600 mb-6">Push instant alerts to all active Citizen Dashboards.</p>
                
                {broadcastSuccess && (
                  <div className="absolute top-8 right-8 bg-green-100 text-green-800 px-4 py-2 rounded text-xs font-bold flex items-center gap-2 animate-pulse border border-green-300 shadow-sm">
                    <CheckCircle size={14} /> Broadcast Sent Successfully!
                  </div>
                )}
                
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={broadcastMessage}
                      onChange={(e) => setBroadcastMessage(e.target.value)}
                      placeholder="E.g., WARNING: High volume of bio-piracy attempts detected in Ayurveda section..." 
                      className="flex-1 bg-white border border-red-200 p-4 rounded text-sm outline-none focus:ring-2 focus:ring-red-500 shadow-inner"
                    />
                    <button 
                      onClick={handleEnhanceBroadcast} 
                      disabled={isEnhancing}
                      className="bg-red-50 text-red-700 border border-red-200 px-6 py-4 font-bold uppercase tracking-widest text-xs rounded hover:bg-red-100 transition-colors flex items-center gap-2 shrink-0 shadow-sm disabled:opacity-50"
                    >
                      <Sparkles size={16} className={isEnhancing ? "animate-spin" : ""} /> {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
                    </button>
                    <button onClick={() => {if(broadcastMessage.trim()) setShowConfirmModal({isOpen: true, action: 'Broadcast'})}} className="bg-red-600 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs rounded shadow-md hover:bg-red-700 transition-colors flex items-center gap-2 shrink-0">
                      <Activity size={16} /> Broadcast Now
                    </button>
                  </div>
                  
                  {/* Active Broadcasts List */}
                  {ministryAlerts.length > 0 && (
                    <div className="mt-4 flex flex-col gap-2">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-2">Active Broadcasts on Citizen Dashboards</p>
                      {ministryAlerts.map((alert) => (
                        <div key={alert.id} className="bg-white border border-red-100 p-3 rounded flex justify-between items-center shadow-sm">
                          <div>
                            <span className="text-[9px] font-mono text-red-400 bg-red-50 px-2 py-0.5 rounded mr-3">{alert.time}</span>
                            <span className="text-sm font-medium text-red-800">{alert.msg}</span>
                          </div>
                          <button onClick={() => setShowConfirmModal({isOpen: true, action: 'DeleteAlert', meta: alert.id})} className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded transition-colors" title="Remove Alert">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              </div>
            </div>
          )}

          {/* TAB: RADAR */}
          {activeTab === 'radar' && (
            <div className="w-full h-full flex flex-col bg-white/80 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-gov-blue p-6 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="font-serif-official font-bold text-white text-xl flex items-center gap-2 mb-1">
                    <Globe size={24} className="text-gov-gold" /> Global Patent Collision Radar
                  </h3>
                  <p className="text-xs text-blue-100 uppercase tracking-widest font-bold">Real-time vector search and monitoring</p>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto space-y-6 flex flex-col custom-scrollbar">
              
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-xl relative overflow-hidden h-[450px]">
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
                      
                      {/* Threat Dots based on real claims */}
                      {claims.filter(c => c.collision_score > 0).slice(0, 3).map((claim, idx) => (
                        <div key={claim.id} className={`absolute w-3 h-3 ${claim.collision_score > 80 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)] animate-pulse' : 'bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.5)]'} rounded-full`}
                             style={{
                               top: `${20 + idx * 30}%`,
                               left: `${10 + idx * 40}%`
                             }}>
                          <span className={`absolute top-4 left-4 text-[10px] font-mono font-bold ${claim.collision_score > 80 ? 'text-red-600 border-red-100' : 'text-yellow-700 border-yellow-100'} whitespace-nowrap bg-white px-2 py-1 rounded shadow border`}>
                            TK-{claim.id.substring(0,6)}: {claim.collision_score}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-8 shadow-xl flex flex-col">
                  <h3 className="text-sm font-bold text-gov-blue uppercase tracking-widest mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
                    <AlertTriangle size={16} className="text-red-500"/> Recent Collision Alerts
                  </h3>
                  <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    
                    {claims.filter(c => c.collision_score > 0).slice(0, 5).map(claim => (
                      <div key={claim.id} className={`${claim.collision_score > 80 ? 'bg-red-50 border-red-100 hover:bg-red-100/50' : 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100/50'} border p-4 rounded transition-colors cursor-pointer shadow-sm`}>
                        <div className="flex justify-between items-start mb-2">
                          <p className={`text-[10px] font-mono font-bold ${claim.collision_score > 80 ? 'text-red-700' : 'text-yellow-700'}`}>TK-{claim.id.substring(0,8)}</p>
                          <span className={`${claim.collision_score > 80 ? 'bg-red-600' : 'bg-yellow-500'} text-white text-[9px] px-2 py-0.5 rounded-full font-bold`}>{claim.collision_score}% SIMILARITY</span>
                        </div>
                        <p className="text-sm font-bold text-gray-900 leading-snug mb-1">{claim.title}</p>
                        <p className="text-[10px] text-gray-600 line-clamp-1">Matched against TKDL: {claim.raw_description}</p>
                      </div>
                    ))}
                    
                    {claims.filter(c => c.collision_score > 0).length === 0 && (
                      <div className="p-8 text-center text-gray-400 text-sm italic">No collision alerts detected.</div>
                    )}

                  </div>
                  <button onClick={() => setActiveTab('database')} className="w-full mt-4 bg-white hover:bg-gray-50 text-gov-blue text-[10px] font-bold uppercase tracking-widest py-3 border border-gray-200 rounded transition-colors shadow-sm">
                    View Full Logs
                  </button>
                </div>
              </div>
              </div>
            </div>
          )}

          {/* TAB: WHISTLEBLOWER THREATS */}
          {activeTab === 'whistleblower' && (
            <div className="w-full h-full flex flex-col bg-white/80 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-gov-blue p-6 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="font-serif-official font-bold text-white text-xl flex items-center gap-2 mb-1">
                    <AlertTriangle size={24} className="text-red-500" /> Active Threat Intelligence
                  </h3>
                  <p className="text-xs text-blue-100 uppercase tracking-widest font-bold">Review incoming citizen whistleblower reports</p>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto space-y-6 custom-scrollbar">
               <div className="bg-white/80 backdrop-blur-md border-t-4 border-red-600 rounded-2xl p-8 shadow-xl overflow-hidden">
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
                       {reports.map((report) => (
                         <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                           <td className="py-4 pl-4 font-mono text-[10px] text-gray-600">{report.user_id}</td>
                           <td className="py-4 font-bold text-gray-900 text-sm max-w-[200px] truncate">{report.target_url}</td>
                           <td className="py-4 text-gray-600 text-xs truncate max-w-[250px]">{report.context}</td>
                           <td className="py-4">
                             <span className="bg-red-100 text-red-700 border border-red-200 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest animate-pulse inline-block">{report.risk_level}</span>
                           </td>
                           <td className="py-4">
                             <button className="bg-white hover:bg-gray-50 text-gov-blue border border-gray-300 px-4 py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-2 shadow-sm">
                               <Eye size={12} /> Review
                             </button>
                           </td>
                         </tr>
                       ))}
                       {reports.length === 0 && (
                         <tr>
                           <td colSpan={5} className="py-8 text-center text-gray-400 text-sm italic">No active threat reports.</td>
                         </tr>
                       )}
                     </tbody>
                   </table>
                 </div>
               </div>
             </div>
             </div>
           )}

          {/* TAB: QUEUE (Citizen Submissions) */}
          {activeTab === 'queue' && (
            <div className="w-full h-full flex flex-col bg-white/80 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-gov-blue p-6 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="font-serif-official font-bold text-white text-xl flex items-center gap-2 mb-1">
                    <CheckSquare size={24} className="text-gov-gold" /> Citizen Submissions Queue
                  </h3>
                  <p className="text-xs text-blue-100 uppercase tracking-widest font-bold">Verify and anchor citizen IP claims</p>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto flex flex-col lg:flex-row gap-8 custom-scrollbar">
              
              {/* LEFT COLUMN: Pending Queue */}
              <div className="lg:w-1/3 flex flex-col gap-6">
                <div className="bg-white/80 backdrop-blur-md border-t-4 border-gov-gold rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-serif-official font-bold text-gov-blue text-xs tracking-widest uppercase flex items-center gap-2">
                      <Database size={14} className="text-gov-gold"/> Pending Verification
                    </h3>
                    <span className="bg-gov-gold text-white px-2 py-0.5 rounded text-[9px] font-bold shadow-sm">{claims.filter(c => c.status === 'Pending Review').length} IN QUEUE</span>
                  </div>
                  <div className="overflow-y-auto flex-1 divide-y divide-gray-100">
                    
                    {claims.map(claim => (
                      <div 
                        key={claim.id} 
                        onClick={() => setActiveClaim(claim)}
                        className={`p-4 cursor-pointer transition-colors border-l-4 ${activeClaim?.id === claim.id ? 'bg-blue-50/50 border-gov-blue' : 'hover:bg-gray-50 border-transparent'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-mono text-[10px] font-bold text-gray-500">TK-{claim.id.substring(0,8)}</span>
                          <span className="text-[9px] font-bold text-gray-500 uppercase">{new Date(claim.created_at).toLocaleDateString()}</span>
                        </div>
                        <h4 className={`font-bold text-sm mb-1 leading-snug ${activeClaim?.id === claim.id ? 'text-gray-900' : 'text-gray-600'}`}>{claim.title}</h4>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-gray-500 line-clamp-1">{claim.raw_description}</p>
                          <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ml-2 shrink-0 ${claim.status === 'Pending Review' ? 'bg-yellow-100 text-yellow-700' : claim.status === 'Verified' ? 'bg-green-100 text-green-700' : claim.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                            {claim.status}
                          </span>
                        </div>
                      </div>
                    ))}

                    {claims.length === 0 && (
                      <div className="p-8 text-center text-gray-400 text-sm italic">Queue is empty</div>
                    )}

                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Action & Radar */}
              <div className="lg:w-2/3 flex flex-col gap-6">
                {activeClaim ? (
                  <>
                  {/* Claim Details */}
                  <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-xl p-8">
                    <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                      <div>
                        <h2 className="text-2xl font-serif-official font-bold text-gray-900 mb-2">{activeClaim.title}</h2>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Citizen ID: {activeClaim.user_id} &bull; Date: {new Date(activeClaim.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Formulation Details</h4>
                      <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 border border-gray-200 rounded shadow-inner whitespace-pre-wrap">
                        {activeClaim.raw_description}
                      </p>
                    </div>

                    {/* AI COLLISION RADAR (The core tech) */}
                    <div className={`${activeClaim.collision_score > 50 ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'} border rounded-lg p-6 mb-8 relative overflow-hidden`}>
                      <div className={`absolute right-0 top-0 pointer-events-none ${activeClaim.collision_score > 50 ? 'text-red-500/10' : 'text-green-500/10'}`}>
                        <Network size={160} />
                      </div>
                      <h4 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${activeClaim.collision_score > 50 ? 'text-red-700' : 'text-green-700'}`}>
                        {activeClaim.collision_score > 50 ? <ShieldAlert size={14} /> : <CheckCircle size={14} />} AI Collision Radar Analysis
                      </h4>
                      
                      <div className="bg-white p-4 border border-gray-200 rounded mb-4 shadow-sm relative z-10">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-gray-700">USPTO Database Match</span>
                          <span className={`text-xs font-black ${activeClaim.collision_score > 50 ? 'text-red-600' : 'text-green-600'}`}>{activeClaim.collision_score}% SIMILARITY</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                          <div className={`${activeClaim.collision_score > 50 ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]' : 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]'} h-2 rounded-full`} style={{width: `${activeClaim.collision_score}%`}}></div>
                        </div>
                      </div>
                    </div>

                    {/* Verification Actions */}
                    <div className="border-t border-gray-100 pt-6">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Ministry Actions</h4>
                      {activeClaim.status === 'Pending Review' ? (
                        <div className="flex gap-4">
                          <button onClick={() => setShowConfirmModal({isOpen: true, action: 'Reject'})} className="flex-1 bg-white border-2 border-red-200 text-red-600 px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-red-50 hover:border-red-300 transition-colors flex items-center justify-center gap-2 rounded">
                            <XSquare size={16} /> Reject Claim
                          </button>
                          <button onClick={() => setShowConfirmModal({isOpen: true, action: 'Verify'})} className="flex-1 bg-green-600 border border-transparent text-white px-6 py-3 font-bold uppercase tracking-widest text-xs hover:bg-green-700 transition-colors flex items-center justify-center gap-2 rounded shadow-md">
                            <CheckSquare size={16} /> Verify Claim
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center bg-gray-50 p-4 border border-gray-200 rounded">
                          <p className="text-sm font-bold text-gray-700">Current Status: <span className={activeClaim.status === 'Verified' ? 'text-green-600' : activeClaim.status === 'Rejected' ? 'text-red-600' : 'text-blue-600'}>{activeClaim.status}</span></p>
                          <button onClick={() => handleStatusUpdate('Pending Review')} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900 transition-colors bg-white border border-gray-300 px-4 py-2 rounded shadow-sm">
                            Undo Action
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* BLOCKCHAIN VAULT */}
                  {activeClaim.status === 'Verified' && (
                    <div className="bg-white/80 backdrop-blur-md border border-gov-gold shadow-xl rounded-2xl p-8 relative overflow-hidden group mt-6">
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
                          onClick={() => setShowConfirmModal({isOpen: true, action: 'Lock'})}
                          disabled={isLocking}
                          className="px-8 py-3 rounded font-black uppercase tracking-widest text-xs transition-all bg-gov-gold text-white hover:bg-yellow-600 shadow-md hover:shadow-lg disabled:opacity-50"
                        >
                          {isLocking ? 'Anchoring to Polygon...' : 'Lock on Blockchain Now'}
                        </button>
                      </div>
                    </div>
                  )}

                  {activeClaim.polygon_tx_hash && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded text-[10px] font-mono shadow-sm">
                      <p className="text-green-700 mb-2 font-bold text-xs flex items-center gap-2"><CheckCircle size={14}/> Immutable Proof Generated</p>
                      <p className="mb-1"><span className="text-gray-500">Tx Hash:</span> <span className="text-blue-600 break-all">{activeClaim.polygon_tx_hash}</span></p>
                    </div>
                  )}
                  </>
                ) : (
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-12 text-center text-gray-400 flex flex-col items-center justify-center">
                    <Database size={48} className="mb-4 text-gray-200" />
                    <p>Select a claim from the queue to review.</p>
                  </div>
                )}
              </div>
              </div>
            </div>
          )}

          {/* TAB: DATABASE (Real Patents) */}
          {activeTab === 'database' && (
            <div className="w-full h-full flex flex-col bg-white/80 backdrop-blur-md border border-white/60 shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-gov-blue p-6 flex justify-between items-center shrink-0">
                <div>
                  <h3 className="font-serif-official font-bold text-white text-xl flex items-center gap-2 mb-1">
                    <Database size={24} className="text-gov-gold" /> TKDL Master Database
                  </h3>
                  <p className="text-xs text-blue-100 uppercase tracking-widest font-bold">Immutable sovereign IP knowledge base</p>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto flex flex-col gap-6 custom-scrollbar">
              <div className="bg-white/80 backdrop-blur-md border-t-4 border-gov-gold rounded-2xl shadow-xl flex-1 flex flex-col overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-serif-official font-bold text-gov-blue text-xs tracking-widest uppercase flex items-center gap-2">
                    <Database size={14} className="text-gov-gold"/> Immutable TKDL Master Database
                  </h3>
                  <span className="bg-gov-blue text-white px-3 py-1 rounded text-[10px] font-bold shadow-sm flex items-center gap-2">
                    <CheckCircle size={12} className="text-gov-gold" /> {patents.length} Real Patents Loaded
                  </span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-gov-blue bg-gray-50">
                        <th className="p-4 text-xs font-bold text-gov-blue uppercase tracking-widest">Patent / ID</th>
                        <th className="p-4 text-xs font-bold text-gov-blue uppercase tracking-widest">Title</th>
                        <th className="p-4 text-xs font-bold text-gov-blue uppercase tracking-widest">Abstract / Claim</th>
                        <th className="p-4 text-xs font-bold text-gov-blue uppercase tracking-widest">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {patents.map(p => (
                        <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                          <td className="p-4 text-xs font-mono font-bold text-gray-700 whitespace-nowrap">{p.patent_number}</td>
                          <td className="p-4 text-sm font-bold text-gov-blue">{p.title}</td>
                          <td className="p-4 text-xs text-gray-600 max-w-xl truncate" title={p.content}>{p.content}</td>
                          <td className="p-4 text-xs text-gray-500 whitespace-nowrap">{new Date(p.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                      {patents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="p-8 text-center text-gray-400 text-sm italic border border-dashed border-gray-200 bg-gray-50">
                            Loading TKDL Master Database... If this persists, run the seed script.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* CONFIRMATION MODALS */}
      {showConfirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full border-t-4 border-gov-blue">
            <h3 className="text-xl font-bold font-serif-official mb-4 text-gov-blue flex items-center gap-3">
              {showConfirmModal.action === 'Reject' && <><XSquare className="text-red-600"/> Confirm Rejection</>}
              {showConfirmModal.action === 'Verify' && <><CheckSquare className="text-green-600"/> Confirm Verification</>}
              {showConfirmModal.action === 'Lock' && <><LinkIcon className="text-gov-gold"/> Confirm Blockchain Lock</>}
              {showConfirmModal.action === 'DeleteAlert' && <><Trash2 className="text-red-600"/> Delete Broadcast Alert</>}
              {showConfirmModal.action === 'Broadcast' && <><Activity className="text-red-600"/> Confirm Global Broadcast</>}
              {showConfirmModal.action === 'Error' && <><AlertTriangle className="text-red-600"/> System Error</>}
              {showConfirmModal.action === 'ReviewReport' && <><ShieldAlert className="text-gov-gold"/> Review Bio-Piracy Threat</>}
            </h3>
            <p className="text-sm text-gray-600 mb-8 leading-relaxed">
              {showConfirmModal.action === 'Reject' && "Are you sure you want to reject this claim? This will notify the citizen and halt further processing."}
              {showConfirmModal.action === 'Verify' && "Are you sure you want to verify this claim? This will approve it for the final Blockchain anchoring process."}
              {showConfirmModal.action === 'Lock' && "WARNING: Anchoring to the Polygon blockchain is permanent and immutable. This legally establishes the claim as sovereign IP of India. Proceed?"}
              {showConfirmModal.action === 'DeleteAlert' && "Are you sure you want to delete this emergency broadcast? This will immediately remove it from all Citizen Dashboards globally."}
              {showConfirmModal.action === 'Broadcast' && "You are about to push a high-priority alert to all connected Citizen Dashboards globally. Ensure the message is accurate and verified."}
              {showConfirmModal.action === 'Error' && showConfirmModal.meta}
              {showConfirmModal.action === 'ReviewReport' && (
                <span className="block border-l-4 border-gov-gold pl-4 bg-yellow-50 p-4 font-mono text-xs">{showConfirmModal.meta}</span>
              )}
            </p>
            <div className="flex gap-4">
              {showConfirmModal.action !== 'Error' && (
                <button 
                  onClick={() => setShowConfirmModal({isOpen: false, action: null})}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold uppercase tracking-widest text-xs rounded hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              )}
              <button 
                onClick={() => {
                  if(showConfirmModal.action === 'Reject') handleStatusUpdate('Rejected');
                  else if(showConfirmModal.action === 'Verify') handleStatusUpdate('Verified');
                  else if(showConfirmModal.action === 'DeleteAlert') handleDeleteAlert(showConfirmModal.meta);
                  else if(showConfirmModal.action === 'Broadcast') {
                    setShowConfirmModal({isOpen: false, action: null});
                    handleBroadcast();
                  }
                  else if(showConfirmModal.action === 'Lock') {
                    setShowConfirmModal({isOpen: false, action: null});
                    handleBlockchainLock();
                  } else if(showConfirmModal.action === 'Error' || showConfirmModal.action === 'ReviewReport') {
                    setShowConfirmModal({isOpen: false, action: null});
                  }
                }}
                className={`flex-1 py-3 text-white font-bold uppercase tracking-widest text-xs rounded shadow-md transition-colors ${
                  showConfirmModal.action === 'Reject' || showConfirmModal.action === 'DeleteAlert' || showConfirmModal.action === 'Broadcast' ? 'bg-red-600 hover:bg-red-700' :
                  showConfirmModal.action === 'Verify' ? 'bg-green-600 hover:bg-green-700' :
                  showConfirmModal.action === 'Error' ? 'bg-gov-blue hover:bg-[#081729]' :
                  'bg-gov-gold hover:bg-yellow-600'
                }`}
              >
                {showConfirmModal.action === 'Error' ? 'Dismiss' : showConfirmModal.action === 'ReviewReport' ? 'Dismiss Review' : `Confirm ${showConfirmModal.action === 'DeleteAlert' ? 'Deletion' : showConfirmModal.action === 'Broadcast' ? 'Broadcast' : showConfirmModal.action}`}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}


