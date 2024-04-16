interface Props {
  styles?: React.CSSProperties
  onClick?: () => void
}

export const DeleteIcon = ({ styles, onClick }: Props) => {
  return (
    <span className='material-symbols-rounded' style={{ ...styles, cursor: 'pointer' }} onClick={onClick}>
      delete
    </span>
  )
}
