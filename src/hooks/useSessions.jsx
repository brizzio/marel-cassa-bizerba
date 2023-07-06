/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import usePersistentContext from './usePersistentContext'

const useSessions = () => {

  const key = 'sessions'
  const [sessions, setSessions] = usePersistentContext(key)

  useEffect(() => {
    let existing = localStorage.getItem(key)
    if(!existing) {
      console.log('starting database sessions')
      init()
    }
  }, []);


  const init = () => {
    setSessions([])
  };

  const save = (session) => {
    let update = !!sessions?[...sessions, session]:[session]
    setSessions(update)
  }

  
    
  return {
    save
  }
}

export default useSessions



