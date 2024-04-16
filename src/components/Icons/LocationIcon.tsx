interface Props {
  styles?: React.CSSProperties
}
export const LocationIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      location_on
    </span>
  )
}
