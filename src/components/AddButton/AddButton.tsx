import { AddIcon } from '../Icons/AddIcon'
interface Styles {
  container: React.CSSProperties
  text: React.CSSProperties
}
interface Props {
  text: string
  style?: React.CSSProperties
  onClick?: () => void
}
const styles: Styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 9,
    cursor: 'pointer'
  },
  text: {
    fontSize: 14,
    fontFamily: 'var(--dualpadel-font-family)',
    fontWeight: 600
  }
}
export const AddButton = ({ text, style, onClick }: Props) => {
  return (
    <div className='addbutton-container' style={{ ...styles.container, ...style }} onClick={onClick}>
      <AddIcon />
      <div className='addbutton-text'>
        <span style={styles.text}>{text}</span>
      </div>
    </div>
  )
}
