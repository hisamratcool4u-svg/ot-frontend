import React from 'react'
import CalendarPage from './components/CalendarPage'

export default function App(){
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="px-6 py-4 border-b">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold" style={{color:'#2563eb'}}>OT Scheduler</h1>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-6">
        <CalendarPage />
      </main>
    </div>
  )
}
