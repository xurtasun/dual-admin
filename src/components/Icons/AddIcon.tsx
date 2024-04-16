interface Props {
  styles?: React.CSSProperties
  onClick?: () => void
}

export const AddIcon = ({ styles, onClick }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles} onClick={onClick}>
      add
    </span>
  )
}
