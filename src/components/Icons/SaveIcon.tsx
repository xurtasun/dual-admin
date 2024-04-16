interface Props {
  styles?: React.CSSProperties
  onClick?: () => void
}

export const SaveIcon = ({ styles, onClick }: Props) => {
  return (
    <button type='submit' style={{ all: 'unset', cursor: 'pointer' }}>
      <span className='material-symbols-rounded' style={styles} onClick={onClick}>
        save
      </span>
    </button>
  )
}
