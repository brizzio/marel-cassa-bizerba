/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDevice } from '../../hooks/useDevice';
import useCashier from '../../hooks/useCashier';
import StaticMap from '../StaticMap';
import useAuth from '../../hooks/useAuth';
import StoreOptions from '../StoreOptions';
import WorkingStore from './WorkingStore';
import DisplayBalance from '../DisplayBalance';
import useCashInventory from '../../hooks/useCashInventory';
import useIntl from '../../hooks/useIntl';



const OpenCashier = ()=> {
  
  const {logout} = useAuth()

  

  const getUser = () =>{
    return JSON.parse(localStorage.getItem('user'))
  }

  const [user, setUser] = React.useState(getUser())
  const [step, setStep] = React.useState(0)
  const [workingStore, setWorkingStore] = React.useState(null)
  const [userStores, setUserStores] = React.useState([])


  const navigate = useNavigate()

  const {did} = useDevice()

  const {
    openCashier,
    closeCashier,
    updateCashier,
    updateStoreSelection,
    cashier
    } = useCashier()
  


  React.useEffect(()=>{
    console.log('opencashier eff ', step, user.stores.length == 1)
    if(user.stores.length == 1) setWorkingStore(user.stores[0])

    return ()=>console.log('opencashier eff unmount')
    
  },[step])

  React.useEffect(()=>{
    console.log('update cashier with store selected ')
    if(workingStore) updateStoreSelection(workingStore)
    
  },[workingStore])

  

  const displayComponent = () => {
    switch (step) {
      case 0:
        return workingStore
        ?<WorkingStore store={workingStore} user={user} undo={unSelectStore} next={next}/>
        :<First data={user.stores} exit={exit} select={selectStore}/>
      case 1:
        return <Second back={back} next={next}/>;
       case 2:
         return <Wrapper 
         back={back} 
         open={openCashier} 
         store={workingStore} 
         user={user}
         />;
       default:
         return <First />;
    }
  }; 

  const back = () => {

    setStep(prev=>prev>0?prev-1:0)

  }

  const next = () => {

    setStep(prev=>prev < 2?prev+1:2)

  }

  const exit = () => {
    logout()
    navigate('/landing')
  }

  const selectStore = (selected) =>{
    setWorkingStore(selected)
  }

  const unSelectStore = () =>{
    setWorkingStore(null)
  }


  

  return (
    <div className='relative flex w-full grow items-center justify-center'>
        {displayComponent()}
        
    </div>
  )
}

export default OpenCashier

//display cashier info for evaluation - first step

const First =({data, exit, select})=>{
//style={{background-image:`url(male.png)`}}




console.log('storesThatUserCanAccess ', data)
return (
    <div className='flex w-full h-full items-center justify-center text-black text-2xl '>
        <div className='flex flex-col w-full h-full p-8 '>
            <span className='text-3xl text-teal-700 text-center'>Scegli il negozio dove aprire il cassa.</span>
            <StoreOptions stores={data} selectStore={select}/>
            
        </div>
        
        <button className='absolute bottom-0 left-0 p-4 border rounded-md bg-white shadow-xl' onClick={exit}><i className="fas fa-chevron-left px-2"></i>ESCI</button>
       
        </div>
        

)


}


//display cashier info for evaluation - first step
const Second = ({back, next})=>{

    const moveToNext = () => next()

    return (
        <div className='flex w-full h-full items-center justify-center'>
            <DisplayBalance confirm={moveToNext}/>
        
        </div>
    )


}

const Wrapper = ({back, open, store, user})=>{

    const {total} = useCashInventory()
    const {currency} = useIntl()

    const row=`flex h-fit items-center justify-center gap-6 `
    const label =`text-lg font-semibold text-center p-3`
    const field =`text-2xl  border border-teal-300 border-2 border-opacity-20 rounded-xl shadow-xl bg-white bg-opacity-30 drop-shadow-xl grow px-4 py-[1rem] font-semibold `
    
    return (
       
    
            
        <div className='relative flex flex-col border-l border-stone-200 h-full w-7/12 gap-[1rem] pt-4 px-4'>
            <div className={`${row}`}>
                <span className={`${label}`}><i className="fas fa-store fa-2x text-stone-600"></i></span>
                <span className={`${field}`}>{store.corporate_name}</span>
            </div>
            <div className={`${row}`}>
                <span className={`${label}`}>
                {user.isAdmin || user.isSuper
                    ?<i className="fas fa-user-shield text-orange-600 fa-2x text-center"></i>
                    :user.isCashier 
                    ?<i className="fas fa-user-pen fa-2x text-green-700"></i>
                    :<i className="fas fa-user fa-2x text-stone-400"></i>
                }
                </span>
                <span className={`${field}`}>{user.name}</span>
            
            </div>
            <div className={`${row}`}>
                <span className={`${label}`}><i className="fas fa-cash-register fa-2x text-stone-600"></i></span>
                <span className={`${field}`}>3182272</span>
            </div>
            <div className={`${row}`}>
                <span className={`${label}`}><i className="fas fa-sack-dollar fa-2x text-stone-600"></i></span>
                <span className={`${field}`}>{currency(total)}</span>
            </div>
            <div>
                <button 
                className='btn-primary w-full py-[3rem] mt-[1rem] text-3xl'
                onClick={open}>CONFERMA</button>
            </div>
            
        
        
        
        {/* ABSOLUTE POSITIONED ITEMS 
        <button className='absolute bottom-0 left-0 p-4 border rounded-md bg-white shadow-xl' onClick={back}><i className="fas fa-chevron-left px-2"></i>ESCI</button>
        <button className='absolute bottom-0 right-0 btn-primary'onClick={open}>CONFERMA</button>*/}
        
        
        </div>
           
         
         
         
         
         
     
    )


}