import { redFlagClaims, peptides, enforcementActions } from '../data'

const riskColors = {
  critical: { bg: 'rgba(239,68,68,0.1)', text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  high: { bg: 'rgba(249,115,22,0.1)', text: '#f97316', border: 'rgba(249,115,22,0.3)' },
  medium: { bg: 'rgba(234,179,8,0.1)', text: '#eab308', border: 'rgba(234,179,8,0.3)' },
}

export default function RedFlagReport() {
  const criticalCount = redFlagClaims.filter(r => r.riskLevel === 'critical').length
  const highCount = redFlagClaims.filter(r => r.riskLevel === 'high').length
  const bannedCount = peptides.filter(p => p.fdaStatus === 'Not Approved').length
  const activeEnforcement = enforcementActions.filter(e => e.status === 'Active' || e.status === 'Ongoing').length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
        <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>
          ⚑ Red Flag Report
        </h1>
        <span style={{
          fontSize: '12px', padding: '4px 12px', borderRadius: '6px',
          backgroundColor: 'rgba(6,182,212,0.1)', color: '#22d3ee',
          border: '1px solid rgba(6,182,212,0.2)'
        }}>Updated April 2026</span>
      </div>
      <p style={{ color: '#8892a4', marginBottom: '24px' }}>
        Comprehensive regulatory risk summary for peptide compounds currently marketed in the US.
      </p>

      {/* Summary Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[
          { label: 'Critical Risk Claims', value: criticalCount, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' },
          { label: 'High Risk Claims', value: highCount, color: '#f97316', bg: 'rgba(249,115,22,0.1)', border: 'rgba(249,115,22,0.3)' },
          { label: 'Unapproved Compounds', value: bannedCount, color: '#eab308', bg: 'rgba(234,179,8,0.1)', border: 'rgba(234,179,8,0.3)' },
          { label: 'Active Enforcement', value: activeEnforcement, color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.3)' },
        ].map(stat => (
          <div key={stat.label} style={{
            backgroundColor: stat.bg, border: `1px solid ${stat.border}`,
            borderRadius: '12px', padding: '20px'
          }}>
            <p style={{ color: stat.color, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{stat.label}</p>
            <p style={{ color: stat.color, fontSize: '36px', fontWeight: 'bold', margin: 0 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Critical Findings */}
      <div style={{
        backgroundColor: '#13151f', border: '1px solid rgba(239,68,68,0.3)',
        borderRadius: '12px', padding: '24px', marginBottom: '24px'
      }}>
        <h2 style={{ color: '#ef4444', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          ☠ Critical Risk Findings
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {redFlagClaims.filter(r => r.riskLevel === 'critical').map(flag => (
            <div key={flag.id} style={{
              padding: '14px', backgroundColor: 'rgba(239,68,68,0.05)',
              border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px'
            }}>
              <p style={{ color: '#ef4444', fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>"{flag.claim}"</p>
              <p style={{ color: '#8892a4', fontSize: '13px', marginBottom: '4px' }}>{flag.reason}</p>
              <p style={{ color: '#4a5568', fontSize: '12px', margin: 0 }}>Compound: {flag.compound}</p>
            </div>
          ))}
        </div>
      </div>

      {/* High Risk Findings */}
      <div style={{
        backgroundColor: '#13151f', border: '1px solid rgba(249,115,22,0.3)',
        borderRadius: '12px', padding: '24px', marginBottom: '24px'
      }}>
        <h2 style={{ color: '#f97316', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          ⚠ High Risk Findings
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {redFlagClaims.filter(r => r.riskLevel === 'high').map(flag => (
            <div key={flag.id} style={{
              padding: '14px', backgroundColor: 'rgba(249,115,22,0.05)',
              border: '1px solid rgba(249,115,22,0.2)', borderRadius: '8px'
            }}>
              <p style={{ color: '#f97316', fontWeight: '600', fontSize: '14px', marginBottom: '6px' }}>"{flag.claim}"</p>
              <p style={{ color: '#8892a4', fontSize: '13px', marginBottom: '4px' }}>{flag.reason}</p>
              <p style={{ color: '#4a5568', fontSize: '12px', margin: 0 }}>Compound: {flag.compound}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Banned Compounds Summary */}
      <div style={{
        backgroundColor: '#13151f', border: '1px solid #1e2130',
        borderRadius: '12px', padding: '24px'
      }}>
        <h2 style={{ color: '#fff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
          Banned / Unapproved Compound Summary
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
          {peptides.filter(p => p.fdaStatus === 'Not Approved').map(p => (
            <div key={p.id} style={{
              padding: '14px', backgroundColor: '#0f1117',
              border: '1px solid #1e2130', borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <p style={{ color: '#fff', fontWeight: '600', fontSize: '14px', margin: 0 }}>{p.name}</p>
                <span style={{
                  fontSize: '11px', padding: '2px 8px', borderRadius: '999px',
                  backgroundColor: riskColors[p.riskLevel]?.bg,
                  color: riskColors[p.riskLevel]?.text,
                  textTransform: 'uppercase', fontWeight: '600'
                }}>{p.riskLevel}</span>
              </div>
              <p style={{ color: '#4a5568', fontSize: '12px', margin: '0 0 6px' }}>{p.aliases.join(' · ')}</p>
              <p style={{ color: '#ef4444', fontSize: '12px', margin: 0 }}>✕ {p.fdaStatus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}