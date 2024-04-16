import { ITeam } from '../../types.d/team'
import { MedalIcon } from '../Icons/MedalIcon'
import { StarIcon } from '../Icons/StarIcon'

import { styles } from './TeamsList.Styles'
import { TeamContainer } from '../TeamContainer'
import { Tooltip } from '@mui/material'

interface Props {
  teams: ITeam[]
}
export const TeamsList = ({ teams }: Props) => {
  return (
    <div className='teams-container' style={styles.container}>
      {
        teams?.map((team) => (
          <TeamContainer team={team} key={team._id} showPayment>
            <div className='category-container' style={styles.category_container}>
              <Tooltip title={team.tournament.name} placement='top'>
                <span style={styles.tournament_name}>{team.tournament.name}</span>
              </Tooltip>
              <div className='flex-row' style={styles.flex_row}>
                <div className='category-name-container' style={styles.category_name_container}>
                  <span style={styles.category_name}>{team.category.parent?.name}</span>
                </div>
                <div className='category-result' style={styles.category_result}>
                  <div className='category-result-type' style={styles.category_result_type}>
                    <MedalIcon />
                    <span>{team.result?.type}</span>
                  </div>
                  <div className='category-result-score' style={styles.category_result_score}>
                    <StarIcon />
                    <span>{team.result?.score}</span>
                  </div>
                </div>
              </div>

            </div>
          </TeamContainer>

        ))
      }
    </div>
  )
}
