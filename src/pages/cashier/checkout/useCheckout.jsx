/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import useCart from '../../../hooks/useCart';
import usePersistentContext from '../../../hooks/usePersistentContext';
import useTimeZoneDate from '../../../hooks/useTimeZone';
import useScanner from '../../../hooks/useScanner';
import useCashInventory from '../../../hooks/useCashInventory';
import useScannerData from '../../../hooks/useScannerData';

const useCheckout = () => {


  const paymentModel = {
    isEditing:false,
    dueTotal:0,
    cashedInTotal:0,
    pending:0,
    list:[],
    isFulfilled:false
}

  const paymentItemModel = {
    isEditing:false,
    dueTotal:0,
    cashedInTotal:0,
    pending:0,
    list:[],
    isFulfilled:false

  }


  const optionsModel= [
    {
        id:1,
        type:'bancomat',
        url:'bancomat',
        title:'carte',
        icon:'fas fa-credit-card',
        selected:false,
        total:0
    },
    {
        id:2,  
        type:'cash',
        url:'cash',
        title:'contanti',
        icon:'fas fa-hand-holding-dollar',
        selected:false,
        total:0
    },
    {
      id:3,  
        type:'bonus',
        url:'bonus',
        title:'bonus',
        icon:'fas fa-gifts',
        selected:false,
        total:0
    },
    {
      id:4,
        type:'difer',
        url:'difer',
        title:'altri',
        icon:'fas fa-money-check-dollar',
        selected:false,
        total:0
    },

   
]

const keyPayment = 'payment'
const keyOptions = 'options'

const [payment, setPayment] = usePersistentContext(keyPayment)
const [options, setOptions] = usePersistentContext(keyOptions)


let money = [

  {type:'bill', face:'500E', value:500, quantity:0, img_url:'500€.png'},
  {type:'bill', face:'200E', value:200, quantity:0, img_url:'200€.png'},
  {type:'bill', face:'100E', value:100, quantity:0, img_url:'100€.png'},
  {type:'bill', face:'50E' ,value:50 ,quantity:0, img_url:'50€.png'},
  {type:'bill', face:'20E' ,value:20 ,quantity:0, img_url:'20€.png'},
  {type:'bill', face:'10E' ,value:10 ,quantity:0, img_url:'10€.png'},
  {type:'bill', face:'5E' ,value:5, quantity:0, img_url:'5€.png'},          
  {type:'coin', face:'2E' ,value:2 ,quantity:0, img_url:'2€.png'},
  {type:'coin', face:'1E' ,value:1 , quantity:0, img_url:'1€.png'},
  {type:'coin', face:'50C', value:0.5, quantity:0, img_url:'50cent.png'},
  {type:'coin', face:'20C', value:0.20 , quantity:0, img_url:'20cent.png'},
  {type:'coin', face:'10C', value:0.10 , quantity:0, img_url:'10cent.png'},
  {type:'coin', face:'5C' ,value:0.05 , quantity:0 , img_url:'5cent.png'},
  {type:'coin', face:'2C', value:0.2 , quantity:0, img_url:'2cent.png'},        
  {type:'coin', face:'1C' ,value:0.01 , quantity:0, img_url:'1cent.png' }     
]



//used to manage the currency entrance at CashDisplay
const [cash, setCash] = usePersistentContext('cash')

const {
  currentCart,
  updatePayment
}= useCart()

const {
    
  inventory, 
  overwrite
 
} = useCashInventory()

const {clearCurrentRead} = useScannerData()


const {
  millis,
  formattedDate,
  formattedTime
} = useTimeZoneDate()


    

    const init = () =>{
      console.log('init payment and options')
      //clear last reading from scanner
      clearCurrentRead()
      setPayment({
        ...paymentModel,
        isEditing:true,
        dueTotal:currentCart?.total,
        cashedInTotal:0,
        pending:currentCart?.total,

      })
      setOptions(optionsModel)
    }

   
    const setRowSelectedByIndex = (index) => {
      let selectedOptions = [...options].reduce((a, c, i) => {
        return [...a, { ...c, selected: i === index ? true : false }];
      }, []);
      
      setOptions(selectedOptions)
    };

    const clearSelections = () => {
      let clearedOptions = [...options].reduce((a, c, i) => {
        return [...a, { ...c, selected: false }];
      }, []);
      
      setOptions(clearedOptions)
      
    };

    const getOptionSelected = () => {
      console.log('getOptionSelected',options)
      if(options){

        return [...options].reduce((a, c, i) => {
          console.log('getOptionSelected',c, c.selected)
          let item = c.selected?{...c}:{} 
          return {...a, ...item}
        }, {});

      }
      
    };


    const updateOptionTotal = (val) => {
      let updatedOptions = [...options].reduce((a, c, i) => {
        if(c.selected){
          let sum = Number(c.total + val)
          c.total = sum
        }
        return [...a, { ...c}];
      }, []);
      
      setOptions(updatedOptions)
    };

    const addPaymentToList=(item)=>{
      console.log('add payment to list', item)
      let opt = options.filter(el=> el.selected == true)[0]
      console.log('opt', opt)
      item.id= millis,
      item.added_at_date=formattedDate,
      item.added_at_time=formattedTime,
      item.value=Number(item.raw.amount)
      item.type_id=opt.id
      item.type=opt.type
      item.type_name=opt.title
      
      let newList = [...payment.list, item ]
      
      setPayment({
        ...payment,
        cashedInTotal:Number(item.raw.amount),
        pending:Number(payment.dueTotal-item.raw.amount),
        list:newList
      })

      updateOptionTotal(item.raw.amount)
    }

    const option = ()=>{
      return options.filter(el=> el.selected === true)[0]
    }

    const updateCurrentCartWithPaymentData = ()=>{

      const pymt = {
        ...payment,
        options:options
      }

      updatePayment(pymt)
      


    }

    const resetPayment = () => setPayment(null)


    //CASH
    const resetCash = () => {
      console.log('resetting cash', cash)
      setCash({
        currencies:money, 
        due: payment.pending, 
        total:0,
        change:0 - payment.pending,
        option:getOptionSelected()})
    }

    const updateCash = (obj) => {
      console.log('updateCash', obj)
      
      let updatedCurrencies = [...cash.currencies].reduce((a, c, i) => {
        //console.log('reduce',c.face, obj.face, c.face == obj.face)
        let item = c.face == obj.face?{...c, ...obj}:{...c}
      return [...a, item]
      },[])
      
      
      let tot = updatedCurrencies.reduce((a, c) =>{
        console.log(a, c.total)
        let item = c.total?c.total:0
        return a + item
      },0);

        let result = {
          due:Number(payment.pending).toFixed(2),
          currencies:updatedCurrencies, 
          total:Number(tot).toFixed(2),
          change:Number(tot - payment.pending).toFixed(2),
          option:getOptionSelected()
        }
        console.log('result', result)
        setCash(result)
    }
      
    const openDrawer =() =>{
      console.log('open drawer')
      console.log('currencies', cash.currencies)
      console.log('invantory', inventory)

      const entries = [...cash.currencies].reduce((a,c)=>{
          let item = c.quantity >0?{...c}:null
          //return only updated items
          let list = a.list?[...a.list]:[]
          let tot = a.total?a.total:0
          let obj = {
            list:item?[...list, item]:[...list],
            total: item?tot + item.total:tot
          }
          return {...a, ...obj}
      },[])

      let updatedInventory = [...inventory].reduce((a,c,i)=>{
        //if cash currencies has quantity greater than 0 
        //then we update the inventory quantity
        let currencyQ=cash?.currencies[i].quantity
        let updatedInventoryQuantity = c.quantity + currencyQ
        let item = {...c, quantity: updatedInventoryQuantity}
        return [...a, {...item}]
      },[])

      console.log('entries', entries)
      console.log('updatedInventory', updatedInventory)
      //console.log('cash', cash)

      const changeEntries = splitChange()
      
      console.log('changeEntries', changeEntries)

      //update inventory removing  currency given as change
     
      updatedInventory = [...updatedInventory].reduce((a,c,i)=>{
        
        
        let entr = changeEntries?changeEntries:[]
        let curr = {...c}
        console.log('entr', entr)
        let entry = entr.filter(e=> e.face == c.face)[0]
        console.log(entry)
        if (entry){
          let updatedInventoryQuantity = Number(curr.quantity - entry.quantity)
          curr.quantity= updatedInventoryQuantity
          console.log('updated curr', curr)
        }
       
        return [...a, {...curr}]
      },[])

      let splitted = {
        
        ...cash,
        entries,
        split:changeEntries,
        updatedInventory,
        cashedInTotal:Number(entries.total),
        pending:Number(payment.dueTotal-entries.total).toFixed(2),

      }

      console.log('splitted', splitted)

      //update inventory with new data
      overwrite(updatedInventory)
      //update cash object
      setCash(splitted)
    }




    function splitChange()
    {
       let amount = cash.change
       

         const filtered = [...inventory].filter(el => {
          return el.quantity > 0;
        });
      
      
        //let notes = [ 2000, 500, 200, 100, 50, 20, 10, 5, 1 ];
        let noteCounter = [];
        
        // count notes using Greedy approach
        //console.log('splitting...', amount)
        for (let i = 0; i < filtered.length; i++) {
          console.log('amount >= filtered[i].value', amount >= filtered[i].value, i, filtered[i].value)
            if (amount >= filtered[i].value) {

                let obj ={...filtered[i]}

                console.log('amount value', amount, obj)
                obj.quantity = Math.floor(amount / filtered[i].value);

                console.log('obj', obj)
                noteCounter[i] = obj;
                amount =  Math.ceil(amount % filtered[i].value * Math.pow(10, 2)) / Math.pow(10, 2)
                console.log('next amount value', amount)
            }
        }
        //Math.ceil(v * Math.pow(10, n)) / Math.pow(10, n)
        /* // Print notes
       document.write("Currency Count ->" + "<br/>");
        for (let i = 0; i < 9; i++) {
            if (noteCounter[i] != 0) {
                document.write(notes[i] + " : "
                    + noteCounter[i] + "<br/>");
            }
        } */
        let result = noteCounter.filter(el => el !== null);
        
        console.log('splitChange 00', result)
        
        return result
        
    }
    

    const addCashPaymentToList=()=>{

      let c = cash?{...cash}:{}
      let item = {}
      let cashedIn = c.cashedInTotal - Number(c.change)

      let ciTot = Number(payment.cashedInTotal + cashedIn)
      let pendingTot = Number(payment.dueTotal - ciTot).toFixed(2) * 1
      let isFullfill = pendingTot == 0

      console.log('add cash payment ciTot', ciTot)
      console.log('add cash payment pendingTot',  ciTot , payment.dueTotal, ciTot - payment.dueTotal)
      console.log('add cash payment isFullfill', pendingTot, pendingTot == 0)

      console.log('add cash payment to list', cash)
      let opt = c.option
      console.log('opt', opt)
      item.id= millis,
      item.added_at_date=formattedDate,
      item.added_at_time=formattedTime,
      item.value=Number(cashedIn).toFixed(2)
      item.type_id=opt.id
      item.type=opt.type
      item.type_name=opt.title
      item.entries=c.entries
      item.change=c.split?c.split:[]
      item.option=opt
      
      let newList = [...payment.list, item ]
      
      setPayment({
        ...payment,
        cashedInTotal:ciTot,
        pending:pendingTot,
        list:newList,
        isFulfilled:isFullfill
      })

      updateOptionTotal(cashedIn)
    }

    




    

   /*  const updateTotalToSelectedRow = (aquant) => {
      const arr = [...inventory].reduce((a, c, i) => {
        let updatedRow = c.selected
        ?{
          ...c,
          quantity:quant,
          selected:false}
        :{...c}
        return [...a, { ...updatedRow }];
      }, []);
      //console.log('arr', arr)
      setInventory(arr);
      
    };

    let total = [...inventory].reduce((a,el)=>{
      let val = Number(el.value) * Number(el.quantity)
      return a + val
  },0) */
  

   
  

  return {
   
   money,
   cash,
   resetCash,
   updateCash,
   openDrawer,
   init,
   setRowSelectedByIndex,
   updateCurrentCartWithPaymentData,
   clearSelections,
   addPaymentToList,
   addCashPaymentToList,
   resetPayment,
   payment,
   options,
   option
   //total
  }
}

export default useCheckout

