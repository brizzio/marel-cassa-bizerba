/* eslint-disable no-unused-vars */
import React from 'react'
import useSchedule from '../hooks/useSchedule'
import useTimeZoneDate from './useTimeZone'
import useSwap from './useSwap'
import usePersistentContext from './usePersistentContext'

const useAuth = () => {

    const [user, setUser] = usePersistentContext('user')
    const [auth, setAuth] =usePersistentContext('auth')

    const {setUserSwap} = useSwap()

    const {
        millis,
        formattedDate,
        formattedTime
      } = useTimeZoneDate()
    
  const {getUserSchedule} = useSchedule()

  
  const getLoggedUserInfo = async (id) =>{

    let loginResponse = async()=>users.filter(e=>e.uuid==id)[0]
    let usr = await loginResponse()
    console.log('login response usr ', usr)
    let tenantInfo = tenants.filter(e=>e.id==usr.tenant_id)[0]

    console.log('tenant info ', tenantInfo)
    let str = stores.filter(e=>e.tenant_id==usr.tenant_id)
    console.log('str ', str)
    
    
    let detailedStores = str.reduce((acc, cv)=>{
         let obj = retail_banners.filter(e => e.id == cv.retail_banner_id)[0]
        return[...acc, {...cv, banner_detail:obj}]
    },[])
    

    detailedStores = usr.isCashier
    ?  detailedStores.filter(e => e.store_id == usr.work_at_store_id)
    :detailedStores
    
    //format usr object
        usr = {...usr,
        login_id:millis, 
        login_date:formattedDate,
        login_time:formattedTime,
        logout_date:'',
        logout_time:'',
        tenant:tenantInfo,
        stores:detailedStores,
        schedule: getUserSchedule(), //this will came from database. !!!!

        
    }
    
    console.log('usr', usr)
    //localStorage.setItem('user',JSON.stringify(usr))
    setUser(usr)
    setUserSwap(usr.isLeftHanded)
    setAuth(true)
    return true;
}


//const getLoggedUserInfo = (usr) => console.log('log info', usr)
   
const authenticate = () => setAuth(true)

const logout = () => {
  setAuth(false)
  localStorage.removeItem('user')
}



 let message = 
 auth
 ?'user logged in'
 :'user logged out'

 //console.log('useAuth says: ', message)

    

  return {
    getLoggedUserInfo,
    authenticate,
    user,
    auth,
    logout
  }
}

export default useAuth



const tenants =[
    {
    id:1,
    company_name:'MAREL',
    corporate_name:'MAREL SOLUTIONS',
    logo_url:'/marel-logo.png',
    addresses:[
      {
        name:'SEDE LEGALE',
        street:'Via Saverio Merola, 45',
        number:'38',
        postal_code:'81025',
        city:'Marcianise',
        county:'CE',
        country:'Italia',
        country_iso:'it-IT',
        lat:41.03721613797493, 
        lng:14.289456125138692
      },
      {
        name:'Sede Secondaria',
        street:'Via Aldo Moro',
        number:'38',
        postal_code:'82030',
        city:'Frasso Telesino',
        county:'BN',
        country:'Italia',
        country_iso:'it-IT',
        lat:41.155233199154615, 
        lng:14.530470259583824
      },
    ],
    phones:[
      {
        name: 'Amministrazione',
        isMain: true,
        country_code:'+39',
        number: '0823580034'
      },
      {
        name: 'Service',
        isMain: true,
        country_code:'+39',
        number: '3486126722'
      },
    ],
    
    stores:[],
    lat:41.15519195581009, 
    lng:14.530715564479948
    
  }
]

  const retail_banners = [
    {
      id:1 ,
      name:'GOOD BUY',
      logo_url:'/goodBuy.png'

    },
    {
      id:2 ,
      name:'WHOLE BUY',
      logo_url:'/whole.png'

    },
  ]

  const stores = [
    {
    store_id:1,
    tenant_id:1,
    retail_banner_id:1,
    store_name:'GOOD BUY Marcianise',
    corporate_name:'GOOD BUY Marcianise SRL',
    fiscal_code:'75979830322',
    address:'Viale Gandhi, 29, 81025 Marcianise CE',
    city:'Frasso Telesino',
    phone:'3349344664',
    country:'Italia',
    country_iso:'it-IT',
    lat:41.02634479153504, 
    lng:14.302735769952927
    },
    {
      store_id:2,
      tenant_id:1,
      retail_banner_id:2,
      store_name:'WHOLE BUY CASERTA',
      corporate_name:'WHOLE BUY INGROSSO SRL',
      fiscal_code:'45669822322',
      address:'Viale Gandhi, 29, 81025 Marcianise CE',
      city:'Frasso Telesino',
      phone:'3349344664',
      country:'Italia',
      country_iso:'it-IT',
      lat:41.02634479153504, 
      lng:14.255533725141044
      },
  ]

  const users = [
    {
      uuid:1,
      tenant_id:1,
      name:'Antimo Gionti',
      alias:'Antimo',
      email:'antimo@gmail.com',
      isAdmin:false,
      isSuper:true,
      isCashier:false,
      tenant_role:'Amministratore Delegato',
      schedule:{},
      isLeftHanded:false

    },
    {
      uuid:2,
      tenant_id:1,
      name:'Mary Jane',
      alias:'Mary',
      email:'mary@gmail.com',
      isAdmin:false,
      isSuper:false,
      isCashier:true,
      tenant_role:'Operatore Cassa',
      work_at_store_id:'1',
      schedule:{},
      isLeftHanded:true,
    },
]

