import React from 'react'
import axios from  'axios'
import useCart from '../../../hooks/useCart'


const useEpson = () => {

const url = 'http://192.168.1.181/cgi-bin/fpmate.cgi?devid=local_printer&timeout=12000'

const size=46 
const filler = " " 
const strBase = filler.repeat(size)

const {currentCart} = useCart()

function makeStr(len, char) {
    return Array.prototype.join.call({length: (len|| -1) + 1}, char || filler);
}

//default start
function lineWithContentAt (index, replacement){
    
    return strBase.substring(0, index) + replacement.toUpperCase() + strBase.substring(index + replacement.length);
}

function lineWithContentCentered (replacement){
    let index = Math.floor((size- replacement.length)/2)
    let str = strBase
    console.log('index', size, replacement.length, size - replacement.length, index)
    
    
    let res = str.substring(0, index) + replacement.toUpperCase() + str.substring(index + replacement.length );
    
    console.log('res', res)
    
    console.log('str', str.substring(0, index).length , replacement.toUpperCase().length , str.substring(index + replacement.length).length, res.length)
    
    return res
}

function lineWithContentAtEnd (replacement){
    let index = size - replacement.length
    let res =  strBase.substring(0, index) + replacement.toUpperCase() + strBase.substring(index + replacement.length);

    console.log('res', res)
    console.log('str', strBase.substring(0, index).length , replacement.toUpperCase().length , strBase.substring(index + replacement.length).length, res.length)

    return res
}



const ticketFacSimile = () =>{

    let header = [

        
       { text:lineWithContentCentered('MAREL SOLUTIONS')},
       { text:lineWithContentCentered('controllo conformita stampante')},
       { text:lineWithContentCentered('documento di prova')},
       { text:strBase},
       { text: lineWithContentCentered('non fiscale')},
       { text: strBase},
       { text: strBase},
       { text: lineWithContentAtEnd('euro')},
       { text: lineWithContentAt(0,'prodotto')},
    ]
    console.log('header', header)
    return [
        ...header
    ]

}


/* const status = async ()=>{

  let response = await axios.get(url, {
    params: { 
        format: "xml", 
        printerCommand: {
            queryPrinterStatus: {
            operator:"",
            statusType:""
            }
    
          } 
        },
    
    responseType: "document",
  })
  console.log('response', response)
    return response.data
  }
 */

  return { ticketFacSimile}
}

export default useEpson