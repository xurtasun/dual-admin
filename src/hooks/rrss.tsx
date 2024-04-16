import { baseURL } from '../libs/axios'
export const useOAuthRRSS = () => {
  const BASEURL = baseURL || 'http://localhost:3000'

  const googleOAuth = () => {
    window.open(`${BASEURL}/auth/google`, '_self')
  }

  return {
    googleOAuth
  }
}
