/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import {useNavigate } from 'react-router-dom';
import usePersistentContext from '../hooks/usePersistentContext';
import useTimeZoneDate from '../hooks/useTimeZone';

import useAuth from '../hooks/useAuth';



const  Login=() =>{

  const navigate=useNavigate()

 const {
    getLoggedUserInfo,
    auth
  }=useAuth()

  const {
    millis,
    formattedDate,
    formattedTime
  } = useTimeZoneDate()

  

  const login= async (u)=>{
    console.log('on login auth', auth)
    const logged = await getLoggedUserInfo(u)
    console.log('on logged before nav', logged)
    if (logged) navigate('/app')
  }

 

  return <div className='flex flex-col items-center justify-center w-full h-full gap-[3rem]'>
      <h2 className='text-4xl font-thin text-center w-4/12 '>Accesso ristretto a utenti registrati. </h2>
      <p className='text-2xl font-thin text-center w-4/12 '>Schegli il ruolo per accessare il sistema.</p>
      <button 
      className='p-[2rem] w-4/12 bg-blue-200 bg-opacity-20 border border-stone-300 border-opacity-10 rounded-xl shadow-xl backdrop-blur-md'
      onClick={()=>login(1)}> Entra come amministratore</button>
      <button 
      className='p-[2rem] w-4/12 bg-blue-200 bg-opacity-20 border border-stone-300 border-opacity-10 rounded-xl shadow-xl backdrop-blur-md'
      onClick={()=>login(2)}> Entra come operatore di cassa</button>
  </div>;
}

export default Login;