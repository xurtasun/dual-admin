/* eslint-disable @typescript-eslint/no-explicit-any */
import DateRangePicker from 'rsuite/DateRangePicker'

import './DateRangePicker.scss'
import 'rsuite/DateRangePicker/styles/index.css'

interface DateRangePickerProps {
  placeholder?: string
  name?: string
  onChange?: (value: any) => void
}
export const DateRangePickerComponent = ({ placeholder, name, onChange }: DateRangePickerProps) => {
  const SpanishLocale = {
    sunday: 'Do',
    monday: 'Lu',
    tuesday: 'Ma',
    wednesday: 'Mi',
    thursday: 'Ju',
    friday: 'Vi',
    saturday: 'Sa',
    ok: 'OK',
    today: 'Hoy',
    yesterday: 'Ayer',
    last7Days: 'Últimos 7 días',
    last30Days: 'Últimos 30 días',
    thisMonth: 'Este mes',
    lastMonth: 'El mes pasado',
    thisYear: 'Este año',
    lastYear: 'El año pasado',
    hours: 'Horas',
    minutes: 'Minutos',
    seconds: 'Segundos',
    am: 'AM',
    pm: 'PM'
  }
  return (
    <DateRangePicker format='dd/MM/yyyy' caretAs={null} isoWeek locale={SpanishLocale} showOneCalendar placeholder={placeholder} className='dateRange' character=' – ' name={name} onChange={onChange} />
  )
}
