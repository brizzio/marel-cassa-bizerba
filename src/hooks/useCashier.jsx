/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import useScanner from './useScanner'
import { useNavigate } from 'react-router-dom'
import usePersistentContext from './usePersistentContext'

import useTimeZoneDate from './useTimeZone'
import useSessions from './useSessions'
import useAuth from './useAuth'
import { useDevice } from './useDevice'


let cashierModel = {
    
    is_active:false,
    carts:[],
    sales_amount:0,
    taxes_amount:0,
    is_closed:false,
    is_errored_on_close:false,
    error_message:''

}



const useCashier = () => {

    const key = 'cashier'
    const [cashier={}, setCashier] = usePersistentContext(key)
    const workingStore = React.useRef()
    
    const emptyCashierDeleteMessage = "Vuoi chiudere il cassa non iniziato?"

    const cashierCloseMessage = "Inizio della chiusura del cassa... Vuoi continuare?"

    const {initialize} = useScanner()
    //const {inventory } = useCashInventory()

    const {save} = useSessions()

    const {
        
        formattedDate,
        formattedTime,
         
      } = useTimeZoneDate()

    const navigate = useNavigate()

    const { user } = useAuth()
    const { did } = useDevice()

    const getInventory =()=>JSON.parse(localStorage.getItem('inventory'))

    const openCashier = React.useCallback(() => {

        let ws = workingStore.current?workingStore.current:{}
        let usr = user?user:{}
        let userData = {...user}

        delete userData.schedule
        delete userData.stores
        delete userData.tenant

        setCashier({
            ...cashierModel, 
            ...cashier,
            session_id:crypto.randomUUID(),
            is_active:true,
            open_date:formattedDate,
            open_time:formattedTime,
            inventory_on_start:getInventory(),

            did:did.id,
            currency:'€',
            company:usr.tenant?.company_name,
            company_corporate_name:usr.tenant?.corporate_name,
            company_id:usr.tenant?.id,
            company_address:usr.tenant?.addresses[0],
            company_retail_banner: ws.banner_detail?.name,
            company_retail_banner_logo_url: ws.banner_detail?.logo_url,
            company_store_name: ws.store_name,
            company_store_id: ws.store_id,
            company_store_fiscal_code:ws.fiscal_code,
            company_store_lat: ws.lat,
            company_store_lng: ws.lng,
            company_country_iso: ws.country_iso,
            company_country_name: ws.country,
            
            operator_id:usr.uuid,
            operator_name:usr.name,
            operator_alias:usr.alias,
            operator_role:'CASSIERE',
            operator_is_admin:usr.isAdmin,
            operator_is_super:usr.isSuper,
            logged_user:userData
            
        })
        initialize()
        navigate('cashier')
    })

    const closeCashier = React.useCallback(async () => { 

        console.log('closeCashier',cashier 
        && cashier.is_active 
        && !cashier.carts.length,
         
        cashier.is_active ,
        cashier.carts.length
        
        )

        let response = false

        if(cashier 
            && cashier.is_active 
            && !cashier.carts.length)
            if (window.confirm(emptyCashierDeleteMessage)) {
                setCashier(null) 
                response = true
            }

        if(cashier 
            && cashier.is_active 
            && cashier.carts.length)
            if (window.confirm(cashierCloseMessage)) {
                let session = {
                    ...cashier, 
                    is_active:false,
                    is_closed:true,
                    close_date:formattedDate,
                    close_time:formattedTime,
                    inventory_on_end:getInventory()
                    
                }
                console.log('session', session)
                save(session)
                setCashier(cashierModel)
                response = true


            }//close if window confirm

            return response

    },[cashier])

    const updateCashier = (obj) => setCashier({...cashier, ...obj})

    const updateStoreSelection = (st) =>{
        //add a working store to cashier references
       workingStore.current=st

    }

    const insertCart = React.useCallback((cart) => {
        let updatedCarts = [...cashier.carts, cart]
        setCashier({...cashier, carts:updatedCarts})
    })

  return {
    openCashier,
    closeCashier,
    updateCashier,
    updateStoreSelection,
    insertCart,
    cashier
    
    }
}

export default useCashier