import { IPlayer } from '../types.d/player'
import Avatar from '@mui/material/Avatar'
import { Phone } from './Phone'
import { stringAvatar } from '../libs/stringAvatar'
import { MailIcon } from './Icons/MailIcon'
import { TShirtIcon } from './Icons/ShirtIcon'
import { TournamentsIcon } from './Icons/TournamentsIcon'
import { EyeIcon } from './Icons/EyeIcon'
import { EyeClosedIcon } from './Icons/EyeclosedIcon'
import { usePlayersStore } from '../store/players'
import { Tooltip } from '@mui/material'
interface Styles {
  container: React.CSSProperties
  info: React.CSSProperties
  name: React.CSSProperties
  data: React.CSSProperties
  flex: React.CSSProperties
  detail: React.CSSProperties
}
interface Props {
  player: IPlayer
  handleDetailPlayer: (player: IPlayer | null) => void
}

const styles: Styles = {
  container: {
    width: 310 - (28 * 2),
    height: 261 - (28 * 2),
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    filter: 'var(--dualpadel-filter-drop-shadow)',
    padding: 28,
    margin: 2,
    position: 'relative'
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 12,
    paddingTop: 21
  },
  name: {
    fontSize: 17,
    fontWeight: 600
  },
  data: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
}

const AVATAR_SIZE = 50

export const Player = ({ player, handleDetailPlayer }: Props) => {
  const playerDetail = usePlayersStore(state => state.playerDetail)
  if (!player) return null
  return (
    <div className='player' style={styles.container}>
      <Avatar {...stringAvatar({ name: `${player.name} ${player.lastName}`, size: AVATAR_SIZE })} />
      <div className='player-eye' style={styles.detail}>
        {
          playerDetail?._id === player._id
            ? <EyeClosedIcon styles={{ cursor: 'pointer' }} onClick={() => handleDetailPlayer(null)} />
            : <EyeIcon styles={{ cursor: 'pointer' }} onClick={() => handleDetailPlayer(player)} />
        }
      </div>
      <div className='info' style={styles.info}>
        <Tooltip title={player._id} placement='top'>
          <div className='name' style={styles.name}>{player.name} {player.lastName}</div>
        </Tooltip>
        <div className='data' style={styles.data}>
          <Phone phone={player.phone} />
        </div>
        <div className='data' style={styles.data}>
          <MailIcon />
          <div className='email' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: 200 }}>{player.email}</div>
        </div>
        <div className='flex' style={styles.flex}>
          <div className='data' style={styles.data}>
            <TShirtIcon />
            <div className='size'>{player.size}</div>
          </div>
          <div className='data' style={styles.data}>
            <TournamentsIcon />
            <div className='tournaments'>{player.tournaments.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
