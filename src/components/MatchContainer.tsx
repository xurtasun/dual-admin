import { useState } from 'react'
import { useManagementMatchesStore } from '../store/managementMatches'
import { IMatch } from '../types.d/match'
import { DeleteIcon } from './Icons/DelteIcon'
import { EditIcon } from './Icons/EditIcon'
import { ConfirmationDialog } from './ConfirmationDialog'
import { useManagementStore } from '../store/management'

interface Props {
  match: IMatch
  groupId?: string
  setMatch: ({ match, groupId }: { match: IMatch, groupId?: string }) => void
  refreshData: () => void
}

interface Styles {
  matchContainer: React.CSSProperties
  matchHeader: React.CSSProperties
  matchTeams: React.CSSProperties
  matchResult: React.CSSProperties
  matchPlayers: React.CSSProperties
  matchPlayer: React.CSSProperties
  teamWinner: React.CSSProperties
  teamLoser: React.CSSProperties
  match: React.CSSProperties
  actions: React.CSSProperties
  matchSelected: React.CSSProperties
}
const styles: Styles = {
  matchContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    border: '3px solid var(--dualpadel-light-gray)',
    padding: 12,
    minWidth: 220
  },
  matchSelected: {
    border: '3px solid var(--dualpadel-gray)',
    background: 'var(--dualpadel-light-gray)'

  },
  matchHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    fontSize: 12,
    color: 'var(--dualpadel-color)',
    fontWeight: 'bold',
    borderBottom: '2px solid var(--dualpadel-color)'
  },
  matchTeams: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
    fontSize: 13,
    color: 'var(--dualpadel-color)'
  },
  matchResult: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 5,
    marginTop: 10,
    fontWeight: 'bold'
  },
  matchPlayers: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 5
  },
  matchPlayer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  teamWinner: {
    fontWeight: 'bold'
  },
  teamLoser: {
    fontWeight: 'bold',
    color: 'var(--dualpadel-gray)'
  },
  match: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 6
  }
}
export const MatchContainer = ({ match, groupId, setMatch, refreshData }: Props) => {
  const matchSelected = useManagementMatchesStore(state => state.match)
  const deleteMatch = useManagementMatchesStore(state => state.deleteMatch)
  const teamsInMatch = 2
  const tournament = useManagementStore(state => state.tournament)
  const getDialogText = (match: IMatch) => {
    return {
      title: 'Eliminar grupo',
      text: `¿Estás seguro que quieres eliminar el partido de la ${match.courtName} a las ${new Date(match.datetime).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} el ${new Date(match.datetime).toLocaleDateString('es-ES', { weekday: 'long', day: '2-digit', month: 'long' })}?`,
      disclaimer: 'Esta acción no se puede deshacer. Deberás crear un nuevo partido.'
    }
  }
  const confirmDelete = () => {
    deleteMatch(match._id, refreshData)
    setOpenDeleteConfirmDialog(false)
  }
  const [openDeleteConfirmDialog, setOpenDeleteConfirmDialog] = useState(false)
  return (
    <div className='matchContainer' style={matchSelected?._id === match._id ? { ...styles.matchContainer, ...styles.matchSelected } : { ...styles.matchContainer }}>
      <div className='matchHeader' style={styles.matchHeader}>
        <span>{match.courtName}</span>
        <span>{new Date(match.datetime).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className='match' style={styles.match}>
        <div className='matchTeams' style={styles.matchTeams}>
          {
            [...Array(teamsInMatch).keys()].map((index) => {
              return (
                <div className='matchTeam' key={`${index}`}>
                  {
                    match.teams[index]
                      ? (
                        <div className='matchPlayers' style={match.winner ? match.winner === match.teams[index]._id ? { ...styles.matchPlayers, ...styles.teamWinner } : { ...styles.matchPlayers, ...styles.teamLoser } : styles.matchPlayers}>
                          {match.teams[index].players.map(player => (
                            <div className='matchPlayer' key={player._id} style={styles.matchPlayer}>
                              <span>{player.name} {player.lastName}</span>
                            </div>
                          ))}
                        </div>
                        )
                      : (
                        <div className='matchPlayers' style={styles.matchPlayers}>
                          <div className='matchPlayer' style={styles.matchPlayer}>
                            <span>{match.placeholders[index]}</span>
                          </div>
                          <div className='matchPlayer' style={styles.matchPlayer}>
                            <span>{match.placeholders[index]}</span>
                          </div>
                        </div>
                        )
                  }

                  {
                    index === 0 && (
                      <div className='matchResult' style={styles.matchResult}>
                        {
                          match.result.length > 0
                            ? match.result.map((set, index) => {
                              return (
                                <div key={index} style={{ fontSize: 14 }}>
                                  {set}
                                  {
                                  index < match.result.length - 1 && (
                                    <span style={{ marginLeft: 5 }}>/</span>
                                  )

                                }
                                </div>
                              )
                            })
                            : tournament?.sets && [...Array(tournament?.sets)].map((_, index) => {
                              return (
                                <div key={index} style={{ fontSize: 14 }}>
                                  ----
                                  {
                                  index < tournament?.sets - 1 && (
                                    <span style={{ marginLeft: 5 }}>/</span>
                                  )

                                }
                                </div>
                              )
                            })
                        }
                      </div>
                    )
                  }
                </div>
              )
            })
          }
        </div>
        <div className='actions' style={styles.actions}>
          <EditIcon styles={{ color: 'gold', fontSize: 22 }} onClick={() => setMatch({ match, groupId })} />
          <DeleteIcon styles={{ color: 'red', fontSize: 22 }} onClick={() => setOpenDeleteConfirmDialog(true)} />
        </div>
      </div>
      {openDeleteConfirmDialog && <ConfirmationDialog dialogText={getDialogText(match)} open={openDeleteConfirmDialog} handleClose={() => setOpenDeleteConfirmDialog(false)} handleConfirmation={() => confirmDelete()} />}
    </div>
  )
}
