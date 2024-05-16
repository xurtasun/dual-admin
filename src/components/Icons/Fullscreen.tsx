interface Props {
  styles?: React.CSSProperties
  onClick: () => void
}
export const Fullscreen = ({ styles, onClick }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles} onClick={onClick}>
      fullscreen
    </span>
  )
}
