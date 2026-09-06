import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';

export default function RightToInformation() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <header className="bg-white border-b border-gov-light shrink-0 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo type="citizen" size={32} />
          </Link>
        </div>
        <Link href="/" className="text-xs font-bold text-gov-blue uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 px-3 py-2 rounded transition-colors">
          <ArrowLeft size={16} /> Return Home
        </Link>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-8 my-8 bg-white border border-gov-light shadow-sm rounded-lg">
        <h1 className="text-3xl font-serif-official text-gov-blue font-bold mb-6 border-b pb-4">Right to Information (RTI)</h1>
        
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <p>
            The Right to Information Act, 2005 (RTI) mandates timely response to citizen requests for government information. The Ministry of Ayush is committed to transparency and accountability in the administration of the IP-SAKTI platform.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">Accessing Public Records</h2>
          <p>
            Under the RTI Act, citizens have the right to request information regarding the operational statistics, resolved threat reports, and the general framework of the IP-SAKTI portal, provided the information does not violate individual privacy or secure cryptographic processes.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">Exemptions</h2>
          <p>
            Specific details regarding pending threat intelligence investigations (Collision Radar data) or unverified citizen drafts may be exempted under Section 8 of the RTI Act to ensure national security, secure ongoing investigations, and protect intellectual property.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">Filing an RTI Request</h2>
          <p>
            To file an RTI application concerning IP-SAKTI, please visit the official <a href="https://rtionline.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">RTI Online Portal</a> and select "Ministry of Ayush" as the public authority.
          </p>
        </div>
      </main>

      <footer className="bg-gov-blue text-white py-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Ministry of Ayush, Government of India. All rights reserved.</p>
      </footer>
    </div>
  );
}
