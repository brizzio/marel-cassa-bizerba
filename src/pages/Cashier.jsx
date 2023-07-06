import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Keyboard from '../components/Keyboard';
import useCart from '../hooks/useCart';
import useCashier from '../hooks/useCashier';
import useScannerData from '../hooks/useScannerData';
import DisplayList from '../components/DisplayList';
import useSwap from '../hooks/useSwap';


//https://www.kindacode.com/snippet/tailwind-css-make-a-child-element-fill-the-remaining-space/

//Managing state with React Query.
//https://dev.to/franklin030601/managing-state-with-react-query-1842


export const CashierPage = () => {

    
    
    const [idle, setIdle] = React.useState(true)

    const navigate = useNavigate()

    

    const navigateToLogoutPage = ()=> navigate('/logout', { replace: true })

    const {
        newCart,
        deleteCart,
        currentCart,
        closeCart
    } = useCart()

    const {
        swap, 
        toggleSwap, 
    } = useSwap()

    const {closeCashier} = useCashier()


    
    

    const {clearCurrentRead} = useScannerData()

    const newCartClicked = React.useRef(false)

    const handleCloseCart = () => {
        console.log('close cart')
        closeCart()
        setIdle(true)
       
    }
    

    const tabBtnClass = `h-full w-full px-4 bg-white text-stone-800 font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75`

    const tabBtn = `flex items-center h-full w-full p-3 bg-white text-teal-800 font-thin rounded-lg shadow-md `

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

        console.log('close cash')
        closeCashier()
        navigateToLogoutPage()
    }


    return(
        
        <> 
             <div className="flex items-center justify-between w-full h-[50px] flex-row-reverse">
                <div className="flex h-full items-end justify-start gap-2 w-5/12 p-1">
                    <button className={`${tabBtn}`}>01</button>
                    <button className={`${tabBtn}`}>02</button>
                    <button className={`${tabBtn}`}>03</button>
                    <button className={`${tabBtn}`}>04</button>
                    <button className={`${tabBtn}`}
                    onClick={handleCloseCashier}>CHIUDERE CASSA</button>

                </div>
                
                <button className={`${swapBtnClass}`}
                    onClick={toggleSwap}>{swap?'Mancino':'Destro'}</button>
                

            </div>
            
            <div className={`flex h-full w-full mt-1 ${swap?'':'flex-row-reverse'}`}>
               
                <div className="flex flex-col h-full w-5/12 gap-2 pr-2">
                    <div className="grid grid-flow-row grid-cols-3 grid-rows-2 gap-2 h-2/6">
                    <button className={`bg-white/90 text-stone-800 font-thin rounded-lg shadow-md py-2`}><i className="fas fa-2x fa-gears text-stone-400"/></button>
                    <button className={`bg-white/90 text-stone-800 font-thin rounded-lg shadow-md`}>SCONTO VALORE</button>
                    <button className={`bg-white/90 text-stone-800 font-thin rounded-lg shadow-md`}>SCONTO %</button>
                    <button className={`${currentCart && currentCart.active
                    ?'bg-green-200 text-teal-600 font-thin rounded-lg border-2 border-teal-600 border-opacity-10 px-2'
                    :'bg-white/70 text-teal-600 font-thin rounded-lg border-2 border-teal-600 border-opacity-10'}`}
                    disabled = {currentCart && currentCart.active}
                    onClick={startNewCart}>{currentCart && currentCart.active?'CARRELLO ATTIVO':'NUOVO CLIENTE'}</button>
                    <button className={`bg-white/90 text-stone-800 font-thin rounded-lg shadow-md`}>RIST. SCONTRINI</button>
                    <button className={`${currentCart && currentCart.active
                    ?'bg-red-400 opacity-80 text-white font-thin rounded-lg border-2 border-red-600 border-opacity-10'
                    :'bg-white/70 text-teal-600 font-thin rounded-lg border-2 border-teal-600 border-opacity-10'}`}
                    onClick={cancelCurrentCart}>CANCELLA CARRELLO</button>
                    </div>
                    <Keyboard idle={idle}/>
                </div>
                <div className="h-full grid grid-flow-row grid-cols-4 grid-rows-7 gap-1 px-3 w-3/12">
                    <button className={`${regularBtnClass}`} onClick={navigateToLogoutPage}><i className="fas fa-arrow-right-from-bracket fa-2x text-stone-500 fa-flip-horizontal"/></button>
                    <button className={`${regularBtnClass}`}><i className="fas fa-2x fa-magnifying-glass text-stone-400"></i></button>
                   
                    <button className={`${regularBtnClass}`}><i className="fas fa-2x fa-chevron-left text-stone-400"></i></button>
                    <button className={`${regularBtnClass}`}><i className="fas fa-2x fa-chevron-right text-stone-400"/></button>

                    <button className={`${largeBtnClass}`}>SHOP BIO PICCOLA</button>
                    <button className={`${largeBtnClass}`}>SHOP BIO GRANDE</button>

                    <button className={`${largeBtnClass}`}>G. VARI</button>
                    <button className={`${largeBtnClass}`}>MUI. SA. FO.</button>

                    <button className={`${largeBtnClass}`}>BANC. SA. FO.</button>
                    <button className={`${largeBtnClass}`}>PANET</button>

                    <button className={`${largeBtnClass}`}>SURGEL</button>
                    <button className={`${largeBtnClass}`}>NO FOOD</button>

                    <button className={`${largeBtnClass}`}>PESCE</button>
                    <button className={`${largeBtnClass}`}>CARNE</button>

                    <button className={`${largeBtnClass}`}>FRUTTA</button>
                    <button className={`${regularBtnClass}`}><i className="fas fa-2x fa-magnifying-glass text-stone-400"></i></button>
                    <button className={`${regularBtnClass}`}><i className="fas fa-2x fa-person-arrow-down-to-line text-stone-400"></i></button>   
                </div>

                <div className="flex flex-col h-full w-4/12  gap-1">
                    
                    {!idle || currentCart?.active
                    ?<>
                    <div className={`w-full h-1/6 row-span-2 col-span-3 flex items-start text-zync-800 gap-3`}>
                        <DisplayTotals cart={currentCart}/>
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

        
        const itemsCount = cart.count
        const cartWeight = cart.weight
        const cartTotal = cart.total


        return(

            <div className="flex h-[4.5rem] w-full items-center justify-between gap-2 ">

                <div className="flex h-full w-fit  items-center justify-center rounded-xl bg-white shadow-xl">
                    <i className="fas fa-lg fa-cart-arrow-down pl-1 "></i>
                    <span className="text-3xl font-thin px-2 mb-2">{itemsCount}</span>
                </div>

                <div className="flex h-full px-2  rounded-xl bg-white shadow-xl w-fit  items-center justify-center">
                    <i className="fas fa-weight-scale fa-lg pl-1"></i>
                    <span className="text-2xl font-thin px-1 mb-1">{cartWeight.toFixed(2)}</span>
                    <span className='text-sm'>Kg</span>
                </div>

                <div className="flex h-full border rounded-xl bg-teal-700 shadow-xl w-[9rem] items-center justify-start px-3 text-white mt-1 gap-2">
                <span className="text-2xl font-bold pl-1 mb-2">€</span>
                <span className="text-2xl font-thin mb-2 text-end  w-full">{cartTotal.toFixed(2)}</span>
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

   /*  const ScannerPrompt = ()=>{

        const textPromptClass = `w-1/2 h-3/6 text-3xl font-thin text-teal-800`

        const buttonClass = `w-1/2 h-2/6 text-lg font-bold text-teal-800 border rounded-xl shadow-xl bg-white`

        const { initialize } = useScanner()

        return(
            
            <div className="flex flex-col items-center justify-center w-full h-full">
                
                    <span className={`${textPromptClass}`}> Clicca per attivare il scanner di prodotti</span>
                
                
                <button className={`${buttonClass}`}
                    onClick={initialize}>SCANNER</button>
                

            </div>

        )

   } */
     /* <>
      
        */