/* eslint-disable @typescript-eslint/no-explicit-any */
import { IRestriction } from '../../types.d/restriction'
import { CalendarIcon } from '../Icons/CalendarIcon'
import { ScheduleIcon } from '../Icons/ScheduleIcon'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/es'
import { useManagementStore } from '../../store/management'
import { ToggleOn } from '../Icons/ToggleOn'
import { ToggleOff } from '../Icons/ToggleOff'

interface Styles {
  header: React.CSSProperties
  title: React.CSSProperties
  restrictions: React.CSSProperties
  restriction: React.CSSProperties
  day: React.CSSProperties
  time: React.CSSProperties
}
interface Props {
  restrictions: IRestriction[]
  updateRestrictions: (restrictions: IRestriction[]) => void
}
const styles: Styles = {
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
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'left',
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
    width: 120
  }
}

export const RestrictionsTeam = ({ restrictions, updateRestrictions }: Props) => {
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

  const tournament = useManagementStore((state) => state.tournament)
  const restrictionsMap = restrictions.map((restriction) => restriction.startTime)

  const handleUpdateRestrictions = (restriction: IRestriction) => {
    console.log('update restrictions')
    if (restrictionsMap.includes(restriction.startTime)) {
      const newRestrictions = restrictions.filter((item) => item.startTime !== restriction.startTime)
      updateRestrictions(newRestrictions)
    } else {
      const newRestrictions = [...restrictions, restriction]
      updateRestrictions(newRestrictions)
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es'>

      <div className='container'>
        <div className='header' style={styles.header}>
          <div className='title' style={styles.title}>Restricciones Horarias</div>
        </div>
        <div className='restrictions' style={styles.restrictions}>
          {
          tournament?.restrictions.map((restriction, index) => {
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
                {restrictionsMap?.includes(restriction.startTime) ? <ToggleOn styles={{ fontSize: 30, color: 'var(--dualpadel-color)' }} onClick={() => handleUpdateRestrictions(restriction)} /> : <ToggleOff styles={{ fontSize: 30, color: 'var(--dualpadel-gray)' }} onClick={() => handleUpdateRestrictions(restriction)} />}
              </div>
            )
          })
        }
        </div>
      </div>
    </LocalizationProvider>

  )
}
