import './App.css'
// import { useClientStore } from './store/client'
import { Auth } from './pages/Auth/AuthPage'
import { Suspense, useEffect, useState } from 'react'
import { isMobile, isTablet } from 'react-device-detect'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { PlayersPage } from './pages/Players/PlayersPage'
import { ProtectedRoute } from './components/ProtectedRoutes'
import { useAuthStore } from './store/auth'
import { Sonner } from './components/Sonner'
import { TournamentsPage } from './pages/Tournaments/TournamentsPage'
import { CategoryPage } from './pages/Categories/CategoryPage'
import { TournamentDetail } from './pages/TournamentDetail/TournamentDetail'
import { TournamentNew } from './pages/TournamentNew/TournamentNew'
import { TournamentManagement } from './pages/TournamentManagement/TournamentManagement'
import { ContactPage } from './pages/ContactPage/ContactPage'

function App () {
  const isAuth = useAuthStore(state => state.isAuth)
  const getMe = useAuthStore(state => state.getMe)
  const [validationAuth, setValidationAuth] = useState(true)

  useEffect(() => {
    console.log('isMobile', isMobile, 'isTablet', isTablet)
  }, [])
  useEffect(() => {
    const unauthenticatedRoutes = [
      '/login',
      '/suscription'
    ]
    if (!isAuth && !unauthenticatedRoutes.includes(window.location.pathname)) {
      getMe()
        .catch(err => console.log(err))
    }
    setValidationAuth(false)
  }, [getMe, isAuth])

  if (validationAuth) {
    return <div>Loading...</div>
  }
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Auth isTablet={isTablet} isMobile={isMobile} />} />
            <Route element={<ProtectedRoute isAllowed={isAuth} />}>
              <Route path='/' element={<PlayersPage isTablet={isTablet} isMobile={isMobile} />} />
              <Route path='/tournaments' element={<TournamentsPage isTablet={isTablet} isMobile={isMobile} />} />
              <Route path='/categories' element={<CategoryPage isTablet={isTablet} isMobile={isMobile} />} />
              <Route path='/tournaments/add' element={<TournamentNew isTablet={isTablet} isMobile={isMobile} />} />
              <Route path='/tournaments/:tournamentId' element={<TournamentDetail isTablet={isTablet} isMobile={isMobile} />} />
              <Route path='/tournaments/:tournamentId/management' element={<TournamentManagement isTablet={isTablet} isMobile={isMobile} />} />
              <Route path='/contact' element={<ContactPage isTablet={isTablet} isMobile={isMobile} />} />
              <Route path='/suscription' element={<ContactPage isTablet={isTablet} isMobile={isMobile} />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Sonner position={isAuth ? 'bottom-right' : 'bottom-center'} />
      </Suspense>
    </main>
  )
}

export default App
