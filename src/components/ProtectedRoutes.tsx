import { Navigate, Outlet } from 'react-router-dom'

interface Props {
  isAllowed: boolean
  redirectTo?: string
}

export const ProtectedRoute = ({
  isAllowed,
  redirectTo = '/login'
}: Props) => {
  if (!isAllowed) return <Navigate to={redirectTo} />
  return <Outlet />
}
