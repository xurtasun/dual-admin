import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  isAllowed: boolean
  redirectTo?: string
}

export const ProtectedRoute = ({
  isAllowed,
  redirectTo = '/login'
}: Props) => {
  console.log('isAllowed', isAllowed, 'redirectTo', redirectTo)
  if (!isAllowed) return <Navigate to={redirectTo} />
  return <Outlet />
}
