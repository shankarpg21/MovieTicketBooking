import { useAuth } from './AuthProvider'
import { Navigate } from 'react-router-dom';

const RequireAdminAuth = ({children}) => {
    const auth=useAuth();
    if(!auth.user || auth.isUser){
        return <Navigate to='/admins/login'/>
    }
  return (
      children
  )
}

export default RequireAdminAuth
