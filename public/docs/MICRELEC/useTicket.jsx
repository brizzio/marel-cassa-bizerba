/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import usePersistentContext from '../usePersistentContext'

const useTicket = () => {

  
  let ticketsKey = 'tickets'  

  //const [ticket, setTicket] = usePersistentContext(ticketKey)
  const [tickets, setTickets] = usePersistentContext(ticketsKey)
  //const ticket = React.useRef({})


  
  const ticketsModel = []

  React.useEffect(()=>{
    
    if(!localStorage.getItem(ticketsKey)) setTickets(ticketsModel)

  },[])


 /*  React.useEffect(()=>{

    let last =  tickets && tickets.length?tickets.slice(-1)[0]:null

    if(last && last.is_deletion){
      let deleted_item_docbase = last.deleted_item.docbase
      const index = tickets.findIndex(object => {
        return object.docbase === deleted_item_docbase;
      });
      if(index>-1){
        if(){

        }
      }

    }
    
    if(!localStorage.getItem(ticketsKey)) setTickets(ticketsModel)

  },[tickets]) */

 
  /* const create = async (data)=>{
    try {
      let id = crypto.randomUUID()
    let timestamp = new Date().valueOf()
    
     const tkt = {
        uuid:id,
        created_at:timestamp,
        ...data
    }

    setTicket(tkt)
    return;
    } catch (error) {
      console.log('create ticket error', error)
    }
    
  } */

 /*  const update = (updateObject)=>{
  
     setTicket({
        ...ticket,
        ...updateObject
    }) 
  } */
  
  /* const save = ()=>{
    if (JSON.stringify(ticket)==='{}') return;  
    setTickets([
       ...tickets,
       ticket
    ]) 
 } */

 const onPrintTicketEventEnd = (printResult)=>{

  let id = crypto.randomUUID()
  let timestamp = new Date().valueOf()
  
   const tkt = {
      uuid:id,
      created_at:timestamp,
      ...printResult
  }

  setTickets([...tickets, tkt]) 
  
  //useEffect will add to list
    
 }

  
  return {
    
    tickets,
    onPrintTicketEventEnd
  }
  
}

export default useTicket