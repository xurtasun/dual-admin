import React, { useEffect } from 'react'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { usePlayersStore } from '../../store/players'
import { Finder } from '../../components/Finder/Finder'
import { Player } from '../../components/Player'
import { PlayerDetail } from '../../components/PlayerDetail/PlayerDetail'
import { IPlayer } from '../../types.d/player'
import { useTeamsStore } from '../../store/teams'
import { Pagination } from '@material-ui/lab'

interface Styles {
  page: React.CSSProperties
  container: React.CSSProperties
  content: React.CSSProperties
  players: React.CSSProperties
  flex_row: React.CSSProperties
}
const styles: Styles = {
  page: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    width: '100%'
  },
  content: {
    margin: '24px 24px 24px 0px'
  },
  players: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 9,
    gap: 9
  },
  flex_row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
}
interface Props {
  isTablet?: boolean
  isMobile?: boolean
}
export const PlayersPage = ({ isTablet, isMobile }: Props) => {
  const getPlayers = usePlayersStore(state => state.getPlayers)
  const playersPage = usePlayersStore(state => state.playersPage)
  const setPlayersPage = usePlayersStore(state => state.setPlayersPage)
  const players = usePlayersStore(state => state.players)
  const playerDetail = usePlayersStore(state => state.playerDetail)
  const playersPageTotal = usePlayersStore(state => state.playersPageTotal)
  const setPlayerDetail = usePlayersStore(state => state.setPlayerDetail)
  const setTeamsInPlayerDetail = useTeamsStore(state => state.setTeamsInPlayerDetail)
  const playerFilterValue = usePlayersStore(state => state.playerFilterValue)
  const setPlayerFilterValue = usePlayersStore(state => state.setPlayerFilterValue)
  const playerFilter = usePlayersStore(state => state.playerFilter)
  const setPlayerFilter = usePlayersStore(state => state.setPlayerFilter)

  const handleChangeFinder = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerFilterValue(e.target.value)
    const { value } = e.target
    console.log(value)
    if (value.length > 2 || value.length === 0) {
      const findByMultipleWords = value.split(' ')
      if (findByMultipleWords.length > 1) {
        setPlayerFilter({
          $and: findByMultipleWords.map((word: string) => ({
            $or: [
              { name: { $regex: word, $options: 'i' } },
              { lastName: { $regex: word, $options: 'i' } }
            ]
          }))
        })
      } else {
        setPlayerFilter({
          $or: [
            { name: { $regex: value, $options: 'i' } },
            { lastName: { $regex: value, $options: 'i' } }
          ]
        })
      }
      setPlayersPage(0)
    }
  }
  const handleResetFilter = () => {
    setPlayerFilterValue('')
    setPlayerFilter({})
    setPlayersPage(0)
  }
  const handleDetailPlayer = (player: IPlayer | null) => {
    setTeamsInPlayerDetail([])
    setPlayerDetail(player)
  }

  useEffect(() => {
    console.log(playerFilter)
    getPlayers({ filter: playerFilter })
  }, [playerFilter, getPlayers, playersPage, playerFilterValue])
  return (
    <div className='players-page' style={styles.page}>
      <Sidebar isMobile={isMobile} isTablet={isTablet} />
      <div className='players-container' style={styles.container}>
        <Navbar />
        <div className='players-content' style={styles.content}>
          <div className='flex-row' style={{ ...styles.flex_row, justifyContent: 'space-between' }}>
            <Finder type='text' placeholder='Buscar jugador...' name='finder' onChange={handleChangeFinder} onClickClose={handleResetFilter} value={playerFilterValue} />
            <Pagination count={playersPageTotal} onChange={(_e, page) => setPlayersPage(page - 1)} />
          </div>
          <div className='flex-row' style={{ ...styles.flex_row, alignItems: 'flex-start' }}>
            <div className='players' style={styles.players}>
              {
                players?.map((player) => (
                  <Player key={player._id} player={player} handleDetailPlayer={handleDetailPlayer} />
                ))
              }
            </div>
            {
              playerDetail && (
                <div className='detail-player'>
                  <PlayerDetail player={playerDetail} />
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}
