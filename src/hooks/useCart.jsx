/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import usePersistentContext from './usePersistentContext'
import useTimeZoneDate from './useTimeZone'
import useCashier from './useCashier'
import usePrices from './usePrices'






//https://codesandbox.io/s/react-input-autocomplete-knwn3?file=/src/InputAuto.js



const currentCartModel = {
    active:false,
    cart_id:'',
    created_at_date:'',
    created_at_time:'',
    closed_at_date:'',
    closed_at_time:'',
    count:0,
    total:0,
    weight:0,
    fiscal_code:'',
    costumer:{},
    bags:0,
    items:[],
    payment:{
      isEditing:false,
      dueTotal:0,
      cashedInTotal:0,
      pending:0,
      list:[],
      isFulfilled:false
  }
}




const useCart = () => {
    //const [code, setCode] = useState('')
    //            const [found, setFound] = useState({})
    
    const [currentCart={...currentCartModel}, setCurrentCart] = usePersistentContext('currentCart')

    const searchCounter = React.useRef(0)

    //const {reset:resetTicket} = useTicket()

    const prices= usePrices()

    const {
        millis,
        dateTime,
        formattedDate,
        formattedTime,
        array,
        timestamp,
        numeric   
      } = useTimeZoneDate()

    const {insertCart} = useCashier()

    const total = React.useCallback((arr, field) => arr.reduce((a,e)=>{
        let val = e.deleted?0:e[field]
        return a + val
      },0))

    const sumWeight = React.useCallback((arr) => arr.reduce((a,e)=>{
        let w = e.weight?parseFloat(e.weight.replace(",",".")):0
        let val = e.deleted?0:w
        return a + val
    },0))


    const countValidItems = React.useCallback((arr) => arr.reduce((a,e)=>{
      return a + e.deleted?0:1
  },0))
    

    
      const newCart = React.useCallback(() =>{
        console.log('create new cart', formattedDate, formattedTime)
        setCurrentCart({
            ...currentCartModel,
            cart_id:millis.toString(),
            timestamp,
            active:true,
            created_at_date:formattedDate,
            created_at_time:formattedTime,
            closed_at:'',
            costumer:{},
            items:[],
            bags:0,
            total:0,
            count:0
        })

       

      
      })

      const reset = ()=>{
        setCurrentCart({active:false})
      }

    const addReferencedItem = React.useCallback((product, quantity) =>{

        if (!currentCart) return;
        let quant = quantity
        let item = {...product}
          
        console.log('quant', quant)
          
              makeItem(item, quant)
              .then((res)=>{
                 console.log('res',res, Array.isArray(res)?res.length:1)
                 return Array.from(res).length==1
                  ? [...currentCart.items, res[0]]
                  : [...currentCart.items, ...res]
              })
              .then((newList)=>{
                  console.log('newList',newList)
                  const updatedCart = {
                      ...currentCart,
                      items: newList,
                      count: newList.length,
                      total: total(newList, 'calculated_price'),
                      weight: sumWeight(newList)
                  }
                  console.log('updatedCart',updatedCart)
                  setCurrentCart(updatedCart)
              })
         
  })


  const appendToCart = React.useCallback((list) =>{

    if (!currentCart) return;
    let newList = Array.from(list).length==1
    ? [...currentCart.items, list[0]]
    : [...currentCart.items, ...list]
        
    console.log('newList',newList)

    const updatedCart = {
        ...currentCart,
        items: newList,
        count: newList.length,
        total: total(newList, 'calculated_price'),
        weight: sumWeight(newList)
    }
    
    console.log('updatedCart',updatedCart)
    setCurrentCart(updatedCart)    
     
})




      const addReadedItem = React.useCallback((scan) =>{

        if (!currentCart) return;
        let quant = scan?.quantity
        let item = scan?.item
          console.log('quant', quant)
          
              makeItem(item, quant)
              .then((res)=>{
                 console.log('res',res, Array.isArray(res)?res.length:1)
                 return Array.from(res).length==1
                  ? [...currentCart.items, res[0]]
                  : [...currentCart.items, ...res]
              })
              .then((newList)=>{
                  console.log('newList',newList)
                  const updatedCart = {
                      ...currentCart,
                      items: newList,
                      count: newList.length,
                      total: total(newList, 'calculated_price'),
                      weight: sumWeight(newList)
                  }
                  console.log('updatedCart',updatedCart)
                  setCurrentCart(updatedCart)
              })
         
  })


  const makeItem = React.useCallback((i, q)=>{

    console.log('date', formattedDate, formattedTime)

    return new Promise((resolve)=>{

        let arr = []
        for (let index = 0; index < q; index++) {
        let el = {...i}
        let pos = index + 1
        let o = [pos,q].join("/")
        
        console.log('make item order', o)
        el.entry_id = millis
        el.uid=crypto.randomUUID()
        el.deleted = false
        el.added_date= formattedDate
        el.added_time= formattedTime
        el.index=pos
        el.order = o
        el.quantity= q
        console.log('make item', el)
        arr.push(el)

        }

        resolve(arr)
    })
})

      
    
    const removeItemByKey = React.useCallback((key) =>{
            
        var item = currentCart.items[key]
        console.log('to delete', item)
    
        const onDeleteList = currentCart.items.map((el,i)=>
            i==key
            ?{...el, deleted:true}
            :el
        )
        const removedState = {
            ...currentCart,
            //list: state.list.filter((item) => item.entry_id !== action.id),
            items:onDeleteList,
            count: countValidItems(onDeleteList),
            total: total(onDeleteList, 'calculated_price'),
            weight: sumWeight(onDeleteList)
        }
    
        setCurrentCart(removedState)
    
     })


     const removeItemById = React.useCallback((id)=>{

      const updatedItems = currentCart.items?[...currentCart.items]:[]
      if (updatedItems.length){

        for (let i = 0; i < updatedItems.length; i++) {
          if (updatedItems[i].product_id==id && !updatedItems[i].deleted) {
              updatedItems[i].deleted = true;
              setCurrentCart({
                ...currentCart, 
                items:updatedItems,

                total: total(updatedItems, 'calculated_price'),
                weight: sumWeight(updatedItems)
              })

             break;
          }
        }



     }
    })


    const countItemById = React.useCallback((id)=>{

      const updatedItems = currentCart.items?[...currentCart.items]:[]
      let list = []
      let count = 0 
      if (updatedItems.length){

        for (let i = 0; i < updatedItems.length; i++) {
          if (updatedItems[i].product_id==id && !updatedItems[i].deleted) {
              list = [...list, updatedItems[i]]
              
          }
        }

        count = list.length


     }
     return count
    })


    /*  if(action=='remove'){
      const updatedItems = currentCart.items 
      if (updatedItems.length){

        for (let i = 0; i < updatedItems.length; i++) {
          if (updatedItems[i].product_id==145 && !updatedItems[i].deleted) {
              updatedItems[i].deleted = true;
              setCurrentCart({
                ...currentCart, 
                bags:count-1,
                items:updatedItems,
                total: total(updatedItems, 'calculated_price'),
                weight: sumWeight(updatedItems)
              })

             break;
          }
        }
        
      } 
    } */
            
    
    const deleteCart = React.useCallback((e) => { 
        if (window.confirm('Cancella il carrello?')) setCurrentCart({...currentCartModel}) 
      })


    const closeCart = () => {

        console.log('closing cart')
        
        let c = {...currentCart}
        c.active=false
        
        c.closed_at_date=formattedDate
        c.closed_at_time=formattedTime

        

        c.count= c.items.length
        c.purchase_items_count= c.items.filter(e=>!e.deleted).length
        c.total=total(c.items,'calculated_price')

        //update cashier with current cart
        insertCart(c)
        

        //clean last current cart object in memory state
        reset()

        //clean ticket and payment data object in memory state
         localStorage.removeItem('ticket')
         localStorage.removeItem('cash')
    
      }


      const updatePayment = (pym)=>{

        let updatedCart = {
          ...currentCart,
          payment:pym,
        }

        setCurrentCart(updatedCart)
      

      }

      const updateTicket = (ticket)=>{

        let updatedCart = {
          ...currentCart,
          ticket:ticket,
        }

        setCurrentCart(updatedCart)
      

      }


      //SEARCH FOR ITEM IN PRICELIST

      const search = (query)=>{

        
        const substr = query.toString().toLowerCase();  
        if(!substr) return;
        let filter = prices.filter((el)=>{
          const str = el.upc.toString().toLowerCase() + el.product_name.toString().toLowerCase();
             
          return str.indexOf(substr)>0?el:null
        })
        console.log(filter)
        return filter
      }


      /* const addPayment = (item)=>{

        let items = [
          ...currentCart.payment.list,
         item
        ]

        let updatedPayment = {
          ...currentCart.payment,
         list:items
        }
        

        let updatedCart = {
          ...currentCart,
          payment:updatedPayment
        }

        setCurrentCart(updatedCart)
      

      }

 */
    
    

  
  /* const closeCart = async() => {

    console.log('closing cart')

    let c = {...currentCart}
    c.closed_at= formattedTime
    c.count= c.items.length
    c.purchase_items_count= c.items.filter(e=>!e.deleted).length
    c.total=total(c.items,'calculated_price')

    const cartPayload = await postCartPayload(c)

    const requestBody ={
      table:'cashier',
      payload:cartPayload
    }
    await fetchQuery(requestBody).then((res)=>console.log('database sync', res))

    //update cashier session object
    const carts = cashier.carts?cashier.carts:[]

    const updatedCashier = {
        ...cashier,
        carts:[...carts, currentCart]
    }
    setCashier(updatedCashier)

    //clean last current cart object in memory state
    setCurrentCart(currentCartModel)

  }


  async function postCartPayload(c){

    try {

        let sessionInfo = {
            session_id:cashier.session.id,
            session_device_id: cashier.session.device_id,
            session_country_iso:cashier.session.country_iso,
            session_time_zone: cashier.session.time_zone,
            session_timestamp:cashier.session.timestamp,
          }

          let userInfo = {
            user_id:cashier.user.id,
          }

          let companyInfo = {
            company_id:cashier.user.company_id,
            company_name:cashier.user.company_name,
            company_store:1234,
          }
        
          let cartInfo = {
            cart_id:c.cart_id,
            cart_date: c.date,
            cart_created_at:c.created_at,
            cart_closed_at:formattedTime,
            cart_costumer:c.costumer?c.costumer.fiscal_code:'',
            cart_origin:'cashier',
            cart_total:c.total,
            cart_due:c.due?c.due:c.total,
            cart_change:c.change?c.change:0,
            cart_weight:c.weight,
            cart_bags:c.bags,
            cart_items_count:c.items.lenght
          }
        
          let arr =[]
      
          for (let item in c.items){
            
            arr.push({
              ...sessionInfo,
              ...cartInfo,
              ...userInfo,
              ...companyInfo,
              ...c.items[item]
            })
          }
        
          return arr
        
    } catch (error) {
        console.log('an error occurred when mounting cart payload')
    } 

    
  
  
  }*/


  return {
        newCart,
        deleteCart,
        currentCart,
        addReadedItem,
        addReferencedItem,
        removeItemByKey,
        removeItemById,
        countItemById,
        updatePayment,
        updateTicket,
        closeCart,
        search,
        makeItem,
        appendToCart
    }
   
  
}

export default useCart

