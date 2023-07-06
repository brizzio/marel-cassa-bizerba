/* eslint-disable no-unused-vars */
import React from 'react'
import useCheckout from './useCheckout';
import DueCashedPendingHeader from './DueCashedPendingHeader'
import InputNumeric from '../../../components/InputNumeric'

import { useNavigate } from 'react-router-dom';

import { PropTypes } from "prop-types";

const Bancomat = ({
    back, 
}) => {

    
    const [value, setValue] = React.useState('')
    const [paymentValue, setPaymentValue] = React.useState('')
    const [pos, setPos] = React.useState(false)
    const [done, setDone] = React.useState(false)

   
    const {
        payment,
        addPaymentToList
    }=useCheckout()

    const navigate = useNavigate()
    
    const handleInputCurrencyChange = val => setValue(val)

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleConfirmValue = ()=>{
        let bancomatValue = value>0?value:payment.pending
        setPaymentValue(bancomatValue)
        setPos(true)
       
    }



    const handlePOSresult = async() => {
        
        console.log("waiting response from POS...");
        await delay(3000)
        //got POS response
        let posResponse = {
           
            success:true,
            raw:{
                id:crypto.randomUUID(),
                operator:'VISA',
                bank:'BANK',
                account:'151224445',
                amount:paymentValue,

            }
        }

        return posResponse
      };

     

      React.useEffect(()=>{
        if(pos){
            //we have a value... lets call the POS api and get some results
             //make request to POS sistem an wait for response
            handlePOSresult()
            .then((res)=>{
                //if response is successful then save payment info and navigate back to main page
                console.log("posResponse", res);
                if (res.success){
                    console.log("posResponseSuccess", res.success);
                    //save response to payment list and move back
                    addPaymentToList(res)
                    back()   
                }

            })
        
            
        
    
        }

      },[pos, done])

    
    if (pos && paymentValue) return (

        <Wrapper headerContent={payment}>

            <div
            className={`flex  items-center justify-center mt-6 mb-6`}
            >
                <div
                className={`flex flex-col items-center justify-center`}
                >
                    <span
                    className='font-thin text-3xl'
                    >Chiedi al cliente di seguire le istruzioni al pos</span>
                    <span
                        className='font-thin text-3xl'
                        >Importo in processamento: 
                        <span
                        className='font-thin text-3xl'
                        > {paymentValue}
                        </span>
                    </span>
                    
                   
                    <img 
                    className={`w-5/12 mt-8`}
                    src="/pos.gif" alt="" />

                </div>

            </div>
        
        
        </Wrapper>

    )

    if (!paymentValue) return(
        <Wrapper headerContent={payment}>
            <div 
            className='flex flex-col h-full w-full items-center justify-center'
            >
                <div
                  className='flex flex-col h-3/6 w-full items-center justify-between'
                >

                    <span
                    className='text-4xl font-thin'
                    >Inserire il valore a pagare</span>
                    <InputNumeric
                    placeholder={Number(payment.pending).toFixed(2)}
                    update={handleInputCurrencyChange}
                    />
                    <button
                    className='btn-confirm '
                    onClick={handleConfirmValue}
                    >CONFERMA IL VALORE</button>

                </div>
                

            </div>
                
                       
            <button className='absolute bottom-0 left-0 p-4 border rounded-md bg-white shadow-xl m-2' onClick={back}><i className="fas fa-chevron-left px-2"></i>ESCI</button>



        </Wrapper>
        
    )


   

}

const Wrapper =({children, headerContent})=>{

    return(
        <div className='relative flex flex-col gap-3 items-center justify-end h-full w-full border rounded-xl border-stone-400 '>
        <DueCashedPendingHeader  payment={headerContent}/>
        {children}
    </div>
    )

}

Wrapper.propTypes = {
    
    headerContent: PropTypes.shape({
        dueTotal:PropTypes.number,
        cashedInTotal:PropTypes.number,
        pending:PropTypes.number,
        list:PropTypes.array,
    }),
    children: PropTypes.node,
  };

Bancomat.propTypes = {
    
    payment: PropTypes.shape({
        dueTotal:PropTypes.number,
        cashedInTotal:PropTypes.number,
        pending:PropTypes.number,
        list:PropTypes.array,
    }),
    action: PropTypes.func,
    back:PropTypes.func
  };

Bancomat.defaultProp = {
    payment:{
        dueTotal:0,
        cashedInTotal:0,
        pending:0,
        list:[],
    }
}


export default Bancomat