/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import ContentLayout from '../ContentLayout'
import DisplayBalance from './cashDisplay/CashDisplay';
import CashSplit from './CashSplit';


import {
   
    Routes,
    Route,
    Outlet,
    useNavigate,
    useLocation
    
  } from "react-router-dom";

const CashIndex = ({back}) => {


  return (
    <>
    <Outlet />    
    <Routes>
        <Route index element={<Start/>} />
        <Route path='split' element={<CashSplit/>} />
        <Route path='end' element={<Index/>} />
    </Routes>
    </>
  )
}

export default CashIndex


const Start = () =>{

    

    return(

       
            <div 
            className='relative flex flex-col h-full w-full items-start justify-start'
            >
                <DisplayBalance />
                
                <button className='absolute top-0 right-0  shadow-xl m-2 ' ><i className="fas fa-xmark text-teal-700 text-4xl"></i></button>
            </div>
                
                       
            



        
    )




}

const Index = () =>{

    const navigate = useNavigate()

    return(

        <ContentLayout>
            <div 
            className='flex flex-col h-full w-full items-center justify-center'
            >
                <div
                  className='flex flex-col h-3/6 w-full items-center justify-between debug'
                >

                    <span
                    className='text-4xl font-thin'
                    >Inserire il valore a pagare</span>
                   
                    <button
                    className='btn-confirm '
                    
                    >CONFERMA IL VALORE</button>

                </div>
                

            </div>
                
                       
            <button className='absolute bottom-0 left-0 p-4 border rounded-md bg-white shadow-xl m-2' onClick={()=>navigate(-1)}><i className="fas fa-chevron-left px-2"></i>ESCI</button>



        </ContentLayout>
    )
}