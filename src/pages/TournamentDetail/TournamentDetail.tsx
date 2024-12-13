import { useNavigate, useParams } from 'react-router-dom'
import { CalendarIcon } from '../../components/Icons/CalendarIcon'
import { GroupIcon } from '../../components/Icons/GroupIcon'
import { HomeIcon } from '../../components/Icons/HomeIcon'
import { LocationIcon } from '../../components/Icons/LocationIcon'
import { ManageAccountsIcon } from '../../components/Icons/ManageAccountsIcon'
import { ScheduleIcon } from '../../components/Icons/ScheduleIcon'
import { useTournamentsStore } from '../../store/tournaments'
import { useEffect } from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Navbar } from '../../components/Navbar'
import { GrayContainer } from '../../components/GrayContainer'
import { CategoriesTournament } from '../../components/CategoriesTournament/CategoriesTournament'
import { useCategoriesStore } from '../../store/categories'
import { RestrictionsTournament } from '../../components/RestrictionsTournament/RestrictionsTournament'
import { PrincipalButton } from '../../components/PrincipalButton'
import { ToggleOn } from '../../components/Icons/ToggleOn'
import { ToggleOff } from '../../components/Icons/ToggleOff'
import { DownloadIcon } from '../../components/Icons/DownloadIcon'
import { EyeIcon } from '../../components/Icons/EyeIcon'

interface Styles {
  page: React.CSSProperties
  content: React.CSSProperties
  tournaments: React.CSSProperties
  flex_row: React.CSSProperties
  container: React.CSSProperties
  container_detail: React.CSSProperties
  info: React.CSSProperties
  title: React.CSSProperties
  data: React.CSSProperties
  flex: React.CSSProperties
  detail: React.CSSProperties
  img: React.CSSProperties
  text: React.CSSProperties
  button: React.CSSProperties
  buttons_container: React.CSSProperties
  download_button: React.CSSProperties
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
  container_detail: {
    minWidth: 730,
    width: 'calc(40% - 25px)',
    height: '100%',
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    filter: 'var(--dualpadel-filter-drop-shadow)',
    padding: 28,
    margin: 2
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 12
  },
  img: {
    width: 207,
    height: 'calc(314px - 28px*2)',
    borderRadius: 'var(--dualpadel-radius-4)'
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--dualpadel-color)',
    marginBottom: 15
  },
  data: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%'
  },
  detail: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 16,
    color: 'var(--dualpadel-gray)'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  button: {
    background: 'var(--dualpadel-color)',
    color: 'var(--dualpadel-white)',
    width: 100,
    height: 31,
    borderRadius: 'var(--dualpadel-radius-4)',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    marginTop: 0
  },
  buttons_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16
  },
  download_button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 12,
    gap: 3,
    cursor: 'pointer'
  }
}

interface Props {
  isTablet?: boolean
  isMobile?: boolean
}
export const TournamentDetail = ({ isTablet, isMobile }: Props) => {
  const { tournamentId } = useParams()
  const getTournamentById = useTournamentsStore(state => state.getTournamentById)
  const updateTournamentOpenRegistrations = useTournamentsStore(state => state.updateTournamentOpenRegistrations)
  const updateTournamentPublicTimetable = useTournamentsStore(state => state.updateTournamentPublicTimetable)
  const updateTournamentPublic = useTournamentsStore(state => state.updateTournamentPublic)
  const getCategoriesByTournamentId = useCategoriesStore(state => state.getCategoriesByTournamentId)
  const setTournamentId = useCategoriesStore(state => state.setTournamentId)
  const tournamentCategories = useCategoriesStore(state => state.categories)
  const tournament = useTournamentsStore(state => state.tournamentDetail)

  const downloadNamesList = useTournamentsStore(state => state.downloadNamesList)
  const downloadRestrictionsList = useTournamentsStore(state => state.downloadRestrictionsList)

  const navigate = useNavigate()

  const handleChangeOpenRegistrations = (actualValue: boolean) => {
    console.log('handleChangeOpenRegistrations', actualValue)
    updateTournamentOpenRegistrations(!actualValue)
  }

  const handleChangePublicTimetable = (actualValue: boolean) => {
    console.log('handleChangePublicTimetable', actualValue)
    updateTournamentPublicTimetable(!actualValue)
  }

  const handleChangeTournamentPublic = (actualValue: boolean) => {
    console.log('handleChangeTournamentPublic', actualValue)
    updateTournamentPublic(!actualValue)
  }

  useEffect(() => {
    tournamentId && setTournamentId(tournamentId)
    tournamentId && getTournamentById(tournamentId)
    tournamentId && getCategoriesByTournamentId()
  }, [getTournamentById, tournamentId, getCategoriesByTournamentId, setTournamentId])

  if (!tournament) return <div />
  return (
    <div className='tournament-page' style={styles.page}>
      <Sidebar isMobile={isMobile} isTablet={isTablet} />
      <div className='tournament-container' style={styles.container}>
        <Navbar />
        <div className='tournament-content' style={styles.content}>
          <div className='tournamentDetail-container' style={styles.container_detail}>
            <div className='tournament-info' style={styles.info}>
              <div className='tournament-poster'>
                <img src={tournament.image} alt='poster' style={styles.img} />
              </div>
              <div className='tournament-text' style={styles.text}>
                <div className='tournament-title' style={styles.title}>{tournament.name}</div>
                <div className='tournament-data' style={styles.data}>
                  <div className='tournament-location' style={{ ...styles.data }}>
                    <LocationIcon styles={{ color: 'var(--duapadel-color)' }} />
                    <div className='address'>{tournament.address}</div>
                  </div>
                </div>
                <div className='tournament-data' style={styles.data}>
                  <div className='tournament-clubName' style={{ ...styles.data }}>
                    <HomeIcon styles={{ color: 'var(--duapadel-color)' }} />
                    <div className='clubName'>{tournament.clubName}</div>
                  </div>
                </div>
                <div className='tournament-data' style={styles.data}>
                  <div className='tournament-calendar' style={{ ...styles.data }}>
                    <CalendarIcon styles={{ color: 'var(--duapadel-color)' }} />
                    <div className='calendar'>
                      {
                        tournament?.date && tournament.date.length > 1
                          ? 'del ' + new Date(tournament.date[0]).toLocaleDateString('es-ES', { day: 'numeric' }) + ' al ' + new Date(tournament.date[tournament.date.length - 1]).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
                          : new Date(tournament.date[tournament.date.length - 1]).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
                      }
                    </div>
                  </div>
                </div>
                <div className='tournament-data' style={styles.data}>
                  <div className='tournament-schedule' style={{ ...styles.data }}>
                    <ScheduleIcon styles={{ color: 'var(--duapadel-color)' }} />
                    <div className='schedule'>de {tournament.time[0]} a {tournament.time[1]}</div>
                  </div>
                </div>
                <div className='tournament-data' style={styles.data}>
                  <div className='tournament-location' style={{ ...styles.data }}>
                    <GroupIcon styles={{ color: 'var(--duapadel-color)' }} />
                    <div className='schedule'>{tournament.teams.length}</div>
                  </div>
                  <div className='tournament-location' style={{ ...styles.data }}>
                    <ManageAccountsIcon styles={{ color: 'var(--duapadel-color)' }} />
                    <div className='schedule'>{tournament.teamsTarget}</div>
                  </div>
                </div>
                <div className='tournament-data' style={styles.data}>
                  Inscripciones
                  {tournament.openRegistrations ? <ToggleOn styles={{ fontSize: 30, color: 'var(--dualpadel-color)' }} onClick={() => handleChangeOpenRegistrations(tournament.openRegistrations)} /> : <ToggleOff styles={{ fontSize: 30, color: 'var(--dualpadel-gray)' }} onClick={() => handleChangeOpenRegistrations(tournament.openRegistrations)} />}
                  Horarios
                  {tournament.publicTimetable ? <ToggleOn styles={{ fontSize: 30, color: 'var(--dualpadel-color)' }} onClick={() => handleChangePublicTimetable(tournament.publicTimetable)} /> : <ToggleOff styles={{ fontSize: 30, color: 'var(--dualpadel-gray)' }} onClick={() => handleChangePublicTimetable(tournament.publicTimetable)} />}
                  Publico
                  {tournament.public ? <ToggleOn styles={{ fontSize: 30, color: 'var(--dualpadel-color)' }} onClick={() => handleChangeTournamentPublic(tournament.public)} /> : <ToggleOff styles={{ fontSize: 30, color: 'var(--dualpadel-gray)' }} onClick={() => handleChangeTournamentPublic(tournament.public)} />}

                </div>
                <div className='tournament-management-button' style={styles.buttons_container}>
                  <PrincipalButton text='Gestión' onClick={() => navigate(location.pathname + '/management')} />
                  <div className='download-button' style={styles.download_button} onClick={() => downloadNamesList(tournament._id)}>
                    <DownloadIcon styles={{ color: 'var(--dualpadel-color)', cursor: 'pointer' }} />
                    Lista de nombres
                  </div>
                  <div className='download-button' style={styles.download_button} onClick={() => downloadRestrictionsList(tournament._id)}>
                    <DownloadIcon styles={{ color: 'var(--dualpadel-color)', cursor: 'pointer' }} />
                    Preferencias horarias
                  </div>
                  <div className='download-button' style={styles.download_button}>
                    <EyeIcon styles={{ color: 'var(--dualpadel-color)', cursor: 'pointer' }} />
                    Tallas Camisetas
                  </div>
                </div>
              </div>

            </div>
            <GrayContainer style={{ margin: '18px 0' }}>
              <CategoriesTournament categories={tournamentCategories} />
            </GrayContainer>
            <GrayContainer style={{ margin: '18px 0' }}>
              <RestrictionsTournament restrictions={tournament.restrictions} />
            </GrayContainer>
          </div>
        </div>
      </div>
    </div>

  )
}
