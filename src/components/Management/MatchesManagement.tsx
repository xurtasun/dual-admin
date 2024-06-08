import { useCallback, useEffect } from 'react'
import { GrayContainer } from '../GrayContainer'
import { useManagementMatchesStore } from '../../store/managementMatches'
import { GroupMatchesContainer } from '../GroupMatchesContainer'
import { Loader } from '../Loader'
import { AddButton } from '../AddButton/AddButton'
import { AddMatchContainer } from '../AddMatchContainer'
import { useManagementStore } from '../../store/management'
import { groupMatchTypes } from '../../libs/utils'
import Modal from '@mui/material/Modal'

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

interface Props {
  tournamentId: string
  categoryId: string | null
}
export const MatchesManagement = ({ tournamentId, categoryId }: Props) => {
  const tournament = useManagementStore((state) => state.tournament)
  const matchLastDatetime = useManagementStore((state) => state.matchLastDatetime)
  const setTournamentId = useManagementMatchesStore((state) => state.setTournamentId)
  const match = useManagementMatchesStore((state) => state.match)
  const setMatch = useManagementMatchesStore((state) => state.setMatch)
  const setCategoryId = useManagementMatchesStore((state) => state.setCategoryId)
  const getGroupsMatchesByTournamentAndCategory = useManagementMatchesStore((state) => state.getGroupsMatchesByTournamentAndCategory)
  const getTeamsByTournamentAndCategory = useManagementMatchesStore((state) => state.getTeamsByTournamentAndCategory)
  const groups = useManagementMatchesStore((state) => state.groups)
  const matchesLoading = useManagementMatchesStore((state) => state.matchesLoading)
  const newMatch = {
    datetime: (matchLastDatetime && new Date(matchLastDatetime)) || (tournament ? new Date(tournament.date[0]) : ''),
    teams: [],
    groupId: '',
    type: 'Group',
    tournament: tournamentId,
    category: categoryId,
    placeholders: []
  }

  const refreshData = useCallback(() => {
    getGroupsMatchesByTournamentAndCategory()
    getTeamsByTournamentAndCategory()
  }, [getGroupsMatchesByTournamentAndCategory, getTeamsByTournamentAndCategory])

  useEffect(() => {
    if (tournamentId && categoryId) {
      setTournamentId(tournamentId)
      setCategoryId(categoryId)
      refreshData()
    }
  }, [tournamentId, categoryId, setCategoryId, setTournamentId, refreshData])
  if (matchesLoading) {
    return <Loader />
  }
  return (
    <GrayContainer style={{ minWidth: 600, position: 'relative', flexDirection: 'column', alignItems: 'flex-start' }}>
      {
        !match && <AddButton text='Añadir partido' onClick={() => setMatch({ match: newMatch })} style={{ width: 160, marginBottom: 20 }} />
      }
      <div className='flexRow' style={styles.flexRow}>
        <div className='groups' style={{ ...styles.flexRow, justifyContent: 'flex-start' }}>
          {
            groups.map((group) => {
              return (
                <GroupMatchesContainer group={group} key={group._id} setMatch={setMatch} refreshData={refreshData} />
              )
            })
          }
        </div>
        {
          match &&
            <Modal open={!!match}>
              <AddMatchContainer match={match} setMatch={setMatch} refreshData={refreshData} matchTypes={[...groupMatchTypes]} />
            </Modal>
        }
      </div>
    </GrayContainer>
  )
}
