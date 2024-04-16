import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

interface Props {
  open: boolean
  handleClose: () => void
  handleConfirmation: () => void
  dialogText: {
    title: string
    text: string
    disclaimer: string
  } | null
}
export const ConfirmationDialog = ({ open, handleClose, dialogText, handleConfirmation }: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        {dialogText?.title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {dialogText?.text}
        </DialogContentText>
        <DialogContentText id='alert-dialog-description' sx={{ fontSize: 14 }} mt={2}>
          **{dialogText?.disclaimer}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleConfirmation} autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
