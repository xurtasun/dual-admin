import { useEffect } from 'react'
import { useManagementGroupsStore } from '../../store/managementGroups'
import { GrayContainer } from '../GrayContainer'
import { Loader } from '../Loader'
import { AddButton } from '../AddButton/AddButton'
import { GroupContainer } from '../GroupContainer'
import { AddGroupContainer } from '../AddGroupContainer'

interface Props {
  tournamentId: string
  categoryId: string | null
}
interface Styles {
  flexRow: React.CSSProperties
}
const styles: Styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    gap: 20,
    width: '100%'
  }
}
export const GroupsManagement = ({ tournamentId, categoryId }: Props) => {
  const teamsSelector = useManagementGroupsStore((state) => state.teamsSelector)
  const groups = useManagementGroupsStore((state) => state.groups)
  const groupsLoading = useManagementGroupsStore((state) => state.groupsLoading)
  const setTournamentId = useManagementGroupsStore((state) => state.setTournamentId)
  const setCategoryId = useManagementGroupsStore((state) => state.setCategoryId)
  const getGroupsByTournamentAndCategory = useManagementGroupsStore((state) => state.getGroupsByTournamentAndCategory)
  const getTeamsByTournamentAndCategory = useManagementGroupsStore((state) => state.getTeamsByTournamentAndCategory)

  const group = useManagementGroupsStore((state) => state.newGroup)
  const setNewGroup = useManagementGroupsStore((state) => state.setNewGroup)
  const copyFullTeams = useManagementGroupsStore((state) => state.copyFullTeams)

  const addGroup = {
    name: null,
    teams: []
  }

  const handleAddGroup = () => {
    setNewGroup(addGroup)
    copyFullTeams()
  }

  useEffect(() => {
    if (tournamentId && categoryId) {
      setTournamentId(tournamentId)
      setCategoryId(categoryId)
      getGroupsByTournamentAndCategory()
      getTeamsByTournamentAndCategory()
    }
  }, [getGroupsByTournamentAndCategory, tournamentId, categoryId, setCategoryId, setTournamentId, getTeamsByTournamentAndCategory])

  if (groupsLoading) {
    return <Loader />
  }
  return (

    <GrayContainer style={{ minWidth: 600, position: 'relative', flexDirection: 'column', alignItems: 'flex-start' }}>
      {
        !group && <AddButton text='Añadir grupo' onClick={handleAddGroup} style={{ width: 150, marginBottom: 20 }} />
      }
      <div className='flexRow' style={styles.flexRow}>
        <div className='groups' style={{ ...styles.flexRow, justifyContent: 'flex-start' }}>
          {
            groups.map((group) => {
              return (
                <GroupContainer group={group} key={group._id} />
              )
            })
          }
        </div>
        <div className='groups' style={{ ...styles.flexRow, justifyContent: 'flex-start' }}>
          {group && <AddGroupContainer group={group} editMode teams={teamsSelector} />}
        </div>
      </div>

    </GrayContainer>
  )
}
