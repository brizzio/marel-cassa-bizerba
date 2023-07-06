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

    const removeItemFromCart= (e)=>{
        console.log('event removeItemByKey', e); 
        removeItemByKey(e)
    }
    
    const price = item.calculated_price?item.calculated_price:0
    

    return (
    <div className='flex flex-row items-center justify-between text-normal text-gray-900 border-b border-gray-400'>
        <div className='flex flex-row items-center'>
            <span className="font-semibold">{item.promo_type>0?"P":"R"}</span> 
            {/* <span className="px-2">{item.upc}</span>  */}
            <span className="px-2 truncate w-[8rem]">{item.product_name}</span> 
                
            <span className="px-2">{item.weight}</span><span>{item.weight_unit}</span>          
        </div>  
        <div className="">
            <div className="flex flex-row items-center gap-1">
            <span>
            {`( ${item.order} ) `}    
            </span>
            <div className="flex items-center gap-0.5">
                <span className="font-bold">{item.currency}</span>
                <span className="text-normal">{price.toFixed(2)}</span>
            </div>
            
            
            {item.product_id !== 145 && <button id={item.entryID} 
                    onClick={event=>removeItemFromCart(index)}>
                <i className="fa-regular fa-trash-can text-red-300 fa-md"></i>
            </button>}
            </div>          
        </div>
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
                ?<div id="table-body" className='flex flex-col  p-2 overflow-y-auto'>
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