import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const RequireAuth = ({children}) => {
    const auth=useAuth();
    if(!auth.user||auth.isAdmin){
        return <Navigate to='/users/login'/>
    }
  return (
      children
  )
}

export default RequireAuth
