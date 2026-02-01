import { useState } from 'react'
import Page1_Unlock from './components/Page1_Unlock'
import Page2_BirthdayFacts from './components/Page2_BirthdayFacts'
import Page3_Countdown from './components/Page3_Countdown'
import Page4_26Reasons from './components/Page4_26Reasons'
import Page5_Timeline from './components/Page5_Timeline'
import Page6_BirthdayCake from './components/Page6_BirthdayCake'
import Page7_GiftReveal from './components/Page7_GiftReveal'
import { personalInfo } from './data/personalInfo'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageProgress, setPageProgress] = useState({
    1: { visited: true, completed: false },
    2: { visited: false, completed: false },
    3: { visited: false, completed: false },
    4: { visited: false, completed: false },
    5: { visited: false, completed: false },
    6: { visited: false, completed: false },
    7: { visited: false, completed: false }
  })

  const goToNextPage = () => {
    setPageProgress(prev => ({
      ...prev,
      [currentPage]: { ...prev[currentPage], completed: true },
      [currentPage + 1]: { ...prev[currentPage + 1], visited: true }
    }))
    setCurrentPage(prev => prev + 1)
  }

  const renderPage = () => {
    switch(currentPage) {
      case 1:
        return <Page1_Unlock onComplete={goToNextPage} />
      case 2:
        return <Page2_BirthdayFacts onComplete={goToNextPage} />
      case 3:
        return <Page3_Countdown onComplete={goToNextPage} />
      case 4:
        return <Page4_26Reasons onComplete={goToNextPage} />
      case 5:
        return <Page5_Timeline onComplete={goToNextPage} />
      case 6:
        return <Page6_BirthdayCake onComplete={goToNextPage} />
      case 7:
        return <Page7_GiftReveal onComplete={goToNextPage} />
      default:
        return <Page1_Unlock onComplete={goToNextPage} />
    }
  }

  return (
    <div className="App">
      {renderPage()}
    </div>
  )
}

export default App
