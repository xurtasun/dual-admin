import cookies from 'js-cookie'

export const useCookies = () => {
  const get = (key: string) => cookies.get(key)
  const set = (key: string, value: string) => cookies.set(key, value)
  const remove = (key: string) => cookies.remove(key)

  return { get, set, remove }
}
