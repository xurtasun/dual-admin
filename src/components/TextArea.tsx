interface Styles {
  container: React.CSSProperties
  textarea: React.CSSProperties
  error: React.CSSProperties
  textareaEditMode: React.CSSProperties
  flex_row: React.CSSProperties
}
const styles: Styles = {
  textarea: {
    borderRadius: 30,
    width: 180,
    paddingTop: 20,
    border: '3px solid var(--background-color)',
    paddingLeft: 20,
    textAlign: 'left',
    fontFamily: 'var(--dualpadel-font-family)'
  },
  textareaEditMode: {
    border: '3px solid var(--dualpadel-gray)'
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  flex_row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 9,
    color: 'var(--dualpadel-color)'
  },
  error: {
    color: 'red',
    fontSize: 11,
    marginTop: 5,
    marginLeft: 3
  }
}
interface InputProps {
  name?: string
  placeholder?: string
  type?: string
  styles?: React.CSSProperties | null
  defaultValue?: string | number
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  errorMessage?: string
  step?: string
  editMode?: boolean
  children?: React.ReactNode
  disabled?: boolean
}
export const TextArea = (props: InputProps) => {
  return (
    <div className='flex-row' style={styles.flex_row}>
      <div className='flex-column' style={styles.container}>
        <textarea cols={10} rows={10} defaultValue={props.defaultValue} name={props.name} value={props.value} placeholder={props.placeholder !== undefined ? props.placeholder : undefined} style={props.editMode ? { ...styles.textarea, ...styles.textareaEditMode, ...props.styles } : { ...styles.textarea, ...props.styles }} onChange={props.onChange} disabled={props.disabled} />
        {props.errorMessage && <span style={styles.error}>{props.errorMessage}</span>}
      </div>
      {props.children}
    </div>
  )
}
