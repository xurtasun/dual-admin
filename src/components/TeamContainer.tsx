import Avatar from '@mui/material/Avatar'
import { ITeam } from '../types.d/team'
import { stringAvatar } from '../libs/stringAvatar'
import Checkbox from '@mui/material/Checkbox'
import { TShirtIcon } from './Icons/ShirtIcon'
import { ImageIcon } from './Icons/ImageIcon'
import { Tooltip } from '@mui/material'

interface Styles {
  team_container: React.CSSProperties
  players_container: React.CSSProperties
  player_container: React.CSSProperties
  team_player: React.CSSProperties
  team_player_name: React.CSSProperties
  team_player_price: React.CSSProperties
  checkbox: React.CSSProperties
  team_player_tshirt: React.CSSProperties
}
const styles: Styles = {
  players_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '100%',
    gap: 10
  },
  team_container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    padding: 12,
    gap: 50
  },
  player_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 31
  },
  team_player_name: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 120
  },
  team_player_price: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 5
  },
  team_player: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5
  },
  checkbox: {
    width: 30,
    height: 30,
    color: 'red'
  },
  team_player_tshirt: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 50
  }
}
interface Props {
  team: ITeam
  children?: React.ReactNode
  showPayment?: boolean
  enableManagement?: boolean
  handlePayment?: (playerId: string, teamId: string, checked: boolean) => void
  style?: React.CSSProperties
}
const AVATAR_SIZE = 30
export const TeamContainer = ({ team, children, showPayment, enableManagement, handlePayment, style }: Props) => {
  return (
    <div className='team-container' style={{ ...styles.team_container, ...style }} key={team._id}>
      <Tooltip title={team._id} placement='top'>
        <div className='players-container' style={styles.players_container}>
          {
                team.players.map((player, index) => {
                  return (
                    <div key={index} className='team-player-container' style={styles.player_container}>
                      <div className='team-player' style={styles.team_player}>
                        <Avatar {...stringAvatar({ name: `${player.name} ${player.lastName}`, size: AVATAR_SIZE, fontSize: 22 })} />
                        <span className='team-player-name' style={styles.team_player_name}>{player.name.toLowerCase()} {player.lastName.toLowerCase()}</span>
                      </div>
                      {
                        showPayment && (
                          <div className='team-player-price' style={styles.team_player_price}>
                            <span style={{ whiteSpace: 'nowrap' }}>{player.price} €</span>
                            <Checkbox disabled checked={team.payed.includes(player._id)} style={{ padding: 0 }} />
                          </div>
                        )
                      }
                      {
                        enableManagement && handlePayment && (
                          <>
                            <div className='team-player-price' style={styles.team_player_price}>
                              <span style={{ whiteSpace: 'nowrap' }}>{player.price} €</span>
                              <Checkbox checked={team.payed.includes(player._id)} style={{ padding: 0 }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePayment(player._id, team._id, e.target.checked)} />
                            </div>
                            <div className='team-player-tshirt' style={styles.team_player_tshirt}>
                              <TShirtIcon />
                              {player.size}
                            </div>
                            <div className='team-player-photos' style={styles.team_player_tshirt}>
                              <ImageIcon />
                              <Checkbox disabled checked={player.images} style={{ padding: 0 }} />
                            </div>
                          </>

                        )
                      }
                    </div>
                  )
                })
              }
        </div>
      </Tooltip>
      {children}
    </div>
  )
}
