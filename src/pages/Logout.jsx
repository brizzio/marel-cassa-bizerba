
import {useNavigate } from 'react-router-dom';

export const  LogoutPage=() =>{

  const navigate=useNavigate()

  const logout=()=>{
    localStorage.removeItem('cashier')
    localStorage.removeItem('readed')
    localStorage.removeItem('isScannerOn')
    localStorage.removeItem('currentRead')
    localStorage.removeItem('prices')
    localStorage.removeItem('internet')
    localStorage.removeItem('user')
    localStorage.removeItem('device')
    localStorage.removeItem('user')
    localStorage.removeItem('ipData')
    localStorage.removeItem('currentCart')

    navigate('/')
  }

  return <div className='flex flex-col items-center justify-center w-full h-full gap-[3rem]'>
      <h2 className='text-4xl font-thin text-center w-4/12 '>Clicca per uscire con sicurezza dal sistema </h2>
      
      <button 
      className='p-[2rem] w-4/12 bg-blue-200 bg-opacity-20 border border-stone-300 border-opacity-10 rounded-xl shadow-xl backdrop-blur-md'
      onClick={logout}> CLICCA PER USCIRE
      </button>
  </div>;
}

