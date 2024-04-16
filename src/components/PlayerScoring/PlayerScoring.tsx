import { IScoring } from '../../types.d/scoring'
import './PlayerScoring.scss'
import { StarIcon } from '../Icons/StarIcon'
interface Props {
  scoring?: IScoring[]
  sizeObjects: number
}
interface Styles {
  container: React.CSSProperties
}
const styles: Styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    background: 'var(--background-color)',
    borderRadius: 'var(--dualpadel-radius-4)'
  }
}
export const PlayerScoring = ({ scoring, sizeObjects }: Props) => {
  return (
    <div className='player-scoring-container' style={{ ...styles.container, width: 34.8 * sizeObjects }}>
      {
        scoring?.map((score, index) => (
          <div className='player-scoring-category-container' key={index} style={{ width: 34.8 * sizeObjects - 18 }}>
            <span style={{ fontSize: 16, fontWeight: 600 }}>{score.category}</span>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 3 }}>
              <span>{score.scoring}</span>
              <StarIcon styles={{ color: 'gold' }} />
            </div>
          </div>
        )
        )
      }
    </div>
  )
}
