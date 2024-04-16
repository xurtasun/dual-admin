import { ITournament } from '../types.d/tournament'
import { CalendarIcon } from './Icons/CalendarIcon'
import { EyeIcon } from './Icons/EyeIcon'
import { GroupIcon } from './Icons/GroupIcon'
import { HomeIcon } from './Icons/HomeIcon'
import { LocationIcon } from './Icons/LocationIcon'
import { ManageAccountsIcon } from './Icons/ManageAccountsIcon'
import { ScheduleIcon } from './Icons/ScheduleIcon'
interface Props {
  tournament: ITournament
  handleDetailTournament: (tournament: ITournament | null) => void
}
interface Styles {
  container: React.CSSProperties
  info: React.CSSProperties
  title: React.CSSProperties
  data: React.CSSProperties
  flex: React.CSSProperties
  detail: React.CSSProperties
  img: React.CSSProperties
  text: React.CSSProperties
}
const styles: Styles = {
  container: {
    minWidth: 571,
    width: 'calc(50% - 65px)',
    height: 261 - (28 * 2),
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
    width: 165,
    height: 'calc(261px - 28px*2)',
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
  }
}
export const Tournament = ({ tournament, handleDetailTournament }: Props) => {
  return (
    <div className='tournament' style={styles.container}>
      <div className='tournament-info' style={styles.info}>
        <div className='tournament-poster'>
          <img src={tournament.image} alt='poster' style={styles.img} />
        </div>
        <div className='player-eye' style={styles.detail}>
          <EyeIcon styles={{ cursor: 'pointer' }} onClick={() => handleDetailTournament(tournament)} />
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
                  tournament.date.length > 1
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
        </div>

      </div>
    </div>
  )
}
