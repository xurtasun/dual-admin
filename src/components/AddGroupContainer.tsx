import { IGroup } from '../types.d/group'
import { SaveIcon } from './Icons/SaveIcon'
import { CloseIcon } from './Icons/CloseIcon'
import { Input } from './Input'
import { ITeam } from '../types.d/team'
import { TeamSelector } from './TeamSelector'
import { useManagementGroupsStore } from '../store/managementGroups'
import { AddIcon } from './Icons/AddIcon'
import { useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'

interface Styles {
  groupContainer: React.CSSProperties
  groupHeader: React.CSSProperties
  teamContainer: React.CSSProperties
  team: React.CSSProperties
  teamScoring: React.CSSProperties
  flexRow: React.CSSProperties
  actions: React.CSSProperties
}

const styles: Styles = {
  groupContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    padding: 12
  },
  groupHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  team: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20
  },
  teamContainer: {
    border: '3px solid var(--dualpadel-light-gray)',
    gap: 20,
    alignItems: 'center'
  },
  teamScoring: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 100,
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    color: 'var(--dualpadel-color)'
  }
}
interface Props {
  group: IGroup
  editMode?: boolean
  teams: ITeam[]
}

export const AddGroupContainer = ({ group, teams }: Props) => {
  const addTeamToNewGroup = useManagementGroupsStore((state) => state.addTeamToNewGroup)
  const updateTeamToNewGroup = useManagementGroupsStore((state) => state.updateTeamToNewGroup)
  const setNewGroup = useManagementGroupsStore((state) => state.setNewGroup)
  const saveGroup = useManagementGroupsStore((state) => state.saveGroup)
  const deleteNewGroup = useManagementGroupsStore((state) => state.deleteNewGroup)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [editingGroup, _setEditingGroup] = useState(!!group._id)

  const handleTeamSelectorChange = (e: SelectChangeEvent) => {
    addTeamToNewGroup(e.target.value)
    setShowAddIcon(false)
  }

  const handleTeamSelectorEdit = (e: SelectChangeEvent, oldTeam: ITeam) => {
    updateTeamToNewGroup(e.target.value, oldTeam)
    setShowAddIcon(false)
  }

  const handleSaveGroup = () => {
    console.log('save')
    saveGroup()
  }

  const [showAddIcon, setShowAddIcon] = useState(true)

  useEffect(() => {
    console.log(group)
  }, [group])
  return (
    <div className='groupContainer' style={styles.groupContainer}>
      <div className='groupHeader' style={styles.groupHeader}>
        Nuevo Grupo
        <div className='actions' style={styles.actions}>
          <SaveIcon onClick={() => handleSaveGroup()} />
          <CloseIcon onClick={() => deleteNewGroup()} />
        </div>
      </div>
      <div className='teams' style={styles.team}>
        <Input placeholder='Nombre del grupo' onChange={(e) => setNewGroup({ name: e.target.value })} defaultValue={editingGroup ? group.name : undefined} />
        {
          group?.teams.map((team, index) => {
            return (
              <div className='flexRow' style={styles.flexRow} key={`${team._id}-${index}`}>
                <TeamSelector teams={teams} value={team} styles={{ border: '1px red' }} onChange={(e) => handleTeamSelectorEdit(e, team)} />
                {
                  index === group.teams.length - 1 && !showAddIcon && <AddIcon styles={{ cursor: 'pointer' }} onClick={() => setShowAddIcon(true)} />
                }
              </div>
            )
          })
        }
        {
          showAddIcon && !editingGroup &&
            <div className='flexRow' style={styles.flexRow}>
              <TeamSelector teams={teams} value={null} styles={{ border: '1px red' }} onChange={handleTeamSelectorChange} />
              <AddIcon styles={{ cursor: 'pointer' }} onClick={() => setShowAddIcon(true)} />
            </div>
        }

      </div>
    </div>

  )
}
