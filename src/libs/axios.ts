import axios, { AxiosRequestConfig } from 'axios'
import { useAuthStore } from '../store/auth'

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.HTTP_BASE_URL
    : 'http://localhost:3000'

const authApi = axios.create({
  baseURL,
  withCredentials: true
})

const baseApi = axios.create({ baseURL, withCredentials: true })

authApi.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  console.log(token)
  const headers = config.headers as AxiosRequestConfig['headers']
  if (token != null && headers != null) headers.Authorization = `Bearer ${token}`
  return config
})

authApi.interceptors.response.use(response => {
  return response
},
async error => {
  if (error?.response?.status === 401) {
    window.location.href = '/login'
  }
}
)

export {
  baseApi,
  authApi,
  baseURL
}
