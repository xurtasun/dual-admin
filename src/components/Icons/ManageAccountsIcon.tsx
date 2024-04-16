interface Props {
  styles?: React.CSSProperties
}

export const ManageAccountsIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      manage_accounts
    </span>
  )
}
