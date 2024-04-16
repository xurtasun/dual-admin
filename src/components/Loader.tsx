import { ProgressBar } from 'react-loader-spinner'

const styles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '450px',
  height: '40vh'
}
export const Loader = () => {
  return (
    <div className='loaderContainer' style={styles}>
      <ProgressBar
        height='80'
        width='80'
        ariaLabel='progress-bar-loading'
        wrapperStyle={{}}
        wrapperClass='progress-bar-wrapper'
        borderColor='#192D4D' // blue
        barColor='#92ED1B'
      />
    </div>

  )
}
