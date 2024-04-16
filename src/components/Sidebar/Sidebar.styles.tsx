import React from 'react'

interface Styles {
  container: React.CSSProperties
  links_container: React.CSSProperties
  logo_container: React.CSSProperties
  links_top: React.CSSProperties
  links_bottom: React.CSSProperties
  link: React.CSSProperties
  line: React.CSSProperties
  active: React.CSSProperties
  img_filter_active: React.CSSProperties
  img_filter: React.CSSProperties
  w100: React.CSSProperties
}

// eslint-disable-next-line react-refresh/only-export-components
const WIDTH = 165
const styles: Styles = {
  container: {
    height: '100vh',
    maxHeight: 900,
    width: WIDTH,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: 24
  },
  logo_container: {
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 27
  },
  links_container: {
    width: '100%',
    height: '100%',
    filter: 'var(--dualpadel-filter-drop-shadow)',
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  links_top: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'flex-start',
    height: '50%',
    marginTop: 24
  },
  links_bottom: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 24
  },
  link: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    gap: 7,
    fontSize: 12,
    lineHeight: 'normal',
    fontWeight: 700,
    color: 'var(--dualpadel-gray)',
    padding: '18px 27px 18px 27px',
    cursor: 'pointer',
    paddingLeft: 27,
    textDecoration: 'none'
  },
  line: {
    width: '60%',
    margin: 'auto',
    borderTop: '2px solid var(--dualpadel-gray)',
    paddingTop: 18,
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
    marginTop: 18
  },
  active: {
    background: 'var(--dualpadel-light-gray)',
    width: WIDTH - 53 + 3,
    color: 'var(--dualpadel-color)'
  },
  img_filter: {
    filter: 'var(--dualpadel-filter-gray)'
  },
  img_filter_active: {
    filter: 'var(--dualpadel-filter-blue)'
  },
  w100: {
    width: '100%'
  }
}

export const stylesSidebar = styles
