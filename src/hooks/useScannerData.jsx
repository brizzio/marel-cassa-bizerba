/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import useScanner from './useScanner'
import usePersistentContext from './usePersistentContext'
import useTimeZoneDate from './useTimeZone'
import usePrices from './usePrices'
import useCart from './useCart'

//'FBRSVD68P05G273N'

const useScannerData = () => {

  const { readed, clearReaded} = useScanner()
  const [currentRead, setCurrentRead] = usePersistentContext('currentRead')
  
 
  const quantity = React.useRef(null)
  const counter = React.useRef(0)

  const { addReadedItem } = useCart()

  const {
    millis,
    dateTime,
  } = useTimeZoneDate()

  const prices = usePrices()

  
  const evaluate = async () =>{
    
    console.log('new reading', readed)
    
    let item = searchProductInPriceListFromScannerReading(readed?.code)

    console.log('item', item)

    return {
    code:readed?.code, 
    count:counter.current++,
    origin:'scanner',
    processed:false,
    ...checkEan(readed?.code),
    ...item,
    isFiscalCode:isValidFiscalCode(readed?.code),
    quantity:quantity.current?quantity.current:1,
    evaluated: true
    }
    

  }

  const updateQuantity = (q)=> {
    console.log('q', q)
    quantity.current = q
  }


  const searchProductInPriceListFromScannerReading = (code) =>{
    const match = prices && prices.filter(el => (el.upc == code))
    //console.log('match', match)
    if (match?.length == 1) {
        //console.log('match', match[0])
        return {found:true, item:match[0]}
    }else{
      return {found:false, item:{}}
    }
  
  }


  function checkEan(eanCode='') {
    let result = {
      read_id:millis,
      read_at:dateTime,
      isEan:true,
      inputCode:eanCode,
      outputCode:'',
      digits:0,
      evaluationType:'',
      error:false,
      errorMsg:''
    }
    eanCode = eanCode?.trim();
    if ([8,12,13,14].indexOf(eanCode?.length) == -1 ) {
      result.isEan=false
      result.error=true
      result.errorMsg= eanCode?.length + 'is an invalid number of digits'
      result.digits = eanCode?.length
      result.evaluationType='OTHER'
      return result; 
    }
    //if (eanCode.length < l) {
    //eanCode = Array(14 - eanCode.length).join(0) + eanCode; //add 0's as padding
    
    //if (!eanCode.match(/[\d]{eanCode.length}/))
    //{
    // alert('Illegal characters');
    //return false; }
    var total=0;
    
    let isValidEan = isValidBarcode(eanCode)
    
               
    if (!isValidEan) {
      // alert('Wrong checksum');
        result.isEan=false
        result.error=true
        result.errorMsg= total + ' Wrong checksum'
        result.digits = eanCode.length
        result.evaluationType='OTHER'
        return result; 
      }
  
      result.isEan=true;
      result.digits = eanCode.length;
      result.evaluationType='EAN-'+ eanCode.length;
      result.outputCode = Array(14 - eanCode.length).join(0) + eanCode;
      return result; 
    }

  const clearCurrentRead = () => {
    const gotCurentRead = JSON.stringify(currentRead)  !== '{}'
    const gotReaded = JSON.stringify(readed)  !== '{}'
    //clear active reading
    if(gotCurentRead)  setCurrentRead({})
    //clear last scanner data
    if(gotReaded)  clearReaded()
  }

  const updateCurrentRead = React.useCallback((obj) =>{
    let updatedData = {...currentRead, ...obj}
    setCurrentRead(updatedData)
  })

  const logNewReadingToStorage = ()=>{
        
    let existing = localStorage.getItem('readings')
    existing = existing ? JSON.parse(existing) : []
    localStorage.setItem("readings",JSON.stringify([...existing, currentRead])); 
    setCurrentRead({})
}

//  ^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1}$

    function isValidBarcode(number) {
        const checkDigit = String(number).slice(0, -1).split('').reverse().reduce((sum, v, i) => sum + v * (i % 2 || 3), 0)*9%10
        return /^\d+$/.test(number) && String(checkDigit) === String(number).at(-1)
    }

    function isValidFiscalCode(string) {
        
        /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST]{1}[0-9LMNPQRSTUV]{2}[A-Z]{1}[0-9LMNPQRSTUV]{3}[A-Z]{1}$/.test(string)
    }

    React.useMemo(()=>{

      console.log('readed changed', readed, JSON.stringify(readed)  !== '{}')
        const gotReaded = JSON.stringify(readed)  !== '{}'
        if(gotReaded) evaluate().then(res=>{
          console.log('readed changed will be processed gotReaded', readed, gotReaded)
          console.log('res',res)
          
          if (res.found){
                console.log('readed an product')
                addReadedItem(res)
            }
            if (!res.found && res.isEan){
                console.log('readed an product that is not in prices list')
                res.error=true
                res.errorMsg='Prodotto non existente. Mettere questro prodotto da parte. Non é possiblile includere nel carrello.'
                
            }
            res.processed = true
            setCurrentRead(res)
            clearReaded()
            
            quantity.current=null
        })
    
      },[readed])



  return {
    currentRead,
    clearCurrentRead,
    updateCurrentRead,
    logNewReadingToStorage,
    updateQuantity
  }
}

export default useScannerData




    
     
      
     
      

  /*     const manualReading = (code)=>{

        searchCounter.current=searchCounter.current + 1
        code.replace(/\W/g, "")
        return {
          code:code, 
          count:searchCounter.current,
          origin:'search',
          ...checkEan(code),
          ...searchProductInPriceListFromScannerReading(code)
  
          }
  
      } */