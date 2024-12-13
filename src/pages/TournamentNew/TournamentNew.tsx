import { CalendarIcon } from '../../components/Icons/CalendarIcon'
import { GroupIcon } from '../../components/Icons/GroupIcon'
import { HomeIcon } from '../../components/Icons/HomeIcon'
import { LocationIcon } from '../../components/Icons/LocationIcon'
import { ScheduleIcon } from '../../components/Icons/ScheduleIcon'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Navbar } from '../../components/Navbar'
// import { BackButton } from '../../components/BackButton/BackButton'
import { GrayContainer } from '../../components/GrayContainer'
import { AddTournamentRestrictions } from '../../components/AddTournamentRestrictions/AddTournamentRestrictions'
import { Input } from '../../components/Input'

import tenniCourtIcon from '../../assets/icons/tennisCourt.svg'
import tennisBallIcon from '../../assets/icons/tennisBall.svg'
import { DateRangePickerComponent } from '../../components/DateRangePicker/DateRangePicker'
import { TimeRangePickerComponent } from '../../components/TimeRangePicker/TimeRangePicker'
import { PrincipalButton } from '../../components/PrincipalButton'
import { useAddTournament } from '../../store/addTournament'
import { useEffect, useState } from 'react'
import { AddTournamentCategories } from '../../components/AddTournamentCategories/AddTournamentCategories'
import { AddIcon } from '../../components/Icons/AddIcon'
import { CloseIcon } from '../../components/Icons/CloseIcon'
import { ToggleOn } from '../../components/Icons/ToggleOn'
import { ToggleOff } from '../../components/Icons/ToggleOff'

interface Styles {
  page: React.CSSProperties
  content: React.CSSProperties
  tournaments: React.CSSProperties
  flex_row: React.CSSProperties
  container: React.CSSProperties
  container_detail: React.CSSProperties
  info: React.CSSProperties
  title: React.CSSProperties
  data: React.CSSProperties
  flex: React.CSSProperties
  detail: React.CSSProperties
  img: React.CSSProperties
  text: React.CSSProperties
  button: React.CSSProperties
  poster: React.CSSProperties
  poster_title: React.CSSProperties
  data_title: React.CSSProperties
  input: React.CSSProperties
  input_inline: React.CSSProperties
  flex_column: React.CSSProperties
  close_button: React.CSSProperties
}

const styles: Styles = {
  page: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    width: '100%'
  },
  content: {
    margin: '24px 24px 24px 0px'
  },
  tournaments: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9
  },
  flex_row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 22
  },
  container_detail: {
    minWidth: 730,
    width: 'calc(40% - 25px)',
    height: '100%',
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    filter: 'var(--dualpadel-filter-drop-shadow)',
    padding: 28,
    margin: 2
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: 12,
    height: '100%'
  },
  img: {
    width: 207,
    height: 'calc(314px - 28px*2)',
    borderRadius: 'var(--dualpadel-radius-4)'
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--dualpadel-color)',
    marginBottom: 15
  },
  data: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%'
  },
  detail: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 16,
    color: 'var(--dualpadel-gray)'
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  button: {
    background: 'var(--dualpadel-color)',
    color: 'var(--dualpadel-white)',
    width: 100,
    height: 31,
    borderRadius: 'var(--dualpadel-radius-4)',
    border: 'none',
    cursor: 'pointer',
    fontSize: 14,
    marginTop: 0
  },
  poster: {
    width: 300,
    borderRadius: 'var(--dualpadel-radius-15)',
    border: '3px solid var(--dualpadel-light-gray)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    flexDirection: 'column'
  },
  poster_title: {
    fontSize: 14,
    color: 'var(--dualpadel-gray)',
    textAlign: 'center'
  },
  data_title: {
    fontSize: 12,
    fontWeight: 700,
    width: 140,
    color: 'var(--dualpadel-color)'
  },
  input: {
    width: 260
  },
  input_inline: {
    width: 85
  },
  flex_column: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  },
  close_button: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 16,
    color: 'var(--dualpadel-gray)'

  }
}
interface Props {
  isTablet?: boolean
  isMobile?: boolean
}
export const TournamentNew = ({ isTablet, isMobile }: Props) => {
  const tournament = useAddTournament(state => state.tournament)
  const categoriesToCreate = useAddTournament(state => state.categoriesToCreate)
  const saveTournament = useAddTournament(state => state.saveTournament)
  const setTournament = useAddTournament(state => state.setTournament)
  const setImageFile = useAddTournament(state => state.setImageFile)
  const setImageFilePreview = useAddTournament(state => state.setImageFilePreview)
  const imageFile = useAddTournament(state => state.imageFile)
  const imageFilePreview = useAddTournament(state => state.imageFilePreview)

  const [isMaster, setIsMaster] = useState(false)

  const handleSaveTournament = (e: React.FormEvent<HTMLFormElement>) => {
    console.log('save tournament')
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const tournament = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      clubName: formData.get('clubName') as string,
      teamsTarget: Number(formData.get('teamsTarget')),
      courtNumber: Number(formData.get('courtNumber')),
      sets: Number(formData.get('sets')),
      pricing: {
        one: Number(formData.get('pricing_1cat')),
        two: Number(formData.get('pricing_2cat'))
      },
      matchTime: Number(formData.get('matchTime')),
      isMaster
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any
    console.log(tournament, categoriesToCreate)

    saveTournament(tournament)
  }
  useEffect(() => {
    console.log(tournament)
  }, [tournament])

  const getDates = (startDate: Date, endDate: Date) => {
    const dates = []
    let currentDate = startDate
    const addDays = (date: Date, days: number) => {
      const copy = new Date(Number(date))
      copy.setDate(date.getDate() + days)
      return copy
    }
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = addDays(currentDate, 1)
    }
    return dates
  }

  const handleDateChange = (dates: Date[]) => {
    setTournament({ date: getDates(dates[0], dates[1]) })
  }
  const handleTimeChange = (dates: Date[]) => {
    console.log(dates[0].toLocaleTimeString('es-ES'), dates[1].toLocaleTimeString('es-ES'))
    setTournament({ time: [dates[0].toLocaleTimeString('es-ES'), dates[1].toLocaleTimeString('es-ES')] })
  }
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    setImageFile(input.files?.[0])
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageFilePreview(e.target?.result)
      }
      reader.readAsDataURL(file)
    }
  }
  return (
    <div className='tournament-page' style={styles.page}>
      <Sidebar isMobile={isMobile} isTablet={isTablet} />
      <div className='tournament-container' style={styles.container}>
        <Navbar />
        <div className='tournament-content' style={styles.content}>
          <div className='tournamentDetail-container' style={styles.container_detail}>
            <form onSubmit={handleSaveTournament} style={{ marginBottom: 9, display: 'flex', gap: 10, flexDirection: 'column' }}>
              <div className='tournament-info' style={styles.info}>
                {
                  imageFile
                    ? <>
                      <CloseIcon
                        styles={styles.close_button} onClick={() => {
                          setImageFilePreview(null)
                          setImageFile(null)
                        }}
                      />
                      <img src={imageFilePreview} alt='poster' style={styles.poster} />
                    </>
                    : <>

                      <input type='file' id='file' style={{ zIndex: -1, display: 'none' }} onChange={handleChangeFile} />
                      <label htmlFor='file' style={{ ...styles.poster, ...styles.poster_title }}> <AddIcon />Añadir Cartel</label>
                    </>
                }
                <div className='tournament-text' style={styles.text}>
                  <div className='tournament-title' style={styles.title}>
                    <Input placeholder='Nombre del torneo' styles={{ width: 300 }} name='name' />
                  </div>
                  <div className='tournament-data' style={styles.data}>
                    <div className='tournament-location' style={{ ...styles.data }}>
                      <LocationIcon styles={{ color: 'var(--dualpadel-color)' }} />
                      <Input placeholder='Dirección' styles={styles.input} name='address' />
                    </div>
                  </div>
                  <div className='tournament-data' style={styles.data}>
                    <div className='tournament-clubName' style={{ ...styles.data }}>
                      <HomeIcon styles={{ color: 'var(--dualpadel-color)' }} />
                      <Input placeholder='Nombre del club' styles={styles.input} name='clubName' />
                    </div>
                  </div>
                  <div className='tournament-data' style={styles.data}>
                    <div className='tournament-calendar' style={{ ...styles.data }}>
                      <CalendarIcon styles={{ color: 'var(--dualpadel-color)' }} />
                      <DateRangePickerComponent placeholder='Selecciona la fecha del torneo' name='date' onChange={handleDateChange} />
                    </div>
                  </div>
                  <div className='tournament-data' style={styles.data}>
                    <div className='tournament-schedule' style={{ ...styles.data }}>
                      <ScheduleIcon styles={{ color: 'var(--dualpadel-color)' }} />
                      <TimeRangePickerComponent placeholder='Selecciona el horario del torneo' name='time' onChange={handleTimeChange} />
                    </div>
                  </div>
                  <div className='tournament-data' style={styles.data}>
                    <div className='tournament-location' style={{ ...styles.data }}>
                      <GroupIcon styles={{ color: 'var(--dualpadel-color)' }} />
                      <Input placeholder='Límite parejas' styles={styles.input} name='teamsTarget' type='number' />
                    </div>
                  </div>
                  <div className='row' style={styles.flex_row}>
                    <div className='column' style={styles.flex_column}>
                      <div className='tournament-data' style={styles.data}>
                        <div className='tournament-data-title' style={styles.data_title}>
                          Partidos
                        </div>
                      </div>
                      <div className='tournament-data' style={styles.data}>
                        <div className='tournament-location' style={{ ...styles.data }}>
                          <img src={tenniCourtIcon} alt='tennisCourt' />
                          <Input placeholder='# Pistas' styles={styles.input_inline} name='courtNumber' type='number' />
                        </div>
                      </div>
                      <div className='tournament-data' style={styles.data}>
                        <div className='tournament-location' style={{ ...styles.data }}>
                          <img src={tennisBallIcon} alt='tennisBall' />
                          <Input placeholder='# Sets' styles={styles.input_inline} name='sets' type='number' />
                        </div>
                      </div>
                    </div>
                    <div className='column' style={styles.flex_column}>
                      <div className='tournament-data' style={styles.data}>
                        <div className='tournament-data-title' style={styles.data_title}>
                          Precios
                        </div>
                      </div>
                      <div className='tournament-data' style={styles.data}>
                        <div className='tournament-location' style={{ ...styles.data }}>
                          <div className='text' style={{ fontSize: 14 }}>
                            1 Cat.
                          </div>
                          <Input placeholder='€ 1 Cat.' styles={styles.input_inline} name='pricing_1cat' type='number' />
                        </div>
                      </div>
                      <div className='tournament-data' style={styles.data}>
                        <div className='tournament-location' style={{ ...styles.data }}>
                          <div className='text' style={{ fontSize: 14 }}>
                            2 Cat.
                          </div>
                          <Input placeholder='€ 2 Cat.' styles={styles.input_inline} name='pricing_2cat' type='number' />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='tournament-data' style={styles.data}>
                    <div className='tournament-match-duration' style={{ ...styles.data }}>
                      <ScheduleIcon styles={{ color: 'var(--dualpadel-color)' }} />
                      <Input placeholder='Duración Partido' styles={styles.input_inline} name='matchTime' type='number' />
                    </div>
                    <div className='tournament-match-duration' style={{ ...styles.data }}>
                      {
                        isMaster
                          ? <>
                            <ToggleOn styles={{ color: 'var(--dualpadel-color)', fontSize: 30 }} onClick={() => setIsMaster(false)} />
                            <div className='text' style={{ fontSize: 14 }}>
                              Master
                            </div>
                          </>
                          : <>
                            <ToggleOff styles={{ color: 'var(--dualpadel-gray)', fontSize: 30 }} onClick={() => setIsMaster(true)} />
                            <div className='text' style={{ fontSize: 14 }}>
                              Open
                            </div>
                          </>
                      }

                    </div>
                  </div>
                </div>
              </div>
              <GrayContainer>
                {tournament && <AddTournamentCategories />}
              </GrayContainer>
              <GrayContainer>
                {tournament && <AddTournamentRestrictions restrictions={tournament.restrictions} />}
              </GrayContainer>
              <div className='flex-end' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <PrincipalButton text='Guardar' styles={{ width: 100, height: 31, marginTop: 0 }} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}
