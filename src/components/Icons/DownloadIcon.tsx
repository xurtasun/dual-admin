interface Props {
  styles?: React.CSSProperties
}

export const DownloadIcon = ({ styles }: Props) => {
  return (
    <span className='material-symbols-rounded' style={styles}>
      download
    </span>
  )
}
