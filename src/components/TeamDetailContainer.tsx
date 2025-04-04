import Avatar from '@mui/material/Avatar'
import { ITeam } from '../types.d/team'
import { stringAvatar } from '../libs/stringAvatar'
import { RestrictionsTeam } from './RestrictionsTeam/RestrictionsTeam'
import { GrayContainer } from './GrayContainer'
import { CloseIcon } from './Icons/CloseIcon'
import { DeleteIcon } from './Icons/DelteIcon'
import { EditIcon } from './Icons/EditIcon'
import { SyntheticEvent, useState } from 'react'
import { Selector } from './Selector/Selector'
import { ICategory } from '../types.d/category'
import { SaveIcon } from './Icons/SaveIcon'
import { SelectChangeEvent } from '@mui/material/Select'
import { useManagementTeamsStore } from '../store/managementTeams'
import { IRestriction } from '../types.d/restriction'
import { AutocompleteComponent } from './Autocomplete/Autocomplete'

interface Props {
  team: ITeam
  showPayment?: boolean
  enableManagement?: boolean
  setTeamToManage: (team: ITeam | null) => void
  deleteTeam: () => void
  categories: ICategory[]
}
interface Styles {
  container: React.CSSProperties
  playersHeader: React.CSSProperties
  playerHeader: React.CSSProperties
}
const styles: Styles = {
  container: {
    width: 'calc(98% - 25px)',
    height: '100%',
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    padding: 28,
    margin: 2,
    position: 'relative'
  },
  playersHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 120
  },
  playerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10

  }

}

const AVATAR_SIZE = 60
export const TeamDetailContainer = ({ team, setTeamToManage, deleteTeam, categories }: Props) => {
  const players = useManagementTeamsStore((state) => state.players)
  const playersSearched = useManagementTeamsStore((state) => state.playersSearched)

  const [editMode, setEditMode] = useState(false)
  const updateTeam = useManagementTeamsStore(state => state.updateTeam)
  const searchPlayers = useManagementTeamsStore(state => state.searchPlayers)
  const updateTeamRestrictions = useManagementTeamsStore(state => state.updateTeamRestrictions)
  const getCategoryNameById = (id: string, placeholder: string) => {
    const category = categories.find((category) => category._id === id)
    return category?.parent?.name || placeholder
  }

  const getCategoryById = (id: string) => {
    const category = categories.find((category) => category._id === id)
    if (!category) return null
    return category
  }
  const handleOnChangeCategory = (e: SelectChangeEvent) => {
    const category = getCategoryById(e.target.value)
    if (!category) return
    setTeamToManage({ ...team, category })
  }
  const handleSaveTeam = () => {
    console.log('save team')
    setEditMode(false)
    updateTeam(team)
  }
  const handleUpdateRestrictions = (restrictions: IRestriction[]) => {
    updateTeamRestrictions(restrictions)
  }
  const getPlayerNameFromId = (id: string | number | readonly string[]) => {
    const player = players.find((player) => player._id === id)
    if (!player) {
      const searchedPlayer = playersSearched.find((player) => player._id === id)
      return searchedPlayer ? `${searchedPlayer.name} ${searchedPlayer.lastName}` : id
    }
    return player ? `${player.name} ${player.lastName}` : id
  }
  const getPlayerFromId = (id: string) => {
    const player = players.find((player) => player._id === id)
    if (!player) {
      const searchedPlayer = playersSearched.find((player) => player._id === id)
      return searchedPlayer
    }
    return player
  }
  const handleChangePlayer = (_event: SyntheticEvent<Element, Event>, value: string | null, oldValue: string) => {
    console.log('handleChangePlayer', value, oldValue)
    const playersTeamIdToUpdate = team.players.map((player) => {
      console.log(player._id, oldValue)
      if (value === null || value === '') return player
      if (player._id === oldValue) {
        return getPlayerFromId(value) || player
      } else {
        return player
      }
    })
    console.log(playersTeamIdToUpdate)
    setTeamToManage({ ...team, players: playersTeamIdToUpdate })
  }
  const handleSearchPlayers = (value: string) => {
    if (value.length > 3) {
      searchPlayers(value)
    }
  }
  return (
    <div className='container' style={styles.container}>
      <div className='playersHeader' style={editMode ? { ...styles.playersHeader, gap: 30 } : styles.playersHeader}>
        {
        team.players.map((player, index) => {
          return (
            <div className='player' key={player._id} style={styles.playerHeader}>
              {
                editMode
                  ? <>
                    <AutocompleteComponent
                      label='Jugador'
                      options={playersSearched.map((player) => player._id)}
                      value={player._id}
                      onChange={handleChangePlayer}
                      onInputChange={(_event: SyntheticEvent<Element, Event>, value: string) => handleSearchPlayers(value)}
                      placeholder='Jugador'
                      disabled
                      error={false}
                      helperText=''
                      index={index}
                      getTextFromId={getPlayerNameFromId}
                    />
                  </>
                  : <>
                    <Avatar {...stringAvatar({ name: `${player.name} ${player.lastName}`, size: AVATAR_SIZE })} />
                    <div className='playerName'>
                      {player.name} {player.lastName}
                    </div>
                  </>
              }

            </div>
          )
        })
        }
      </div>

      {editMode &&
        <div className='category-container' style={{ marginTop: 20 }}>
          <Selector value={team.category._id} styles={{ width: 160 }} onChange={handleOnChangeCategory} getValueFromId={getCategoryNameById} options={categories.map((category) => { return ({ _id: category._id, name: category.parent?.name }) })} placeholder='Categoria' />
        </div>}
      <GrayContainer style={{ marginTop: 20 }}>
        <RestrictionsTeam restrictions={team.restrictions} updateRestrictions={handleUpdateRestrictions} />
      </GrayContainer>
      <CloseIcon styles={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} onClick={() => setTeamToManage(null)} />
      <DeleteIcon styles={{ position: 'absolute', top: 10, right: 50, cursor: 'pointer', color: 'red' }} onClick={deleteTeam} />
      {!editMode && <EditIcon styles={{ position: 'absolute', top: 10, right: 90, cursor: 'pointer' }} onClick={() => setEditMode(true)} />}
      {editMode && <SaveIcon styles={{ position: 'absolute', top: 10, right: 90, cursor: 'pointer' }} onClick={handleSaveTeam} />}
    </div>
  )
}
