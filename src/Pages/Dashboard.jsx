import { peptides, enforcementActions, redFlagClaims, regulatoryTimeline, keyIntelligence } from '../data'

export default function Dashboard() {
  const stats = [
    { label: 'Compounds Tracked', value: peptides.length, icon: '⚗', color: 'cyan' },
    { label: 'FDA Approved', value: peptides.filter(p => p.fdaStatus === 'FDA Approved').length, icon: '✓', color: 'green' },
    { label: 'Enforcement Actions', value: enforcementActions.length, icon: '⚠', color: 'yellow' },
    { label: 'Red Flag Claims', value: redFlagClaims.length, icon: '✕', color: 'red' },
  ]

  const colorMap = {
    cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    green: 'text-green-400 bg-green-500/10 border-green-500/20',
    yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
  }

  const timelineColors = {
    blue: 'bg-blue-400',
    red: 'bg-red-400',
    yellow: 'bg-yellow-400',
    green: 'bg-green-400',
    orange: 'bg-orange-400',
  }

  const intelligenceColors = {
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
    orange: 'text-orange-400',
  }

  const intelligenceIcons = {
    shield: '🛡',
    warning: '⚠',
    danger: '☠',
    info: 'ℹ',
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs border border-cyan-500/30 text-cyan-400 px-2 py-1 rounded">Updated April 2026</span>
        <span className="text-xs border border-[#2d3748] text-[#8892a4] px-2 py-1 rounded">FDA · FTC · DEA Data</span>
      </div>
      <h1 className="text-3xl font-bold text-white mb-2">Peptide Legality & Risk Engine</h1>
      <p className="text-[#8892a4] mb-8 max-w-2xl">
        Real regulatory intelligence on semaglutide, tirzepatide, BPC-157, ibutamoren, CJC-1295, and 10+ other compounds. Pulls from FDA warning letters, 503A/503B rules, clinical trial data, and FTC enforcement actions.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map(stat => (
          <div key={stat.label} className={`border rounded-xl p-5 ${colorMap[stat.color]}`}>
            <p className="text-xs uppercase tracking-widest mb-2 opacity-70">{stat.label}</p>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-2xl opacity-60">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline + Key Intelligence */}
      <div className="grid grid-cols-2 gap-6">
        {/* Regulatory Timeline */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
            <span className="text-yellow-400">⚠</span> Regulatory Timeline
          </h2>
          <div className="space-y-4">
            {regulatoryTimeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-right w-20 shrink-0">
                  <span className="text-[#4a5568] text-xs">{item.date}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full mt-0.5 shrink-0 ${timelineColors[item.color] || 'bg-gray-400'}`} />
                  {i < regulatoryTimeline.length - 1 && <div className="w-px flex-1 bg-[#1e2130] mt-1" />}
                </div>
                <p className="text-[#a0aec0] text-xs pb-3">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Intelligence */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-xl p-6">
          <h2 className="text-white font-semibold mb-5 flex items-center gap-2">
            <span className="text-cyan-400">⚗</span> Key Intelligence
          </h2>
          <div className="space-y-5">
            {keyIntelligence.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className={`mt-0.5 shrink-0 ${intelligenceColors[item.color]}`}>
                  {intelligenceIcons[item.icon]}
                </span>
                <div>
                  <p className={`text-sm font-semibold mb-1 ${intelligenceColors[item.color]}`}>{item.title}</p>
                  <p className="text-[#8892a4] text-xs leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}