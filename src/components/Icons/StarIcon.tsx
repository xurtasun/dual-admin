interface Props {
  styles?: React.CSSProperties
}
export const StarIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      stars
    </span>
  )
}
