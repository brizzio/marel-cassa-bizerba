/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import usePersistentContext from './usePersistentContext'
import useIntl from './useIntl'

const useCashInventory = () => {

  let inventoryDefaultData = [
    {type:'bill', face:'500E', value:500, quantity:10, img_url:'500€.png'},
    {type:'bill', face:'200E', value:200, quantity:10, img_url:'200€.png'},
    {type:'bill', face:'100E', value:100, quantity:10, img_url:'100€.png'},
    {type:'bill', face:'50E' ,value:50 ,quantity:10, img_url:'50€.png'},
    {type:'bill', face:'20E' ,value:20 ,quantity:10, img_url:'20€.png'},
    {type:'bill', face:'10E' ,value:10 ,quantity:10, img_url:'10€.png'},
    {type:'bill', face:'5E' ,value:5, quantity:10, img_url:'5€.png'},                   
    {type:'coin', face:'2E' ,value:2 ,quantity:10, img_url:'2€.png'},
    {type:'coin', face:'1E' ,value:1 , quantity:10, img_url:'1€.png'},
    {type:'coin', face:'50C', value:0.5, quantity:10, img_url:'50cent.png'},
    {type:'coin', face:'20C', value:0.20 , quantity:10, img_url:'20cent.png'},
    {type:'coin', face:'10C', value:0.10 , quantity:10, img_url:'10cent.png'},
    {type:'coin', face:'5C' ,value:0.05 , quantity:10 , img_url:'5cent.png'},
    {type:'coin', face:'2C', value:0.2 , quantity:10, img_url:'2cent.png'},        
    {type:'coin', face:'1C' ,value:0.01 , quantity:10, img_url:'1cent.png' }     
  ]


    const key = 'inventory'
    const [inventory=[], setInventory] = usePersistentContext(key)
  
    const {currency} = useIntl()
  
    React.useEffect(() => {
      let existing = localStorage.getItem(key)
      if(!existing) {
        console.log('setting cash')
        setInventory(inventoryDefaultData)
      }
    }, []);

    
    const setRowSelectedByIndex = (index) => {
      const arr = [...inventory].reduce((a, c, i) => {
        return [...a, { ...c, selected: i === index ? true : false }];
      }, []);
      //console.log('arr', arr)
      setInventory(arr);
      
    };

    const clearSelections = () => {
      const arr = [...inventory].reduce((a, c, i) => {
        return [...a, { ...c, selected: false }];
      }, []);
      //console.log('arr', arr)
      setInventory(arr);
      
    };

    const money = () => {
      return [...inventory].reduce((a, c, i) => {
        [...a, { ...c, selected: false, quantity:0 }];
      }, []);
      
    };

    const updateQuantityToSelectedRow = (quant) => {
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
  },0)
  

  const overwrite = (newInventory) => setInventory(newInventory)

   
  

  return {
   inventory,
   overwrite,
   setRowSelectedByIndex,
   updateQuantityToSelectedRow,
   clearSelections,
   money,
   total
  }
}

export default useCashInventory




     
  
    /* //let notes = [ 2000, 500, 200, 100, 50, 20, 10, 5, 1 ];
    let noteCounter = [];
    
    // count notes using Greedy approach
    //console.log('splitting...', amount)
    for (let i = 0; i < filtered.length; i++) {
      //console.log('amount >= filtered[i].value', amount >= filtered[i].value, i, filtered[i].value)
        if (amount >= filtered[i].value) {

            let obj ={
              type:filtered[i].type, 
              face:filtered[i].face, 
            }

            obj.count = Math.floor(amount / filtered[i].value);

            //console.log('obj', obj)
            noteCounter[i] = obj;
            amount = amount % filtered[i].value;
            //console.log('next amount value', amount)
        }
    }
     */