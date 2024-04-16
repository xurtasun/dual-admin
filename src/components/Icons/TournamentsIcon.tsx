interface Props {
  styles?: React.CSSProperties
}

export const TournamentsIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      sports_tennis
    </span>
  )
}
