import dualpadel from '../../assets/dualpadel.svg'
import config from '../../assets/sidebar/config.ico.svg'
import contact from '../../assets/sidebar/contact.ico.svg'
import players from '../../assets/sidebar/players.ico.svg'
import ranking from '../../assets/sidebar/ranking.ico.svg'
import suscription from '../../assets/sidebar/suscription.ico.svg'
import tournaments from '../../assets/icons/tournaments.ico.svg'
import logout_icon from '../../assets/sidebar/logout.ico.svg'
import dashboard from '../../assets/sidebar/dashboard.ico.svg'
import category from '../../assets/sidebar/category.ico.svg'
import { Link, useLocation } from 'react-router-dom'
import { stylesSidebar as styles } from './Sidebar.styles'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/auth'
interface Props {
  isMobile?: boolean
  isTablet?: boolean
}
export const Sidebar = ({ isMobile }: Props) => {
  const MOBILE_WIDTH = 82
  const LINKS_TOP = [
    { icon: dashboard, text: 'Dashboard', active: false, line: false, link: '/dashboard' },
    { icon: players, text: 'Jugadores', active: true, line: false, link: '/' },
    { icon: tournaments, text: 'Torneos', active: false, line: false, link: '/tournaments' },
    { icon: category, text: 'Categorias', active: false, line: false, link: '/categories' },
    { icon: ranking, text: 'Ranking', active: false, line: false, link: '/ranking' },
    { icon: config, text: 'Configuración', active: false, line: false, link: '/config' },
    { icon: suscription, text: 'Suscripción', active: false, line: true, link: '/suscription' }
  ]

  const [linksTop, setLinksTop] = useState(LINKS_TOP)
  const logout = useAuthStore(state => state.logout)
  const location = useLocation()

  const LINKS_BOTTOM = [
    { icon: contact, text: 'Contacto', link: '/contact' },
    { icon: logout_icon, text: 'Cerrar sesión', function: logout }
  ]

  const handleChangeActive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement
    const text = target.innerText
    handleChangeSidebar(text)
  }

  const handleChangeSidebar = (location: string) => {
    const newLinksTop = linksTop.map(link => {
      if (link.link === location) {
        return { ...link, active: true }
      } else {
        return { ...link, active: false }
      }
    })
    setLinksTop(newLinksTop)
  }

  useEffect(() => {
    handleChangeSidebar(location.pathname)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div className='sidebar-container' style={isMobile ? { ...styles.container, width: MOBILE_WIDTH } : styles.container}>
      <div className='logo-container' style={styles.logo_container}>
        <img src={dualpadel} alt='dualpadel-logo' />
      </div>
      <div className='links-container' style={styles.links_container}>
        <div className='links-top' style={styles.links_top}>
          {
            linksTop.map((link, index) => {
              const styleActive = link.active ? isMobile ? { ...styles.link, ...styles.active, width: MOBILE_WIDTH - 53 + 3 } : { ...styles.link, ...styles.active } : styles.link
              return (
                <div className='link' key={index} onClick={handleChangeActive} style={styles.w100}>
                  {link.line && <div className='line' style={styles.line} />}

                  <Link to={link.link} style={styleActive}>
                    <img src={link.icon} style={link.active ? styles.img_filter_active : styles.img_filter} alt='icon' />
                    {
                      !isMobile && <div className='text'>{link.text}</div>
                    }
                  </Link>
                </div>
              )
            })
          }
        </div>
        <div className='links-bottom' style={styles.links_bottom}>
          {
            LINKS_BOTTOM.map((link, index) => {
              return (
                // eslint-disable-next-line react/jsx-handler-names
                <div className='link' key={index} style={styles.w100} onClick={link.function}>
                  <Link to={link.link !== undefined ? link.link : ''} style={styles.link}>
                    <img src={link.icon} style={styles.img_filter} alt='icon' />
                    {
                      !isMobile && <div className='text'>{link.text}</div>
                    }
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
