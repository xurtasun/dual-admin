interface Props {
  styles?: React.CSSProperties
}
export const CalendarIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      calendar_month
    </span>
  )
}
