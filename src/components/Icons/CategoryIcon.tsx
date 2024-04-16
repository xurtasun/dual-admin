interface Props {
  styles?: React.CSSProperties
}
export const CategoryIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      category
    </span>
  )
}
