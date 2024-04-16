interface Props {
  styles?: React.CSSProperties
}

export const PhoneIcon = ({ styles }: Props) => {
  return (
    <>
      <span className='material-symbols-rounded' style={styles}>
        phone_iphone
      </span>
    </>
  )
}
