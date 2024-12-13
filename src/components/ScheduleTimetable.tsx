import { useEffect, useState } from 'react'
import { IMatch } from '../types.d/match'
import { MatchScheduleContainer } from './MatchScheduleContainer'
import { useManagementStore } from '../store/management'

interface Props {
  matches: IMatch[]
  courtIndex: number
  refreshData: () => void
  isMobile?: boolean
}
interface Styles {
  timeTableSchedule: React.CSSProperties
  time: React.CSSProperties
  timeRow: React.CSSProperties
}
const styles: Styles = {
  timeTableSchedule: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    position: 'relative'
  },
  time: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'var(--dualpadel-color)',
    position: 'absolute',
    left: -40
  },
  timeRow: {
    width: '100%',
    minHeight: 11.5
  }
}
export const ScheduleTimeTable = ({ matches, courtIndex, refreshData, isMobile }: Props) => {
  const [timeTable, setTimeTable] = useState<Date[]>([])
  const tournament = useManagementStore((state) => state.tournament)
  const get5minIntervalArray = (start: Date, end: Date) => {
    const interval = 5
    const result = []
    let current = new Date(start)
    const newEnd = new Date(end.getTime() + interval * 60000)
    while (current <= newEnd) {
      const d = new Date(current)
      d.setMilliseconds(0)
      result.push(d)
      current = new Date(current.getTime() + interval * 60000)
    }
    return result
  }
  useEffect(() => {
    setTimeTable(get5minIntervalArray(new Date(matches[0].datetime), new Date(matches[matches.length - 1].datetime)))
  }, [matches])
  const compareDates = (a: Date, b: Date) => {
    a.setMilliseconds(0)
    b.setMilliseconds(0)
    return a.getTime() === b.getTime()
  }
  if (!tournament) return null
  return (
    <div className='timeTableSchedule' style={styles.timeTableSchedule}>
      {
          timeTable.map((time) => {
            const showTime = !!matches.find((match) => (compareDates(new Date(match.datetime), time)))
            const minHeight = ((152 / tournament.matchTime) * 4.9)
            const matchesFOUND = matches.filter((match) => new Date(match.datetime).getTime() === time.getTime() && match.courtName.includes(String(courtIndex + 1)))
            if (matchesFOUND && matchesFOUND.length > 1) {
              const categories = matchesFOUND.map((match) => match.category.parent?.name)
              console.log(categories.join(' - '), time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), String(courtIndex + 1))
            }

            return (
              <div className='timeRow' key={time.getTime()} style={{ ...styles.timeRow, minHeight }}>
                {
                  courtIndex === 0 &&
                    <div className='time' style={styles.time}>
                      {showTime && time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                }
                <MatchScheduleContainer
                  isMobile={isMobile} match={matches.find((match) => compareDates(new Date(match.datetime), time) && (match.courtName.includes(String(courtIndex + 1))))} stylesInput={courtIndex !== 0 ? { left: -3, marginTop: -3 } : { marginTop: -3 }} refreshData={refreshData}
                />
              </div>
            )
          })

      }
    </div>
  )
}
