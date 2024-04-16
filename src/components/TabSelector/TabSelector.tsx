import './TabSelector.scss'
interface TabSelectorProps {
  direction: 'row' | 'column'
  tabs: string[]
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void
  selected?: string | null
  itemStyle?: React.CSSProperties
}
interface Styles {
  row: React.CSSProperties
  column: React.CSSProperties
  tabs: React.CSSProperties
  tabSelectorItem: React.CSSProperties
  selected: React.CSSProperties
  lastOneRow: React.CSSProperties
  firstOneRow: React.CSSProperties
  lastOneColumn: React.CSSProperties
  firstOneColumn: React.CSSProperties
  borderRight: React.CSSProperties
  borderBottom: React.CSSProperties
}
const styles: Styles = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tabs: {
    border: '3px solid var(--dualpadel-light-gray)',
    borderRadius: 'var(--dualpadel-radius-15)'
  },
  tabSelectorItem: {
    cursor: 'pointer',
    padding: 15,
    color: 'var(--dualpadel-gray)',
    fontWeight: '600',
    textAlign: 'center'
  },
  selected: {
    background: 'var(--dualpadel-gray)',
    color: 'var(--dualpadel-color)',
    fontWeight: '600'
  },
  borderRight: {
    borderRight: '3px solid var(--dualpadel-light-gray)'
  },
  borderBottom: {
    borderBottom: '3px solid var(--dualpadel-light-gray)',
    width: 80
  },
  lastOneRow: {
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12
  },
  firstOneRow: {
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12
  },
  lastOneColumn: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12
  },
  firstOneColumn: {
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12
  }

}
export const TabSelector = ({ direction, tabs, onClick, selected, itemStyle }: TabSelectorProps) => {
  return (
    <div className='tab-selector' style={{ ...styles[direction], ...styles.tabs }}>
      {
        tabs.map((tab, index) => {
          const style = index === 0 ? direction === 'row' ? styles.firstOneRow : styles.firstOneColumn : index === tabs.length - 1 ? direction === 'row' ? styles.lastOneRow : styles.lastOneColumn : {}
          const borderStyle = direction === 'row' ? styles.borderRight : styles.borderBottom
          return (
            <div key={index} data-value={tab} className='tab-selector-item' style={tab === selected ? { ...styles.tabSelectorItem, ...styles.selected, ...borderStyle, ...style, ...itemStyle } : { ...styles.tabSelectorItem, ...borderStyle, ...style, ...itemStyle }} onClick={onClick}>
              {tab}
            </div>
          )
        })
      }
    </div>
  )
}
