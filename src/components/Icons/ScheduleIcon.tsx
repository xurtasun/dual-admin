interface Props {
  styles?: React.CSSProperties
}
export const ScheduleIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      schedule
    </span>
  )
}
