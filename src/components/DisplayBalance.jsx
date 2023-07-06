/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
//import DisplayBill from '../customUi/DisplayBill';
//import DisplayCoin from '../customUi/DisplayCoin';
import useCashInventory from '../hooks/useCashInventory';
import useIntl from '../hooks/useIntl';
import useSwap from '../hooks/useSwap';

const sample ={
    type: '',
    face:'',
    value:0, 
    quantity:0,
}

const DisplayBalance = ({confirm}) => {

 
  const {
    inventory, 
    clearSelections, 
    updateQuantityToSelectedRow,
    setRowSelectedByIndex,
  } = useCashInventory()

  const {swap} = useSwap()

  const [input, setInput] = React.useState('')

  const {currency} = useIntl()

  let sum = [...inventory].reduce((a,el)=>{
    let val = Number(el.value) * Number(el.quantity)
    return a + val
},0)

  React.useEffect(()=>{

    console.log('inventory',inventory)
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

const saveInventoryAndMoveToNextPage = ()=>{

  const inventoryMessage = "Il fondo cassa é stato stabilito. Continuamo verso la apertura del cassa?"

  if (window.confirm(inventoryMessage)) {
    confirm()

  }//close if window confirm
}


const btnClass = `w-full py-1.5 px-2 bg-white/50 text-stone-800 text-3xl font-semibold rounded-lg shadow-md border border-2 border-stone-300`

const row=`flex items-center justify-start gap-2 w-full`
const label =`text-lg font-semibold text-center p-3`
const field =`text-2xl font-thin border border-teal-300 border-2 border-opacity-20 rounded-xl shadow-xl bg-white bg-opacity-90 drop-shadow-xl px-4 py-[1rem] grow `

//${swap?'flex-row-reverse':''}

    return (
      <div className={`flex  ${swap?'flex-row-reverse':''} items-start grow h-full justify-between`}>
        <div className='grid grid-rows-8 grid-cols-2 grid-flow-row w-8/12 max-h-[32rem] gap-3.5 mb-2 pr-4'>
        

        {[...inventory]?.map((item, index) => (
            <Bills 
            key={index} 
            item={item} 
            money={item}
            i={index} 
            keyboardValue={input} 
            />
          ))}
              
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
          

          
        </div>
      </div>
      );
}

/* const Item = ({item=sample, i, keyboardValue}) =>{

    let val = Math.floor(item.value * Math.pow(10, 2)) / Math.pow(10, 2)
 
    return (
        <>
        {item.type === 'bill'
        ?<DisplayBill 
        count={item.quantity}
        face={item.face}
        value={val}
        selected={!!item.selected}
        keyboard={keyboardValue}
        index={i}/>
        :<DisplayCoin 
        count={item.quantity}
        face={item.face}
        value={val}
        selected={!!item.selected}
        keyboard={keyboardValue}
        index={i}/>
        }
        </>
    )

}
 */

const Bills = ({money, i, keyboardValue}) => {

const [img, setImg] = React.useState('')

const {
  setRowSelectedByIndex
 }=useCashInventory()

  const handleClick = () => {
    console.log('item clicked', index)
    setRowSelectedByIndex(index)
  }

  let item = money?{...money}:sample
  let count = item.quantity
  let value= Math.floor(item.value * Math.pow(10, 2)) / Math.pow(10, 2)
  let selected= !!item.selected
  let keyboard= keyboardValue 
  let index= i

  
  let d = React.useRef({h:50})

  React.useEffect(()=>{

    if(!img){

      const img = new Image()

        img.onload = function() {
          console.log(this.width + 'x' + this.height);
          let w = Math.floor(d.current.h * this.width /this.height)
          d.current = {...d.current, w}
          console.log('d.current', d.current);
        }

        img.src = `/euros/${item.img_url}`;
    }

  },[])

  
  //console.log(img.naturalHeight,    img.naturalWidth);
  
  const subtotal = () => Number(value) * Number(count)

  const selectedClass= selected?' bg-white ':'bg-stone-300'

  return (
  
  <div key={crypto.randomUUID} className="flex items-center justify-start gap-1">
  
  <div className='h-[3rem] grow bg-white  shadow-md'
  style={{ 
    backgroundImage: `url(/euros/${item.img_url})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  }}
  />
  <div>
    <span
    className='text-2xl'
    >{item.face.replace('E', '€')}</span>
  </div>
    
  <div className="pl-1 grow">
    <div 
    onClick={handleClick} 
    className={`flex h-fit w-[4rem] border border-2 border-stone-800 border-opacity-40 rounded-xl ${selectedClass} items-center justify-center`}>
      <span className="text-2xl p-1 w-[3rem] h-[3rem]" >{selected?keyboard:count}</span>
    </div>
  </div>
  <div className="flex items-center justify-center  h-[3rem] border rounded-xl px-2 border-stone-700 border-opacity-20 bg-white/80 shadow-lg ">

    <span className="text-2xl p-1 font-semibold">&#8364;</span>
    <span className="text-2xl p-1 ">{subtotal()}</span>
  </div>

  
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