import { useManagementStore } from '../store/management'
import { useManagementMatchesStore } from '../store/managementMatches'
import { IMatch } from '../types.d/match'

interface Props {
  match?: IMatch
  stylesInput?: React.CSSProperties
  refreshData?: () => void
  isMobile?: boolean
}
interface Styles {
  matchScheduleContainer: React.CSSProperties
  matchHeader: React.CSSProperties
  matchTeams: React.CSSProperties
  matchResult: React.CSSProperties
  matchPlayers: React.CSSProperties
  matchPlayer: React.CSSProperties
  teamWinner: React.CSSProperties
  teamLoser: React.CSSProperties
  matchScheduleBody: React.CSSProperties
  matchFinished: React.CSSProperties
  matchPlaying: React.CSSProperties
}
const styles: Styles = {
  matchScheduleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    background: 'var(--dualpadel-white)',
    border: '3px solid var(--dualpadel-light-gray)',
    position: 'absolute',
    padding: 12,
    cursor: 'pointer'
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
    marginTop: 5,
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
    alignItems: 'flex-start',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 160
  },
  teamWinner: {
    fontWeight: 'bold'
  },
  teamLoser: {
    fontWeight: 'bold',
    color: 'var(--dualpadel-gray)'
  },
  matchScheduleBody: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  matchFinished: {
    backgroundColor: 'var(--dualpadel-light-gray)',
    borderColor: 'var(--dualpadel-gray)'
  },
  matchPlaying: {
    backgroundColor: '#92ed1b26',
    borderColor: '#92ed1b2e'
  }
}
export const MatchScheduleContainer = ({ match, stylesInput, refreshData, isMobile }: Props) => {
  const teamsInMatch = 2
  const tournament = useManagementStore((state) => state.tournament)
  const updateMatch = useManagementMatchesStore((state) => state.updateMatch)
  const setMatch = useManagementMatchesStore((state) => state.setMatch)
  const setCategoryId = useManagementMatchesStore((state) => state.setCategoryId)
  const finished = !!match?.winner
  const playing = !!match?.playing
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!match) return
    switch (e.detail) {
      case 1:
        console.log('single click')
        break
      case 2:
        console.log('double click')
        if (!refreshData) return
        updateMatch({ ...match, playing: !match.playing }, refreshData)
        break
      case 3:
        console.log('triple click')
        setCategoryId(match.category._id)
        setMatch({ match })
        break
      default:
        break
    }
  }
  if (!match?.category) return null
  return (
    <div className='matchScheduleContainer' style={finished ? { ...styles.matchScheduleContainer, ...stylesInput, ...styles.matchFinished } : playing ? { ...styles.matchScheduleContainer, ...stylesInput, ...styles.matchPlaying } : { ...styles.matchScheduleContainer, ...stylesInput }} onClick={handleClick}>
      <div className='matchScheduleHeader' style={styles.matchHeader}>
        <span>{match.category.parent ? match.category.parent?.name : match.category.name}</span>
        <span>{match.type}</span>
      </div>
      <div className='matchScheduleBody' style={styles.matchScheduleBody}>
        <div className='matchTeams' style={styles.matchTeams}>
          {
            [...Array(teamsInMatch).keys()].map((index) => {
              const matchPlayerStyles = isMobile ? { ...styles.matchPlayer, width: 120 } : styles.matchPlayer
              return (
                <div className='matchTeam' key={`${index}`}>
                  {
                    match.teams[index]
                      ? (
                        <div className='matchPlayers' style={match.winner ? match.winner === match.teams[index]._id ? { ...styles.matchPlayers, ...styles.teamWinner } : { ...styles.matchPlayers, ...styles.teamLoser } : styles.matchPlayers}>
                          {match.teams[index].players.map(player => (
                            <div className='matchPlayer' key={player._id} style={matchPlayerStyles}>
                              <span>{player.name} {player.lastName}</span>
                            </div>
                          ))}
                        </div>
                        )
                      : (
                        <div className='matchPlayers' style={styles.matchPlayers}>
                          <div className='matchPlayer' style={matchPlayerStyles}>
                            <span>{match.placeholders[index]}</span>
                          </div>
                          <div className='matchPlayer' style={matchPlayerStyles}>
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
      </div>
    </div>
  )
}
