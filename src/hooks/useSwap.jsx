/* eslint-disable no-unused-vars */
import React from 'react'
import usePersistentContext from './usePersistentContext'

const useSwap = () => {

    const [swap, setSwap] =usePersistentContext('swap')
    
    const leftHanded  = {
        value:false,
        title:'mancino'
    }

    const rightHanded  = {
        value:true,
        title:'destro'
    }

    const toggleSwap = () => setSwap(!swap)

    const setUserSwap = (value)=>setSwap(value)

    React.useEffect(()=>{

        let existing = localStorage.getItem('swap')
        if(!existing){
            console.log('setting swap')
            setUserSwap(true)
        }

    })
  
  
  
    return {swap, toggleSwap, setUserSwap}
}

export default useSwap