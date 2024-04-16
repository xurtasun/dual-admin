interface Props {
  styles?: React.CSSProperties
  onClick?: () => void
}

export const SendIcon = ({ styles, onClick }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles} onClick={onClick}>
      send
    </span>
  )
}
