import { PhoneIcon } from './Icons/PhoneIcon'
interface Props {
  phone: string
  styles?: React.CSSProperties
}

export const Phone = ({ phone, styles }: Props) => {
  return (
    <>
      <PhoneIcon styles={styles} />
      <a href={`https://api.whatsapp.com/send?phone=${phone}`} target='_blank' rel='noreferrer'>
        {phone}
      </a>
    </>
  )
}
