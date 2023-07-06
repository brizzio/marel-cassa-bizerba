/* eslint-disable no-unused-vars */
import React from 'react'
import { PropTypes } from "prop-types";
import { useNavigate } from 'react-router-dom'
import useCheckout from './useCheckout'
import useTicket from '../../../hooks/useTicket';
import PrintableDiv from '../../../components/PrintableDiv'
import { useDevice } from '../../../hooks/useDevice'
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import useCashier from '../../../hooks/useCashier';

const PrinterComponent = () => {

  const navigate = useNavigate()

  const [view, setView] = React.useState('')

  const {
    ticket,
    save,
    generate,
    reset,
    printed
  }= useTicket()

 
  

  React.useEffect(()=>{
    console.log('use effect printer printed', printed())
    if (!printed()){   
        generate()
        //setView(invoice())
    
    } 

    
    
  },[])

  React.useEffect(()=>{
    console.log('use effect ticket look', ticket)
    if (ticket){
      save()  
      setView(displayTicket())
      //reset()
    } 

    
  },[ticket])


  //creates a div element with ticket content
const displayTicket = ()=>{

  if(!ticket) return '';
  let t = {...ticket}
  let pay = ticket.payment?[...ticket.payment]:[]

  const title = `flex justify-center w-full text-[1.5rem] font-semibold tracking-tighter`
  const subTitle = `flex justify-center w-full text-[1.5rem] font-normal tracking-tighter`
  const spot = `flex justify-center w-full text-[1.5rem] font-thin tracking-tighter`
  const msg = `flex justify-center w-full text-[1.3rem] font-bold tracking-tighter mt-4`
  const bold = `flex justify-center w-full text-[1rem] font-semibold tracking-tighter mt-4`
  const norm = `flex justify-center w-full text-[1rem] font-normal tracking-tighter`
  const detail = `flex justify-between px-2 mt-4 w-full text-[1rem] font-semibold tracking-tighter `
  const items = `flex flex-col px-2 mt-4 w-full text-[1rem] font-thin tracking-tighter gap-1 `
  const total = `flex justify-end w-full text-[1.5rem] font-semibold tracking-tighter gap-3 uppercase mt-4`
  const weight = `flex justify-end w-full text-[1.2rem] font-thin tracking-tighter gap-3 uppercase`

  const payClass = `flex flex-col px-2 mt-4 w-full text-[1rem] font-thin tracking-tighter gap-1 `

  const strIVA = `DI CUI IVA: € ${Number(t.cashed_in_total.data * 0.22).toFixed(2).replace(".",",")}`

  return(
      <div
      className='flex flex-col overflow-y-auto w-full border rounded-xl shadow-lg h-5/6 leading-4 gap-2 bg-white p-3'
      >
          <div className={title}>
              <span>{t.tenant.data}</span>
          </div>
          <div className={subTitle}>
              <span>{t.retail_banner.data}</span>
          </div>
          <div className={spot}>
              <span>{t.store_name.data}</span>
          </div>
          <div className={spot}>
              <span>{t.fiscal_code.title}:</span>
              <span>{t.fiscal_code.data}</span>
          </div>
          <div className={`flex justify-center w-full font-bold tracking-tighter mt-4`}>
              <span>DOCUMENTO GESTIONALE</span>
          </div>
          <div className={`flex justify-center w-full font-thin tracking-tighter`}>
              <span>SENZA VALORE FISCALE</span>
          </div>
          <div className={bold}>
              <span>{t.date.data}</span>
              <span> -- </span>
              <span>{t.time.data}</span>
          </div>
          <div className={norm}>
              <span>{t.id.data} </span>
          </div>
          <div className={detail}>
              <span>PRODOTTO </span>
              <span>PREZZO </span>
          </div>
          <div className={items}>
              {
                [...t.items].reduce((a,c,i)=>{
                  
                      let p = c.product.lenght > 25
                      ?c.product.substring(0,25) + '...'
                      :c.product
                      let w = `${c.weight}${c.weight_unit} `
                      let left = `${c.upc} ${p} ${w}`
                      let right = `${c.order} ${c.price_type} ${c.currency} ${c.price}`
                      let row = <div
                      key={i}
                      className='flex justify-between'
                      >
                        <span>{left}</span>
                        <span>{right}</span>
                      </div>
                  return [...a , row]
              },[])
                
                
                }
          </div>
          <div className={total}>
              <span>{t.amount.title} </span>
              <span>€ {t.amount.data} </span>
          </div>
          <div className={weight}>
              <span>{t.weight.title} </span>
              <span className='tracking-normal'>{t.weight.data.toFixed(2).replace(".",",")}Kg. </span>
          </div>
          <div className={`flex justify-end w-full text-[1.2rem] font-thin tracking-tighter gap-3 uppercase`}> {/* ******* IVA DETAIL ******* */}
              <span className='tracking-normal'>{strIVA}</span>
          </div>
          <div className={payClass}>
              <span>PAGAMENTI </span>
              {
                pay.reduce((a,c,i)=>{

                      let left = c.left
                      let right = c.right
                      let row = <div
                      key={i}
                      className='flex justify-between'
                      >
                        <span>{left}</span>
                        <span>{right}</span>
                      </div>
                  return [...a , row]
              },[])
                
                
                }
          </div>



      </div>
  )



}

  return (
    
  <div
  className='relative flex w-full grow items-center '
  >
    <PrinterSetup/>
    
    <div className='flex flex-col h-full w-3/6 ml-[4rem] justify-center'>

      {/* {ticket?.invoice
      ?[...ticket.invoice].map((el,i)=>{
        let s='sm'
        return (
          <div
          key={i}
          className={`flex text-${s} items-center`}
          >
            {liner(el)}
            </div>
           
        )
       
      })
      
     :''} */}
     
     {view}
    
       
    </div>


  </div>

   
  )
}

export default PrinterComponent


const liner = (line)=>{

  return [...line].reduce((a,c,i)=>{
      let e = <span
      className='w-[9px] text-center '
      key={i}
      >{c}</span>
      
      return [...a, e]
  })

}


const PrinterSetup = () => {

  const navigate = useNavigate()

  const {
    currentCart
  }= useCart()

  const {
    did
  }= useDevice()

  const {
    user
  }=useAuth()

  const {cashier} = useCashier()

  const info={
    ip: `192.168.1.180`,
    device:did?.id,
    operator: user?.alias,
    store:cashier?.company_store_name

  }
   
 
    
    return (
      
      
      <div className='flex flex-col w-3/12 h-full justify-between p-2'>

        <img 
        className='h-40'
        src="/epson_fp_81.jpg"  alt="" />
        <div>

        </div>

        <div
        className='flex flex-col justify-around  h-3/6 text-lg font-thin '
        >
          <p>IP:{info.ip}</p>
          <p>{info.store}</p>
          <p>CASSA:{info.device}</p>
          <p>UTENTE:{info.operator}</p>
        </div>
          
          

          

        <button className=' py-4 border rounded-md bg-white shadow-xl m-2 w-11/12' onClick={()=>navigate(-1)}><i className="fas fa-chevron-left px-2"></i>INDIETRO</button>
       
       
      </div>
    )
}







