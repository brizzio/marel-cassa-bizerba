/* eslint-disable no-unused-vars */
import DueCashedPendingHeader from "./DueCashedPendingHeader";
import { PropTypes } from "prop-types";
import useCheckout from "./useCheckout";
import { useNavigate } from "react-router-dom";

const Main = () => {

 
  const {
    payment,
    updateCurrentCartWithPaymentData
  } = useCheckout()

  const navigate = useNavigate()

  const saveAndPrint =()=>{
    updateCurrentCartWithPaymentData()
    navigate('printer')

  }

  

    return(
        <div className='flex flex-col gap-3 items-center justify-end h-full w-full p-6 bg-white'>

            <DueCashedPendingHeader />

            <div
            className='flex flex-col gap-3 items-start justify-start h-5/6 w-full border rounded-xl bg-white shadow-xl p-4 text-stone-400 '
            >
            {
                payment?.list.length
                ?[...payment.list].map((el,i)=>{
                    
                    let detail = el.type == 'bancomat'
                    ?el.raw.operator
                    :'pagamento'
                    
                    
                    return(
                        <div key={i}
                        className='flex w-full gap-4 text-2xl items-center bg-stone-200 rounded-xl shadow-xl py-4 px-2 text-teal-700'
                        >
                            <span>{i+1}</span>
                            <span>{el.id}</span>
                            <span>{el.type_name}</span>
                            <span>{detail}</span>
                            <span>{Number(el.value).toFixed(2)}</span>
                        </div>
                    )
                })
                :<div
                className='flex  flex-col w-5/6 h-5/6 mx-auto items-center justify-center text-stone-400 text-4xl font-thin'
                >
                    
                    Scegli una forma di pagamento
                </div>

            }

            {Math.abs(payment?.pending) == 0
                                ?<button
                                className={`absolute bottom-8 right-8 w-1/3 btn-primary`}
                                onClick={saveAndPrint}
                                >
                                    CONFERMA
                                </button>
                                :''}
                
            </div>
            
           
        </div>
    )
   

}

/* Main.propTypes = {
    
    payment: PropTypes.shape({
        dueTotal:PropTypes.number,
        cashedInTotal:PropTypes.number,
        pending:PropTypes.number,
        list:PropTypes.array,
    }),
    action: PropTypes.func,
  };

Main.defaultProp = {
    payment:{
        dueTotal:0,
        cashedInTotal:0,
        pending:0,
        list:[],
    }
} */


export default Main


/* const paymentModel = {
    isEditing:false,
    dueTotal:0,
    cashedInTotal:0,
    pending:0,
    list:[],
    isFulfilled:false
}

  const paymentItemModel = {
    isEditing:false,
    dueTotal:0,
    cashedInTotal:0,
    pending:0,
    list:[],
    isFulfilled:false

  }


  const optionsModel= [
    {
        id:1,
        type:'bancomat',
        url:'bancomat',
        title:'carte',
        icon:'fas fa-credit-card',
        selected:false,
        total:0
    },
    {
        id:2,  
        type:'cash',
        url:'cash',
        title:'contanti',
        icon:'fas fa-hand-holding-dollar',
        selected:false,
        total:0
    },
    {
      id:3,  
        type:'bonus',
        url:'bonus',
        title:'bonus',
        icon:'fas fa-gifts',
        selected:false,
        total:0
    },
    {
      id:4,
        type:'difer',
        url:'difer',
        title:'altri',
        icon:'fas fa-money-check-dollar',
        selected:false,
        total:0
    },

   
]
        */