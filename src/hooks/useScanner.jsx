/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */
import { useState, useRef, useEffect} from 'react'
import usePersistentContext from './usePersistentContext'



const useScanner = () => {

const [isScannerOn, setIsScannerOn] = usePersistentContext('isScannerOn')
const [readed, setReaded] = usePersistentContext('readed')
 
const hasSerial = useRef(!!('serial' in navigator))
let port = useRef(null)
const portInfo = useRef(null)



let initialize = async () => {
    
    if (!hasSerial.current) return; 

       

    // The Web Serial API is supported.
    console.log('Awesome, The serial port is supported.');
    console.log('Port is active?',port.current);

    // Get all serial ports the user has previously granted the website access to.
    const ports = await navigator.serial.getPorts();
    console.log(ports);

    const options = {
      baudRate: 9600,
      dataBits: 8,
      parity: "none",
      stopBits: 1,
    };
    
    try {

      if (ports && ports.length > 0) {

        console.log('we have an selected port, lets get it!!', ports[0]);
        
        port.current = ports[0];
        console.log('selected is open', port.current)
      } else{

        console.log('we dont have any port selected, lets get one!!');
        port.current = await navigator.serial.requestPort();
        
      }
      
      await port.current?.open(options);

    } catch (error) {
      console.log('error opening port!', error);
      
    }
    
    
    
    
    //port.current = ActivePort
    setIsScannerOn(true)
    
    console.log('Now we have an opened port ... ', port.current?.getInfo());

    try {
      await connect();
    } catch (error) {
      console.log('connection error ', error)
    }
    
    
  };

  

  const connect = async () => {

    // connect & listen to port messages
    //console.log(port.current.getInfo());
    portInfo.current = port.current?.getInfo()
    let scanned = '';
    let end = false
    const abort_controller = new AbortController();
    while (port.current?.readable) {
      // Listen to data coming from the serial device.
      //console.log('readable, isOpen', port.current.readable, port.current.IsOpen)
      const textDecoder = new TextDecoderStream();
      
        const readableStreamClosed = port.current.readable.pipeTo(textDecoder.writable, { signal: abort_controller.signal }).catch( (error) => {
          console.log(error) 
          abort_controller.abort();
          console.log('try to reconnect') 
          
        });
      
      
      const reader = textDecoder.readable.getReader();
      
      console.log('reader', reader)

      while (true) {
        const scan = await reader.read();
        
         end = (JSON.stringify(scan).indexOf('r')>-1)
         scanned = scanned + scan.value
         console.log('scan',scan)

         if(end){
           
            let code = scanned.replace(/\W/g, "")
            let  read = {
              id:crypto.randomUUID(),
              code
            }
            setReaded(read)
            scanned =''
            end=false
            //scan.done = true
         }
          
        if (scan.done) {
          // Allow the serial port.current to be closed later.
          //console.log('done', scan.done);
          reader.releaseLock();
          break;
        }
        // value is a string will be streaming here.
      }
    }
  };

  


  
  const clearReaded = ()=>{
    setReaded({})
  }
  

  return (
    {portInfo, port, initialize, isScannerOn, readed, clearReaded}
  )
}

export default useScanner


