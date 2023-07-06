

import {Routes, Route} from 'react-router-dom'


import Login from '../pages/Login';
import { LogoutPage } from '../pages/Logout';
import CashierIndex from '../pages/cashier/CashierIndex';
//import { CashierPage } from '../pages/Cashier';
//import { DashboardPage } from '../pages/Dashboard';
import OpenCashier from './Cashier/OpenCashier';
import { LandingPage } from '../pages/Landing';

import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';






const MainRoutes = () => ( 
 
      <Routes>
        {/** Protected Routes */}
        {/** Wrap all Route under ProtectedRoutes element 
         * <Route index element={<Navigate replace to="dashboard" />}/>
        */}
        <Route index element={<LandingPage />} />
        <Route path="landing" element={<LandingPage />} />
        <Route  element={<ProtectedRoutes/>}>
            <Route path="app" element={<OpenCashier/>}/>
            <Route path="app/cashier/*" element={<CashierIndex/>}/>
            <Route path="/logout" element={<LogoutPage/>}/>
                              
             {/* <Route path="settings" element={<Settings/>}/>            
             <Route path="users" element={<Users extraItem="test extra item from router"/>}/>            
             <Route path="users/:userId" element={<SingleUser/>}/>           
             <Route path="users/new" element={<NewUser/>}/>   */}         
                      
         
        </Route>       
        
         {/** Public Routes */}
        {/** Wrap all Route under PublicRoutes element */}
        <Route element={<PublicRoutes/>}>
          <Route path="/login" element={<Login/>}/>

        </Route>
        <Route path="*" element={<p>nothing here: 404!</p>} />
      </Routes>

     
    )
    
    export default MainRoutes