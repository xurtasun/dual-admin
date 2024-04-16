interface Props {
  styles?: React.CSSProperties
  onClick?: () => void
}
const style: React.CSSProperties = {
  cursor: 'pointer'
}
export const ToggleOn = ({ styles, onClick }: Props) => {
  return (
    <span className='material-symbols-rounded' style={{ ...style, ...styles }} onClick={onClick}>
      toggle_on
    </span>
  )
}
