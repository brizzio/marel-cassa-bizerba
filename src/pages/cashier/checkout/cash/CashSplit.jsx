/* eslint-disable react/prop-types */
import React from 'react'

import useCashInventory from '../../../../hooks/useCashInventory';
import useIntl from '../../../../hooks/useIntl';
import useSwap from '../../../../hooks/useSwap';
import { useNavigate } from 'react-router-dom';

import useCheckout from '../useCheckout';



const sample ={
    type: '',
    face:'',
    value:0, 
    quantity:0,
}

const CashSplit = () => {

  const navigate = useNavigate()
 
  const {
    
    inventory, 
    clearSelections, 
    updateQuantityToSelectedRow
  } = useCashInventory()

  const {
    
    cash,
    resetCash,
    addCashPaymentToList,
    
    payment={}
} = useCheckout()


  const {swap} = useSwap()

  const [input, setInput] = React.useState('')

 
  

  const [detail, setDetail] = React.useState([])

  const {currency} = useIntl()

  

  let sum = [...inventory].reduce((a,el)=>{
    let val = Number(el.value) * Number(el.quantity)
    return a + val
},0)

  React.useEffect(()=>{

    console.log('splitted cash',cash)
    console.log('payment',payment)
  
  },[])


  const handleCashConfirm = () =>{
      console.log('confirm cash payment')
      addCashPaymentToList()
      navigate('/app/cashier/checkout')
    
  }

  

    return (

      <div
      className='relative flex flex-col w-full h-full gap-4 debug'
      >
        <div className='flex w-full h-fit gap-6'>
            <div
            className={`flex items-center  gap-2`}
            >

               
                <i 
                className={`fas fa-cart-shopping fa-3x text-zinc-400 pr-1 shadow-xl`}
                />
                
                <div 
                className="flex w-[8rem] h-full border rounded-xl bg-white shadow-xl items-center justify-start py-4 px-1 text-stone-400 mt-1 gap-2"
                >
                    <span 
                    className="text-4xl font-semibold "
                    >
                        €
                    </span>
                    <span 
                    className="text-3xl font-semibold  text-end w-full"
                    >
                        {Number(cash?.due).toFixed(2)}
                    </span>
                </div>
              </div>

                <div
                  className={`flex items-center  gap-2 pl-1`}
                  >

                      <i 
                      className={`fas fa-sack-dollar fa-3x text-zinc-400 pr-1 shadow-xl`}
                      />

                      <div 
                      className="flex w-[8rem] h-full border rounded-xl bg-white shadow-xl items-center justify-start py-4 px-1 text-stone-400 mt-1 gap-2"
                      >
                          <span 
                          className="text-4xl font-semibold "
                          >
                              €
                          </span>
                          <span 
                          className="text-3xl font-thin  text-end w-full"
                          >
                              {cash?.cashedInTotal?Number(cash?.cashedInTotal).toFixed(2):'0.00'}
                          </span>
                      </div>
                  </div>

                  <div
                    className={`flex items-center  gap-2 pl-1`}
                    >

                        <i 
                        className={`fas fa-hand-holding-medical fa-3x pr-1 shadow-xl ${cash?.pending < 0?'text-red-600':'text-green-600'}`}
                        />
                        <div 
                        className={`flex w-[8rem] h-full border rounded-xl shadow-xl items-center justify-start py-4 px-1 text-stone-800 mt-1 gap-2
                        ${cash?.pending < 0?'bg-red-300':'bg-green-300'} bg-opacity-60
                        `}
                        >
                            <span 
                            className="text-4xl font-semibold "
                            >
                                €
                            </span>
                            <span 
                            className="text-3xl font-thin  text-end w-full"
                            >
                                {Number(cash?.change).toFixed(2)}
                            </span>
                        </div>


                    </div>
                </div>



            <div className='text-3xl px-3 py-6'>
              Il resto é stato calcolato. Ecco le quantita:
            </div>

            <div className='grid grid-cols-4 gap-3 w-full max-h-[26rem] place-items-center px-3'>

            

            {cash?.split.map((item, index) => (
                <SplittedItem 
                key={index} 
                item={item} 
               
                />
              ))}
                  
            </div>
            
            <button
            className='absolute bottom-2 w-full btn-primary disabled:opacity-40 uppercase'
            disabled= {cash?.change < 0? true:false}
            onClick={handleCashConfirm}
            >
              Conferma e chiudi il cassetto
            </button>


      </div>
      
        
        
      );
}




const SplittedItem = ({item=sample}) =>{

  
 
 return (
  <div className='relative w-full h-full'>
        <div
        className='h-[5.5rem] w-11/12 flex items-center justify-center bg-white border rounded-xl border-stone-300 shadow-md '
        style={{ 
          backgroundImage: `url(/euros/${item.img_url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}

        >
          <div
          className={`p-3 text-7xl font-semibold w-full h-full flex justify-center items-center
          text-teal-700 bg-white/40 `}
          >
            {item?.quantity}
          </div>
          
        </div>
        {/* <button 
        onClick={handleDeleteQuantity}
        className={`absolute top-0 right-4  flex shadow-xl m-1 w-[2rem]  justify-center items-center z-50 ${value?'':'hidden'} bg-white/40 rounded-full`} ><i className="fas fa-xmark text-black fa-x"></i></button> */}
  </div>
    )

}

export default CashSplit


       