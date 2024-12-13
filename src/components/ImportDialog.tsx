import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'
import { usePlayersStore } from '../store/players'
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import { useState } from 'react'

interface Props {
  open: boolean
  handleClose: () => void
  handleConfirmation: (dataToImport: string[]) => void
  playerIdToImport: string
}
export const ImportDialog = ({ open, handleClose, handleConfirmation, playerIdToImport }: Props) => {
  const players = usePlayersStore(state => state.players)
  const player = players.find(player => player._id === playerIdToImport)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataToSelect: any = {
    teams: { name: 'Equipos', value: 'teams', selected: true },
    scoring: { name: 'Puntuaciones', value: 'scoring', selected: true },
    phone: { name: 'Teléfono', value: 'phone', selected: false },
    size: { name: 'Talla Camiseta', value: 'size', selected: false },
    email: { name: 'Email', value: 'email', selected: false }
  }
  const [dataSelected, setDataSelected] = useState(dataToSelect)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target
    const { name } = event.target
    const dataToUpdate = structuredClone(dataSelected[name])
    dataToUpdate.selected = checked
    setDataSelected({
      ...dataSelected,
      [event.target.name]: dataToUpdate
    })
  }

  const importData = () => {
    const dataToImport = Object.keys(dataSelected).filter(key => dataSelected[key].selected)
    handleConfirmation(dataToImport)
  }
  if (!player) return null
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        Importar datos del jugador
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {
            `Selecciona que datos quieres importar de ${player?.name}?`
          }
        </DialogContentText>
        <DialogContentText>
          <FormGroup>
            <div className='flex-column' style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: 10 }}>
              {
              Object.keys(dataSelected).map((key: string) => {
                return (
                  <FormControlLabel key={key} control={<Checkbox checked={dataSelected[key].selected} onChange={handleCheckboxChange} name={key} />} label={dataSelected[key].name} />
                )
              })
            }
            </div>
          </FormGroup>

        </DialogContentText>
        <DialogContentText id='alert-dialog-description' sx={{ fontSize: 12 }} mt={2}>
          **Esta acción no se puede deshacer. El jugador importado será eliminado.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={importData} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
