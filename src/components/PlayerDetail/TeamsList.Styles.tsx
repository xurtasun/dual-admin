interface Styles {
  container: React.CSSProperties
  players_container: React.CSSProperties
  player_container: React.CSSProperties
  checkbox: React.CSSProperties
  team_container: React.CSSProperties
  category_container: React.CSSProperties
  category_name: React.CSSProperties
  category_name_container: React.CSSProperties
  category_result: React.CSSProperties
  category_result_type: React.CSSProperties
  category_result_score: React.CSSProperties
  team_player_price: React.CSSProperties
  team_player: React.CSSProperties
  team_player_name: React.CSSProperties
  tournament_name: React.CSSProperties
  flex_row: React.CSSProperties
}

export const styles: Styles = {
  flex_row: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 30
  },
  container: {
    height: '100%',
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--background-color)',
    border: '4px solid var(--background-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    padding: 7,
    gap: 14,
    overflowY: 'scroll'
  },
  players_container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 9,
    padding: '0 0',

    width: '100%'
  },
  team_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    margin: '9px 0',
    padding: '4px 0'
  },

  player_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    margin: '0 0 0 8px'
  },
  team_player_name: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 124
  },
  team_player_price: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 3
  },
  team_player: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 9
  },
  checkbox: {
    width: 30,
    height: 30,
    color: 'red'
  },
  category_container: {
    border: '3px solid var(--background-color)',
    borderRadius: 'var(--dualpadel-radius-15)',
    width: '100%',
    minWidth: 200,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    padding: 6,
    gap: 6
  },
  category_name_container: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  category_result: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  category_result_type: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 9,
    color: 'var(--dualpadel-color)'
  },
  category_result_score: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 9,
    color: 'var(--dualpadel-color)'
  },
  category_name: {
    fontSize: 16,
    marginTop: 4,
    color: 'var(--dualpadel-color)'
  },
  tournament_name: {
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--dualpadel-color)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 200
  }
}
