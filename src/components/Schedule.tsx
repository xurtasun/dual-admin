import { IMatch } from '../types.d/match'
import { ScheduleTimeTable } from './ScheduleTimetable'

interface Props {
  courts: number[]
  date: Date
  matches: IMatch[]
  refreshData: () => void
  isMobile?: boolean
}
interface Styles {
  courtHeader: React.CSSProperties
  firstCourtHeader: React.CSSProperties
  lastCourtHeader: React.CSSProperties
  courtMatches: React.CSSProperties
}
const paddingVariable = '10px 20px'
const styles: Styles = {
  courtHeader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: paddingVariable,
    borderTop: '3px solid var(--dualpadel-light-gray)',
    borderBottom: '3px solid var(--dualpadel-light-gray)',
    borderRight: '3px solid var(--dualpadel-light-gray)',
    minWidth: 144
  },
  firstCourtHeader: {
    borderLeft: '3px solid var(--dualpadel-light-gray)',
    borderTopLeftRadius: 12
  },
  lastCourtHeader: {
    borderTopRightRadius: 12,
    borderRight: '3px solid var(--dualpadel-light-gray)'
  },
  courtMatches: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    padding: 12
  }
}
export const Schedule = ({ courts, matches, refreshData, isMobile }: Props) => {
  if (matches.length === 0) return null
  return (
    <>
      {
        courts.map((_, courtIndex) => {
          const courtHeaderStyles = isMobile ? { ...styles.courtHeader, minWidth: 104 } : styles.courtHeader
          return (
            <div className='courtContainer' key={courtIndex} style={{ marginBottom: 152 }}>
              <div className='courtHeader' style={courtIndex === 0 ? { ...courtHeaderStyles, ...styles.firstCourtHeader } : courtIndex === courts.length - 1 ? { ...courtHeaderStyles, ...styles.lastCourtHeader } : { ...courtHeaderStyles }}>
                {`Pista ${courtIndex + 1}`}
              </div>
              <div className='scheduleTimeTable'>
                <ScheduleTimeTable isMobile={isMobile} matches={matches} courtIndex={courtIndex} refreshData={refreshData} />
              </div>

            </div>

          )
        })
      }
    </>
  )
}
