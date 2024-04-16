import whatsappico from '../../assets/icons/whatsapp.svg'
interface Props {
  style?: React.CSSProperties
}
export const WhatsappIcon = ({ style }: Props) => {
  return (
    <img src={whatsappico} alt='find' style={style} />
  )
}
