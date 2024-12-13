/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICategory } from '../../types.d/category'
import { AddButton } from '../AddButton/AddButton'
import { PersonIcon } from '../Icons/PersonIcon'
import { PersonConfiguredIcon } from '../Icons/PersonConfiguredIcon'
import { EditIcon } from '../Icons/EditIcon'
import { DeleteIcon } from '../Icons/DelteIcon'
import { useCategoriesStore } from '../../store/categories'
import { SaveIcon } from '../Icons/SaveIcon'
import { Input } from '../Input'
import { Selector } from '../Selector/Selector'
import { useCategoriesParentStore } from '../../store/categoriesParent'
import { useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material/Select'
import { CloseIcon } from '../Icons/CloseIcon'
import { ConfirmationDialog } from '../ConfirmationDialog'

interface Styles {
  header: React.CSSProperties
  container: React.CSSProperties
  title: React.CSSProperties
  categories: React.CSSProperties
  category: React.CSSProperties
  categoryTeams: React.CSSProperties
}
interface Props {
  categories: ICategory[]
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

export const CategoriesTournament = ({ categories }: Props) => {
  const setCategories = useCategoriesStore(state => state.setCategories)
  const updateCategory = useCategoriesStore(state => state.updateCategory)
  const setTeamsLimit = useCategoriesStore(state => state.setTeamsLimit)
  const getCategoriesParent = useCategoriesParentStore(state => state.getCategoriesParent)
  const newCategory = useCategoriesStore(state => state.newCategory)
  const setNewCategory = useCategoriesStore(state => state.setNewCategory)
  const createCategory = useCategoriesStore(state => state.createCategory)
  const deleteCategory = useCategoriesStore(state => state.deleteCategory)
  const categoriesParent = useCategoriesParentStore(state => state.categoriesParent)
  const [open, setOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(null)

  const getDialogText = (category: ICategory) => {
    if (!category.parent) return null
    return {
      title: 'Eliminar categoria',
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      text: `¿Estas seguro que quieres eliminar la categoria? ${category.parent?.name}`,
      disclaimer: 'Si eliminas la categoria, perderás acceso a todos los equipos que pertenezcan a ella'
    }
  }

  useEffect(() => {
    getCategoriesParent()
  }, [getCategoriesParent])

  const handleEditButton = (category: ICategory) => {
    setCategories(category)
  }
  const handleSaveButton = (category: ICategory) => {
    updateCategory({ _id: category._id, teamsLimit: category.teamsLimit })
  }

  const handleOnChangeTeamLimit = (e: React.ChangeEvent<HTMLInputElement>, category: ICategory) => {
    const { value } = e.target
    value && parseInt(value) && category._id && setTeamsLimit(parseInt(value), category._id)
  }

  const handleAddCategory = () => {
    setNewCategory({ teamsLimit: 0 })
  }

  const handleOnChangeAddCategory = (e: SelectChangeEvent) => {
    const { value } = e.target
    setNewCategory({ ...newCategory, parent: value })
  }

  const handleCancelCreateCategory = () => {
    setNewCategory(null)
  }
  const handleCreateCategory = (newCategory: any) => {
    const category = { ...newCategory, parent: newCategory.parent }
    createCategory(category)
  }
  const handleOnChangeTeamLimitNewCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNewCategory({ ...newCategory, teamsLimit: parseInt(value) })
  }

  const getCategoriesParentNameById = (id: string, placeholder: string) => {
    const category = categoriesParent.find((categoryParent) => categoryParent._id === id)
    return category?.name || placeholder
  }

  const handleDeleteAction = (category: ICategory) => {
    setOpen(true)
    setCategoryToDelete(category)
  }

  const handleConfirmation = () => {
    setOpen(false)
    categoryToDelete && deleteCategory(categoryToDelete?._id)
  }

  const handleCloseDialog = () => {
    setOpen(false)
    setCategoryToDelete(null)
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
              <Selector getValueFromId={getCategoriesParentNameById} options={categoriesParent} onChange={handleOnChangeAddCategory} value={newCategory.parent || ''} />
              <div className='teamsLimit' style={styles.categoryTeams}>
                <PersonConfiguredIcon styles={{ fontSize: 30 }} />
                <Input styles={{ width: 20, borderRadius: 10 }} type='number' defaultValue={newCategory.teamsLimit} onChange={handleOnChangeTeamLimitNewCategory} />
              </div>
              <SaveIcon onClick={() => handleCreateCategory(newCategory)} />
              <CloseIcon onClick={handleCancelCreateCategory} />
            </div>
          )
        }
        {
          categories.map((category) => {
            return (
              <div className='category' style={styles.category} key={category._id}>

                <div className='title' style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: 65 }}>
                  {category.parent?.name}
                </div>
                <div className='teamsRegistered' style={styles.categoryTeams}>
                  <PersonIcon styles={{ fontSize: 30 }} />
                  {category.teams?.length}
                </div>
                <div className='teamsLimit' style={styles.categoryTeams}>
                  <PersonConfiguredIcon styles={{ fontSize: 30 }} />
                  {category.editMode
                    ? <Input name='Text' styles={{ width: 20 }} type='number' defaultValue={category.teamsLimit} onChange={(e) => handleOnChangeTeamLimit(e, category)} />
                    : category.teamsLimit}
                </div>
                {
                category.editMode ? <SaveIcon onClick={() => handleSaveButton(category)} /> : <EditIcon styles={{ color: 'gold' }} onClick={() => handleEditButton(category)} />
              }

                <DeleteIcon styles={{ color: 'red' }} onClick={() => handleDeleteAction(category)} />
              </div>
            )
          })
        }
      </div>
      {categoryToDelete && <ConfirmationDialog open={open} handleClose={handleCloseDialog} dialogText={getDialogText(categoryToDelete)} handleConfirmation={handleConfirmation} />}
    </div>
  )
}
