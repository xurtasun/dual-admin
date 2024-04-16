interface Props { styles?: React.CSSProperties }

export const GroupIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      group
    </span>
  )
}
