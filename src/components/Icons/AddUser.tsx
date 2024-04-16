interface Props {
  styles?: React.CSSProperties
}
export const AddUser = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      person_add
    </span>
  )
}
