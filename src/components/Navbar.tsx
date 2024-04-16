import notification_icon from '../assets/navbar/notification.ico.svg'
import user_icon from '../assets/navbar/user.ico.svg'
import { useAuthStore } from '../store/auth'
interface Styles {
  container: React.CSSProperties
  icons: React.CSSProperties
  icon: React.CSSProperties
  avatar: React.CSSProperties
  profile_name: React.CSSProperties
}

const styles: Styles = {
  container: {
    height: 45 + 8 + 27,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  icons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 30,
    gap: 30
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 30,
    filter: 'var(--dualpadel-filter-gray)',
    cursor: 'pointer'
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: '50%',
    cursor: 'pointer'
  },
  profile_name: {
    marginRight: 30,
    fontWeight: 500
  }
}
export const Navbar = () => {
  const ICONS = [
    { icon: notification_icon, avatar: false },
    { icon: user_icon, avatar: true }
  ]
  const profile = useAuthStore(state => state.profile)
  return (
    <div className='navbar-container' style={styles.container}>
      {
        profile?.firstName &&
          <>
            <p style={{ marginRight: 10 }}>¡Hola</p>
            <p style={styles.profile_name}>{profile.firstName}!</p>
          </>

      }
      <div className='navbar-icon' style={styles.icons}>
        {
        ICONS.map((icon, index) => {
          return (
            <div className='icon' key={index}>
              {
                icon.avatar && profile?.avatarUrl
                  ? <img src={profile.avatarUrl} style={styles.avatar} alt='avatar' referrerPolicy='no-referrer' />
                  : <img src={icon.icon} style={styles.icon} alt='icon' />
              }
            </div>
          )
        })
      }
      </div>
    </div>
  )
}
