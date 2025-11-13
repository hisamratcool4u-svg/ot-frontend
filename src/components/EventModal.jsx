import React, { useState, useEffect } from 'react'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'

const STATUS_OPTIONS = ['SCHEDULED','IN_PROGRESS','COMPLETED','CANCELLED']

export default function EventModal({ open, onClose, initial, onSave }){
  const [title, setTitle] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [status, setStatus] = useState('SCHEDULED')

  useEffect(()=>{
    if(initial){
      setTitle(initial.title || '')
      setStart(initial.start || '')
      setEnd(initial.end || '')
      setStatus(initial.status || 'SCHEDULED')
    } else {
      setTitle(''); setStart(''); setEnd(''); setStatus('SCHEDULED')
    }
  },[initial, open])

  if(!open) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Booking</h3>
        <label className="block mb-2 text-sm">Patient / Title</label>
        <input className="w-full border p-2 rounded mb-3" value={title} onChange={e=>setTitle(e.target.value)} />

        <label className="block mb-2 text-sm">Start</label>
        <Flatpickr value={start} onChange={d=>setStart(d[0]?.toISOString()||'')} options={{enableTime:true, dateFormat:'Y-m-d\TH:i:S\Z'}} />

        <label className="block mb-2 text-sm mt-3">End</label>
        <Flatpickr value={end} onChange={d=>setEnd(d[0]?.toISOString()||'')} options={{enableTime:true, dateFormat:'Y-m-d\TH:i:S\Z'}} />

        <label className="block mb-2 text-sm mt-3">Status</label>
        <select className="w-full border p-2 rounded" value={status} onChange={e=>setStatus(e.target.value)}>
          {STATUS_OPTIONS.map(s=> <option key={s} value={s}>{s.replace('_',' ')}</option>)}
        </select>

        <div className="mt-4 flex justify-end gap-2">
          <button className="px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="px-4 py-2 rounded text-white" style={{background:'#2563eb'}} onClick={()=>onSave({id: initial?.id, title, start, end, status})}>Save</button>
        </div>
      </div>
    </div>
  )
}
