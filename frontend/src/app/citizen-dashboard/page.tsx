import React from 'react'
import { FileText, Search, ShieldCheck, Activity, Download, ChevronRight, CheckCircle, Clock } from 'lucide-react'

export default function CitizenDashboard() {
  return (
    <div className="min-h-screen bg-gov-ivory text-gov-text font-sans">
      
      {/* HEADER */}
      <header className="bg-gov-blue text-white px-8 h-16 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <ShieldCheck size={24} className="text-gov-gold" />
          <h1 className="font-serif-official font-bold tracking-widest uppercase text-sm">
            Citizen Portal
          </h1>
        </div>
        <div className="flex items-center gap-4 text-xs font-bold tracking-widest uppercase">
          <span className="text-gov-gold">Welcome, Citizen</span>
          <button className="hover:text-gov-gold transition-colors border-l border-white/20 pl-4">Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-12">
        
        {/* WELCOME SECTION */}
        <div className="mb-12">
          <h2 className="text-3xl font-serif-official font-bold text-gov-blue mb-2">My Digital Vault</h2>
          <p className="text-gray-600">Submit and track your traditional knowledge claims.</p>
        </div>

        {/* QUICK ACTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { title: "Submit New Claim", icon: FileText, color: "text-gov-blue", bg: "bg-white", border: "border-gov-blue" },
            { title: "Search Registry", icon: Search, color: "text-gov-gold", bg: "bg-white", border: "border-gov-light" },
            { title: "Report Piracy", icon: Activity, color: "text-red-700", bg: "bg-white", border: "border-gov-light" },
            { title: "Download Certificate", icon: Download, color: "text-green-700", bg: "bg-white", border: "border-gov-light" }
          ].map((action, i) => (
            <div key={i} className={`p-6 border ${action.border} ${action.bg} shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col h-full`}>
              <action.icon size={28} className={`${action.color} mb-4 group-hover:scale-110 transition-transform`} />
              <h3 className="font-serif-official font-bold text-gov-blue mb-2 flex-1">{action.title}</h3>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gov-blue flex items-center gap-1">Action <ChevronRight size={12}/></span>
            </div>
          ))}
        </div>

        {/* MY CLAIMS TABLE */}
        <div className="bg-white border border-gov-light shadow-sm">
          <div className="bg-gov-light px-6 py-4 border-b border-gov-light flex justify-between items-center">
            <h3 className="font-serif-official font-bold text-gov-blue text-lg">Submitted Claims</h3>
          </div>
          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gov-light text-xs uppercase tracking-widest font-bold text-gray-500 bg-gray-50">
                  <th className="p-4 pl-6">Claim ID</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Blockchain Tx</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                
                {/* Pending Claim */}
                <tr className="border-b border-gov-light hover:bg-gray-50 transition-colors">
                  <td className="p-4 pl-6 font-mono text-xs text-gray-500">TK-2026-9081</td>
                  <td className="p-4 font-bold text-gov-blue">Turmeric Wound Healing Formulation</td>
                  <td className="p-4 text-gray-600">22 Aug 2026</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <Clock size={12} /> Pending Review
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right text-gray-400 font-mono text-xs">-</td>
                </tr>

                {/* Verified Claim */}
                <tr className="border-b border-gov-light hover:bg-gray-50 transition-colors">
                  <td className="p-4 pl-6 font-mono text-xs text-gray-500">TK-2026-1142</td>
                  <td className="p-4 font-bold text-gov-blue">Neem Anti-Bacterial Extract</td>
                  <td className="p-4 text-gray-600">10 Jan 2026</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <CheckCircle size={12} /> Blockchain Locked
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <a href="#" className="font-mono text-xs text-gov-blue hover:text-gov-gold underline decoration-gov-light underline-offset-4">0x7a8...9f2b</a>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  )
}
