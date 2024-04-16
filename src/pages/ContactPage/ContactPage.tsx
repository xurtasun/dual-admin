import { MailIcon } from '../../components/Icons/MailIcon'
import { WhatsappIcon } from '../../components/Icons/WhatsappIcon'
import { Input } from '../../components/Input'
import { Navbar } from '../../components/Navbar'
import { PrincipalButton } from '../../components/PrincipalButton'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { TextArea } from '../../components/TextArea'

interface Props {
  isMobile?: boolean
  isTablet?: boolean
}
interface Styles {
  container: React.CSSProperties
  content: React.CSSProperties
  page: React.CSSProperties
  title: React.CSSProperties
  description: React.CSSProperties
  form: React.CSSProperties
  row_right: React.CSSProperties
  row: React.CSSProperties
}
const styles: Styles = {
  page: {
    display: 'flex',
    flexDirection: 'row'
  },
  container: {
    width: '100%'
  },
  content: {
    width: 480,
    minHeight: 120,
    maxHeight: '100%',
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    filter: 'var(--dualpadel-filter-drop-shadow)',
    padding: 25,
    marginTop: 23
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 15,
    color: 'var(--dualpadel-color)'
  },
  description: {
    fontSize: 14,
    color: 'var(--dualpadel-color)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15
  },
  row_right: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  }
}
export const ContactPage = ({ isMobile, isTablet }: Props) => {
  const phone = '685111034'
  return (
    <div className='contact-page' style={styles.page}>
      <Sidebar isMobile={isMobile} isTablet={isTablet} />
      <div className='contact-page-container' style={styles.container}>
        <Navbar />
        <div className='contact-content' style={styles.content}>
          <div className='contact-title' style={styles.title}>
            Contactar
          </div>
          <div className='contact-description' style={styles.description}>
            <p>Si tienes alguna duda o sugerencia, no dudes en contactarnos.</p>
          </div>
          <div className='contact-form' style={styles.form}>
            <Input placeholder='Asunto' styles={{ width: 400, paddingLeft: 20 }} />
            <TextArea placeholder='Mensaje...' styles={{ width: 400, maxWidth: 400 }} />
            <div className='row-right' style={styles.row_right}>
              <PrincipalButton text='Enviar' />
            </div>
          </div>
        </div>
        <div className='contact-data' style={styles.content}>
          <div className='contact-title' style={styles.title}>
            Datos de contacto Dual Padel
          </div>
          <div className='contact-description' style={styles.description}>
            <div className='row' style={styles.row}>
              <MailIcon />
              <p>info@dualpadel.com</p>
            </div>
            <div className='row' style={styles.row}>
              <WhatsappIcon />
              <a href={`https://api.whatsapp.com/send?phone=${phone}`} target='_blank' rel='noreferrer'>
                {phone}
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
