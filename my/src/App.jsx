import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Welcome } from './components/WelcomeWindow/welcome'
import './App.css'
import { HomePage } from './components/HomePage/HomePage'
import {
  AchievementsContent,
  BeginningContent,
  GamesContent,
  CreationsContent,
  LogsContent
} from './components/contentTabs'
import { AchievementsProvider } from './components/contentTabs/AchievementsContent/ContextControlAchievements'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Welcome />} />
          <Route path='/HomePage'
            element={
              <AchievementsProvider>
                <HomePage />
              </AchievementsProvider>
            } >
            <Route path='beginning' element={<BeginningContent />} />
            <Route path='logs' element={<LogsContent />} />
            <Route path='achievements' element={<AchievementsContent />} />
            <Route path='creations' element={<CreationsContent />} />
            <Route path='games' element={<GamesContent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
