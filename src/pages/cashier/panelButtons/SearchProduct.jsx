/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import useCart from '../../../hooks/useCart';

import './keyboard.css'

const SearchProduct = () => {

const navigate = useNavigate()

const {
  search,
  appendToCart,
  makeItem,

} = useCart()

const keyboardRef = React.useRef(null);
const numpadRef = React.useRef(null);

const [inputs, setInputs] = React.useState({});
const [layoutName, setLayoutName] = React.useState("default");
const [inputName, setInputName] = React.useState("default");
const [query, setQuery] = React.useState('')
const [showKeyboard, setShowKeyboard] = React.useState(false)
const [queryResults, setQueryResults]= React.useState('')
const keyboard = React.useRef();

 /**
   * Here we spread the inputs into a new object
   * If we modify the same object, react will not trigger a re-render
   */
const onChangeAll = inputs => {
 
  setInputs({ ...inputs });
  console.log("Inputs changed", inputs);
  let searchResults = inputs.query?search(inputs.query):[] 
  console.log('searchResults', searchResults)
  let selected = queryResults.filter(el => el.selected)
  let updatedQueryResults = [...selected, ...searchResults]
  console.log('updatedQueryResults', updatedQueryResults)
  setQueryResults(updatedQueryResults)

};

const handleShift = () => {
  const newLayoutName = layoutName === "default" ? "shift" : "default";
  setLayoutName(newLayoutName);
};

const onKeyPress = button => {
  //console.log("Button pressed", button);
  if (button === "{enter}") handleEnter();
  /**
   * If you want to handle the shift and caps lock buttons
   */
  if (button === "{shift}" || button === "{lock}") handleShift();
};

const onChangeInput = event => {
  
  const inputVal = event.target.value.trim();
  console.log("Input changed", inputName , inputs)
  setInputs({
    ...inputs,
    [inputName]: inputVal
  });

  keyboard.current.setInput(inputVal);
};

const getInputValue = inputName => {
  return inputs[inputName] || "";
};

const handleEnter = () => {
  setQuery(inputs.query)
  
  //keyboard.current.clearInput(inputName)
  console.log('inputs after enter ',keyboard, inputs) 
  ///keyboard.current.destroy() 
  setShowKeyboard(false)
};

const handleFocus = ()=>{
   setInputName("query")
   keyboard.current.clearInput("query")
   setShowKeyboard(true)
   setInputs({})
   setQuery('')

   //clean non selected items 
   let qr = queryResults?[...queryResults]:[]
   const updatedResults = qr.reduce((a,c,i)=>{

    return c.selected?[...a, c]:[...a]
  },[])
   
    console.log('qr', updatedResults)
   setQueryResults(updatedResults)
}

const handleSelectItem =(index)=>{
  let item = queryResults[index]
  console.log('selected', item )
  if (item.selected){
    alert('prodotto gia selezionato')
    return;
  }
  const updatedResults =  queryResults.reduce((a,c,i)=>{
      //console.log('reduce',i,index,i == index)
      let curr = i == index?{...c, selected:true, quantity:1}:{...c}
      return [...a, curr]
    },[])
    console.log('queryResults',updatedResults)
    setQueryResults(updatedResults)
  //we dont need the keyboard anymore....
    handleEnter()
}

const handleAddQuantity =(index)=>{
  let item = queryResults[index]
  console.log('item to update quantity', item )
  
  const updatedResults =  queryResults.reduce((a,c,i)=>{
      //console.log('reduce',i,index,i == index)
      let q = c.quantity?Number(c.quantity) + 1 :1
      let curr = i == index?{...c, quantity:q}:{...c}
      return [...a, curr]
    },[])
    console.log('queryResults',updatedResults)
    setQueryResults(updatedResults)
 
}

const handleResetQuantity =(index)=>{
  let item = queryResults[index]
  console.log('item to reset quantity', item )
  
  const updatedResults =  queryResults.reduce((a,c,i)=>{
      
      let curr = i == index?{...c, quantity:1}:{...c}
      return [...a, curr]
    },[])
    console.log('queryResults',updatedResults)
    setQueryResults(updatedResults)
 
}

const handleRemoveItem =(index)=>{
  let item = queryResults[index]
  console.log('item to remove from list', item )
  
  const updatedResults =  queryResults.reduce((a,c,i)=>{
       return i == index?[...a]:[...a, c]
    },[])
    console.log('queryResults',updatedResults)
    setQueryResults(updatedResults)
 
}

const handleAddItemToCart = (index) => {
  let item = queryResults[index]
  console.log('add quantity', item, index)
  let list = queryResults?[...queryResults]:[]
  //remove processed item from query results
  list.splice(index,1)
  console.log('splicedResults', list)
  setQueryResults([...list]) 
}

const handleConfirmSelection = async() => {
  
  let items = queryResults?[...queryResults]:[]
   const selected = items.reduce((a,c,i)=>{
    return c.selected?[...a, c]:[...a]
  },[])

  let prepared = await prepareItems(selected)
  
  console.log('add items to cart', prepared)

  appendToCart(prepared)
  
  navigate(-1) 
}

const prepareItems = async(selection=[]) =>{

  try {
    let result = []
    selection.map((el)=>{
    
      let item = {...el}
      let q =el.quantity?el.quantity:1
      delete item.selected
      item.quantity=1
      console.log('adding', item, q)
      makeItem(item,q).then((res)=>{
        result.push(...res)
      })
      
    })

    return result
    
  } catch (error) {
    console.log('handleConfirmSelection try error', error)
  }


}



  return (
    <div 
    className=' h-full w-full  flex flex-col items-start justify-start gap-4'
    >
        <div
        className='flex flex-col w-8/12 text-3xl gap-2 mt-2 text-stone-400 '
        >
          <label 
          className='px-3'
          >
            UPC oppure nome del prodotto: 
          </label>

          <input
            className='flex flex-col w-full py-4 text-3xl border rounded-lg shadow-xl px-3'
            id="query"
            type="text"
            value={getInputValue("query")}
            onFocus={handleFocus}
            placeholder={query?query:'_'}
            onChange={onChangeInput}
          />
          
         
      </div>
      
          
      <div
      className='grid grid-cols-5 gap-4 w-full h-[26rem] bg-white/40 py-4 text-3xl border rounded-lg shadow-xl px-3 overflow-y-auto'
      >
          {queryResults
          ?queryResults.map((el, i)=>{

            let src = el.image && el.image.indexOf('http') > -1?el.image:'https://placehold.co/50'
            let url = "url(" + src + ")" 
            //console.log('url', url)
            return (
              <div key={i}
              className='relative flex flex-col h-[12rem] rounded-xl shadow-md items-center justify-center bg-white/40'
              >
              
              <div  className='  shrink w-[8rem] h-[8rem] '>
                <button
                className=' w-[8rem] h-full justify-center'
                onClick={()=>handleSelectItem(i)}
                  style={{ 
                  backgroundImage: url,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  }}
                />
                
              </div>
              {el.selected && 
              <QuantitySelector 
                q={el.quantity?el.quantity:0}
                action={()=>handleAddQuantity(i)}
                undo = {()=>handleResetQuantity(i)}
                del = {()=>handleRemoveItem(i)}
              />}
              
                {!el.selected &&
                <div className='flex flex-col w-full px-3 justify-center items-center'>
                <span
                 className='text-lg font-semibold text-stone-700 '
                >{el.upc}</span>
                <span
                 className='text-sm w-full text-stone-600 truncate'
                >{el.product_name}</span>
                </div>
                }
                

              
              
              {el.selected
              ?<div className='flex-none  '>
                <button 
                  className='btn-primary text-lg py-2'
                  //onClick={()=>handleAddItemToCart(i)}
                >AGGIUNGI
                <span className='ml-2'>
                  {el.quantity > 0? el.quantity : ''}
                </span>
                </button>
              </div>
              :''
              
              }
              
              
            </div>
            )
          })
          :''
        
        }
      </div>
      
      

      {/* ABSOLUTE POSITIONED ITEMS */}
        <button
        className='absolute top-2 right-2'
        onClick={()=>navigate(-1)}
        ><i className="fas fa-3x fa-xmark font-semibold text-stone-400"/></button>


        <button
        className='absolute bottom-8 right-2 btn-primary uppercase'
        onClick={handleConfirmSelection}
        >conferma</button>

    
        <div className={` w-full absolute bottom-0 ${!showKeyboard?'hidden':''} z-10 `}>

        <Keyboard
          keyboardRef={r => (keyboard.current = r)}
          inputName={inputName}
          layoutName={layoutName}
          onChangeAll={onChangeAll}
          onKeyPress={onKeyPress}
        />

        </div>
    
    
    
    </div>
    
  )
}

export default SearchProduct

const QuantitySelector = ({q, action, undo, del}) =>{

  const xClick = ()=>{

    if (q == 1){
      del()
    }else{
      undo()
    }
  }

  return(

    <div
      className='absolute top-0 left-0 shrink w-full h-[8rem] bg-white/30 text-5xl text-stone-700
      flex items-center justify-center'
    >
      <button
      className='h-[6rem] w-[6rem]'
      onClick={action}
      >
        <i className="fa-regular fa-lg fa-plus opacity-60"/>
      </button>

      <button
        className={`absolute -top-2 -right-2  flex items-center justify-center w-8 h-8 rounded-full ${q == 1?'bg-red-400':'bg-orange-400'} font-semibold text-white text-[1.3rem]`}
        onClick={xClick}
        >X</button>
    
    </div>
  )

}
