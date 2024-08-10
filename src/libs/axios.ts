import axios, { AxiosRequestConfig } from 'axios'
import { useAuthStore } from '../store/auth'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.dualpadel.com'
    : 'http://localhost:3002'

const authApi = axios.create({
  baseURL,
  withCredentials: true
})

const baseApi = axios.create({ baseURL, withCredentials: true })

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  const headers = config.headers as AxiosRequestConfig['headers']
  if (token != null && headers != null) headers.Authorization = `Bearer ${token}`
  return config
})

authApi.interceptors.response.use(response => {
  return response
},
async error => {
  if (error?.response?.status === 401) {
    useAuthStore.getState().logout()
    window.location.href = '/login'
  }
  throw error
}
)

export {
  baseApi,
  authApi,
  baseURL
}
