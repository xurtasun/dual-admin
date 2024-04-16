import { PropsWithChildren } from 'react'

interface Styles {
  container: React.CSSProperties
}
const styles: Styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 24,
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    filter: 'var(--dualpadel-filter-drop-shadow)'
  }
}
export const FullContainer = ({ children }: PropsWithChildren) => {
  return (
    <div className='full-container' style={styles.container}>
      {children}
    </div>
  )
}
