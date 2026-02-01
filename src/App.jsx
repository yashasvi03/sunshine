import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Page1to3_Combined from './components/Page1-3_Combined'
import Page4_26Reasons from './components/Page4_26Reasons'
import Page5_Timeline from './components/Page5_Timeline'
import Page6_BirthdayCake from './components/Page6_BirthdayCake'
import Page7_GiftReveal from './components/Page7_GiftReveal'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/unlock" replace />} />
        <Route path="/unlock" element={<Page1to3_Combined />} />
        <Route path="/birthday-facts" element={<Navigate to="/unlock" replace />} />
        <Route path="/countdown" element={<Navigate to="/unlock" replace />} />
        <Route path="/reasons" element={<Page4_26Reasons />} />
        <Route path="/timeline" element={<Page5_Timeline />} />
        <Route path="/cake" element={<Page6_BirthdayCake />} />
        <Route path="/gift" element={<Page7_GiftReveal />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
