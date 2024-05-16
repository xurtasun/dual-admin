import React, { useEffect, useState } from 'react'
import { useManagementScheduleStore } from '../../store/managementSchedule'
import { GrayContainer } from '../GrayContainer'
import { TabSelector } from '../TabSelector/TabSelector'
import { useManagementStore } from '../../store/management'
import { Schedule } from '../Schedule'

interface Props {
  tournamentId: string
  isMobile?: boolean
}
interface Styles {
  scheduleContainer: React.CSSProperties
  headerContainer: React.CSSProperties
}

const styles: Styles = {
  scheduleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 30,
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'white',
    padding: '30px 50px'
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }

}
export const ScheduleManagement = ({ tournamentId, isMobile }: Props) => {
  const tournament = useManagementStore((state) => state.tournament)
  const setTournamentId = useManagementScheduleStore((state) => state.setTournamentId)
  const getMatchesByTournamentDate = useManagementScheduleStore((state) => state.getMatchesByTournamentDate)
  const matches = useManagementScheduleStore((state) => state.matches)
  const dayTabSelectedSchedule = useManagementStore((state) => state.dayTabSelectedSchedule)
  const setDayTabSelectedSchedule = useManagementStore((state) => state.setDayTabSelectedSchedule)

  const [dayTabs, setDayTabs] = useState<Array<{ name: string, date: Date }>>([])

  const handleChangeTabDaySelector = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    const selected = dayTabs.find((day) => day.name === target.dataset.value)?.date
    if (!selected) return
    const date = new Date(selected)
    const dateName = date.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit' })
    setDayTabSelectedSchedule({ name: dateName, date })
  }
  const handleGetMatchesByTournamentDate = () => {
    if (dayTabSelectedSchedule) {
      getMatchesByTournamentDate(new Date(dayTabSelectedSchedule.date))
    }
  }
  useEffect(() => {
    if (tournamentId) {
      setTournamentId(tournamentId)
    }
  }, [setTournamentId, tournamentId])

  useEffect(() => {
    if (dayTabSelectedSchedule) {
      getMatchesByTournamentDate(new Date(dayTabSelectedSchedule.date))
    }
  }, [dayTabSelectedSchedule, getMatchesByTournamentDate])

  useEffect(() => {
    if (!tournament) return
    const days = tournament.date.map((dat) => { return { date: new Date(dat), name: new Date(dat).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit' }) } })
    setDayTabs(days)
  }, [tournament])

  useEffect(() => {
    console.log(dayTabSelectedSchedule)
  }, [dayTabSelectedSchedule])

  if (!tournament || !matches) return null
  return (
    <GrayContainer>
      <div className='ScheduleContainer' style={styles.scheduleContainer}>
        <TabSelector direction='row' tabs={tournament.date.map((dat) => new Date(dat).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit' }))} onClick={handleChangeTabDaySelector} selected={dayTabSelectedSchedule?.name} itemStyle={{ padding: '14px' }} />
        <div className='headerContainer' style={styles.headerContainer}>
          {dayTabSelectedSchedule && <Schedule isMobile={isMobile} courts={[...Array(tournament.courtNumber)]} date={dayTabSelectedSchedule.date} matches={matches} refreshData={handleGetMatchesByTournamentDate} />}
        </div>
      </div>
    </GrayContainer>
  )
}
