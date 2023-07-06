
import {Navigate, Outlet} from 'react-router-dom'
import { AppLayout } from '../layouts/Application'
import useAuth from '../hooks/useAuth'





const  ProtectedRoutes=() =>{

  const {auth} = useAuth()
  console.log('auth', auth )
  

  return auth? <AppLayout><Outlet/></AppLayout>: <Navigate to="/login"/>
}

export default ProtectedRoutes;