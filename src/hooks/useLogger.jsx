/* eslint-disable react-hooks/exhaustive-deps */

export default function useLogger() {



  const log = (key, item)=>{
        
    let existing = localStorage.getItem(key)
    existing = existing ? JSON.parse(existing) : []
    localStorage.setItem(key,JSON.stringify([...existing, item])); 

}

  return {
    log
  };
}