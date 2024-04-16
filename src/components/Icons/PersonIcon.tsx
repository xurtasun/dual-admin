interface Props {
  styles?: React.CSSProperties
}
export const PersonIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      person
    </span>
  )
}
