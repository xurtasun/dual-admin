interface Props {
  text: string
  styles?: React.CSSProperties
}
const labelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 'bold',
  color: 'var(--dualpadel-color)'
}
export const Label = ({ text, styles }: Props) => {
  return (
    <label style={{ ...labelStyle, ...styles }}>
      {text}
    </label>
  )
}
