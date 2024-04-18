/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddButton } from '../AddButton/AddButton'
import { PersonConfiguredIcon } from '../Icons/PersonConfiguredIcon'
import { DeleteIcon } from '../Icons/DelteIcon'
import { useCategoriesStore } from '../../store/categories'
import { SaveIcon } from '../Icons/SaveIcon'
import { Input } from '../Input'
import { Selector } from '../Selector/Selector'
import { useCategoriesParentStore } from '../../store/categoriesParent'
import { useEffect } from 'react'
import { SelectChangeEvent } from '@mui/material/Select'
import { CloseIcon } from '../Icons/CloseIcon'
import { useAddTournament } from '../../store/addTournament'

interface Styles {
  header: React.CSSProperties
  container: React.CSSProperties
  title: React.CSSProperties
  categories: React.CSSProperties
  category: React.CSSProperties
  categoryTeams: React.CSSProperties
}
const styles: Styles = {
  container: {
    width: '100%'

  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  title: {
    fontSize: 16,
    fontWeight: 600
  },
  categories: {
    display: 'flex',
    gap: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'left',
    maxHeight: 261,
    width: '100%',
    overflow: 'auto'
  },
  category: {
    borderRadius: 'var(--dualpadel-radius-15)',
    background: 'var(--dualpadel-white)',
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    fontWeight: 600,
    fontSize: 16,
    gap: 14
  },
  categoryTeams: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    gap: 4,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: 70
  }
}

export const AddTournamentCategories = () => {
  const setTeamsLimit = useCategoriesStore(state => state.setTeamsLimit)
  const categoriesParent = useCategoriesParentStore(state => state.categoriesParent)
  const getCategoriesParent = useCategoriesParentStore(state => state.getCategoriesParent)
  const newCategory = useAddTournament(state => state.newCategory)
  const setNewCategory = useAddTournament(state => state.setNewCategory)
  const addCategory = useAddTournament(state => state.addCategory)
  const removeCategory = useAddTournament(state => state.removeCategory)
  const categoriesToCreate = useAddTournament(state => state.categoriesToCreate)

  useEffect(() => {
    getCategoriesParent()
    console.log(categoriesToCreate, newCategory)
  }, [categoriesToCreate, getCategoriesParent, newCategory])

  const handleOnChangeTeamLimit = (e: React.ChangeEvent<HTMLInputElement>, category: any) => {
    const { value } = e.target
    value && parseInt(value) && category._id && setTeamsLimit(parseInt(value), category._id)
  }

  const handleAddCategory = () => {
    setNewCategory({ teamsLimit: 0, editMode: true })
  }

  const handleOnChangeAddCategory = (_: SelectChangeEvent, value: any) => {
    const { props } = value
    setNewCategory({ ...newCategory, parent: props.value, name: props.children })
  }

  const handleCancelCreateCategory = () => {
    setNewCategory(null)
  }
  const handleCreateCategory = () => {
    addCategory()
  }
  const handleOnChangeTeamLimitNewCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNewCategory({ ...newCategory, teamsLimit: parseInt(value) })
  }

  const handleDeleteAction = (category: any) => {
    removeCategory(category)
  }

  const getCategoryParentNameFromId = (id: string) => {
    const categoryParent = categoriesParent.find((category) => category.id === id)
    return categoryParent?.name || 'None'
  }

  return (
    <div className='container' style={styles.container}>
      <div className='header' style={styles.header}>
        <div className='title' style={styles.title}>Categorias</div>
        <AddButton text='Añadir' onClick={handleAddCategory} />
      </div>
      <div className='categories' style={styles.categories}>
        {
          newCategory && (
            <div className='category' style={styles.category} key='new_category'>
              <Selector options={categoriesParent} onChange={handleOnChangeAddCategory} value={newCategory.parent || ''} getValueFromId={getCategoryParentNameFromId} />
              <div className='teamsLimit' style={styles.categoryTeams}>
                <PersonConfiguredIcon styles={{ fontSize: 30 }} />
                <Input styles={{ width: 20, borderRadius: 10 }} type='number' defaultValue={newCategory.teamsLimit} onChange={handleOnChangeTeamLimitNewCategory} />
              </div>
              <SaveIcon onClick={() => handleCreateCategory()} />
              <CloseIcon onClick={handleCancelCreateCategory} />
            </div>
          )
        }
        {
          categoriesToCreate.map((category) => {
            return (
              <div className='category' style={styles.category} key={category.name}>

                <div className='title' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: 65 }}>
                  {category.name}
                </div>
                <div className='teamsLimit' style={styles.categoryTeams}>
                  <PersonConfiguredIcon styles={{ fontSize: 30 }} />
                  {category.editMode
                    ? <Input name='Text' styles={{ width: 20 }} type='number' defaultValue={category.teamsLimit} onChange={(e) => handleOnChangeTeamLimit(e, category)} />
                    : category.teamsLimit}
                </div>

                <DeleteIcon styles={{ color: 'red' }} onClick={() => handleDeleteAction(category)} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
