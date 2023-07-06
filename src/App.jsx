import React from 'react';
import MainRoutes from './components/MainRoutes';
import { useNavigate } from 'react-router-dom';

//If you want to disable ctrl+f5 , ctrl+R , f5 ,backspace then you can use this simple code. This code is working in Mozila as well as Chrome . Add this code inside your body tag:

//<body onkeydown="return (event.keyCode == 154)"></body>
function App() {

  const navigate = useNavigate();
    

  React.useEffect(()=>{
    console.log('application started')
    navigate('/landing')
    return ()=>{
      console.log('application will shut down')
    }
  },[])

  
  return (
    <MainRoutes/>
  )
}

export default App
