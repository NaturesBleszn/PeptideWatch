import { useState } from 'react'
import { peptides } from '../data'

const riskColors = {
  low: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', text: '#22c55e' },
  medium: { bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.3)', text: '#eab308' },
  high: { bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)', text: '#f97316' },
  critical: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', text: '#ef4444' },
}

const fdaColors = {
  'FDA Approved': { bg: 'rgba(34,197,94,0.1)', text: '#22c55e' },
  'Not Approved': { bg: 'rgba(239,68,68,0.1)', text: '#ef4444' },
}

export default function CompoundDatabase() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [risk, setRisk] = useState('All Risk Levels')
  const [selected, setSelected] = useState(null)

  const categories = ['All Categories', ...new Set(peptides.map(p => p.category))]
  const risks = ['All Risk Levels', 'low', 'medium', 'high', 'critical']

  const filtered = peptides.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.aliases.some(a => a.toLowerCase().includes(search.toLowerCase()))
    const matchCat = category === 'All Categories' || p.category === category
    const matchRisk = risk === 'All Risk Levels' || p.riskLevel === risk
    return matchSearch && matchCat && matchRisk
  })

  return (
    <div>
      <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', marginBottom: '6px' }}>
        ⚗ Compound Database
      </h1>
      <p style={{ color: '#8892a4', marginBottom: '24px' }}>
        {filtered.length} compounds with FDA status, clinical evidence, compounding rules, and risk classification.
      </p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, alias..."
          style={{
            flex: 1, padding: '10px 14px', backgroundColor: '#13151f',
            border: '1px solid #1e2130', borderRadius: '8px',
            color: '#e2e8f0', fontSize: '14px', outline: 'none'
          }}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{
            padding: '10px 14px', backgroundColor: '#13151f',
            border: '1px solid #1e2130', borderRadius: '8px',
            color: '#e2e8f0', fontSize: '14px', outline: 'none'
          }}
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select
          value={risk}
          onChange={e => setRisk(e.target.value)}
          style={{
            padding: '10px 14px', backgroundColor: '#13151f',
            border: '1px solid #1e2130', borderRadius: '8px',
            color: '#e2e8f0', fontSize: '14px', outline: 'none'
          }}
        >
          {risks.map(r => <option key={r}>{r}</option>)}
        </select>
      </div>

      {/* Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
        {filtered.map(p => {
          const rc = riskColors[p.riskLevel]
          const fc = fdaColors[p.fdaStatus]
          return (
            <div
              key={p.id}
              onClick={() => setSelected(selected?.id === p.id ? null : p)}
              style={{
                backgroundColor: '#13151f', border: `1px solid ${rc.border}`,
                borderRadius: '12px', padding: '20px', cursor: 'pointer',
                transition: 'border-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h3 style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px', margin: 0 }}>{p.name}</h3>
                <span style={{
                  fontSize: '11px', padding: '3px 8px', borderRadius: '999px',
                  backgroundColor: rc.bg, color: rc.text, fontWeight: '600',
                  textTransform: 'uppercase'
                }}>{p.riskLevel}</span>
              </div>
              <p style={{ color: '#4a5568', fontSize: '12px', marginBottom: '10px' }}>
                {p.aliases.join(' · ')}
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <span style={{
                  fontSize: '11px', padding: '3px 8px', borderRadius: '4px',
                  backgroundColor: fc.bg, color: fc.text
                }}>{p.fdaStatus}</span>
                <span style={{
                  fontSize: '11px', padding: '3px 8px', borderRadius: '4px',
                  backgroundColor: '#1e2130', color: '#8892a4'
                }}>{p.category}</span>
              </div>
              <p style={{ color: '#8892a4', fontSize: '13px', lineHeight: '1.5', margin: 0 }}>{p.description}</p>

              {selected?.id === p.id && (
                <div style={{ marginTop: '16px', borderTop: '1px solid #1e2130', paddingTop: '16px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ color: '#22d3ee', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Clinical Evidence</p>
                    <p style={{ color: '#a0aec0', fontSize: '13px', margin: 0 }}>{p.clinicalEvidence}</p>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <p style={{ color: '#22d3ee', fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>Compounding Rules</p>
                    <p style={{ color: '#a0aec0', fontSize: '13px', margin: 0 }}>{p.compoundingRules}</p>
                  </div>
                  <div>
                    <p style={{ color: '#ef4444', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>Red Flag Claims to Watch</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {p.redFlags.map((flag, i) => (
                        <span key={i} style={{
                          fontSize: '11px', padding: '3px 8px', borderRadius: '4px',
                          backgroundColor: 'rgba(239,68,68,0.1)', color: '#ef4444',
                          border: '1px solid rgba(239,68,68,0.2)'
                        }}>{flag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: '#4a5568', marginTop: '60px', fontSize: '14px' }}>
          No compounds match your search.
        </div>
      )}
    </div>
  )
}