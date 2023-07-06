/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'
import useCheckout from '../../../src/pages/cashier/checkout/useCheckout'
import useCart from '../../../src/hooks/useCart'
import useMicrelec from './useMicrelec'

const Micrelec = () => {

  const navigate = useNavigate()

  const {
    productModel,
    last,
    generateFakeItem,
    deleteTicket,
    paymentCash,
    checkout,
    status,
    sentFiles
} = useMicrelec()

  const {
    currentCart
  }= useCart()

  const print = ()=>{
   
      return currentCart
   


  }

  return (
    
  <div
  className='relative flex w-full grow debug '
  >
    <PrinterSetup/>
    
    


    <div>



      {currentCart.cart_id}
    
     
     <button
    onClick={print}
    >STAMPA SCONTRINO</button>
    
    
    </div>


  </div>

   
  )
}

export default Micrelec


const PrinterSetup = () => {

  const navigate = useNavigate()

  const micrelec={
    ip: `192.168.1.180`,
    device:'5a6a2cb8-51e4-4226-89cc-bc355a563013',
    operator:1, //user.uuid
    store:1, //cashier.store_id.uuid

  }
   
  const inputs = [
      {
          field:'ip',
          label:'Indirizzo IP'
      },
      {
          field:'company',
          label:'Nome del Cliente'
      },
      {
          field:'store',
          label:'Codice del Negozio'
      },
      {
        field:'operator',
        label:'OPERATORE'
      }
  ]
  
    
    return (
      
      
      <div className='flex flex-col w-3/12 h-full debug justify-between'>

        <img src="/micrelec.png" alt="" />
        <div>

        </div>

        <div
        className='flex flex-col justify-around  h-3/6 debug text-lg font-thin '
        >
          <p>IP:{micrelec.ip}</p>
          <p>NEGOZIO:{micrelec.store}</p>
          <p>CASSA:{micrelec.device}</p>
          <p>UTENTE:{micrelec.operator}</p>
        </div>
          
          

          {/* <Form
              title="AXONMICRELEC - Protocollo di comunicazione Hydra2 RT G100 v5.4"
              image="/micrelec.png"
              inputs = {inputs}
              submit={handleFormData}
          /> */}

        <button className=' py-4 border rounded-md bg-white shadow-xl m-2 w-11/12' onClick={()=>navigate(-1)}><i className="fas fa-chevron-left px-2"></i>INDIETRO</button>
       
       
      </div>
    )
}




