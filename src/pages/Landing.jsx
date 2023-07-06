import React from 'react';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';
import { useIp } from '../hooks/useIp';
import useFlag from '../hooks/useFlag'

import Timer from '../components/Timer';
import OnLineSignal from '../components/OnLineSignal';



//https://www.kindacode.com/snippet/tailwind-css-make-a-child-element-fill-the-remaining-space/


export const LandingPage = () => {

    const navigate = useNavigate();
    const {getFlagFace} = useFlag()

    const navigateTo = (url) => {
    navigate(url)
    }

    //const { initialize } = useScanner()

    const startCashier = ()=>{
       // initialize()
        navigateTo("/app")
    }

    const flag = (cIso)=>getFlagFace(cIso)

    const {isMobile, isBizerba} = useIsMobile()
    const ipInfo = useIp()

    React.useEffect(()=>{
        console.log('landing ueff []', isMobile, isBizerba, ipInfo)
    },[])

    

    

     


    const tabBtnClass = `w-full py-[4rem]  text-stone-800 font-semibold rounded-lg shadow-xl text-4xl bg-white bg-opacity-20 border-white/30 border-t-2 border-l-2 border-b-2 border-r-2 `

    const info = `text-stone-800 font-thin rounded-lg shadow-xl text-3xl bg-white border-white/30 border-t-2 border-l-2 border-b-4 border-r-4 `



    return(

    <div  className="flex w-screen h-screen bg-stone-100 items-start justify-center">
       <div className="relative flex flex-col w-10/12 h-full p-3 bg-gray-100 "
       style={{backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/006/469/228/small/abstract-white-background-with-halftone-texture-free-vector.jpg)',
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat', 
       backgroundSize: 'cover' 
       
       }}>
       

       <div className="flex items-center justify-center w-full h-full">
                <div className={`flex absolute top-8 w-7/12 h-[4rem] ${info} items-center justify-between px-4 gap-[3rem]`}>
                    {//isLoading?<h1>loading...</h1>:
                    <div className="flex flex-row items-center justify-between gap-2 w-1/2">
                    <img 
                    className="p-2 h-[3rem]"
                    src={ipInfo?flag(ipInfo.countryIso):''} />
                    
                    <span className="p-2 text-3xl font-semibold h-full">{ipInfo?.ip}</span>
                    </div>
                    }
                
                
                <div className="flex flex-row items-center justify-end gap-[1rem] w-1/2">
                    {isMobile && <i className="fas fa-mobile-screen"></i>}
                    {isBizerba && <span><i className="fas fa-weight-scale mr-3"/>KH</span>}
                    <OnLineSignal/>
                </div>
                  
                                
                 </div>


            <div className="flex flex-col items-center justify-center w-4/12 gap-6">
               
                
                <button 
                    className={`${tabBtnClass}`}
                    onClick={startCashier}
                >REGISTRATORE CASSA</button>
                {/* <button 
                    className={`${tabBtnClass}`}
                    onClick={startCashier}
                >Entra come Amministratore</button> */}
            </div>

            
            <img 
                className="absolute left-2 top-2  h-[15px]"
                src='/bizerba-logo.png' />


        </div>

        <div className={`w-full  h-[2rem]  py-[1rem] mt-2 bg-white bg-opacity-50 border border-purple-800 border-opacity-30 rounded-xl flex flex-row items-center justify-end px-3`}>
            <Timer/>
        </div>

    </div>
    </div>
       
            
         
      
    )
    
    };

