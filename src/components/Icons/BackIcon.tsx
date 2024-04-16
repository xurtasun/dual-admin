interface Props {
  styles?: React.CSSProperties
}
export const BackIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      arrow_back
    </span>
  )
}
