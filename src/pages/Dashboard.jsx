/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDevice } from '../hooks/useDevice';
import useCashInventory from '../hooks/useCashInventory';
import DisplayBalance from '../components/DisplayBalance';
import MapBox from '../components/MapBox';
import useIntl from '../hooks/useIntl';





//https://www.kindacode.com/snippet/tailwind-css-make-a-child-element-fill-the-remaining-space/


export const DashboardPage = () => {

    const navigate = useNavigate();
    const navigateTo = (url) => {
    navigate(url)
    }

    const {did} = useDevice()
    const {balance, total} = useCashInventory()

    //const { initialize } = useScanner()

    const startCashier = ()=>{
       // initialize()
        navigateTo("cashier")
    }

    const formatter = useIntl()

    const tabBtnClass = `w-full py-4 px-4 bg-white text-stone-800 font-semibold rounded-lg shadow-md`

    const btnInventory = {
        title:'fondo cassa',
        classes:tabBtnClass,
        action:(state)=>{
            state
            ?console.log('btnInventory clicked')
            :console.log('unclicked')
        },
        
    }

    const btnContinue = {
        title:'segui',
        classes:tabBtnClass,
        action:(state)=>{
            state
            ?console.log('btnContinue clicked')
            :console.log('btnContinue unclicked')
        },
        
    }


    
    return(
        <div className="flex items-center justify-between w-full h-full">
            
            <div  className="flex flex-col grow h-full items-center justify-center gap-3">
                    
                    <DisplayInfo info={did}/>
                <div>
                    <p>NEGOZIO</p>
                    <p>{did?.store_id}</p>
                </div>
                <div>
                    <p>SALDO CASSA</p>
                    <p>{formatter.currency(total)}</p>
                </div>
                   
                    






                </div>
                
                <div className="flex flex-col items-center justify-center grow gap-3">

                   <ActionButton config={btnInventory}/>
                   <ActionButton config={btnContinue}/>

                           
                </div>
            
        </div>
            
         
      
    )
    
    };


    const ActionButton = ({config})=>{

        const {
            title,
            classes,
            action
        } = config

        const [clicked, setClicked] = React.useState(false)

        const click = () =>{
            setClicked(!clicked)
            action(!clicked)
        }

        const styles = clicked
        ?`${classes} border border-2 border-teal-800`
        :classes

        return (
          <button
            className={styles}
            onClick={click}
          >{title.toUpperCase()}</button>

        )
    }

    const DisplayInfo = ({info}) =>{

        let data = JSON.stringify(info)=='{}'
        ?{
            id:'',
            company:''
        }
        :info

        return(
            <div  className="flex flex-col items-center justify-center font-thin text-lg">
                    <span>{data?.company}</span>
                    <span>CASSA</span>
                    <span>{data?.id}</span>

            </div>
        )




    }

