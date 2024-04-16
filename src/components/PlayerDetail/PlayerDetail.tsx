import Avatar from '@mui/material/Avatar'
import { IPlayer } from '../../types.d/player'
import { stringAvatar } from '../../libs/stringAvatar'
import { EditIcon } from '../Icons/EditIcon'
import { Phone } from '../Phone'
import { TShirtIcon } from '../Icons/ShirtIcon'
import { MailIcon } from '../Icons/MailIcon'
import { TrophyIcon } from '../Icons/TrophyIcon'
import { TShirtSelector } from '../TShirtSelector/TShirtSelector'
import { useScoringStore } from '../../store/scoring'
import { useEffect, useState } from 'react'
import { PlayerScoring } from '../PlayerScoring/PlayerScoring'
import { TeamsList } from './TeamsList'
import { useTeamsStore } from '../../store/teams'
import { Loader } from '../Loader'

import { styles } from './PlayerDetail.Styles'
import { useAuthStore } from '../../store/auth'
import { usePlayersStore } from '../../store/players'
import { CloseIcon } from '../Icons/CloseIcon'
import { Input } from '../Input'
import { SaveIcon } from '../Icons/SaveIcon'
import { PhoneIcon } from '../Icons/PhoneIcon'
import { RED_BORDER_VALIDATOR, EMAIL_REGEX_VALIDATOR } from '../../libs/validators'
import { AddUser } from '../Icons/AddUser'
import { SendIcon } from '../Icons/SendIcon'
import { Tooltip } from '@mui/material'
import { ImportDialog } from '../ImportDialog'
import { DeleteIcon } from '../Icons/DelteIcon'
import { ConfirmationDialog } from '../ConfirmationDialog'

interface Props {
  player: IPlayer
}

const AVATAR_SIZE = 80
const ICON_SIZE = 30
const sizes = ['S', 'M', 'L', 'XL', '2XL']
export const PlayerDetail = ({ player }: Props) => {
  const scoring = useScoringStore(state => state.scoring)
  const teamsInPlayerDetail = useTeamsStore(state => state.teamsInPlayerDetail)
  const loading = useTeamsStore(state => state.loading)
  const isAdmin = useAuthStore(state => state.isAdmin)
  const editMode = usePlayersStore(state => state.playerDetailEditMode)
  const setPlayerDetail = usePlayersStore(state => state.setPlayerDetail)
  const setPlayerDetailEditMode = usePlayersStore(state => state.setPlayerDetailEditMode)
  const getScoringByPlayerId = useScoringStore(state => state.getScoringByPlayerId)
  const getTeamsByPlayerId = useTeamsStore(state => state.getTeamsByPlayerId)
  const playerDetailForm = usePlayersStore(state => state.playerDetailForm)
  const setPlayerDetailFormErrors = usePlayersStore(state => state.setPlayerDetailFormErrors)
  const PlayerDetailFormErrors = usePlayersStore(state => state.playerDetailFormErrors)
  const updatePlayer = usePlayersStore(state => state.updatePlayer)
  const importPlayer = usePlayersStore(state => state.importPlayer)
  const deletePlayer = usePlayersStore(state => state.deletePlayer)

  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false)
  const [openImportDialog, setOpenImportDialog] = useState(false)
  const [playerIdToImport, setPlayerIdToImport] = useState<string | null>(null)

  useEffect(() => {
    getScoringByPlayerId(player.id)
    getTeamsByPlayerId(player.id)
  }, [getScoringByPlayerId, player.id, getTeamsByPlayerId])

  const handleSubmitClick = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const phone = formData.get('phone') as string
    const email = formData.get('email') as string
    const size = playerDetailForm.size
    updatePlayer(player.id, { phone, email, size })
    setPlayerDetailEditMode(false)
  }

  const handleOnChangeValidators = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    switch (name) {
      case 'phone':
        if (value.length > 9) {
          setPlayerDetailFormErrors({ phone: { message: 'El teléfono no puede tener más de 9 caracteres' } })
        } else {
          setPlayerDetailFormErrors({ phone: null })
        }
        break
      case 'email':
        if (!EMAIL_REGEX_VALIDATOR.test(value)) {
          setPlayerDetailFormErrors({ email: { message: 'El email no es válido' } })
        } else {
          setPlayerDetailFormErrors({ email: null })
        }
        break
      case 'size':
        if (!sizes.includes(value)) {
          setPlayerDetailFormErrors({ size: { message: 'La talla no es válida' } })
        } else {
          setPlayerDetailFormErrors({ size: null })
        }
        break
    }
  }

  const handleImportPlayer = () => {
    const form = document.getElementById('playerDetailForm') as HTMLFormElement
    const formData = new FormData(form)
    const importPlayerId = formData.get('importPlayerId') as string
    if (importPlayerId) {
      console.log('import player', importPlayerId)
      setPlayerIdToImport(importPlayerId)
      setOpenImportDialog(true)
    }
  }

  const handleConfirmationImportPlayer = async (dataToImport: string[]) => {
    if (playerIdToImport) {
      setPlayerIdToImport(null)
      setOpenImportDialog(false)
      importPlayer(player.id, playerIdToImport, dataToImport)
    }
  }

  const getDialogText = (player: IPlayer) => {
    return {
      title: 'Eliminar jugador',
      text: `¿Estás seguro que quieres eliminar el jugador ${player.name}  ${player.lastName}?`,
      disclaimer: 'Esta acción no se puede deshacer. Deberás crear un nuevo grupo para añadir los equipos a un nuevo grupo.'
    }
  }

  return (
    <div className='playerDetail-container' style={styles.container}>
      <form onSubmit={handleSubmitClick} style={{ width: '100%' }} id='playerDetailForm'>
        <div className='playerDetail-top' style={styles.top}>
          <Avatar {...stringAvatar({ name: `${player.name} ${player.lastName}`, size: AVATAR_SIZE })} />
          <div className='flex-column' style={styles.flex_column}>
            {isAdmin
              ? <Tooltip title={player.id} placement='top'>
                <span style={styles.topName}>{player.name} {player.lastName}</span>
              </Tooltip>
              : <span style={styles.topName}>{player.name} {player.lastName}</span>}
          </div>
          {
            editMode
              ? <SaveIcon styles={styles.topIcon} />
              : isAdmin && <EditIcon styles={styles.topIcon} onClick={() => setPlayerDetailEditMode(true)} />
          }
          {
            isAdmin && <DeleteIcon styles={styles.deleteIcon} onClick={() => setOpenConfirmationDialog(true)} />
          }
          <CloseIcon styles={styles.closeIcon} onClick={() => setPlayerDetail(null)} />
        </div>
        <div className='playerDetail-middle' style={styles.middle}>
          <div className='flex-row' style={styles.flex_row}>
            <div className='data' style={editMode ? { ...styles.data, alignItems: 'flex-start' } : styles.data}>
              {
              editMode
                ? <>
                  <PhoneIcon styles={{ fontSize: ICON_SIZE }} />
                  <Input name='phone' placeholder='Teléfono' defaultValue={playerDetailForm.phone} onChange={handleOnChangeValidators} errorMessage={PlayerDetailFormErrors.phone?.message} styles={PlayerDetailFormErrors.phone && RED_BORDER_VALIDATOR} editMode={editMode} />
                </>
                : <Phone phone={player.phone} styles={{ fontSize: ICON_SIZE }} />
            }
            </div>
            <div className='data' style={editMode ? { ...styles.data, alignItems: 'flex-start' } : styles.data}>
              <TShirtIcon styles={{ fontSize: ICON_SIZE }} />
              <TShirtSelector sizes={sizes} playerSize={playerDetailForm.size} editMode={editMode} />
            </div>
          </div>
          <div className='flex-row' style={{ ...styles.flex_row, marginTop: 19 }}>
            <div className='data' style={editMode ? { ...styles.data, alignItems: 'flex-start' } : styles.data}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <MailIcon styles={{ fontSize: ICON_SIZE }} />
                {
                  editMode
                    ? <Input name='email' placeholder='Email' defaultValue={playerDetailForm.email} onChange={handleOnChangeValidators} errorMessage={PlayerDetailFormErrors.email?.message} styles={PlayerDetailFormErrors.email && RED_BORDER_VALIDATOR} editMode={editMode} />
                    : <span style={styles.input_email}>{player.email}</span>
                }
              </div>

            </div>
            <div className='data' style={{ ...styles.data, alignItems: 'flex-start' }}>
              <TrophyIcon styles={{ fontSize: ICON_SIZE }} />
              <PlayerScoring scoring={scoring} sizeObjects={sizes.length} />
            </div>
          </div>
          {isAdmin && editMode &&
            <div className='flex-row' style={{ ...styles.flex_row, marginTop: 19 }}>
              <div className='data' style={styles.data}>
                <AddUser styles={{ fontSize: ICON_SIZE }} />
                <Input name='importPlayerId' placeholder='Importar Jugador' />
                <SendIcon styles={{ cursor: 'pointer' }} onClick={handleImportPlayer} />
              </div>
            </div>}
        </div>
      </form>
      <div className='separator' style={styles.separator} />
      <div className='playerDetail-bottom' style={styles.bottom}>
        {
          loading
            ? <div className='loader-container' style={styles.loader}>
              <Loader />
            </div>
            : <TeamsList teams={teamsInPlayerDetail} />
        }
      </div>
      {openConfirmationDialog && <ConfirmationDialog open={openConfirmationDialog} handleClose={() => setOpenConfirmationDialog(false)} handleConfirmation={() => deletePlayer()} dialogText={getDialogText(player)} />}
      {openImportDialog && playerIdToImport && <ImportDialog open={openImportDialog} handleClose={() => setOpenImportDialog(false)} handleConfirmation={handleConfirmationImportPlayer} playerIdToImport={playerIdToImport} />}
    </div>
  )
}
