interface Props {
  styles?: React.CSSProperties
}
export const MailIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      mail
    </span>
  )
}
