/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { IRestriction } from '../../types.d/restriction'
import { AddButton } from '../AddButton/AddButton'
import { CalendarIcon } from '../Icons/CalendarIcon'
import { DeleteIcon } from '../Icons/DelteIcon'
import { ScheduleIcon } from '../Icons/ScheduleIcon'
import { ToggleOff } from '../Icons/ToggleOff'
import { ToggleOn } from '../Icons/ToggleOn'
import { useTournamentsStore } from '../../store/tournaments'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField'
import 'dayjs/locale/es'

import { SaveIcon } from '../Icons/SaveIcon'
import dayjs from 'dayjs'
import { ConfirmationDialog } from '../ConfirmationDialog'
import { CloseIcon } from '../Icons/CloseIcon'

interface Styles {
  header: React.CSSProperties
  container: React.CSSProperties
  title: React.CSSProperties
  restrictions: React.CSSProperties
  restriction: React.CSSProperties
  day: React.CSSProperties
  blocked: React.CSSProperties
  actions: React.CSSProperties
  time: React.CSSProperties
  newDay: React.CSSProperties
  newTime: React.CSSProperties
}
interface Props {
  restrictions: IRestriction[]
}
const styles: Styles = {
  container: {
    width: '100%'

  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: 600
  },
  restrictions: {
    display: 'flex',
    gap: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'left',
    maxHeight: 261,
    overflow: 'auto'
  },
  restriction: {
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    fontWeight: 600,
    fontSize: 16,
    gap: 30
  },
  day: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 230
  },
  time: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 100
  },
  newDay: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 150,
    padding: '12px 0px'
  },
  newTime: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 150,
    padding: '10px 0px'
  },
  blocked: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 6,
    fontSize: 14
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 14
  }
}

export const RestrictionsTournament = ({ restrictions }: Props) => {
  const dateOptions: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  const timeOptions: any = {
    hour: '2-digit',
    minute: '2-digit'
  }
  const newRestrictionOptions: IRestriction = {
    startTime: new Date(),
    endTime: new Date(),
    blocked: false
  }

  const setTournamentRestrictions = useTournamentsStore(state => state.setTournamentRestrictions)
  const newRestriction = useTournamentsStore(state => state.newRestriction)
  const setNewRestriction = useTournamentsStore(state => state.setNewRestriction)
  const saveNewRestriction = useTournamentsStore(state => state.saveNewRestriction)
  const deleteRestriction = useTournamentsStore(state => state.deleteRestriction)

  const [open, setOpen] = useState(false)
  const [restrictionToDelete, setRestrictionToDelete] = useState<IRestriction | null>(null)

  const handleToggleRestriction = (restriction: IRestriction) => {
    setTournamentRestrictions(restriction)
  }

  const handleSaveNewRestriction = () => {
    saveNewRestriction()
  }

  const handleUpdateNewRestrictionDate = (newDate: any) => {
    if (newRestriction) {
      const startTime = newRestriction.startTime
      const endTime = newRestriction.endTime

      const newStartTime = new Date(newDate)
      newStartTime.setHours(startTime.getHours())
      newStartTime.setMinutes(startTime.getMinutes())

      const newEndTime = new Date(newDate)
      newEndTime.setHours(endTime.getHours())
      newEndTime.setMinutes(endTime.getMinutes())
      setNewRestriction({ ...newRestriction, startTime: newStartTime, endTime: newEndTime })
    }
  }
  const handleUpdateNewRestrictionTime = (newTime: any) => {
    if (newRestriction) {
      const startTime = new Date(newRestriction.startTime)
      const endTime = new Date(newRestriction.endTime)

      startTime.setHours(new Date(newTime[0]).getHours())
      startTime.setMinutes(new Date(newTime[0]).getMinutes())

      endTime.setHours(new Date(newTime[1]).getHours())
      endTime.setMinutes(new Date(newTime[1]).getMinutes())

      setNewRestriction({ ...newRestriction, startTime, endTime })
    }
  }

  const handleUpdateNewRestrictionBlocked = (blocked: boolean) => {
    if (newRestriction) {
      setNewRestriction({ ...newRestriction, blocked: !blocked })
    }
  }

  const handleDeleteRestriction = (restriction: IRestriction) => {
    deleteRestriction(restriction)
    handleCloseDialog()
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleOpenDialog = (restriction: IRestriction) => {
    setOpen(true)
    setRestrictionToDelete(restriction)
  }

  const getDialogText = (restriction: IRestriction) => {
    if (!restriction.startTime) return null
    return {
      title: 'Eliminar Restricción',
      text: `¿Estás seguro que quieres eliminar la restricción del ${new Date(restriction.startTime).toLocaleDateString('es-ES', dateOptions)} de ${new Date(restriction.startTime).toLocaleTimeString('es-ES', timeOptions)} a ${new Date(restriction.endTime).toLocaleTimeString('es-ES', timeOptions)}?`,
      disclaimer: 'Esta acción no se puede deshacer. Deberás crear una nueva restricción si quieres volver a bloquear el horario.'
    }
  }

  useEffect(() => {
    console.log('newRestriction', newRestriction)
  }, [restrictions, newRestriction])
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>

      <div className='container' style={styles.container}>
        <div className='header' style={styles.header}>
          <div className='title' style={styles.title}>Restricciones Horarias</div>
          <AddButton text='Añadir' onClick={() => setNewRestriction(newRestrictionOptions)} />
        </div>
        <div className='restrictions' style={styles.restrictions}>
          {
          newRestriction && (
            <div className='restriction' style={{ ...styles.restriction, padding: '0 12px', gap: 28 }}>
              <CalendarIcon />
              <div className='day' style={styles.newDay}>
                <DatePicker label='dia/mes/año' views={['day', 'month', 'year']} slotProps={{ textField: { size: 'small' } }} value={dayjs(newRestriction.startTime)} onChange={(newDate) => handleUpdateNewRestrictionDate(newDate)} />
              </div>
              <ScheduleIcon />
              <div className='time' style={styles.newTime}>
                <SingleInputTimeRangeField label='From - To' slotProps={{ textField: { size: 'small' } }} onChange={(newTime) => handleUpdateNewRestrictionTime(newTime)} value={[dayjs(newRestriction.startTime), dayjs(newRestriction.endTime)]} />
              </div>
              <div className='blocked' style={styles.blocked}>
                <span>Bloquear</span>
                {newRestriction.blocked ? <ToggleOn styles={{ fontSize: 30, color: 'var(--dualpadel-color)' }} onClick={() => handleUpdateNewRestrictionBlocked(newRestriction.blocked)} /> : <ToggleOff styles={{ fontSize: 30, color: 'var(--dualpadel-gray)' }} onClick={() => handleUpdateNewRestrictionBlocked(newRestriction.blocked)} />}
              </div>
              <div className='actions' style={styles.actions}>
                <SaveIcon styles={{ color: 'var(--dualpadel-color)' }} onClick={handleSaveNewRestriction} />
                <CloseIcon styles={{ color: 'var(--dualpadel-color)' }} onClick={() => setNewRestriction(null)} />
              </div>
            </div>
          )
        }
          {
          restrictions.map((restriction, index) => {
            return (
              <div className='restriction' key={index} style={styles.restriction}>
                <CalendarIcon />
                <div className='day' style={styles.day}>
                  {new Date(restriction.startTime).toLocaleDateString('es-ES', dateOptions)}
                </div>
                <ScheduleIcon />
                <div className='time' style={styles.time}>
                  {new Date(restriction.startTime).toLocaleTimeString('es-ES', timeOptions)} - {new Date(restriction.endTime).toLocaleTimeString('es-ES', timeOptions)}
                </div>
                <div className='blocked' style={styles.blocked}>
                  <span>Bloquear</span>
                  {restriction.blocked ? <ToggleOn styles={{ fontSize: 30, color: 'var(--dualpadel-color)' }} onClick={() => handleToggleRestriction(restriction)} /> : <ToggleOff styles={{ fontSize: 30, color: 'var(--dualpadel-gray)' }} onClick={() => handleToggleRestriction(restriction)} />}
                </div>
                <div className='actions' style={styles.actions}>
                  <DeleteIcon styles={{ color: 'red' }} onClick={() => handleOpenDialog(restriction)} />
                </div>
              </div>
            )
          })
        }
        </div>
        {restrictionToDelete && <ConfirmationDialog open={open} handleClose={handleCloseDialog} dialogText={getDialogText(restrictionToDelete)} handleConfirmation={() => handleDeleteRestriction(restrictionToDelete)} />}
      </div>
    </LocalizationProvider>

  )
}
