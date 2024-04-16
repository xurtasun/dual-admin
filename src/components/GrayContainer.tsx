
interface Styles {
  container: React.CSSProperties
}
const styles: Styles = {
  container: {
    height: '100%',
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--background-color)',
    border: '4px solid var(--background-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 'var(--dualpadel-padding-18)'
  }
}
interface Props {
  children: React.ReactNode
  style?: React.CSSProperties
}
export const GrayContainer = ({ children, style }: Props) => {
  return (
    <div className='gray-container' style={{ ...styles.container, ...style }}>
      {children}
    </div>
  )
}
