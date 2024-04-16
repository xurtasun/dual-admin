interface Props {
  styles?: React.CSSProperties
}
export const HomeIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      home
    </span>
  )
}
