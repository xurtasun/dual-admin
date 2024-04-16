import { useCookies } from '../hooks/cookie'
import { baseApi } from '../libs/axios'

export const login = async ({ email, password }: { email: string, password: string }) => {
  return await baseApi.post('/auth/login', { email, password })
}

export const signUp = async ({ email, password, firstName, lastName }: { email: string, password: string, firstName: string, lastName: string }) => {
  return await baseApi.post('/auth/signup', { email, password, firstName, lastName })
}

export const getMe = async () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const token = useCookies().get('accessToken')
  console.log(token)
  if (token == null) {
    throw new Error('No token')
  } else {
    const res = await baseApi.get('/customers/me', { headers: { Authorization: `Bearer ${token}` } })
    return res.data
  }
}
