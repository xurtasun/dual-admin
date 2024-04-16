interface Styles {
  input: React.CSSProperties
  error: React.CSSProperties
  container: React.CSSProperties
}
const styles: Styles = {
  input: {
    borderRadius: 30,
    height: 37,
    width: 261,
    padding: 0,
    border: '3px solid var(--dualpadel-color)',
    paddingLeft: 22
  },
  error: {
    color: 'red',
    fontSize: 11,
    marginLeft: 3
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5
  }
}
interface InputProps {
  name: string
  placeholder: string
  type?: string
  styles?: React.CSSProperties | null
  errorMessage?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const LoginInput = (props: InputProps) => {
  return (
    <div className='loginInputContainer' style={styles.container}>
      <input name={props.name} placeholder={props.placeholder} style={{ ...styles.input, ...props.styles }} type={props.type} onChange={props.onChange} />
      {props.errorMessage && <span style={styles.error}>{props.errorMessage}</span>}
    </div>
  )
}
