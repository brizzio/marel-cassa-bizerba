/* eslint-disable no-unused-vars */
import React from 'react'
import DueCashedPendingHeader from './DueCashedPendingHeader'
import { PropTypes } from "prop-types";
import useCheckout from './useCheckout';

const ContentLayout = ({children, headerContent})=>{

    const {payment} = useCheckout()

    return(
        <div className='relative flex flex-col gap-3 items-center justify-end h-full w-full border rounded-xl border-stone-400 '>
        <DueCashedPendingHeader  payment={payment}/>
        {children}
    </div>
    )

}



export default ContentLayout


ContentLayout.propTypes = {
    
    headerContent: PropTypes.shape({
        dueTotal:PropTypes.number,
        cashedInTotal:PropTypes.number,
        pending:PropTypes.number,
        list:PropTypes.array,
    }),
    children: PropTypes.node,
  };
