import React from 'react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Dashboard', icon: 'DB' },
  { path: '/database', label: 'Compound Database', icon: 'CD' },
  { path: '/enforcement', label: 'Enforcement Tracker', icon: 'ET' },
  { path: '/marketing', label: 'Marketing Analyzer', icon: 'MA' },
  { path: '/redflags', label: 'Red Flag Report', icon: 'RF', badge: 'PDF' },
]

function getNavStyle(isActive) {
  return {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '8px 12px', borderRadius: '8px', fontSize: '14px',
    textDecoration: 'none',
    color: isActive ? '#22d3ee' : '#8892a4',
    backgroundColor: isActive ? 'rgba(6,182,212,0.1)' : 'transparent',
    border: isActive ? '1px solid rgba(6,182,212,0.2)' : '1px solid transparent',
  }
}

function Layout(props) {
  return React.createElement('div',
    { style: { display: 'flex', minHeight: '100vh', backgroundColor: '#0f1117' } },
    React.createElement('aside',
      { style: { width: '240px', backgroundColor: '#13151f', borderRight: '1px solid #1e2130', display: 'flex', flexDirection: 'column', position: 'fixed', height: '100vh', overflowY: 'auto' } },
      React.createElement('div',
        { style: { padding: '20px', borderBottom: '1px solid #1e2130' } },
        React.createElement('div',
          { style: { display: 'flex', alignItems: 'center', gap: '12px' } },
          React.createElement('div',
            { style: { width: '32px', height: '32px', backgroundColor: '#06b6d4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold', fontSize: '14px' } },
            'P'
          ),
          React.createElement('div', null,
            React.createElement('div', { style: { color: '#fff', fontWeight: 'bold', fontSize: '14px' } }, 'PeptideWatch'),
            React.createElement('div', { style: { color: '#4a5568', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' } }, 'Regulatory Intelligence')
          )
        )
      ),
      React.createElement('nav',
        { style: { flex: 1, padding: '16px' } },
        React.createElement('p', { style: { color: '#4a5568', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', paddingLeft: '8px' } }, 'Navigation'),
        React.createElement('ul',
          { style: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' } },
          navItems.map(function(item) {
            return React.createElement('li', { key: item.path },
              React.createElement(NavLink,
                { to: item.path, end: item.path === '/', style: function(s) { return getNavStyle(s.isActive) } },
                React.createElement('span', { style: { fontSize: '10px', backgroundColor: '#1e2130', padding: '2px 5px', borderRadius: '4px', color: '#4a5568' } }, item.icon),
                React.createElement('span', { style: { flex: 1 } }, item.label),
                item.badge ? React.createElement('span', { style: { fontSize: '11px', backgroundColor: '#1e2130', color: '#4a5568', padding: '2px 6px', borderRadius: '4px' } }, item.badge) : null
              )
            )
          })
        )
      ),
      React.createElement('div',
        { style: { padding: '16px' } },
        React.createElement('div',
          { style: { backgroundColor: 'rgba(234,179,8,0.1)', border: '1px solid rgba(234,179,8,0.2)', borderRadius: '8px', padding: '12px' } },
          React.createElement('p', { style: { color: '#facc15', fontSize: '12px', margin: 0 } }, 'For informational purposes only. Not legal or medical advice.')
        ),
        React.createElement('p', { style: { color: '#2d3748', fontSize: '11px', marginTop: '16px', paddingLeft: '4px' } }, 'Updated Apr 2026')
      )
    ),
    React.createElement('main',
      { style: { marginLeft: '240px', flex: 1, padding: '32px' } },
      props.children
    )
  )
}

export default Layout