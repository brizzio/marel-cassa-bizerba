/* eslint-disable react/prop-types */
import React from 'react'

const StoreOptions = ({stores, selectStore}) => {

    const [options, setOptions] = React.useState(stores);
    
      const handleClick = (index) => {
        const arr = [...options].reduce((a, c, i) => {
          return [...a, { ...c, selected: i === index ? true : false }];
        }, []);
        //console.log('arr', arr)
        setOptions(arr);
        selectStore(stores[index])
      };
    
      return (

        <div key={crypto.randomUUID()} className=" grid grid-flow-col-dense gap-[1rem] m-auto">
          {[...options].map((stor, index) => {
            return (
             
                <div key={index}
                  className={` flex flex-col items-center bg-white gap-1 p-3 border  rounded-xl shadow-xl ${stor.selected ? 'border-teal-700 border-3' : 'border-zinc-300'}`}
                  onClick={() => handleClick(index)}
                >
                  
                <img  
                src={stor.banner_detail.logo_url} 
                className={`flex w-fit items-center text-center h-[50px]`}
                />
                <div 
                className='flex w-5/6 items-center text-center grow justify-center text-teal-600 font-semibold'
                >
                    {stor.store_name}
                </div>
                
                </div>
             
            );
          })}
        </div>
      );
}

export default StoreOptions
