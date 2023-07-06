

//import { PropTypes } from "prop-types";
import useCheckout from "./useCheckout";

const DueCashedPendingHeader = () =>{
    const {
        payment={}
    } = useCheckout()


    return(
        <div 
        className={`absolute top-0 flex items-center w-8/12 h-1/6  px-1 gap-4 `}
        >
            <div
            className={`flex items-center w-4/12  gap-2`}
            >

               
                <i 
                className={`fas fa-cart-shopping fa-3x text-zinc-400 pr-1 shadow-xl`}
                />
                
                <div 
                className="flex w-9/12 h-full border rounded-xl bg-white shadow-xl items-center justify-start py-4 px-1 text-stone-400 mt-1 gap-2"
                >
                    <span 
                    className="text-4xl font-semibold "
                    >
                        €
                    </span>
                    <span 
                    className="text-3xl font-semibold  text-end w-full"
                    >
                        {Number(payment.dueTotal).toFixed(2)}
                    </span>
                </div>


            </div>

            <div
            className={`flex items-center w-4/12 gap-2 pl-1`}
            >

                <i 
                className={`fas fa-sack-dollar fa-3x text-zinc-400 pr-1 shadow-xl`}
                />

                <div 
                className="flex w-9/12 h-full border rounded-xl bg-white shadow-xl items-center justify-start py-4 px-1 text-stone-400 mt-1 gap-2"
                >
                    <span 
                    className="text-4xl font-semibold "
                    >
                        €
                    </span>
                    <span 
                    className="text-3xl font-thin  text-end w-full"
                    >
                        {Number(payment.cashedInTotal).toFixed(2)}
                    </span>
                </div>


            </div>

            <div
            className={`flex items-center w-4/12 gap-2 pl-1`}
            >

                <i 
                className={`fas fa-hand-holding-medical fa-3x text-zinc-400 pr-1 shadow-xl`}
                />
                <div 
                className="flex w-9/12 h-full border rounded-xl bg-white shadow-xl items-center justify-start py-4 px-1 text-stone-400 mt-1 gap-2"
                >
                    <span 
                    className="text-4xl font-semibold "
                    >
                        €
                    </span>
                    <span 
                    className="text-3xl font-thin  text-end w-full"
                    >
                        {Number(payment.pending).toFixed(2)}
                    </span>
                </div>


            </div>
            
            
        </div>
    )
}

/* DueCashedPendingHeader.propTypes = {
    
    payment: PropTypes.shape({
        dueTotal:PropTypes.number,
        cashedInTotal:PropTypes.number,
        pending:PropTypes.number,
        list:PropTypes.array,
    }),
  };

  DueCashedPendingHeader.defaultProp = {
    payment:{
        dueTotal:0,
        cashedInTotal:0,
        pending:0,
        list:[],
    }
} */


export default DueCashedPendingHeader