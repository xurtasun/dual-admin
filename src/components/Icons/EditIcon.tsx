interface Props {
  styles?: React.CSSProperties
  onClick?: () => void
}

export const EditIcon = ({ styles, onClick }: Props) => {
  return (
    <span className='material-symbols-rounded' style={{ ...styles, cursor: 'pointer' }} onClick={onClick}>
      edit
    </span>
  )
}
