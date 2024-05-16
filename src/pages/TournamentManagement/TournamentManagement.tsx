import { useEffect, useState } from 'react'
import { Management } from '../../components/Management/Management'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { useCategoriesStore } from '../../store/categories'
import { useParams } from 'react-router-dom'
import { Fullscreen } from '../../components/Icons/Fullscreen'
import { FullscreenExit } from '../../components/Icons/FullscreenExit'
interface Styles {
  page: React.CSSProperties
  container: React.CSSProperties
  content: React.CSSProperties
}
const styles: Styles = {
  page: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    width: '100%'
  },
  content: {
    margin: '24px 24px 24px 0px',
    position: 'relative'
  }
}
interface Props {
  isTablet?: boolean
  isMobile?: boolean
}
export const TournamentManagement = ({ isTablet, isMobile }: Props) => {
  const { tournamentId } = useParams()
  const categories = useCategoriesStore(state => state.categories)
  const getCategoriesByTournamentId = useCategoriesStore(state => state.getCategoriesByTournamentId)
  const setTournamentId = useCategoriesStore(state => state.setTournamentId)

  const [fullScreen, setFullScreen] = useState(false)

  useEffect(() => {
    tournamentId && setTournamentId(tournamentId)
    tournamentId && getCategoriesByTournamentId()
  }, [tournamentId, getCategoriesByTournamentId, setTournamentId])
  return (
    <div className='tournament-page' style={styles.page}>
      {
        !fullScreen && <Sidebar isMobile={isMobile} isTablet={isTablet} />

      }
      <div className='tournament-container' style={styles.container}>
        {
          !fullScreen && <Navbar />
        }
        <div className='tournaments-content' style={styles.content}>
          {
            fullScreen
              ? <FullscreenExit styles={{ top: 20, right: 20, position: 'absolute', zIndex: 100, fontSize: 30, cursor: 'pointer' }} onClick={() => setFullScreen(!fullScreen)} />
              : <Fullscreen styles={{ top: 20, right: 20, position: 'absolute', zIndex: 100, fontSize: 30, cursor: 'pointer' }} onClick={() => setFullScreen(!fullScreen)} />
          }
          {
            tournamentId && categories.length !== 0 ? <Management categories={categories} tournamentId={tournamentId} isMobile={isMobile} /> : 'No data'
          }
        </div>
      </div>
    </div>
  )
}
