/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState, useEffect}from 'react'
import useBags from './useBags'




const Bags = ({active}) => {

   const [count, setCount] = React.useState(0)
  const runOnce = React.useRef(true)
  
    const {
      
      addBag,
      removeBag,
      counter
    
    }=useBags()

    React.useEffect(()=>{

      if (runOnce.current) setCount(counter())

    },[])
    

    async function increment () {
        setCount(prevCount => prevCount+=1);
        addBag()
    }
  
    async function decrement() {

          setCount(prevCount => prevCount>0?prevCount - 1:0)
          removeBag()
         
    }

     
  return (
    <div className='flex flex-col items-center justify-center text-xl grow px-1 gap-2  '>
         <button onClick={increment}>
            <i className={`fa-solid fa-plus fa-xl text-teal-700 ${!active?'hidden':''}`}></i>
        </button>
      
      <div className={`relative flex w-full items-center justify-center `}>
        
        <span className={`absolute  text-center text-6xl font-semibold pl-3 text-teal-800 pr-2 ${!count?'hidden':''}`}>{count}</span>
        <i className="fa-solid fa-bag-shopping fa-4x text-zinc-500 opacity-40"></i>
      </div>
       
        <button onClick={decrement}>
            <i className={`fa-solid fa-minus fa-xl text-teal-700 ${!active?'hidden':''}`}></i>
        </button>
    </div>
  )
}

export default Bags