interface Props {
  styles?: React.CSSProperties
  onClick?: () => void
}
export const EyeClosedIcon = ({ styles, onClick }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles} onClick={onClick}>
      visibility_off
    </span>
  )
}
