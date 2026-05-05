import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Dashboard from './pages/Dashboard'
import CompoundDatabase from './pages/CompoundDatabase'
import EnforcementTracker from './pages/EnforcementTracker'
import MarketingAnalyzer from './pages/MarketingAnalyzer'
import RedFlagReport from './pages/RedFlagReport'

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/database" element={<CompoundDatabase />} />
          <Route path="/enforcement" element={<EnforcementTracker />} />
          <Route path="/marketing" element={<MarketingAnalyzer />} />
          <Route path="/redflags" element={<RedFlagReport />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}

export default App
