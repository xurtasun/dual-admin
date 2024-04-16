import { useState } from 'react'
import { IGroup } from '../types.d/group'
import { DeleteIcon } from './Icons/DelteIcon'
import { EditIcon } from './Icons/EditIcon'
import { TrophyIcon } from './Icons/TrophyIcon'
import { TeamContainer } from './TeamContainer'
import { ConfirmationDialog } from './ConfirmationDialog'
import { useManagementGroupsStore } from '../store/managementGroups'

interface Styles {
  groupContainer: React.CSSProperties
  groupHeader: React.CSSProperties
  teamContainer: React.CSSProperties
  teams: React.CSSProperties
  teamScoring: React.CSSProperties
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
  teams: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20
  },
  teamContainer: {
    border: '3px solid var(--dualpadel-light-gray)',
    gap: 12,
    alignItems: 'center'
  },
  teamScoring: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 40,
    textAlign: 'right',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10
  }
}
interface Props {
  group: IGroup
}
export const GroupContainer = ({ group }: Props) => {
  const [openConfirmation, setOpenConfirmation] = useState(false)
  const deleteGroup = useManagementGroupsStore((state) => state.deleteGroup)
  const setNewGroup = useManagementGroupsStore((state) => state.setNewGroup)
  const copyTeams = useManagementGroupsStore((state) => state.copyTeams)
  const handleDelete = () => {
    setOpenConfirmation(true)
  }
  const getDialogText = (group: IGroup) => {
    return {
      title: 'Eliminar grupo',
      text: `¿Estás seguro que quieres eliminar el grupo ${group.name}?`,
      disclaimer: 'Esta acción no se puede deshacer. Deberás crear un nuevo grupo para añadir los equipos a un nuevo grupo.'
    }
  }

  const handleConfirmDelete = () => {
    setOpenConfirmation(false)
    deleteGroup(group._id)
  }
  const handleEditGroup = () => {
    const newGroup = structuredClone(group)
    setNewGroup(newGroup)
    copyTeams(newGroup)
  }
  return (
    <div className='groupContainer' style={styles.groupContainer}>
      <div className='groupHeader' style={styles.groupHeader}>

        <span>{group.name}</span>

        <div className='actions'>
          <EditIcon onClick={() => handleEditGroup()} />
          <DeleteIcon onClick={() => handleDelete()} />
        </div>
      </div>
      <div className='teams' style={styles.teams}>
        {
          group.teams.sort((a, b) => b.scoring - a.scoring).map((team) => {
            return (
              <TeamContainer team={team} key={team._id} style={styles.teamContainer}>
                <TrophyIcon />
                <div className='teamScoring' style={styles.teamScoring}>
                  {team.scoring}
                </div>
              </TeamContainer>
            )
          })
        }
      </div>
      <ConfirmationDialog open={openConfirmation} handleClose={() => setOpenConfirmation(false)} dialogText={getDialogText(group)} handleConfirmation={handleConfirmDelete} />
    </div>

  )
}
