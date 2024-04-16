interface Props {
  styles?: React.CSSProperties
  onClick?: () => void
}

export const RemoveIcon = ({ styles, onClick }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles} onClick={onClick}>
      remove
    </span>
  )
}
