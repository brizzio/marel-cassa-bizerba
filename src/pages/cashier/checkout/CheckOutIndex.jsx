/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from 'react';
import BouncingDotsLoader from '../../../components/BouncingDotsLoader/BouncingDotsLoader';
import useCart from '../../../hooks/useCart';
import useCheckout from './useCheckout'
import Main from './Main';
import Bancomat from './Bancomat';
import CashIndex from './cash/CashIndex';
import PrinterComponent from './PrinterComponent';

import {
   
    Routes,
    Route,
    Outlet,
    useNavigate,
    useLocation
    
  } from "react-router-dom";


export default function CheckOutIndex() {


    const navigate = useNavigate()
    const {
        closeCart,
        currentCart 
    
    } = useCart()

    const {
        options,
        payment,
        init,
        setRowSelectedByIndex,
        clearSelections,
        addPaymentToList,
        resetPayment
       
       }= useCheckout()

    const location = useLocation()
    console.log(location)
    
    const endFlow = location.pathname.indexOf('printer') > 0

    console.log('endFlow', endFlow)

    const [loading, setLoading] = React.useState(false)

    //app/cashier/checkout/printer

    const handleConfirm = async () => {
        setLoading(true)
        console.log('close cart on checkout')
        closeCart()
        resetPayment()
        await new Promise(resolve => setTimeout(resolve, 700)); 
        setLoading(false)
        navigate('/app/cashier')
       
    }


    const handleBack = async () => {
        
        console.log('back')
        navigate(-1, {replace:true})
       
    }

    const handleSelect = (index)=>{

        console.log('selected', index)
        setRowSelectedByIndex(index)
        navigate(options[index].url)

    }

    const unSelect = ()=>{

        clearSelections()
        navigate(-1, {replace:true})

    }

    React.useEffect(()=>{
        console.log('selection changed', options)
        
    },[options])

   

    if( loading ) return <div className='flex items-center justify-center grow w-full'><BouncingDotsLoader/></div>

    
    return(
        
        <div  className='flex flex-row gap-3 items-center justify-center h-full w-full'>
            <div className='flex flex-col gap-3 items-center justify-start h-full basis-1/4'>
            <div className={` w-full h-fit`}>
            {
                options?.map((el,i)=>{
                    return(  
                    <div key={i}
                    className={`flex items-center w-full h-fit mt-2 gap-3`}
                    >
                        <SideButton 
                            face={el.title}
                            index={i}
                            faIcon={el.icon} 
                            action={handleSelect}
                            isClicked={el.selected} 
                        />
                        <div className="flex w-8/12 h-full border rounded-xl bg-white shadow-xl items-center justify-start py-4 px-1 text-stone-400 mt-1 gap-2">
                            <span className="text-4xl font-semibold ">€</span>
                            <span className="text-3xl font-thin  text-end w-full">{el.total.toFixed(2)}</span>
                        </div>
                
                    </div>
                    )
                })
            }
            
            
            </div>
            <button
            className='btn-primary w-full h-[6rem]'
            disabled = {!endFlow}
            onClick={handleConfirm}
            >CONFERMA</button>
             <button
            className='btn-primary w-full h-[4rem] bg-white text-black uppercase'
            onClick={handleBack}
            >indietro</button>


            </div>

            <div className='flex flex-col gap-3 items-center justify-center h-full basis-3/4'>
            <Outlet />
            
            <Routes>
                <Route index element={<Main 
                    payment={payment}
                    action={handleConfirm}
                />} />
                <Route path="cash/*" element={<CashIndex back={unSelect}/>} />
                <Route path="bancomat" element={<Bancomat 
                back={unSelect}
                action={addPaymentToList}
                payment={payment}
                
                />} />
                <Route path="bonus" element={<Bonus back={unSelect}/>} />
                <Route path="difer" element={<Difer back={unSelect}/>} />
                <Route path="printer" element={<PrinterComponent back={unSelect}/>} />

            </Routes>
            </div>

        </div>

        

       
    )

    
   
  }


  const SideButton = ({
    index,
    face,
    icon,
    faIcon,
    action,
    isClicked
}) =>{

    
    const click = () =>{
        console.log('clicked', face)
        action(index)
        
    }
    

    return (
        <button key={index} className={`flex items-center justify-center border  rounded-xl border-zinc-300 font-thin shadow-md py-4 h-[5.3rem] grow
        ${isClicked
        ?'bg-teal-500 text-white'
        :''}
        `}
        onClick={click}>
            {icon
            ?<img className="h-[3rem]" src={'/' + icon}/>
            :faIcon
            ?<i className={`${faIcon} fa-3x  ${isClicked?'text-white':'text-stone-400'}`}></i>
            :face.toUpperCase()}
        </button>
    )

}






const Bonus = ({back}) => {

   

    return(
        <div className='flex flex-col gap-3 items-center justify-center h-full w-full debug'>
            
            <button
            onClick={back}
            >back</button>
        </div>
    )
   

}

const Difer = ({back}) => {

    
    return(
        <div className='flex flex-col gap-3 items-center justify-center h-full w-full debug'>
            OTHER TYPES OF PAYMENTS
            <button
            onClick={back}
            >back</button>
        </div>
    )
   

}


