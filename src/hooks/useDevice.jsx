/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect} from 'react'
import usePersistentContext from './usePersistentContext'

export const useDevice= () => {

  const key = 'device'
  const [did, setDid] = usePersistentContext('device')

  useEffect(() => {
    let existing = localStorage.getItem(key)
    if(!existing) {
      console.log('registering new device')
      init()
    }
  }, []);


  const init = () => {
    setDid({

      id: crypto.randomUUID(),
      company: "MAREL SUPERMERCATI SRL",
      city: "Battipaglia",
      country: "Italy",
      countryIso: "IT",
      store_id: 3182272,
      latitude: 41.09196,
      longitude: 14.31505,
      postalCode: "84091"
    })
  };

  
    
  return {did}
}



