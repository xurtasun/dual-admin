import { useEffect, useState } from 'react'
import { useManagementStore } from '../../store/management'
import { ICategory } from '../../types.d/category'
import { BackButton } from '../BackButton/BackButton'
import { TabSelector } from '../TabSelector/TabSelector'
import { PlayersManagement } from './PlayersManagement'
import { useManagementTeamsStore } from '../../store/managementTeams'
import { GroupsManagement } from './GroupsManagement'
import { useManagementGroupsStore } from '../../store/managementGroups'
import { MatchesManagement } from './MatchesManagement'
import { useManagementMatchesStore } from '../../store/managementMatches'
import { DrawManagement } from './DrawManagement'
import { ScheduleManagement } from './ScheduleManagement'

interface Styles {
  container: React.CSSProperties
  flexRow: React.CSSProperties
  flexColumn: React.CSSProperties
}
const styles: Styles = {
  container: {
    minWidth: 730,
    width: 'calc(98% - 25px)',
    height: '100%',
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    filter: 'var(--dualpadel-filter-drop-shadow)',
    padding: 28,
    margin: 2,
    marginRight: 25
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 30
  }
}
interface Props {
  categories: ICategory[]
  tournamentId: string
  isMobile?: boolean
}
export const Management = ({ categories, tournamentId, isMobile }: Props) => {
  const tabsTitle = ['Inscritos', 'Grupos', 'Partidos', 'Cuadro', 'Tablero']

  const tabSelected = useManagementStore((state) => state.tabSelected)
  const categorySelected = useManagementStore((state) => state.categorySelected)
  const categoryTitleSelected = useManagementStore((state) => state.categoryTitleSelected)
  const setCategoryTitleSelected = useManagementStore((state) => state.setCategoryTitleSelected)
  const setCategorySelected = useManagementStore((state) => state.setCategorySelected)
  const setTabSelected = useManagementStore((state) => state.setTabSelected)
  const deleteNewGroup = useManagementGroupsStore((state) => state.deleteNewGroup)
  const setMatch = useManagementMatchesStore((state) => state.setMatch)

  const setTeamToManage = useManagementTeamsStore((state) => state.setTeamToManage)

  const getTournament = useManagementStore((state) => state.getTournament)

  const [categoriesTabs, setCategoriesTabs] = useState<string[]>([])

  const handleChangeTabSelector = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    setTabSelected(target.dataset.value as string)
    deleteNewGroup()
    setTeamToManage(null)
    setMatch({ match: null })
  }

  const handleChangeCategorySelector = (e: React.MouseEvent<HTMLDivElement>) => {
    setCategorySelected(null)
    setCategoryTitleSelected('')
    deleteNewGroup()
    setTeamToManage(null)
    setMatch({ match: null })
    const target = e.target as HTMLElement
    setCategoryTitleSelected(target.dataset.value as string)
    categories.map(category => {
      if (!category?.parent) return category
      if (category.parent.name === target.dataset.value) {
        setCategorySelected(category._id)
      }
      return category
    })
  }

  useEffect(() => {
    getTournament(tournamentId)
  }, [tournamentId, getTournament])

  useEffect(() => {
    setCategoriesTabs(categories.map((category, index) => {
      if (!category?.parent) return ''
      if (index === 0) {
        setCategoryTitleSelected(category.parent.name)
        setCategorySelected(category._id)
      }
      return category.parent.name
    }).sort())
  }, [categories, setCategorySelected, setCategoryTitleSelected])
  return (
    <div style={styles.container}>
      <div className='flex-column' style={styles.flexColumn}>
        <div className='flex-row' style={{ ...styles.flexRow, gap: 50 }}>
          <BackButton text='Volver' />
          <TabSelector direction='row' tabs={tabsTitle} onClick={handleChangeTabSelector} selected={tabSelected} />

        </div>
        <div className='flex-row' style={{ ...styles.flexRow, alignItems: 'flex-start' }}>
          {tabSelected !== tabsTitle[4] && <TabSelector direction='column' tabs={categoriesTabs} onClick={handleChangeCategorySelector} selected={categoryTitleSelected} />}

          {tabSelected === tabsTitle[0] && <PlayersManagement tournamentId={tournamentId} categoryId={categorySelected} categories={categories} />}
          {tabSelected === tabsTitle[1] && <GroupsManagement tournamentId={tournamentId} categoryId={categorySelected} />}
          {tabSelected === tabsTitle[2] && <MatchesManagement tournamentId={tournamentId} categoryId={categorySelected} />}
          {tabSelected === tabsTitle[3] && <DrawManagement tournamentId={tournamentId} categoryId={categorySelected} />}
          {tabSelected === tabsTitle[4] && <ScheduleManagement isMobile={isMobile} tournamentId={tournamentId} />}
        </div>
      </div>
    </div>
  )
}
