import { useEffect } from 'react'
import { Management } from '../../components/Management/Management'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { useCategoriesStore } from '../../store/categories'
import { useParams } from 'react-router-dom'
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
    margin: '24px 24px 24px 0px'
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

  useEffect(() => {
    tournamentId && setTournamentId(tournamentId)
    tournamentId && getCategoriesByTournamentId()
  }, [tournamentId, getCategoriesByTournamentId, setTournamentId])
  return (
    <div className='tournament-page' style={styles.page}>
      <Sidebar isMobile={isMobile} isTablet={isTablet} />
      <div className='tournament-container' style={styles.container}>
        <Navbar />
        <div className='tournaments-content' style={styles.content}>
          {
            tournamentId && categories.length !== 0 ? <Management categories={categories} tournamentId={tournamentId} /> : 'No data'
          }
        </div>
      </div>
    </div>
  )
}
