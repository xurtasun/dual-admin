/* eslint-disable @typescript-eslint/no-explicit-any */
import { useManagementStore } from '../store/management'
import { useManagementMatchesStore } from '../store/managementMatches'
import { IMatch } from '../types.d/match'
import { CloseIcon } from './Icons/CloseIcon'
import { SaveIcon } from './Icons/SaveIcon'
import { Input } from './Input'
import { Selector } from './Selector/Selector'
import { SelectChangeEvent } from '@mui/material'
import { TeamSelector } from './TeamSelector'
import React, { useEffect, useState } from 'react'
import { ITeam } from '../types.d/team'
import { RED_BORDER_VALIDATOR } from '../libs/validators'
import { AddIcon } from './Icons/AddIcon'
import { RemoveIcon } from './Icons/RemoveIcon'
import { ToggleOn } from './Icons/ToggleOn'
import { Label } from './Label'
import { ToggleOff } from './Icons/ToggleOff'

interface Props {
  match: IMatch
  setMatch: (match: { match: IMatch | null }) => void
  refreshData: () => void
  matchTypes: Array<{ id: string, name: string }>
}

interface Styles {
  addMatchContainer: React.CSSProperties
  addMatchHeader: React.CSSProperties
  actions: React.CSSProperties
  flexRow: React.CSSProperties
  selector: React.CSSProperties
  input: React.CSSProperties
  form: React.CSSProperties
  flexColumn: React.CSSProperties
  resultSet: React.CSSProperties
  actionIcon: React.CSSProperties
}
const styles: Styles = {
  addMatchContainer: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    padding: 20
  },
  addMatchHeader: {
    fontSize: 13,
    color: 'var(--dualpadel-color)',
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    color: 'var(--dualpadel-color)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    width: '100%'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 10
  },
  selector: {
    width: 184,
    height: 20,
    padding: '20px 10px',
    borderRadius: 'var(--dualpadel-radius-15)'
  },
  input: {
    width: 50,
    height: 35,
    borderRadius: 'var(--dualpadel-radius-15)',
    padding: '0px 10px',
    textAlign: 'center'
  },
  resultSet: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  actionIcon: {
    color: 'var(--dualpadel-color)',
    cursor: 'pointer',
    border: '2px solid var(--dualpadel-color)',
    borderRadius: 7,
    padding: 1,
    margin: 3
  }
}
export const AddMatchContainer = ({ match, setMatch, refreshData, matchTypes }: Props) => {
  const setMatchLastDatetime = useManagementStore((state) => state.setMatchLastDatetime)
  const setMatchLastType = useManagementStore((state) => state.setMatchLastType)
  const tournament = useManagementStore((state) => state.tournament)

  const teamsSelector = useManagementMatchesStore((state) => state.teamsSelector)
  const groups = useManagementMatchesStore((state) => state.groups)
  const addTeamToMatch = useManagementMatchesStore((state) => state.addTeamToMatch)
  const updateTeamToMatch = useManagementMatchesStore((state) => state.updateTeamToMatch)
  const createMatch = useManagementMatchesStore((state) => state.createMatch)
  const updateMatch = useManagementMatchesStore((state) => state.updateMatch)

  const matchFormErrors = useManagementMatchesStore((state) => state.matchFormErrors)
  const setMatchFormErrors = useManagementMatchesStore((state) => state.setMatchFormErrors)

  const manualTeams = useManagementMatchesStore((state) => state.manualTeams)
  const setManualTeams = useManagementMatchesStore((state) => state.setManualTeams)

  const [editMode, setEditMode] = useState(!!match._id)

  const courtNameDefault = 'Pista'
  const localTimeStringOptions: any = {
    hour: '2-digit',
    minute: '2-digit'
  }
  const teamsInMatch = 2
  const getGroupNameFromId = (id: string, placeholder: string) => {
    const group = groups.find((group) => group._id === id)
    return group?.name || placeholder
  }
  const getDateNameFromValue = (value: string) => {
    if (value) {
      const date = new Date(value)
      return date.toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit', month: '2-digit' })
    } else {
      return 'Fecha'
    }
  }
  const getMatchTypeName = (id: string, placeholder: string) => {
    const matchType = matchTypes.find((type) => type.id === id)
    setMatchLastType(matchType?.id || 'Group')
    return matchType?.name || placeholder
  }
  const handleDateChange = (e: SelectChangeEvent) => {
    const date = new Date(match.datetime.valueOf())
    date.setFullYear(new Date(e.target.value).getFullYear())
    date.setMonth(new Date(e.target.value).getMonth())
    date.setDate(new Date(e.target.value).getDate())
    setMatch({ match: { ...match, datetime: date } })
    setMatchLastDatetime(date)
  }
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.valueAsDate) return
    const inputTime = new Date(e.target.valueAsDate.getTime() + e.target.valueAsDate.getTimezoneOffset() * 60000)
    const time = new Date(match.datetime.valueOf())
    time.setHours(inputTime.getHours())
    time.setMinutes(inputTime.getMinutes())
    time.setSeconds(0)
    setMatch({ match: { ...match, datetime: time } })
    setMatchLastDatetime(time)
  }
  const handleTeamSelectorChange = (e: SelectChangeEvent) => {
    addTeamToMatch(e.target.value)
  }
  const handleTeamSelectorEdit = (e: SelectChangeEvent, oldTeam: ITeam) => {
    console.log(e.target.value, oldTeam)
    updateTeamToMatch(e.target.value, oldTeam)
  }
  const handleCourtNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value !== '') {
      setMatchFormErrors({ ...matchFormErrors, courtName: null })
    }
    setMatch({ match: { ...match, courtName: `${courtNameDefault} ${e.target.value}` } })
  }
  const handleCreateMatch = () => {
    if (!match.courtName || match?.courtName === '') {
      setMatchFormErrors({ ...matchFormErrors, courtName: { message: 'Campo requerido' } })
    } else {
      createMatch(match, refreshData)
    }
  }
  const handleUpdateMatch = () => {
    updateMatch(match, refreshData)
  }
  const handleIncrementGames = (teamIndex: number, setIndex: number, action: string) => {
    const value = getSetGame(teamIndex, setIndex)
    switch (action) {
      case 'add':
        setSetGame(teamIndex, setIndex, value + 1)
        break
      case 'remove':
        if (value > 0) {
          setSetGame(teamIndex, setIndex, value - 1)
        }
        break
    }
  }

  const getSetGame = (teamIndex: number, setIndex: number) => {
    const setResult = match.result[setIndex] || null
    if (setResult) {
      return Number(setResult.split('-')[teamIndex])
    } else {
      return 0
    }
  }

  const setSetGame = (teamIndex: number, setIndex: number, value: number) => {
    const result = structuredClone(match.result)
    const setResult = result[setIndex] || null
    if (setResult) {
      const setResults = setResult.split('-')
      setResults[teamIndex] = value.toString()
      result[setIndex] = setResults.join('-')
      if (result[setIndex] === '0-0') {
        result.splice(setIndex, 1)
      }
      setMatch({ match: { ...match, result } })
    } else {
      const setZero = [0, 0]
      setZero[teamIndex] = value
      result[setIndex] = setZero.join('-')
      setMatch({ match: { ...match, result } })
    }
  }

  const handleManualTeams = () => {
    setManualTeams(!manualTeams)
  }

  const handleChangePlaceholder = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let placeholders = structuredClone(match.placeholders)
    if (!placeholders) {
      placeholders = ['', '']
    }
    placeholders[index] = e.target.value
    setMatch({ match: { ...match, placeholders } })
  }

  useEffect(() => {
    setEditMode(!!match._id)
    console.log(match)
  }, [match, setManualTeams])
  return (
    <div className='addMatchContainer' style={styles.addMatchContainer}>
      <div className='addMatchHeader' style={styles.addMatchHeader}>
        {editMode ? 'Editar Partido' : 'Nuevo Partido'}
        <div className='actions' style={styles.actions}>
          {editMode ? <SaveIcon onClick={handleUpdateMatch} /> : <SaveIcon onClick={handleCreateMatch} />}
          <CloseIcon onClick={() => setMatch({ match: null })} />
        </div>
      </div>
      <div className='form' style={styles.form}>
        <div className='flexRow' style={styles.flexRow}>
          <Selector disabled={match.type !== 'Group'} options={groups.map((group) => { return ({ id: group._id, name: group.name }) })} value={match.groupId} styles={styles.selector} placeholder='Grupo' onChange={(e) => setMatch({ match: { ...match, groupId: e.target.value } })} getValueFromId={getGroupNameFromId} />
          <Selector options={tournament?.date.map((dat) => { return ({ id: dat, name: new Date(dat).toLocaleDateString('es-ES', { weekday: 'short', day: '2-digit' }) }) })} value={match.datetime} styles={styles.selector} placeholder='Grupo' onChange={handleDateChange} getValueFromId={getDateNameFromValue} />
        </div>
        <div className='flexRow' style={styles.flexRow}>
          <Input placeholder='Pista' errorMessage={matchFormErrors.courtName?.message} styles={matchFormErrors.courtName ? { ...styles.input, ...RED_BORDER_VALIDATOR } : styles.input} type='string' onChange={handleCourtNameChange} value={match.courtName} />
          <Input placeholder='Hora' styles={{ ...styles.input, width: 70 }} type='time' step='900' onChange={handleTimeChange} value={new Date(match.datetime).toLocaleTimeString('es-ES', localTimeStringOptions)} />
          {matchTypes && <Selector options={matchTypes} value={match.type} styles={{ ...styles.selector, width: 140 }} placeholder='Tipo' onChange={(e) => setMatch({ match: { ...match, type: e.target.value } })} getValueFromId={getMatchTypeName} />}
          <div className='flexColumn' style={{ ...styles.flexColumn, gap: 0, alignItems: 'center' }}>
            <Label text='Manual' />
            {manualTeams ? <ToggleOn onClick={() => handleManualTeams()} styles={{ fontSize: 30 }} /> : <ToggleOff onClick={() => handleManualTeams()} styles={{ color: 'var(--dualpadel-gray)', fontSize: 30 }} />}
          </div>

        </div>
        <div className='flexColumn' style={styles.flexColumn}>
          {
            [...Array(teamsInMatch).keys()].map((index) => {
              return (
                <div className='flexRow' style={styles.flexRow} key={index}>
                  {
                    match.teams[index]
                      ? manualTeams
                        ? <Input styles={{ width: 362, height: 45, fontSize: 16 }} placeholder={`Nombre Equipo ${index}`} onChange={(e) => handleChangePlaceholder(e, index)} value={match.placeholders[index]} />
                        : <>
                          <TeamSelector direction='column' value={match.teams[index]} teams={teamsSelector} onChange={(e) => handleTeamSelectorEdit(e, match.teams[index])} styles={{ borderRadius: 'var(--dualpadel-radius-15)' }} />
                          <div className='results' style={styles.flexRow}>
                            {
                                  editMode && match.teams.length >= teamsInMatch && [...Array(tournament?.sets).keys()].map((_set, setIndex) => {
                                    return (
                                      <div className='setResult' key={setIndex} style={styles.resultSet}>
                                        <AddIcon styles={styles.actionIcon} onClick={() => handleIncrementGames(index, setIndex, 'add')} />
                                        <Input placeholder='0' styles={{ ...styles.input, width: 15, height: 30 }} type='number' defaultValue={0} value={getSetGame(index, setIndex)} onChange={(e) => setSetGame(index, setIndex, Number(e.target.value))} />
                                        <RemoveIcon styles={styles.actionIcon} onClick={() => handleIncrementGames(index, setIndex, 'remove')} />
                                      </div>
                                    )
                                  })
                          }
                          </div>
                        </>
                      : manualTeams
                        ? <Input styles={{ width: 362, height: 45, fontSize: 16 }} placeholder={`Nombre Equipo ${index}`} onChange={(e) => handleChangePlaceholder(e, index)} value={match.placeholders[index]} />

                        : <TeamSelector direction='column' value={null} teams={teamsSelector} onChange={handleTeamSelectorChange} />
                  }
                </div>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}
