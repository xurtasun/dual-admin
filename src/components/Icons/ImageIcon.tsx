interface Props {
  styles?: React.CSSProperties
}
export const ImageIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      imagesmode
    </span>
  )
}
