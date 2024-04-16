interface Props {
  styles?: React.CSSProperties
}

export const TrophyIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      trophy
    </span>
  )
}
