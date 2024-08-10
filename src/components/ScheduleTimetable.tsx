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
    while (current <= end) {
      result.push(new Date(current))
      current = new Date(current.getTime() + interval * 60000)
    }
    return result
  }
  useEffect(() => {
    setTimeTable(get5minIntervalArray(new Date(matches[0].datetime), new Date(matches[matches.length - 1].datetime))
    )
  }, [matches])
  if (!tournament) return null
  return (
    <div className='timeTableSchedule' style={styles.timeTableSchedule}>
      {
          timeTable.map((time) => {
            const showTime = !!matches.find((match) => (new Date(match.datetime).getTime() === time.getTime()))
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
                <MatchScheduleContainer isMobile={isMobile} match={matches.find((match) => (new Date(match.datetime).getTime() === time.getTime()) && (match.courtName.includes(String(courtIndex + 1))))} stylesInput={courtIndex !== 0 ? { left: -3, marginTop: -3 } : { marginTop: -3 }} refreshData={refreshData} />
              </div>
            )
          })

      }
    </div>
  )
}
