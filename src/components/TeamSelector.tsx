import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Avatar, SxProps } from '@mui/material'
import { ITeam } from '../types.d/team'
import { stringAvatar } from '../libs/stringAvatar'

interface Props {
  teams?: ITeam[]
  styles?: React.CSSProperties
  value: ITeam | null
  onChange?: (event: SelectChangeEvent, child: React.ReactNode) => void
  direction?: 'row' | 'column'
}
interface ChildrenProps {
  team: ITeam | null
  direction?: 'row' | 'column'
  styles?: React.CSSProperties
}
const selectorStyle: SxProps = {
  minWidth: 150,
  borderRadius: 15,
  height: 80,
  width: 380,
  padding: '25px 10px',
  '& .MuiOutlinedInput-notchedOutline': {
    border: '3px solid var(--background-color)'
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: '3px solid var(--dualpadel-gray)'
  }
}
interface SelectorStyle {
  selectorPlayers: React.CSSProperties
  selectorPlayer: React.CSSProperties
  selectorPlayerName: React.CSSProperties
}
const childrenStyle: SelectorStyle = {
  selectorPlayers: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  },
  selectorPlayer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 5
  },
  selectorPlayerName: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 120

  }
}
const TeamSelectorChildren = ({ team, direction, styles }: ChildrenProps) => {
  const selectorPlayerName = direction === 'column' ? { width: 160 } : {}
  return (
    <div className='selectorPlayers' style={{ ...childrenStyle.selectorPlayers, flexDirection: direction, ...styles }}>
      {
        team?.players.map((player) => {
          return (
            <div className='player' key={player._id} style={childrenStyle.selectorPlayer}>
              <Avatar {...stringAvatar({ name: `${player.name} ${player.lastName}`, size: 30, fontSize: 22 })} />
              <div key={player._id} className='playerName' style={selectorPlayerName}>{player.name} {player.lastName}</div>
            </div>
          )
        })
      }
    </div>
  )
}
export const TeamSelector = ({ teams, styles, onChange, value, direction }: Props) => {
  const selectorStyleColumn = direction === 'column' ? { ...selectorStyle, width: 300, ...styles } : { ...selectorStyle, ...styles }
  return (
    <div
      className='selector'
    >
      <Select
        value={value?._id}
        onChange={onChange}
        sx={selectorStyleColumn}
        renderValue={(_) => <TeamSelectorChildren team={value} direction={direction} styles={{ gap: 5 }} />}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {
          teams?.map((team) => {
            return (
              <MenuItem value={team._id} key={team._id}><TeamSelectorChildren team={team} /></MenuItem>
            )
          })
        }
      </Select>
    </div>
  )
}
