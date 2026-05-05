import { useState } from 'react'
import { enforcementActions } from '../data'

const statusColors = {
  Active: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  Ongoing: { bg: 'rgba(249,115,22,0.1)', text: '#f97316', border: 'rgba(249,115,22,0.3)' },
  Resolved: { bg: 'rgba(34,197,94,0.1)', text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
}

const agencyColors = {
  'FDA': { bg: 'rgba(6,182,212,0.1)', text: '#22d3ee' },
  'FDA/FTC': { bg: 'rgba(168,85,247,0.1)', text: '#a855f7' },
  'FDA/MHRA/TGA': { bg: 'rgba(249,115,22,0.1)', text: '#f97316' },
}

export default function EnforcementTracker() {
  const [agency, setAgency] = useState('All Agencies')
  const [compound, setCompound] = useState('All Compounds')

  const agencies = ['All Agencies', ...new Set(enforcementActions.map(e => e.agency))]
  const compounds = ['All Compounds', ...new Set(enforcementActions.map(e => e.compound))]

  const filtered = enforcementActions.filter(e => {
    const matchAgency = agency === 'All Agencies' || e.agency === agency
    const matchCompound = compound === 'All Compounds' || e.compound === compound
    return matchAgency && matchCompound
  })

  return (
    <div>
      <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', marginBottom: '6px' }}>
        ⚠ Enforcement Tracker
      </h1>
      <p style={{ color: '#8892a4', marginBottom: '8px' }}>
        FDA warning letters, FTC enforcement actions, and agency notices — {filtered.length} actions tracked.
      </p>

      {/* Alert Banner */}
      <div style={{
        backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)',
        borderRadius: '10px', padding: '14px 18px', marginBottom: '24px'
      }}>
        <p style={{ color: '#fb923c', fontSize: '13px', margin: 0 }}>
          <strong>March 2026 sweep:</strong> FDA and FTC issued simultaneous enforcement notices to 30+ telehealth
          companies for misleading GLP-1 compounding marketing — the largest coordinated action against the
          compounding telehealth market to date.
        </p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <select
          value={agency}
          onChange={e => setAgency(e.target.value)}
          style={{
            padding: '10px 14px', backgroundColor: '#13151f',
            border: '1px solid #1e2130', borderRadius: '8px',
            color: '#e2e8f0', fontSize: '14px', outline: 'none'
          }}
        >
          {agencies.map(a => <option key={a}>{a}</option>)}
        </select>
        <select
          value={compound}
          onChange={e => setCompound(e.target.value)}
          style={{
            padding: '10px 14px', backgroundColor: '#13151f',
            border: '1px solid #1e2130', borderRadius: '8px',
            color: '#e2e8f0', fontSize: '14px', outline: 'none'
          }}
        >
          {compounds.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Actions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map(action => {
          const sc = statusColors[action.status] || statusColors['Resolved']
          const ac = agencyColors[action.agency] || { bg: 'rgba(6,182,212,0.1)', text: '#22d3ee' }
          return (
            <div key={action.id} style={{
              backgroundColor: '#13151f', border: '1px solid #1e2130',
              borderRadius: '12px', padding: '20px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: '12px', padding: '4px 10px', borderRadius: '6px',
                    backgroundColor: ac.bg, color: ac.text, fontWeight: '600'
                  }}>{action.agency}</span>
                  <span style={{ color: '#4a5568', fontSize: '13px' }}>{action.date}</span>
                  <span style={{
                    fontSize: '11px', padding: '3px 8px', borderRadius: '999px',
                    backgroundColor: sc.bg, color: sc.text, border: `1px solid ${sc.border}`
                  }}>{action.status}</span>
                </div>
              </div>
              <h3 style={{ color: '#fff', fontWeight: '600', fontSize: '15px', marginBottom: '6px' }}>
                {action.violation}
              </h3>
              <p style={{ color: '#8892a4', fontSize: '13px', marginBottom: '10px', lineHeight: '1.6' }}>
                {action.description}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ color: '#4a5568', fontSize: '12px' }}>Company/Target:</span>
                <span style={{ color: '#a0aec0', fontSize: '12px' }}>{action.company}</span>
                <span style={{ color: '#4a5568', fontSize: '12px', marginLeft: '8px' }}>Compound:</span>
                <span style={{ color: '#22d3ee', fontSize: '12px' }}>{action.compound}</span>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: '#4a5568', marginTop: '60px', fontSize: '14px' }}>
          No enforcement actions match your filters.
        </div>
      )}
    </div>
  )
}