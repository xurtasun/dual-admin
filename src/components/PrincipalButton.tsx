interface Props {
  text: string
  styles?: React.CSSProperties
  onClick?: () => void
}

const style: React.CSSProperties = {
  background: 'var(--dualpadel-color)',
  color: 'var(--dualpadel-white)',
  width: 100,
  height: 31,
  borderRadius: 'var(--dualpadel-radius-4)',
  border: 'none',
  cursor: 'pointer',
  fontSize: 14,
  marginTop: 0
}

export const PrincipalButton = ({ text, styles, onClick }: Props) => {
  return (
    <button style={{ ...style, ...styles }} onClick={onClick}>{text}</button>
  )
}
