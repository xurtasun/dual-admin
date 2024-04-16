import { BackIcon } from '../Icons/BackIcon'
interface Styles {
  container: React.CSSProperties
  text: React.CSSProperties
}
interface Props {
  text?: string
  style?: React.CSSProperties
}
const styles: Styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 9,
    cursor: 'pointer',
    padding: 5
  },
  text: {
    fontSize: 14,
    fontFamily: 'var(--dualpadel-font-family)',
    fontWeight: 600
  }
}
export const BackButton = ({ text, style }: Props) => {
  const handleOnclick = () => {
    window.history.back()
  }
  return (
    <div className='backbutton-container' style={{ ...styles.container, ...style }} onClick={handleOnclick}>
      <BackIcon />
      <div className='backbutton-text'>
        <span style={styles.text}>{text}</span>
      </div>
    </div>
  )
}
