/* eslint-disable react/prop-types */
import useCashInventory from "../../../../../hooks/useCashInventory"


const DisplayCoin = ({
    count = 1,
    face = 50,
    value=10,
    selected,
    keyboard,
    index
}) => {

  const selectedClass= selected?' bg-white ':'bg-stone-300'

    const subtotal = () => Number(value) * Number(count)

    const {
      setRowSelectedByIndex
     }=useCashInventory()

     const handleClick = () => {
      console.log('item clicked', index)
      setRowSelectedByIndex(index)
    }


    return (<div key={crypto.randomUUID} className="grid grid-cols-3 gap-4 gap-1 max-h-[40px]">
    <div className="flex items-center justify-center">

      <div className="w-12 h-12 flex justify-center items-center border border-black rounded-full">
      <p className="text-xl font-bold">{face}</p>
    </div>

    </div>
    
    <div  
    onClick={handleClick} 
    className={`flex h-fit w-[5rem] border border-2 border-stone-800 border-opacity-40 rounded-xl ${selectedClass}  items-center justify-center`}>
      <span className="text-2xl p-1 w-[3rem] h-[2.3rem]" >{selected?keyboard:count}</span>
    </div>
    <div className="flex h-fit items-center justify-start debug border rounded-xl px-2 border-stone-700 border-opacity-20 bg-white/80 shadow-lg">
  
      <span className="text-2xl p-1 font-semibold">&#8364;</span>
      <span className="text-2xl p-1 ">{subtotal()}</span>
    </div>

    
  </div>
    )

}

export default DisplayCoin