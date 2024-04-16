interface Props {
  styles?: React.CSSProperties
  onClick?: () => void
}
export const EyeIcon = ({ styles, onClick }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles} onClick={onClick}>
      visibility
    </span>
  )
}
