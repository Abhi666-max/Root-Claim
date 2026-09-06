import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';

export default function PrivacyPolicy() {
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
        <h1 className="text-3xl font-serif-official text-gov-blue font-bold mb-6 border-b pb-4">Privacy Policy</h1>
        
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <p>
            The Ministry of Ayush, Government of India, respects your privacy and is committed to protecting your personal data and the Traditional Knowledge you provide to the IP-SAKTI portal.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">1. Information Collection</h2>
          <p>
            We collect information you provide directly to us when you create an account, submit a claim, or report bio-piracy. This may include your Citizen ID, Aadhar authentication hashes, and uploaded documentation.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">2. Use of Information</h2>
          <p>
            The collected data is exclusively used for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Verifying the authenticity of Traditional Knowledge claims.</li>
            <li>Cryptographic anchoring on the Polygon blockchain to secure IP rights.</li>
            <li>Investigating reported bio-piracy threats.</li>
          </ul>

          <h2 className="text-lg font-bold text-gov-blue mt-8">3. Data Security</h2>
          <p>
            All data is encrypted in transit and at rest. Immutable records are secured via smart contracts, ensuring absolute data integrity against unauthorized modifications.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">4. Contact Us</h2>
          <p>
            For any privacy-related queries, please contact the IP-SAKTI Grievance Officer at privacy@ipsakti.gov.in.
          </p>
        </div>
      </main>

      <footer className="bg-gov-blue text-white py-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Ministry of Ayush, Government of India. All rights reserved.</p>
      </footer>
    </div>
  );
}
