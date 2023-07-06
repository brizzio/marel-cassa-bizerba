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
                  className={`${stor.selected ? 'debug' : ''}`}
                  onClick={() => handleClick(index)}
                >
                  
                <img  
                src={stor.banner_detail.logo_url} 
                className={`h-[80px]`}
                />
                <div>
                    {stor.store_name}
                </div>
                
                </div>
             
            );
          })}
        </div>
      );
}

export default StoreOptions
