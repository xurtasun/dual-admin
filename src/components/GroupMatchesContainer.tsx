import { IGroup } from '../types.d/group'
import { MatchContainer } from './MatchContainer'

interface Props {
  group: IGroup
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setMatch: ({ match, groupId }: { match: any, groupId?: string }) => void
  refreshData: () => void
}
interface Styles {
  groupMatchContainer: React.CSSProperties
  groupHeader: React.CSSProperties
  matches: React.CSSProperties
}
const styles: Styles = {
  groupMatchContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20,
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    padding: 12
  },
  groupHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    fontSize: 13,
    fontWeight: 'bold'
  },
  matches: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 20
  }
}
export const GroupMatchesContainer = ({ group, setMatch, refreshData }: Props) => {
  return (
    <div className='groupMatchContainer' style={styles.groupMatchContainer}>
      <div className='groupHeader' style={styles.groupHeader}>
        {group.name}
      </div>
      <div className='matches' style={styles.matches}>
        {
          group.matches.map((match) => {
            return (
              <MatchContainer match={match} key={match._id} groupId={group._id} setMatch={setMatch} refreshData={refreshData} />
            )
          })
        }
      </div>
    </div>

  )
}
