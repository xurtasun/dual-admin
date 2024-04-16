import './PlayerDetail.scss'

interface Styles {
  container: React.CSSProperties
  top: React.CSSProperties
  middle: React.CSSProperties
  bottom: React.CSSProperties
  topName: React.CSSProperties
  topIcon: React.CSSProperties
  flex_row: React.CSSProperties
  flex_column: React.CSSProperties
  data: React.CSSProperties
  separator: React.CSSProperties
  loader: React.CSSProperties
  closeIcon: React.CSSProperties
  deleteIcon: React.CSSProperties
  input_email: React.CSSProperties
}

export const styles: Styles = {
  container: {
    maxWidth: 593,
    minWidth: 495,
    height: '100%',
    margin: '9px 19px 0 19px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    filter: 'var(--dualpadel-filter-drop-shadow)',
    padding: 23,
    transition: 'all 0.6s ease-in-out'
  },
  middle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 42
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 41
  },
  topName: {
    fontSize: 26,
    fontWeight: 600
  },
  topIcon: {
    position: 'absolute',
    cursor: 'pointer',
    color: 'var(--dualpadel-color)',
    top: 0,
    right: 40,
    margin: 25
  },
  closeIcon: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    right: 0,
    margin: 25
  },
  deleteIcon: {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    right: 80,
    margin: 25
  },
  bottom: {
    width: '100%',
    height: 320,
    maxHeight: 523,
    marginBottom: 23
  },
  flex_row: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%'
  },
  flex_column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 5
  },
  data: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  separator: {
    width: '100%',
    height: 5,
    background: 'var(--background-color)',
    borderRadius: 'var(--dualpadel-radius-4)',
    margin: '22px 0'
  },
  loader: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input_email: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 230
  }
}
