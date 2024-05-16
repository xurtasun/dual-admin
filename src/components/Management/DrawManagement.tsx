import { useEffect } from 'react'
import { GrayContainer } from '../GrayContainer'
import { MatchContainer } from '../MatchContainer'
import './DrawManagement.scss'
import { AddButton } from '../AddButton/AddButton'
import { AddMatchContainer } from '../AddMatchContainer'
import { useManagementStore } from '../../store/management'
import { useManagementMatchesStore } from '../../store/managementMatches'
import { Loader } from '../Loader'
import { finalMatchTypes } from '../../libs/utils'
import Modal from '@mui/material/Modal'

interface Props {
  tournamentId: string
  categoryId: string | null
}

interface Styles {
  flexRow: React.CSSProperties
  drawContainer: React.CSSProperties
  finalType: React.CSSProperties
  finalTypeTitle: React.CSSProperties
  finalMatchDraw: React.CSSProperties
}
const HEIGHT_MATCH = 177

const styles: Styles = {
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    gap: 20,
    width: '100%'
  },
  drawContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 50,
    width: '100%',
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    padding: '20px 20px'
  },
  finalType: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 20
  },
  finalTypeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'var(--dualpadel-color)'
  },
  finalMatchDraw: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  }
}

export const DrawManagement = ({ tournamentId, categoryId }: Props) => {
  const tournament = useManagementStore((state) => state.tournament)
  const matchLastDatetime = useManagementStore((state) => state.matchLastDatetime)
  const matchLastType = useManagementStore((state) => state.matchLastType)

  const setTournamentId = useManagementMatchesStore((state) => state.setTournamentId)
  const setCategoryId = useManagementMatchesStore((state) => state.setCategoryId)

  const finalMatches = useManagementMatchesStore((state) => state.finalMatches)
  const finalMatchesLoading = useManagementMatchesStore((state) => state.finalMatchesLoading)
  const getFinalMatchesByTournamentAndCategory = useManagementMatchesStore((state) => state.getFinalMatchesByTournamentAndCategory)
  const getTeamsByTournamentAndCategory = useManagementMatchesStore((state) => state.getTeamsByTournamentAndCategory)

  const setMatch = useManagementMatchesStore((state) => state.setMatch)
  const match = useManagementMatchesStore((state) => state.match)

  const newMatch = {
    datetime: (matchLastDatetime && new Date(matchLastDatetime)) || (tournament ? new Date(tournament.date[0]) : ''),
    teams: [],
    groupId: '',
    type: matchLastType || 'Group',
    tournament: tournamentId,
    category: categoryId,
    placeholders: []
  }
  useEffect(() => {
    setTournamentId(tournamentId)
    setCategoryId(categoryId)
    getFinalMatchesByTournamentAndCategory()
    getTeamsByTournamentAndCategory()
  }, [tournamentId, categoryId, setTournamentId, setCategoryId, getFinalMatchesByTournamentAndCategory, getTeamsByTournamentAndCategory])

  const translateMatchType = (matchType: string) => {
    switch (matchType) {
      case 'Eighth':
        return 'Octavos'
      case 'Fourth':
        return 'Cuartos'
      default:
        return matchType
    }
  }

  const sortMatchTypes = (a: string, b: string) => {
    if (a === 'Final') {
      return 1
    }
    if (b === 'Final') {
      return -1
    }
    if (a === 'Semifinal') {
      return 1
    }
    if (b === 'Semifinal') {
      return -1
    }
    if (a === 'Fourth') {
      return 1
    }
    if (b === 'Fourth') {
      return -1
    }
    if (a === 'Eighth') {
      return 1
    }
    if (b === 'Eighth') {
      return -1
    }
    return 0
  }
  if (finalMatchesLoading) {
    return <Loader />
  }
  return (
    <GrayContainer style={{ minWidth: 600, position: 'relative', flexDirection: 'column', alignItems: 'flex-start' }}>
      {
        !match && <AddButton text='Añadir partido' onClick={() => setMatch({ match: newMatch })} style={{ width: 160, marginBottom: 20 }} />
      }
      <div className='flexRow' style={styles.flexRow}>
        <div className='drawContainer' style={styles.drawContainer}>
          {
            finalMatches && Object.keys(finalMatches).sort(sortMatchTypes).map((key, typeIndex) => {
              return (
                <div className='finalType' style={styles.finalType} key={key}>
                  <div className='finalTypeTitle' style={styles.finalTypeTitle}>
                    {translateMatchType(key)}

                  </div>
                  {
                    finalMatches[key].map((match, matchIndex) => {
                      let marginTop = 0
                      switch (typeIndex) {
                        case 0:
                          marginTop = 0
                          break
                        case 1:
                          marginTop = matchIndex === 0 ? HEIGHT_MATCH * 0.5 : HEIGHT_MATCH * typeIndex
                          break
                        case 2:
                          marginTop = HEIGHT_MATCH * 1.5
                          break
                        case 3:
                          marginTop = HEIGHT_MATCH * 2.5
                          break
                      }
                      return (
                        <div className='finalMatchDraw' style={{ ...styles.finalMatchDraw, marginTop }} key={match._id}>
                          <MatchContainer match={match} key={match._id} setMatch={setMatch} refreshData={getFinalMatchesByTournamentAndCategory} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>

        {
          match &&
            <Modal open={!!match}>

              <AddMatchContainer match={match} setMatch={setMatch} refreshData={getFinalMatchesByTournamentAndCategory} matchTypes={finalMatchTypes} />
            </Modal>

        }
      </div>
    </GrayContainer>
  )
}
