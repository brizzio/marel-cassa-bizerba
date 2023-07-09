/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Keyboard from '../../components/Keyboard';
import useCart from '../../hooks/useCart';
import useCashier from '../../hooks/useCashier';
import useScannerData from '../../hooks/useScannerData';
import DisplayList from '../../components/DisplayList';
import useSwap from '../../hooks/useSwap';
//import BouncingDotsLoader from '../../components/BouncingDotsLoader/BouncingDotsLoader';
import CheckOutIndex from './checkout/CheckOutIndex';
import useCheckout from './checkout/useCheckout'
import Bags from './bags/Bags';

//HEADER BUTTONS COMPONENTS
import Lottery from './headerButtons/Lottery'
import RegisterCostumer from './headerButtons/RegisterCostumer'
import SuspendCashier from './headerButtons/SuspendCashier'


//PANEL BUTTONS COMPONENTS
import SearchProduct from './panelButtons/SearchProduct';


import {
   
    Routes,
    Route,
    Outlet,
    useNavigate,
    
  } from "react-router-dom";


//https://www.kindacode.com/snippet/tailwind-css-make-a-child-element-fill-the-remaining-space/

//Managing state with React Query.
//https://dev.to/franklin030601/managing-state-with-react-query-1842



export default function CashierIndex() {

    
    return (
        <>
        
        <Outlet />
       
        <Routes>
          <Route index element={<CashierPage />} />
          <Route path="close" element={<CloseCashier />} />
          <Route path="lottery" element={<Lottery/>} />
          <Route path="register" element={<RegisterCostumer/>} />
          <Route path="suspend" element={<SuspendCashier/>} />
          <Route path="search" element={<SearchProduct/>} />
          <Route path="checkout/*" element={<CheckOutIndex />} />
        </Routes>
      </>
    );
  }






export const CashierPage = () => {

    const {swap, toggleSwap} = useSwap()
    const [idle, setIdle] = React.useState(true)
    const [totals, setTotals] = React.useState({})
    const [height, setHeight] = React.useState(null);


    const navigate = useNavigate()

    

    const navigateToLogoutPage = ()=> navigate('/logout', { replace: true })

    const {
        newCart,
        deleteCart,
        currentCart,
        
    } = useCart()


    const {

        closeCashier
    
    } = useCashier()

    const {
        init
    }= useCheckout()



    const {clearCurrentRead} = useScannerData()

    const newCartClicked = React.useRef(false)

    

    const tabBtn = `flex items-center h-full w-full px-3 bg-white text-teal-800 font-thin rounded-lg shadow-md `

    const swapBtnClass = ` h-full px-4 bg-white text-stone-800 font-semibold rounded-lg shadow-md `

    const regularBtnClass = `bg-white text-teal-900 font-semibold 
    border border-teal-900 border-opacity-70 rounded-lg shadow-lg`

    const largeBtnClass = `col-span-2  bg-white bg-opacity-90 text-teal-900 font-semibold border border-teal-900 border-opacity-70 rounded-lg shadow-lg;`
    
    

    

    const startNewCart = () => {

        console.log('newCart started')
        newCart()
        clearCurrentRead()
        setIdle(false)
        newCartClicked.current = true

    }

    const cancelCurrentCart = () => {

        console.log('current cart cancelled')
        deleteCart()
        clearCurrentRead()
        setIdle(true)
        newCartClicked.current = false


    }

    const handleCloseCashier = () => {
        if(currentCart.active){
            window.alert('Non é possibile chiudere il cassa con un carrello attivo. Chiudi il conto prima.')
            return;
        }
        console.log('close cash')
        //closeCashier().then(res => res && navigateToLogoutPage() )
        navigate('close')
    }

    

    const div = React.useCallback(node => {
        if (node !== null) {
        let h = Math.trunc(node.getBoundingClientRect().height)
        let rem = h / parseFloat(getComputedStyle(document.body).fontSize);
        //console.log('h', h, rem)
          setHeight(rem);
        }
      }, []);



      const handleCloseCart = () => {
        console.log('close cart')
        init()
        navigate('checkout')
        
       
    }

    React.useEffect(()=>{
        if(!currentCart?.active) setIdle(true)
        


    },[currentCart])
    

    const handleLotteryHeaderButtonClick = () => {
        navigate('lottery')
    }

    const handleRegisterCostumerHeaderButtonClick = () => {
        navigate('register')
    }

    const handleSuspendCashierHeaderButtonClick = () => {
        navigate('suspend')
    }

    const handleSearchPanelButtonClick = () => {
        navigate('search')
    }
    
    return(
        
        <> 
             <div className="flex items-center justify-between w-full h-[50px] flex-row-reverse ">
                {/* HEADER BUTTONS */}
                <div className="flex h-full items-end justify-start gap-2 w-8/12 p-1">
                    <button className={`flex items-center justify-center h-full w-3/12 px-10 bg-blue-900 text-teal-800 font-thin rounded-lg shadow-md bg-center`}
                    onClick={handleLotteryHeaderButtonClick}
                    style={{ 
                        backgroundImage: `url(/scontrini.jpg)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                        }}
                    />
                    {/* <button className={`${tabBtn}`}>02</button> */}
                    <button className={`flex items-center justify-center h-full w-3/12 px-10  text-teal-800 font-thin bg-white rounded-lg shadow-md`}
                    onClick={handleSuspendCashierHeaderButtonClick}
                    >
                        <i className="fa-regular fa-2x fa-circle-pause"></i>
                    </button>
                    
                    <button className={`flex items-center justify-center h-full w-3/12 px-10  text-teal-800 font-thin bg-white rounded-lg shadow-md bg-center`}
                    onClick={handleRegisterCostumerHeaderButtonClick}
                    style={{ 
                        backgroundImage: `url(/costumers-300x200.webp)`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain'

                        }}
                    />
                    


                    {/* <button className={`flex items-center justify-center h-full w-full px-3 bg-blue-900 text-teal-800 font-thin rounded-lg shadow-md`}>
                        <img 
                        className='h-5/6'
                        src="/scont2.png" alt="" />
                    </button> */}
                    <button className={`flex items-center h-full w-3/12 px-14 bg-white text-teal-800 font-thin rounded-lg  shadow-md `}
                    onClick={handleCloseCashier}>CHIUDERE CASSA</button>

                </div>
                
                <button className={`${swapBtnClass}`}
                    onClick={toggleSwap}>{swap?'Mancino':'Destro'}</button>
                

            </div>
            
            <div className={`flex grow w-full mt-1 ${swap?'':'flex-row-reverse'} gap-2`}>
                
                <div ref={div} className="flex flex-col grow w-5/12 gap-2 pr-2">
                    <div className="grid grid-flow-row grid-cols-3 grid-rows-2 gap-2 h-2/6">
                    <button className={`bg-white/90 text-stone-800 font-thin rounded-lg shadow-md py-2`}><i className="fas fa-2x fa-gears text-stone-400"/></button>
                    <button className={`px-3 bg-white/90 text-stone-800 font-thin rounded-lg shadow-md`}>SCONTO VALORE</button>
                    <button className={`px-3 bg-white/90 text-stone-800 font-thin rounded-lg shadow-md`}>SCONTO %</button>
                    <button className={`px-3 ${currentCart && currentCart.active
                    ?'bg-green-200 text-teal-800 font-normal rounded-lg border-2 border-teal-600 border-opacity-10 px-2'
                    :'bg-white/90 text-teal-800 font-normal rounded-lg border-2 border-teal-600 border-opacity-10'}`}
                    disabled = {currentCart && currentCart.active}
                    onClick={startNewCart}>{currentCart && currentCart.active?'CARRELLO ATTIVO':'NUOVO CLIENTE'}</button>
                    <button className={`px-3 bg-white/90 text-stone-800 font-thin rounded-lg shadow-md`}>RIST. SCONTRINI</button>
                    <button className={`px-3 ${currentCart && currentCart.active
                    ?'bg-red-400 opacity-80 text-white font-thin rounded-lg border-2 border-red-600 border-opacity-10'
                    :'bg-white/70 text-teal-600 font-thin rounded-lg border-2 border-teal-600 border-opacity-10'}`}
                    onClick={cancelCurrentCart}>CANCELLA CARRELLO</button>
                    </div>
                    <Keyboard idle={idle}/>
                </div>

                {/* PANEL BUTTONS */}
                <div className={`grow grid grid-flow-row grid-cols-4 grid-rows-7 gap-1 px-2 w-3/12`}>
                    
                    <button 
                    className={`${largeBtnClass}`}
                    onClick={handleSearchPanelButtonClick}
                    >
                        <i className="fas fa-2x fa-magnifying-glass text-stone-400"/>
                    </button>
                   
                    <button className={`${regularBtnClass}`}><i className="fas fa-2x fa-chevron-left text-stone-400"></i></button>
                    <button className={`${regularBtnClass}`}><i className="fas fa-2x fa-chevron-right text-stone-400"/></button>

                    

                    <button className={`${largeBtnClass}`}>G. VARI</button>
                    <button className={`${largeBtnClass}`}>MUI. SA. FO.</button>

                    <button className={`${largeBtnClass}`}>BANC. SA. FO.</button>
                    <button className={`${largeBtnClass}`}>PANET</button>

                    <button className={`${largeBtnClass}`}>SURGEL</button>
                    <button className={`${largeBtnClass}`}>NO FOOD</button>

                    <button className={`${largeBtnClass}`}>PESCE</button>
                    <div className={`col-span-2 row-span-2 flex flex-col bg-white bg-opacity-90 text-teal-900 font-semibold border border-teal-900 border-opacity-70 rounded-lg shadow-lg`}>
                        <Bags active={!!currentCart?.active}/> 
                    </div>

                    <button className={`${largeBtnClass}`}>FRUTTA</button>
                    
                </div>

                <div className="flex flex-col grow w-4/12  gap-1">
                    
                    {!idle || currentCart?.active
                    ?<>
                    <div className={`w-full h-1/6 row-span-2 col-span-3 flex items-start text-zync-800 gap-3`}>
                        <DisplayTotals cart={currentCart?currentCart:{}} />
                    </div>
                       
                    <div className="h-4/6 w-full rounded-lg bg-white bg-opacity-70 overflow-y-auto [&::-webkit-scrollbar]:hidden max-h-[20.5rem] mb-2">
                        <DisplayList items={currentCart?.items}/>
                    </div>

                        <div className="h-1/6 grid grid-flow-row grid-cols-4 grid-rows-1 gap-1.5">
                            
                            <button className={`${regularBtnClass}`} onClick={navigateToLogoutPage}><i className="fas fa-arrow-right-from-bracket fa-2x text-stone-500 fa-flip-horizontal"/></button>
                            <button className={`${regularBtnClass}`}><i className="fa-regular fa-rectangle-list fa-2x text-stone-500 "/></button>
                            <button className={`${largeBtnClass} bg-blue-100 px-8`}
                            onClick={handleCloseCart}>CHIUDI CONTO</button>
                        </div>
                    
                    </>
                    :
                    <div className="relative h-full w-full border border-stone-600 rounded-lg bg-white bg-opacity-50 mt-1"
                    style={{backgroundImage: 'url(/Supermarket.png)',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat', 
                    backgroundSize: 'cover' }}>

                    <button className={`${regularBtnClass} p-4 absolute bottom-0 m-2`} onClick={navigateToLogoutPage}><i className="fas fa-arrow-right-from-bracket fa-2x text-stone-500 fa-flip-horizontal"/></button>
                    </div>
                    }
                        
                         
                
                </div>

            </div>
        </>
      
    )
    
    };


    const DisplayTotals = ({cart}) => {
        
        let items = cart && cart.items?[...cart.items]:[]
        let count = [...items].filter(el=> !el.deleted).length
        let weight = cart && cart.weight?cart.weight:0
        let total = cart && cart.total?cart.total:0
        
        return(

            <div className="flex h-[4.5rem] w-full items-center justify-between gap-2 ">

                <div className="flex h-full w-fit  items-center justify-center rounded-xl bg-white shadow-xl">
                    <i className="fas fa-lg fa-cart-arrow-down pl-1 "></i>
                    <span className="text-3xl font-thin px-2 mb-2">{count}</span>
                </div>

                <div className="flex h-full px-2  rounded-xl bg-white shadow-xl w-fit  items-center justify-center">
                    <i className="fas fa-weight-scale fa-lg pl-1"></i>
                    <span className="text-2xl font-thin px-1 mb-1">{weight?.toFixed(2)}</span>
                    <span className='text-sm'>Kg</span>
                </div>

                <div className="flex h-full border rounded-xl bg-teal-700 shadow-xl w-[9rem] items-center justify-start px-3 text-white mt-1 gap-2">
                <span className="text-2xl font-bold pl-1 mb-2">€</span>
                <span className="text-2xl font-thin mb-2 text-end  w-full">{total?.toFixed(2)}</span>
                </div>
                
            </div>
         

        )

    }

    DisplayTotals.propTypes = {
        cart: PropTypes.shape({
          count: PropTypes.number,
          weight: PropTypes.number,
          total: PropTypes.number,
        })
      }
    
    DisplayTotals.defaultProps = {
        cart: {
          count: 0,
          weight: 0,
          total: 0,
        }
      }

   //close cashier routine

   const CloseCashier = () => {

    const navigate = useNavigate()
    const {
        cashier,
        closeCashier
    } = useCashier()

    React.useEffect(()=>{
        if(cashier.is_active) {
            console.log('closing cashier', cashier)
            closeCashier()
        }
    },[])

    return(
        <div
        className='flex flex-col justify-center items-center w-full py-8 grow gap-8 debug '
        >
            <span
            className='text-3xl text-teal-700'
            >  
             Il cassa é stato chiuso con successo...
            </span>
            <button
            className='btn-primary w-7/12 py-8 text-3xl'
            onClick={()=>{
                //remove user data
                localStorage.removeItem('user')
                navigate("/")
            }}
            >ESCI</button>
        </div>
    )
   

}



/* const Checkout = () => {

    const navigate = useNavigate()
    const {closeCart} = useCart()
    const [loading, setLoading] = React.useState(false)



    const handleConfirm = async () => {
        setLoading(true)
        console.log('close cart on checkout')
        closeCart()
        await new Promise(resolve => setTimeout(resolve, 700)); 
        setLoading(false)
        navigate(-1)
       
    }


    const handleBack = async () => {
        
        console.log('back')
        navigate(-1)
       
    }
    
    if( loading ) return <div className='flex items-center justify-center grow w-full'><BouncingDotsLoader/></div>

    return(
        <div  className='flex flex-col gap-3 items-center justify-center h-full w-full'>

            Checkout routine
            <button
            onClick={handleConfirm}
            >CONFIRM</button>
             <button
            onClick={handleBack}
            >BACK</button>
        </div>
    )
   

} */