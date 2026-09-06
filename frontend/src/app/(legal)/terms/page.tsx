import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <header className="bg-white border-b border-gov-light shrink-0 px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo />
          </Link>
        </div>
        <Link href="/" className="text-xs font-bold text-gov-blue uppercase tracking-widest flex items-center gap-2 hover:bg-blue-50 px-3 py-2 rounded transition-colors">
          <ArrowLeft size={16} /> Return Home
        </Link>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-8 my-8 bg-white border border-gov-light shadow-sm rounded-lg">
        <h1 className="text-3xl font-serif-official text-gov-blue font-bold mb-6 border-b pb-4">Terms of Service</h1>
        
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <p>
            Welcome to the IP-SAKTI portal, an official initiative by the Ministry of Ayush, Government of India. By accessing or using this portal, you agree to comply with and be bound by the following Terms of Service.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">1. Acceptance of Terms</h2>
          <p>
            By registering, drafting claims, or submitting bio-piracy reports on IP-SAKTI, you acknowledge that you have read, understood, and agree to these terms. If you do not agree, please do not use this service.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">2. User Responsibilities</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials (e.g., Aadhar verification tokens). Any activity under your account is your sole responsibility. You agree to provide accurate and truthful information regarding Traditional Knowledge claims.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">3. Intellectual Property Rights</h2>
          <p>
            Submitting a claim to the IP-SAKTI portal securely records your assertion of Traditional Knowledge on the blockchain. The Ministry of Ayush facilitates this process but the ultimate granting of intellectual property rights remains subject to the patent laws of India.
          </p>

          <h2 className="text-lg font-bold text-gov-blue mt-8">4. Modifications to Service</h2>
          <p>
            The Ministry of Ayush reserves the right to modify or discontinue, temporarily or permanently, the IP-SAKTI portal with or without notice.
          </p>
        </div>
      </main>

      <footer className="bg-gov-blue text-white py-6 text-center text-xs">
        <p>&copy; {new Date().getFullYear()} Ministry of Ayush, Government of India. All rights reserved.</p>
      </footer>
    </div>
  );
}
