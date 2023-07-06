/* eslint-disable react/prop-types */
import React from 'react'

import useCashInventory from '../../../../../hooks/useCashInventory';
import useIntl from '../../../../../hooks/useIntl';

import useCheckout from '../../useCheckout';
import { useNavigate } from 'react-router-dom';



const sample ={
    type: '',
    face:'',
    value:0, 
    quantity:0,
}

const DisplayBalance = () => {

  
 
  const {
    
    inventory, 
    clearSelections, 
    updateQuantityToSelectedRow
  } = useCashInventory()

  const {
    money,
    cash,
    resetCash,
    openDrawer,
    payment={}
} = useCheckout()


  const navigate = useNavigate()

  const [input, setInput] = React.useState('')

 
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const [detail, setDetail] = React.useState([])

  const {currency} = useIntl()

  

  let sum = [...inventory].reduce((a,el)=>{
    let val = Number(el.value) * Number(el.quantity)
    return a + val
},0)

  React.useEffect(()=>{

    console.log('inventory',inventory)
    resetCash()
  
  },[])

  const handleKeyClick= (e)=>{
    console.log(e.target.value)
    let str = input.toString() + e.target.value.toString()
    setInput(str)
   
}

const handleClearInput= ()=>{
  //console.log(e)
  clearSelections()
  setInput('')
}

const confirmCurrencyQuantity = () =>{

  updateQuantityToSelectedRow(input)
  setInput('')


}

const handleOpenDrawer =()=>{

  openDrawer()
  setIsDrawerOpen(true)
  navigate('split')


}










const btnClass = `w-full py-1.5 px-2 bg-white/50 text-stone-800 text-3xl font-semibold rounded-lg shadow-md border border-2 border-stone-300`

const row=`flex items-center justify-start gap-2 w-full`
const label =`text-lg font-semibold text-center p-3`
const field =`text-2xl font-thin border border-teal-300 border-2 border-opacity-20 rounded-xl shadow-xl bg-white bg-opacity-90 drop-shadow-xl px-4 py-[1rem] grow `

//${swap?'flex-row-reverse':''}

    return (

      <div
      className='flex flex-col w-full h-full gap-4'
      >
        cash split
        <div className='flex w-full h-fit gap-6'>
            <div
            className={`flex items-center  gap-2`}
            >

               
                <i 
                className={`fas fa-cart-shopping fa-3x text-zinc-400 pr-1 shadow-xl`}
                />
                
                <div 
                className="flex w-[8rem] h-full border rounded-xl bg-white shadow-xl items-center justify-start py-4 px-1 text-stone-400 mt-1 gap-2"
                >
                    <span 
                    className="text-4xl font-semibold "
                    >
                        €
                    </span>
                    <span 
                    className="text-3xl font-semibold  text-end w-full"
                    >
                        {cash?.due}
                    </span>
                </div>
              </div>

                <div
                  className={`flex items-center  gap-2 pl-1`}
                  >

                      <i 
                      className={`fas fa-sack-dollar fa-3x text-zinc-400 pr-1 shadow-xl`}
                      />

                      <div 
                      className="flex w-[8rem] h-full border rounded-xl bg-white shadow-xl items-center justify-start py-4 px-1 text-stone-400 mt-1 gap-2"
                      >
                          <span 
                          className="text-4xl font-semibold "
                          >
                              €
                          </span>
                          <span 
                          className="text-3xl font-thin  text-end w-full"
                          >
                              {cash?.total?cash?.total:'0.00'}
                          </span>
                      </div>
                  </div>

                  <div
                    className={`flex items-center  gap-2 pl-1`}
                    >

                        <i 
                        className={`fas fa-hand-holding-medical fa-3x pr-1 shadow-xl ${cash?.change < 0?'text-red-600':'text-green-600'}`}
                        />
                        <div 
                        className={`flex w-[8rem] h-full border rounded-xl shadow-xl items-center justify-start py-4 px-1 text-stone-800 mt-1 gap-2
                        ${cash?.change < 0?'bg-red-300':'bg-green-300'} bg-opacity-60
                        `}
                        >
                            <span 
                            className="text-4xl font-semibold "
                            >
                                €
                            </span>
                            <span 
                            className="text-3xl font-thin  text-end w-full"
                            >
                                {cash?.change}
                            </span>
                        </div>


                    </div>
                </div>

           
            <div className='grid grid-cols-4 gap-3 w-full max-h-[26rem] place-items-center px-3'>
        

            {[...money]?.map((item, index) => (
                <Item 
                key={index} 
                item={item} 
               
                />
              ))}
                  
            </div>
            
            <button
            className='btn-primary disabled:opacity-40 uppercase'
            disabled= {cash?.change < 0? true:false}
            onClick={handleOpenDrawer}
            >
              {isDrawerOpen?'chiudi cassetto':'APRI CASSETTO'}
            </button>


      </div>
      
        
        
      );
}









const Item = ({item=sample}) =>{

  const {
    
    updateCash,
   
} = useCheckout()

  const [value, setValue] = React.useState(0)

  //console.log('item', item, value)

 const handleSetQuantity = () =>{
    let q = value + 1
    setValue(q)

    let info = {
      ...item, 
      quantity:q,
      total: q * item.value
    }

    updateCash(info)

 }

 const handleDeleteQuantity = () =>{
  setValue(0)

  let info = {
    ...item, 
    quantity:0,
    total: 0
  }

  updateCash(info)
}
    
 
 return (
  <div className='relative w-full h-full'>
        <div
        className='h-[5.5rem] w-11/12 flex items-center justify-center bg-white border rounded-xl border-stone-300 shadow-md '
        style={{ 
          backgroundImage: `url(/euros/${item.img_url})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        onClick={handleSetQuantity}
        >
          <div
          className={`p-3 text-7xl font-semibold w-full h-full flex justify-center items-center
          text-teal-700 bg-white/40 ${value?'':'hidden'}`}
          >
            {value}
          </div>
          
        </div>
        <button 
        onClick={handleDeleteQuantity}
        className={`absolute top-0 right-4  flex shadow-xl m-1 w-[2rem]  justify-center items-center z-50 ${value?'':'hidden'} bg-white/40 rounded-full`} ><i className="fas fa-xmark text-black fa-x"></i></button>
  </div>
    )

}

export default DisplayBalance

/* const itemPropTypes = PropTypes.shape({
        type: PropTypes.string,
        face:PropTypes.string,
        value:PropTypes.number, 
        quantity:PropTypes.number,
       })




Item.propTypes = {
    item:PropTypes.instanceOf(itemPropTypes),
    index:PropTypes.number
  }

//{type:'bill', face:'200', value:200, quantity:100}
DisplayBalance.propTypes ={ 
      
    items: PropTypes.arrayOf(PropTypes.instanceOf(itemPropTypes))
    
  } */

{/* 
</div>
        <div className='flex flex-col items-end justify-start w-4/12 h-full px-4 gap-4'>
          <div className={`${row}`}>
            <span className={`${label}`}><i className="fas fa-sack-dollar fa-2x text-stone-600"></i></span>
            <span className={`${field}`}>{currency(sum)}</span>
          </div>
          <div className=' border border-zinc-300 rounded-lg bg-white h-[6rem] w-full my-1 text-stone-600 text-2xl'>
              <div className='flex items-center justify-between h-full px-4'>
                <div className='text-4xl font-thin'>
                  {input}
                </div>
                <div className={`${input?'':'opacity-0'}`}>
                  <button
                  onClick={confirmCurrencyQuantity}>
                   <i className="fas fa-2x bg-white text-green-700 fa-circle-check"></i>
                  </button>
                </div>
              </div>

            </div>

          <div className="h-fit w-full grid grid-flow-row grid-cols-3 grid-rows-4 gap-1.5 bg-white/30 backdrop-blur-lg">
           
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
            <button className={`${ btnClass} col-span-2`} onClick={handleKeyClick}
            value='0'>0</button>
            
          </div>
          
            <button
            onClick={saveInventoryAndMoveToNextPage}
            className='btn-primary w-full '
            >CONFERMA</button>
          

           */}
       