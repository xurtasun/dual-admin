interface Props {
  styles?: React.CSSProperties
}
export const PersonConfiguredIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      manage_accounts
    </span>
  )
}
