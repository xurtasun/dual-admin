interface Props {
  styles?: React.CSSProperties
}
export const MedalIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      license
    </span>
  )
}
