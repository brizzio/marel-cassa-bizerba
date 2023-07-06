/* eslint-disable react/prop-types */

import StaticMap from '../StaticMap'
import {useDevice} from '../../hooks/useDevice'


const WorkingStore = ({store, user, undo, next}) => {

  const realce = 'border border-stone-300 border-2 border-opacity-30 border-4 rounded-xl shadow-xl bg-white bg-opacity-80 drop-shadow-sm backdrop-blur-xl'
// ${realce}

  const back = () => undo()

  const nextStep = () => next()

  const {did} = useDevice()
 
  const row=`flex h-fit items-center justify-center gap-6 `
  const label =`text-lg font-semibold text-center p-3`
  const field =`text-2xl font-thin border border-teal-300 border-2 border-opacity-20 rounded-xl shadow-xl bg-white bg-opacity-30 drop-shadow-xl grow px-4 py-[1rem] `

  return (
    <div className='flex flex-col items-center justify-center w-full h-full gap-3 mx-[1rem]'>
         <div className={`flex text-3xl debug font-thin text-stone-600 w-full  px-[1rem] items-center justify-between ${realce}`}>
            <span>{store.store_name.toUpperCase()}</span>
            <button className=' p-4' onClick={back}><i className="fas fa-xmark"></i></button>
         </div>

        <div className='flex w-full h-full gap-8'>
            <div className='flex flex-col justify-between mt-6'>
                <StaticMap 
                longitude={store.lng} 
                latitude={store.lat}
                classes='p-2  border-teal-300 border-2 glow border-opacity-20 rounded-xl shadow-xl bg-teal-400 bg-opacity-20 drop-shadow-xl '
                />

                <div className="flex bg-white border border-stone-500 rounded-xl justify-center">
                <img className="object-contain h-[70px] p-2 "
                   src={store.banner_detail.logo_url} 
                   />
                </div>
                <img  
                
               
                />
                
                {/* <span className='text-3xl font-thin text-stone-600'>{store.banner_detail.name} </span> */}
                
            </div>
            <div className='relative flex flex-col border-l border-stone-200 h-full grow gap-[1rem] px-4'>
                <div className={`${row}`}>
                    <span className={`${label}`}><i className="fas fa-store fa-2x text-stone-600"></i></span>
                    <span className={`${field}`}>{store.corporate_name}</span>
                </div>
                <div className={`${row}`}>
                    <span className={`${label}`}>
                    {user.isAdmin || user.isSuper
                        ?<i className="fas fa-user-shield text-orange-600 fa-2x text-center"></i>
                        :user.isCashier 
                        ?<i className="fas fa-user-pen fa-2x text-green-700"></i>
                        :<i className="fas fa-user fa-2x text-stone-400"></i>
                    }
                    </span>
                    <span className={`${field}`}>{user.name}</span>
                   
                </div>
                <div className={`${row}`}>
                    <span className={`${label}`}><i className="fas fa-cash-register fa-2x text-stone-600"></i></span>
                    <span className={`${field}`}>{did.id}</span>
                </div>
                <div className={`${row}`}>
                    <button className=' w-11/12 absolute bottom-[1rem] debug py-4 border border-teal-300 border-2 border-opacity-20 rounded-xl shadow-xl bg-teal-700 text-white text-3xl drop-shadow-xl'
                    onClick={nextStep}> FONDO CASSA </button>
                </div>    
            </div>
        </div>
        
    </div>
  )
}

export default WorkingStore