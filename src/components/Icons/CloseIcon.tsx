interface Props {
  styles?: React.CSSProperties
  onClick?: () => void
}
export const CloseIcon = ({ styles, onClick }: Props) => {
  return (
    <button type='submit' style={{ all: 'unset', cursor: 'pointer' }}>
      <span className='material-symbols-rounded' style={styles} onClick={onClick}>
        close
      </span>
    </button>
  )
}
