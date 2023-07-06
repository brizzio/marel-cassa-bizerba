/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/prop-types */
import React from 'react'

import BouncingDotsLoader from '../components/BouncingDotsLoader/BouncingDotsLoader'

import useScannerData from '../hooks/useScannerData'
import useCart from '../hooks/useCart'


const Keyboard = ({idle}) => {

    const defaultTitle = 'Q'
    const confirmTitle = 'CONFERMA'
   
    const [scan, setScan] = React.useState({})
   
    const [input, setInput] = React.useState('1')
    const [quantityButtonTitle, setQuantitybuttonTitle] = React.useState(defaultTitle)
    const [isQuantityButtonClicked, setIsQuantityButtonClicked] = React.useState(false)

    const { 
        currentRead, 
        updateQuantity
    } = useScannerData()

    const {currentCart} = useCart()
   
     
    const inputRef = React.useRef()
   

    React.useEffect(()=>{
        
        console.log('currentRead', currentRead)
       
        setScan(currentRead)
        setInput(currentRead?currentRead.quantity:1)
        if( isQuantityButtonClicked){
            
            setIsQuantityButtonClicked(false)
        }
       
    }, [currentRead])


    const handleKeyClick= (e)=>{
        //console.log(e)
        let str = input + e.target.value
        setInput(str)
        updateQuantity(Number(str))
    }

    const handleClearInput= (e)=>{
        //console.log(e)
        setInput('')
    }

    const qBtnClick = ()=> {
       
            setIsQuantityButtonClicked(true)
            setScan({})
            setInput('')
    }


    


const btnClass = `w-full py-1.5 px-2 bg-white text-stone-800 text-3xl font-semibold rounded-lg shadow-md `

const qBtnClass = `w-full py-2 px-4 ${isQuantityButtonClicked?'bg-teal-600 text-white text-lg':'bg-white text-stone-800 text-3xl'}  font-semibold rounded-lg shadow-md `

  return (
    
        <div className="flex flex-col h-full gap-2 ">

            <div className={`relative w-full h-2/6 bg-stone-700 row-span-2 col-span-3 flex flex-col text-stone-800 opacity-40 border border-2 rounded-xl shadow-lg justify-between p-3`}>
                {!idle || currentCart?.active
                ?<>
                    
                    <div  className={`w-full flex flex-row text-white text-5xl gap-3  items-center`}>
                        <span className={`${isQuantityButtonClicked?'text-white':'text-stone-400'}`}>{input}</span>
                        <span className='pb-1'>|</span>
                        <span>{!!scan?scan.code:''}</span>
                    </div>
                    <div className={`absolute bottom-2 w-full h-fit flex flex-row text-white font-thin justify-between px-4 items-center`}>
                        <span>{!!scan?scan.evaluationType: ''}</span>
                        <span>{!!scan?scan.count: ''}</span>
                        <span>{!!scan?scan.read_at: ''}</span>

                    </div>
                 </>
                :<BouncingDotsLoader/>
                
                
            }
           
            </div>
        
        <div className="h-4/6 grid grid-flow-row grid-cols-3 grid-rows-5 gap-1.5">
            <button className={qBtnClass} onClick={qBtnClick}>{quantityButtonTitle}</button>
            <button className={btnClass}>000</button>
            <button className={btnClass}><i className="fas fa-arrow-up-from-bracket text-stone-500"/></button>
            <button className={btnClass} onClick={handleKeyClick} value='7'>7</button>
            <button className={btnClass} onClick={handleKeyClick} value='8'>8</button>
            <button className={btnClass} onClick={handleKeyClick} value='9'>9</button>
            <button className={btnClass} onClick={handleKeyClick} value='4'>4</button>
            <button className={btnClass} onClick={handleKeyClick} value='5'>5</button>
            <button className={btnClass} onClick={handleKeyClick} value='6'>6</button>
            <button className={btnClass} onClick={handleKeyClick} value='1'>1</button>
            <button className={btnClass} onClick={handleKeyClick} value='2'>2</button>
            <button className={btnClass} onClick={handleKeyClick} value='3'>3</button>
            <button className={`${ btnClass} col-span-2`} onClick={handleKeyClick}
            value='0'>0</button>
            <button className={btnClass} onClick={handleClearInput}><i className="fas fa-delete-left text-stone-500"/></button>
        </div>
    
        </div>
  )
}

export default Keyboard

{/* <div className="flex items-center justify-center gap-1">
                        <button className={`${regularBtnClass}`}>CONTR. PREZZO ART</button>
                        <button className={`${regularBtnClass}`}>RESO <br/> ART</button>
                        <button className={`${regularBtnClass}`}>STORNO ART PRECEDENTE</button>
                        <button className={`${regularBtnClass}`}>STORNO ULT ARTICOLO</button>
                    </div>
                    <div className="flex items-start justify-center gap-1">
                        <button className={`${largeBtnClass}`}>SHOP BIO PICCOLA</button>
                        <button className={`${largeBtnClass}`}>SHOP BIO GRANDE</button>
                    </div>
                    <div className="flex items-start justify-center gap-1">
                        <button className={`${largeBtnClass}`}>G. VARI</button>
                        <button className={`${largeBtnClass}`}>MUI. SA. FO.</button>
                    </div>
                    <div className="flex items-start justify-center gap-1">
                        <button className={`${largeBtnClass}`}>BANC. SA. FO.</button>
                        <button className={`${largeBtnClass}`}>PANET</button>
                    </div>
                    <div className="flex items-start justify-center gap-1">
                        <button className={`${largeBtnClass}`}>SURGEL</button>
                        <button className={`${largeBtnClass}`}>NO FOOD</button>
                    </div>
                    <div className="flex items-start justify-center gap-1">
                        <button className={`${largeBtnClass}`}>PESCE</button>
                        <button className={`${largeBtnClass}`}>CARNE</button>
                    </div>
                   
                    <div className="flex items-start justify-center gap-2">
                        <button className={`py-[1.9rem] px-4 w-1/2 bg-white bg-opacity-90 font-semibold border-2 border-teal-900 rounded-lg shadow-lg`}>FRUTTA</button>
                        <div className="flex gap-1 w-1/2">
                            <button className={`py-[1.9rem] text-center w-1/2 bg-white bg-opacity-90 text-teal-800 rounded-lg shadow-lg`}>SACCH. BIO</button>
                            <button className={`py-[1.9rem] text-center w-1/2 bg-white bg-opacity-90 text-teal-800 rounded-lg shadow-lg`}>P. CASSA</button>
                        </div>
                    </div> */}