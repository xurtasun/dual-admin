import findico from '../../assets/find.ico.svg'
import { CloseIcon } from '../Icons/CloseIcon'
import './finder.scss'

interface Styles {
  container: React.CSSProperties
  input: React.CSSProperties
  img: React.CSSProperties
}
interface FinderProps {
  name: string
  placeholder: string
  type?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickClose?: () => void
  value?: string
}
const styles: Styles = {
  container: {
    height: 51,
    width: 310,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 14,
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    filter: 'var(--dualpadel-filter-drop-shadow)'

  },
  img: {
    paddingLeft: 22,
    filter: 'var(--dualpadel-filter-gray)'
  },
  input: {
    border: 'none',
    fontSize: 14,
    fontFamily: 'var(--dualpadel-font-family)',
    fontWeight: 600,
    padding: '10px 4px',
    color: 'var(--dualpadel-gray)',
    width: 200

  }
}

export const Finder = ({ name, placeholder, type, onChange, onClickClose, value }: FinderProps) => {
  return (
    <div className='finder-container' style={styles.container}>
      <img src={findico} alt='find' style={styles.img} />
      <input type={type} name={name} value={value} placeholder={placeholder} style={styles.input} onChange={onChange} />
      {
        value &&
          <CloseIcon styles={{ marginRight: 22, color: 'var(--dualpadel-gray)', cursor: 'pointer' }} onClick={onClickClose} />
      }
    </div>
  )
}
