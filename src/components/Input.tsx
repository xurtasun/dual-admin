interface Styles {
  container: React.CSSProperties
  input: React.CSSProperties
  error: React.CSSProperties
  inputEditMode: React.CSSProperties
  flex_row: React.CSSProperties
}
const styles: Styles = {
  input: {
    borderRadius: 30,
    height: 30,
    width: 180,
    padding: 0,
    border: '3px solid var(--background-color)',
    paddingLeft: 10,
    textAlign: 'left'
  },
  inputEditMode: {
    border: '3px solid var(--dualpadel-light-gray)'
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
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  errorMessage?: string
  step?: string
  editMode?: boolean
  children?: React.ReactNode
  disabled?: boolean
}
export const Input = (props: InputProps) => {
  return (
    <div className='flex-row' style={styles.flex_row}>
      <div className='flex-column' style={styles.container}>
        <input defaultValue={props.defaultValue} name={props.name} step={props.step} value={props.value} placeholder={props.placeholder !== undefined ? props.placeholder : undefined} style={props.editMode ? { ...styles.input, ...styles.inputEditMode, ...props.styles } : { ...styles.input, ...props.styles }} type={props.type} onChange={props.onChange} disabled={props.disabled} />
        {props.errorMessage && <span style={styles.error}>{props.errorMessage}</span>}
      </div>
      {props.children}
    </div>
  )
}
