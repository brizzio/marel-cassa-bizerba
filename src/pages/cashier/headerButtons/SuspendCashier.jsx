/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuspendCashier = () => {
const navigate = useNavigate()
  return (
    <div 
    className='h-full w-full debug flex flex-col items-center justify-center gap-4'
    >
        <div>SuspendCashier</div>
        <button
        onClick={()=>navigate(-1)}
        >INDIETRO</button>

    </div>
    
  )
}

export default SuspendCashier