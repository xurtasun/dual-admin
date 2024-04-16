/* eslint-disable @typescript-eslint/no-explicit-any */
import DateRangePicker from 'rsuite/DateRangePicker'

import './TimeRangePicker.scss'
import 'rsuite/DateRangePicker/styles/index.css'

interface TimeRangePickerProps {
  placeholder?: string
  name?: string
  onChange?: (value: any) => void
}
export const TimeRangePickerComponent = ({ placeholder, name, onChange }: TimeRangePickerProps) => {
  const start = new Date()
  start.setHours(9, 0)
  const end = new Date()
  end.setHours(21, 0)
  return (
    <DateRangePicker format='HH:mm' caretAs={null} placeholder={placeholder} className='dateRange' character=' – ' name={name} onChange={onChange} defaultCalendarValue={[start, end]} defaultValue={[start, end]} />
  )
}
