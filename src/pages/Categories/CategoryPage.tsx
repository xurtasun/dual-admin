import { AddButton } from '../../components/AddButton/AddButton'
import { EditIcon } from '../../components/Icons/EditIcon'
import { SaveIcon } from '../../components/Icons/SaveIcon'
import { Input } from '../../components/Input'
import { Navbar } from '../../components/Navbar'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { useCategoriesParentStore } from '../../store/categoriesParent'
import { useEffect, useState } from 'react'
interface Styles {
  page: React.CSSProperties
  container: React.CSSProperties
  content: React.CSSProperties
  tournaments: React.CSSProperties
  flex_row: React.CSSProperties
  categories: React.CSSProperties
  title: React.CSSProperties
  addButton: React.CSSProperties
  categoriesList: React.CSSProperties
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
    margin: '24px 24px 24px 0px'
  },
  tournaments: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 9
  },
  flex_row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  categories: {
    width: 432,
    minHeight: 120,
    maxHeight: '100%',
    background: 'var(--dualpadel-white)',
    borderRadius: 'var(--dualpadel-radius-15)',
    filter: 'var(--dualpadel-filter-drop-shadow)',
    padding: 25,
    marginTop: 23
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: 'var(--dualpadel-color)',
    marginBottom: 15
  },
  addButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 25
  },
  categoriesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 9
  }
}
interface Props {
  isTablet?: boolean
  isMobile?: boolean
}
export const CategoryPage = ({ isTablet, isMobile }: Props) => {
  const categoriesParent = useCategoriesParentStore(state => state.categoriesParent)
  const getCategoriesParent = useCategoriesParentStore(state => state.getCategoriesParent)
  const createCategoryParent = useCategoriesParentStore(state => state.createCategoryParent)
  const setCategoriesParent = useCategoriesParentStore(state => state.setCategoriesParent)
  const updateCategoryParent = useCategoriesParentStore(state => state.updateCategoryParent)

  const [enableInput, setEnableInput] = useState(false)

  const handleOnClick = () => {
    !enableInput && setEnableInput(true)
  }

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const categoryName = formData.get('category') as string
    categoryName && createCategoryParent({ name: categoryName })
    setEnableInput(false)
  }
  const handleEditModeCategory = (categoryId: string | undefined) => {
    setCategoriesParent(categoryId)
  }

  const handleUpdateCategory = (e: React.FormEvent, categoryId: string | undefined) => {
    e.preventDefault()
    console.log('handleUpdateCategory', categoryId)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const categoryName = formData.get('category') as string
    categoryId && updateCategoryParent(categoryId, { name: categoryName })
  }

  useEffect(() => {
    getCategoriesParent()
  }, [getCategoriesParent])
  return (
    <div className='categories-page' style={styles.page}>
      <Sidebar isMobile={isMobile} isTablet={isTablet} />
      <div className='categories-container' style={styles.container}>
        <Navbar />

        <div className='categories-content' style={styles.categories}>
          <div className='add-category'>
            <AddButton text='Añadir' style={styles.addButton} onClick={handleOnClick} />
          </div>
          <div className='categories-title' style={styles.title}>
            Categorias
          </div>
          {enableInput &&
            <form onSubmit={handleSaveCategory} style={{ marginBottom: 9 }}>
              <Input placeholder='Nombre Categoria' name='category'>
                <SaveIcon />
              </Input>
            </form>}
          <div className='categories-list' style={styles.categoriesList}>
            {categoriesParent.map((category) => {
              return (
                <form key={category.id} onSubmit={(e: React.FormEvent) => handleUpdateCategory(e, category.id)}>
                  <Input placeholder='Nombre Categoria' name='category' defaultValue={category.name} disabled={!category.enabled}>
                    {
                    !category.enabled
                      ? <EditIcon styles={{ color: 'gold' }} onClick={() => handleEditModeCategory(category.id)} />
                      : <SaveIcon />
                  }
                  </Input>
                </form>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
