import { useEffect, useState } from 'react'
import { TeamContainer } from '../TeamContainer'
import { EyeIcon } from '../Icons/EyeIcon'
import { useManagementTeamsStore } from '../../store/managementTeams'
import { TeamDetailContainer } from '../TeamDetailContainer'
import { GrayContainer } from '../GrayContainer'
import { Loader } from '../Loader'
import { ConfirmationDialog } from '../ConfirmationDialog'
import { ITeam } from '../../types.d/team'
import { EyeClosedIcon } from '../Icons/EyeclosedIcon'
import { ICategory } from '../../types.d/category'

interface Props {
  tournamentId: string
  categoryId: string | null
  categories: ICategory[]
}
interface Styles {
  container: React.CSSProperties
  teamsList: React.CSSProperties
  resumeHeader: React.CSSProperties
  resumeText: React.CSSProperties
  flexRow: React.CSSProperties
}
const styles: Styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  teamsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  resumeHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    padding: '12px 20px',
    gap: 65
  },
  resumeText: {
    color: 'var(--dualpadel-gray-2)',
    fontSize: '1.2rem',
    fontWeight: 500
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20
  }
}
export const PlayersManagement = ({ tournamentId, categoryId, categories }: Props) => {
  const teams = useManagementTeamsStore((state) => state.teams)
  const getTeamsByTournamentAndCategory = useManagementTeamsStore((state) => state.getTeamsByTournamentAndCategory)
  const teamsLoading = useManagementTeamsStore((state) => state.teamsLoading)

  const setTournamentId = useManagementTeamsStore((state) => state.setTournamentId)
  const setCategoryId = useManagementTeamsStore((state) => state.setCategoryId)

  const updateTeamPayment = useManagementTeamsStore((state) => state.updateTeamPayment)
  const teamToManage = useManagementTeamsStore((state) => state.teamToManage)
  const setTeamToManage = useManagementTeamsStore((state) => state.setTeamToManage)

  const deleteTeam = useManagementTeamsStore((state) => state.deleteTeam)

  const playersNumber = useManagementTeamsStore((state) => state.playersNumber)
  const playersPayedNumber = useManagementTeamsStore((state) => state.playersPayedNumber)
  const playersPendingNumber = useManagementTeamsStore((state) => state.playersPendingNumber)

  const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState(false)

  useEffect(() => {
    if (tournamentId && categoryId) {
      setTournamentId(tournamentId)
      setCategoryId(categoryId)
      getTeamsByTournamentAndCategory()
    }
  }, [getTeamsByTournamentAndCategory, tournamentId, categoryId, setCategoryId, setTournamentId])

  const getDialogText = (team: ITeam) => {
    if (!team._id) return null
    return {
      title: 'Eliminar equipo',
      text: `¿Estás seguro que quieres eliminar el equipo ${team._id}?`,
      disclaimer: 'Esta acción no se puede deshacer. El equipo sera borrado del torneo.'
    }
  }

  const handleDeleteConfirmation = (teamId: string) => {
    return () => {
      deleteTeam(teamId)()
      setDeleteConfirmationDialog(false)
    }
  }
  if (teamsLoading) {
    return <Loader />
  }
  return (
    <GrayContainer>
      <div className='container' style={styles.container}>
        <div className='flexRow' style={styles.flexRow}>
          <div className='resumeHeader' style={styles.resumeHeader}>
            <div className='resumeText' style={styles.resumeText}>
              Jugadores: {playersNumber}
            </div>
            <div className='resumeText' style={styles.resumeText}>
              Pagado: {playersPayedNumber}
            </div>
            <div className='resumeText' style={styles.resumeText}>
              Pendiente: {playersPendingNumber}
            </div>
          </div>
        </div>
        <div className='flexRow' style={styles.flexRow}>
          <div className='teamsList' style={styles.teamsList}>
            {
              teams?.map((team) => {
                return (
                  <TeamContainer team={team} key={team._id} enableManagement handlePayment={updateTeamPayment}>
                    <div className='TeamDetail'>
                      {
                        teamToManage?._id === team._id
                          ? <EyeClosedIcon styles={{ cursor: 'pointer', fontSize: 20 }} onClick={() => setTeamToManage(null)} />
                          : <EyeIcon styles={{ cursor: 'pointer', fontSize: 20 }} onClick={() => setTeamToManage(team)} />
                      }
                    </div>
                  </TeamContainer>
                )
              })
            }
          </div>
          {
              teamToManage &&
                <TeamDetailContainer team={teamToManage} setTeamToManage={setTeamToManage} deleteTeam={() => setDeleteConfirmationDialog(true)} categories={categories} />
            }
        </div>

      </div>

      {deleteConfirmationDialog && teamToManage && <ConfirmationDialog open={deleteConfirmationDialog} dialogText={getDialogText(teamToManage)} handleConfirmation={handleDeleteConfirmation(teamToManage._id)} handleClose={() => setDeleteConfirmationDialog(false)} />}

    </GrayContainer>
  )
}
