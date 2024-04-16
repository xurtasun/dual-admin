import { usePlayersStore } from '../../store/players'
import './tshirtSelector.scss'
interface Props {
  sizes: string[]
  playerSize?: string
  editMode?: boolean
}
interface Styles {
  container: React.CSSProperties
  size: React.CSSProperties
  containerEditMode: React.CSSProperties
}
const styles: Styles = {
  container: {
    background: 'var(--background-color)',
    borderRadius: 'var(--dualpadel-radius-4)',
    height: 37,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerEditMode: {
    background: 'var(--dualpadel-light-gray)'
  },
  size: {
    fontSize: 14,
    fontWeight: 600,
    color: 'var(--dualpadel-gray)',
    background: 'var(--dualpadel-white)',
    margin: '4px 2px',
    borderRadius: 'var(--dualpadel-radius-4)',
    height: 30,
    width: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

export const TShirtSelector = ({ sizes, playerSize, editMode }: Props) => {
  const setPlayerDetailForm = usePlayersStore(state => state.setPlayerDetailForm)
  const playerDetailForm = usePlayersStore(state => state.playerDetailForm)

  const onClick = (size: string) => {
    if (editMode) {
      setPlayerDetailForm({ ...playerDetailForm, size })
    }
  }
  return (
    <div style={editMode ? { ...styles.container, ...styles.containerEditMode } : styles.container}>
      {
        sizes.map((size, index) => (
          size === playerSize
            ? <span className='tshirt-selector-size' key={index} style={{ color: 'var(--dualpadel-color)' }}>{size}</span>
            : <span className='tshirt-selector-size' style={editMode ? { cursor: 'pointer' } : {}} onClick={() => onClick(size)} key={index}>{size}</span>
        ))
      }
    </div>
  )
}
