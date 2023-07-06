

import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const user=localStorage.getItem('user')
  if(user){
    return true
  } else {
    return false
  }
}

const  PublicRoutes=() =>{

  const auth=useAuth()

  return auth?<Navigate to="/app"/>: <Outlet/>
}

export default PublicRoutes;