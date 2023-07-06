import React from 'react'
import usePersistentContext from '../hooks/usePersistentContext'



const OnLineSignal = () => {
 
  const [isOnLine, setIsOnLine] = usePersistentContext('internet');
  
  
  React.useEffect(()=>{

    let status = !!navigator.onLine
    console.log('connected', isOnLine , status)
    if(isOnLine !== status) setIsOnLine(status)

  })

  return (
    <>
    {isOnLine
    ?<i className="fas fa-wifi"></i>
    :<i className="fas fa-wifi">/</i>
    }
    </>
    
  )
}

export default OnLineSignal