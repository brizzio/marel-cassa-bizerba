/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import usePersistentContext from './usePersistentContext'



export const useIp= () => {

  const key = 'ipData'

  const [ipData, setIpData] = usePersistentContext(key);

  React.useEffect(() => {
    let existing = localStorage.getItem(key)
    if(!existing) init()
    
  }, []);

  const init = async () => {
    const response = await fetch(
      "https://hutils.loxal.net/whois"
    ).then((response) => response.json());
    console.log('ip data initialized', response)
    // update the state
    setIpData(response);
  };

  


  return ipData
}