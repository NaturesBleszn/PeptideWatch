import { useState } from 'react'
import { redFlagClaims, peptides } from '../data'

const riskColors = {
  critical: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  high: { bg: 'rgba(249,115,22,0.1)', text: '#f97316', border: 'rgba(249,115,22,0.3)' },
  medium: { bg: 'rgba(234,179,8,0.1)', text: '#eab308', border: 'rgba(234,179,8,0.3)' },
}

export default function MarketingAnalyzer() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState(null)

  const analyze = () => {
    if (!input.trim()) return
    const lower = input.toLowerCase()
    const matches = redFlagClaims.filter(r =>
      r.claim.toLowerCase().split(' ').some(word => word.length > 4 && lower.includes(word)) ||
      lower.includes(r.compound.toLowerCase())
    )
    setResults({ text: input, flags: matches })
  }

  return (
    <div>
      <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', marginBottom: '6px' }}>
        ◈ Marketing Analyzer
      </h1>
      <p style={{ color: '#8892a4', marginBottom: '24px' }}>
        Paste marketing copy, product claims, or ad text below to scan for red flag regulatory violations.
      </p>

      {/* Analyzer Input */}
      <div style={{
        backgroundColor: '#13151f', border: '1px solid #1e2130',
        borderRadius: '12px', padding: '24px', marginBottom: '24px'
      }}>
        <p style={{ color: '#a0aec0', fontSize: '13px', marginBottom: '10px' }}>Paste marketing text to analyze:</p>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. 'BPC-157 heals leaky gut naturally. Research Use Only. No side effects unlike HGH...'"
          rows={5}
          style={{
            width: '100%', padding: '12px', backgroundColor: '#0f1117',
            border: '1px solid #2d3748', borderRadius: '8px',
            color: '#e2e8f0', fontSize: '14px', outline: 'none',
            resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box'
          }}
        />
        <button
          onClick={analyze}
          style={{
            marginTop: '12px', padding: '10px 24px',
            backgroundColor: '#06b6d4', color: '#000',
            border: 'none', borderRadius: '8px', fontWeight: '600',
            fontSize: '14px', cursor: 'pointer'
          }}
        >
          Analyze Claims
        </button>
      </div>

      {/* Results */}
      {results && (
        <div style={{
          backgroundColor: '#13151f', border: '1px solid #1e2130',
          borderRadius: '12px', padding: '24px', marginBottom: '24px'
        }}>
          <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
            Analysis Results — {results.flags.length} potential violation{results.flags.length !== 1 ? 's' : ''} found
          </h2>
          {results.flags.length === 0 ? (
            <p style={{ color: '#22c55e', fontSize: '14px' }}>✓ No obvious red flag claims detected in this text.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {results.flags.map(flag => {
                const rc = riskColors[flag.riskLevel] || riskColors['high']
                return (
                  <div key={flag.id} style={{
                    backgroundColor: rc.bg, border: `1px solid ${rc.border}`,
                    borderRadius: '8px', padding: '14px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: rc.text, fontWeight: '600', fontSize: '14px' }}>"{flag.claim}"</span>
                      <span style={{
                        fontSize: '11px', padding: '2px 8px', borderRadius: '999px',
                        backgroundColor: rc.bg, color: rc.text, border: `1px solid ${rc.border}`,
                        textTransform: 'uppercase', fontWeight: '600', whiteSpace: 'nowrap', marginLeft: '8px'
                      }}>{flag.riskLevel}</span>
                    </div>
                    <p style={{ color: '#8892a4', fontSize: '13px', margin: '0 0 6px' }}>{flag.reason}</p>
                    <p style={{ color: '#4a5568', fontSize: '12px', margin: 0 }}>Compound: {flag.compound}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* All Red Flag Claims Reference */}
      <div style={{
        backgroundColor: '#13151f', border: '1px solid #1e2130',
        borderRadius: '12px', padding: '24px'
      }}>
        <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          All Known Red Flag Claims ({redFlagClaims.length})
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {redFlagClaims.map(flag => {
            const rc = riskColors[flag.riskLevel] || riskColors['high']
            return (
              <div key={flag.id} style={{
                display: 'flex', gap: '12px', alignItems: 'flex-start',
                padding: '12px', backgroundColor: '#0f1117',
                borderRadius: '8px', border: '1px solid #1e2130'
              }}>
                <span style={{
                  fontSize: '11px', padding: '2px 8px', borderRadius: '4px',
                  backgroundColor: rc.bg, color: rc.text,
                  whiteSpace: 'nowrap', fontWeight: '600', textTransform: 'uppercase'
                }}>{flag.riskLevel}</span>
                <div>
                  <p style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: '500', margin: '0 0 4px' }}>"{flag.claim}"</p>
                  <p style={{ color: '#8892a4', fontSize: '12px', margin: '0 0 4px' }}>{flag.reason}</p>
                  <p style={{ color: '#4a5568', fontSize: '12px', margin: 0 }}>Compound: {flag.compound}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}