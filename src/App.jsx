import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AudioProvider } from './context/AudioContext'
import Page1_Unlock from './components/Page1_Unlock'
import Page2_BirthdayFacts from './components/Page2_BirthdayFacts'
import Page3_Countdown from './components/Page3_Countdown'
import Page4_26Reasons from './components/Page4_26Reasons'
import Page5_Timeline from './components/Page5_Timeline'
import Page6_BirthdayCake from './components/Page6_BirthdayCake'
import Page7_GiftReveal from './components/Page7_GiftReveal'

function App() {
  return (
    <AudioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/unlock" replace />} />
          <Route path="/unlock" element={<Page1_Unlock />} />
          <Route path="/birthday-facts" element={<Page2_BirthdayFacts />} />
          <Route path="/countdown" element={<Page3_Countdown />} />
          <Route path="/reasons" element={<Page4_26Reasons />} />
          <Route path="/timeline" element={<Page5_Timeline />} />
          <Route path="/cake" element={<Page6_BirthdayCake />} />
          <Route path="/gift" element={<Page7_GiftReveal />} />
        </Routes>
      </BrowserRouter>
    </AudioProvider>
  )
}

export default App
