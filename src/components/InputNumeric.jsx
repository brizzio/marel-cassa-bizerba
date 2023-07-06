/* eslint-disable react/display-name */
import React from 'react'

import { PropTypes } from "prop-types";

const InputNumeric = ({placeholder, update}) => {

const input = React.useRef()

const keyboard = React.useRef()


const [show, setShow] = React.useState(false)


const [value, setValue] = React.useState('')
const [currency, setCurrency] = React.useState('')



//Number(placeholder).toFixed(2)

React.useEffect(()=>{

if(value) setShow(true)

},[value])


const btnClass = `w-full py-1.5 px-2 bg-white/50 text-stone-800 text-3xl font-semibold rounded-lg shadow-md border border-2 border-stone-300`

const handleKeyClick= (e)=>{
    
    let val = value + e.target.value.toString()

    console.log('value:', val)
    
    const result = val.split().reduceRight((a, c, i) =>{
        let exp = i-2
        return a + c * 10**exp
    },0) ;
    
    setValue(val)
    setCurrency(Number(result).toFixed(2))
   
}

const handleClearInput= ()=>{
  
  setValue('')
  setCurrency('')
}

const gotFocus =()=> {
    console.log('focused', input.current)
    setShow(true)
    setCurrency('')
    setValue('')
}


const confirm= ()=>{
  
    console.log('confirmed value:', currency)
    update(currency)
    setValue('')
    setShow(false)
  }

  
return (
    <div
  
    className='relative border border-zinc-300 rounded-xl shadow-xl py-4 w-2/6  static bg-white'
    >
        <div
        className=' flex flex-col items-center gap-3 overflow-auto'
        >
            
            <Input 
             ref={input}
             type="text" 
             id="first_name" 
             className=" text-teal-900 text-2xl  grow focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
             value={currency}
             placeholder={placeholder}
             onFocus={gotFocus}
             readOnly/>
</div>
            
            {/* ABSOLUTE POSUTIONED BUTTON INSIDE INPUT ON RIGHT */}
            
            <div
            ref={keyboard} 
            className={` absolute top-[41px] flex flex-col z-50
            w-full border rounded-xl border-stone-300 p-2 bg-stone-200  transition-all ease-out duration-700
            ${show?'':'hidden'}
            `}
            >
           <div className="h-fit grow grid grid-flow-row grid-cols-3 grid-rows-4 gap-1.5 bg-white/30 backdrop-blur-lg">
           
           <button className={btnClass} onClick={handleKeyClick} value='7'>7</button>
           <button className={btnClass} onClick={handleKeyClick} value='8'>8</button>
           <button className={btnClass} onClick={handleKeyClick} value='9'>9</button>
           <button className={btnClass} onClick={handleKeyClick} value='4'>4</button>
           <button className={btnClass} onClick={handleKeyClick} value='5'>5</button>
           <button className={btnClass} onClick={handleKeyClick} value='6'>6</button>
           <button className={btnClass} onClick={handleKeyClick} value='1'>1</button>
           <button className={btnClass} onClick={handleKeyClick} value='2'>2</button>
           <button className={btnClass} onClick={handleKeyClick} value='3'>3</button>
           <button className={btnClass} onClick={handleClearInput}><i className="fas fa-circle-xmark text-stone-500"/></button>
           <button className={`${ btnClass}`} onClick={handleKeyClick}
           value='0'>0</button>
            <button className={`${ btnClass}`} onClick={handleKeyClick}
           value='00'>00</button>
           
         </div>
        
        </div>
        
        

        <div className={
            `absolute top-2
            right-2 z-20
            ${value && show?'':'hidden'}`
            }>
            <button
            onClick={confirm}
            >
            <i 
            className="fas fa-2x bg-white text-green-700 fa-circle-check"
            />
            </button>
        </div>
         

        
        
        
    </div>
  )
}



const Input = React.forwardRef((props, ref) => (
  <input ref={ref} {...props} />
));

InputNumeric.propTypes = {
   placeholder:PropTypes.string,
   update: PropTypes.func,
};

InputNumeric.defaultProp = {
  placeholder:'0',
  update: PropTypes.func,
};


export default InputNumeric