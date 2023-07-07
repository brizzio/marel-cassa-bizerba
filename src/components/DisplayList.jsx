/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */


import React from 'react'
import PropTypes from 'prop-types';
import useCart from '../hooks/useCart';

//import usePersistentContext from '../../hooks/usePersistentContext';






const RenderListItem = ({item, index}) => {
    //console.log('list item: ', item)

    //console.log('index', index.toString())

    const {removeItemByKey} = useCart()

    const removeItemFromCart= ()=>{
        console.log('removeItemFromCart', index); 
        removeItemByKey(index)
    }
    
    const price = item.calculated_price?item.calculated_price:0
    

    return (
    <div className='flex flex-row items-center justify-start text-normal text-gray-900 border-b border-gray-400 rounded-l-2xl bg-white shadow-lg gap-1 w-full py-2 pr-2'>
        {/* trash */}
        <div className=' flex items-center pl-1 bg-zinc-300 h-full border rounded-l-2xl' >
           {item.product_id !== 145 && 
           <button
           className='w-[2rem] text-center py-2' 
           id={item.entryID} 
                    onClick={removeItemFromCart}>
                <i className="fa-regular fa-xl fa-trash-can text-red-900 fa-md"></i>
            </button>}
        </div>
        {/* 2 lines */}
        <div className='flex flex-col w-full gap-2'>
            {/* line 1 */}
            
                <div className='flex gap-3 leading-3'>
                    <span className="font-normal font-semibold ">{item.upc}</span>
                    <span className="font-semibold">{item.promo_type>0?"P":"R"}</span> 
                </div>
                <div className='flex w-full items-center justify-between'>
                    <span className='line-clamp-2 leading-3 w-[12rem]'>{item.product_name}</span>
                    <span className="text-normal font-semibold text-2xl tracking-tighter leading-3">{item.currency}{price.toFixed(2)}</span>
                </div>
            
            {/* line 2 */}
            <div className='flex leading-3'>
              <span>{item.weight}</span>
              <span>{item.weight_unit}</span>
              <span>{`( ${item.order} ) `}</span>
            </div>

        </div>
       

        {/* 
        <div className='flex flex-row items-center'>
            <span className="font-semibold">{item.promo_type>0?"P":"R"}</span> 
           <span className="px-2">{item.upc}</span>  
            <span className="px-2 truncate w-[8rem]">{item.product_name}</span> 
                
            <span className="px-2">{item.weight}</span><span>{item.weight_unit}</span>          
        </div>  
        */}
       {/*  <div className="">
            <div className="flex flex-row items-center gap-1">
            <span>
            {`( ${item.order} ) `}    
            </span>
            <div className="flex items-center gap-0.5">
                <span className="font-bold">{item.currency}</span>
                <span className="text-normal">{price.toFixed(2)}</span>
            </div>
            
            
            {item.product_id !== 145 && <button id={item.entryID} 
                    onClick={removeItemFromCart}>
                <i className="fa-regular fa-trash-can text-red-300 fa-md"></i>
            </button>}
            </div>          
        </div> */}
    </div>
    )
}

RenderListItem.propTypes = {
    item:PropTypes.object
}





const DisplayList = ({items}) => {

  

  return (
    
    
        <div id="list" className={`flex flex-col w-full h-full `}>
            {/* <div id="table-header" className='flex flex-row items-center justify-between py-2 px-3 text-xs border rounded-md border-indigo-400' >
                <div>
                    <span className="px-2">CARRELLO SPESA</span>
                    <span className="px-2">Data: 26/12/2022</span> 
                    <span className="px-2">Cliente: 58659</span>  
                    <span className="px-2">Ora Inizio: 12:51:30</span>  
                </div>  
            </div>  */}

           
            {
                JSON.stringify(items)!== '[]'
                ?<div id="table-body" className='flex flex-col  p-2 overflow-y-auto gap-2'>
                {items?.filter((i)=>!i.deleted).map(function(i, idx){
                    return (<RenderListItem key={idx} index={idx} item={i} />)
                })}
                </div>
                :<div className="flex w-full h-full items-center justify-center ">
                    <span className="w-4/6 h-fit text-2xl font-thin">Cassa pronto per inserzione di prodotti...</span>
                </div>
            }
            
        </div>
        
    
    
  )
}

DisplayList.propTypes = {
    item:PropTypes.object,
    items:PropTypes.array
}



export default DisplayList