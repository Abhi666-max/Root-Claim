import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = await createClient()

  // Instead of querying a non-existent 'todos' table, we will just check if the client initialized
  // and handle any initial query errors gracefully (since tables aren't built yet).
  const { error } = await supabase.from('users').select('id').limit(1)
  
  const isTableMissingError = error && error.message.includes('Could not find the table')

  return (
    <main className="min-h-screen p-8 md:p-24 flex flex-col items-center justify-center relative">
      <div className="bg-spidey-web"></div>
      
      <div className="z-10 bg-[#050a1f]/80 backdrop-blur-md p-10 rounded-2xl border border-spidey-blue/30 shadow-[0_0_30px_rgba(0,210,255,0.15)] max-w-2xl w-full text-center">
        <h1 className="text-5xl font-black mb-6 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-spidey-red to-spidey-blue text-glow-red uppercase italic">
          Root-Claim 2099
        </h1>
        
        <p className="text-xl text-spidey-text/80 mb-8 font-light">
          Supabase Connection Status
        </p>

        <div className="bg-black/50 p-6 rounded-xl border border-spidey-red/20 text-left">
          {error && !isTableMissingError ? (
            <div className="text-red-400">
              <p className="font-bold text-spidey-red">Connection Error:</p>
              <p className="text-sm mt-2">{error.message}</p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-spidey-blue mb-4 text-glow-blue">Connected Successfully! 🕸️✅</p>
              <p className="text-sm text-gray-400 italic">
                The database is reachable. Schema cache is ready. <br/><br/>
                Next step: Initialize the `users`, `ip_documents`, and `blockchain_vault` tables.
              </p>
            </div>
          )}
        </div>
        
        <button className="mt-10 px-8 py-3 bg-gradient-to-r from-spidey-red to-red-700 hover:from-red-500 hover:to-spidey-red text-white font-bold rounded shadow-[0_0_15px_rgba(255,0,60,0.6)] transition-all uppercase tracking-widest text-sm">
          Initialize Database Schema
        </button>
      </div>
    </main>
  )
}
