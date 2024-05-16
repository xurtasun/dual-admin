interface Props {
  styles?: React.CSSProperties
  onClick: () => void
}
export const FullscreenExit = ({ styles, onClick }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles} onClick={onClick}>
      fullscreen_exit
    </span>
  )
}
