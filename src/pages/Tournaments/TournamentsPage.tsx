import { Pagination } from '@material-ui/lab'
import { Finder } from '../../components/Finder/Finder'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { AddButton } from '../../components/AddButton/AddButton'
import { useTournamentsStore } from '../../store/tournaments'
import { useEffect } from 'react'
import { Tournament } from '../../components/Tournament'
import { ITournament } from '../../types.d/tournament'
import { useNavigate } from 'react-router-dom'

interface Styles {
  page: React.CSSProperties
  container: React.CSSProperties
  content: React.CSSProperties
  tournaments: React.CSSProperties
  flex_row: React.CSSProperties
  addButton: React.CSSProperties
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
  },
  tournaments: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9
  },
  flex_row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  addButton: {
    cursor: 'pointer',
    filter: 'var(--dualpadel-filter-drop-shadow)',
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    color: 'var(--dualpadel-gray)',
    padding: 15
  }
}

interface Props {
  isTablet?: boolean
  isMobile?: boolean
}
export const TournamentsPage = ({ isTablet, isMobile }: Props) => {
  const tournaments = useTournamentsStore(state => state.tournaments)
  const getTournaments = useTournamentsStore(state => state.getTournaments)

  const navigate = useNavigate()

  useEffect(() => {
    getTournaments({})
  }, [getTournaments])

  const handleDetailTournament = (tournament: ITournament | null) => {
    tournament && navigate('/tournaments/' + tournament.id)
  }

  return (
    <div className='tournaments-page' style={styles.page}>
      <Sidebar isMobile={isMobile} isTablet={isTablet} />
      <div className='tournaments-container' style={styles.container}>
        <Navbar />
        <div className='tournaments-content' style={styles.content}>
          <div className='flex-row' style={{ ...styles.flex_row, justifyContent: 'space-between' }}>
            <Finder type='text' placeholder='Buscar torneo...' name='finder' />
            <Pagination style={{ marginLeft: 'auto' }} />
            <AddButton text='Nuevo Torneo' style={{ ...styles.addButton, cursor: 'pointer' }} onClick={() => navigate('/tournaments/add')} />
          </div>
          <div className='flex-row' style={{ ...styles.flex_row, marginTop: 19, alignItems: 'flex-start' }}>
            <div className='tournaments' style={styles.tournaments}>
              {
                tournaments.length > 0 && tournaments.map((tournament, index) => {
                  return (
                    <Tournament key={index} tournament={tournament} handleDetailTournament={(handleDetailTournament)} />
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
