/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react"
import axios from "axios"
import useTicket from "../hooks/models/useTicket"

/* import {
    useInsert,
    useAllDocs,
    useFind
} from "./PouchHooks"
 */


const useMicrelec = () => {

    const ip = `192.168.1.180`
    const url = `http://${ip}`

    
    const[device, setDevice] = React.useState('')

    const {
        
        tickets,
        update,
        onPrintTicketEventEnd
      } = useTicket()

    //const insert = useInsert(device)
    //const list = useAllDocs(device)
    //const find = useFind(device)

    const product_sale_types = {
        0:"good", //default
        1:"service"
    }
    
    const fiscal_codes = [
        {
            department:0,
            value:0,
            hasNature:true,
            options:['N1', 'N2', 'N3', 'N4', 'N5', 'N6']  //Nature Code, applicable only if the VAT declared or programmed in the department is 0.
    
        },
        {
            department:1,
            value:4,
            hasNature:false,
            options:[]
        },
        {
            department:2,
            value:5,
            hasNature:false,
            options:[]
        },
        {
            department:3,
            value:10,
            hasNature:false,
            options:[]
        },
        {
            department:4,
            value:22,
            hasNature:false,
            options:[]
        },
    ]


    React.useEffect(()=>{
        if(!device){
            STATUS()
            .then((res)=>setDevice(res.device.serial))
        }
        
    },[])

    

    /* #1 CONTANTI
    #2 CREDITI
    #3 TICKET
    #4 BANCOMAT
    #5 CARTA DI CREDITO
    #6 ASSEGNO
    #7 CORRISP.PAGATO
    #8 CORRISP.PAGATO
    #9 CORRISP.PAGATO
    #10 CORRISP.PAGATO
    #11 SCONTO A PAGARE
    #12 BUONO MULTIUSO
    #13 BUONO CELIACHIA
    #14 NR SERVIZI
    #15 NR SERVIZI-AC
    #16 SEGUIRA FATTURA
    #17 NR DCR A SSN
    #18 CORRISP.PAGATO
    #19 CORRISP.PAGATO
    #20 CORRISP.PAGATO */
        
   
   

     /*  const FIND_BY_DOCNO = ()=>{
        let index = {fields: ['docno']}
        let options = {
            selector: {docno: {$eq: 104}}
          }
       const search = async () => await find(index, options)
        search().then(res=>console.log('found', res))

        
        
    }  */

    //console.log('FIND_BY_DOCNO', FIND_BY_DOCNO())
    
    const productModel={
        
        product_description:'prodotto',
        product_extended_description:'dettaglio',
        calculated_price:'prezzo',
        tax_rate:'iva',
        product_sale_type:'tipo',
        purchase_quantity:'Q'
    
    }

    async function GET_REPARTO(tax){
        try {

            const rep = fiscal_codes.filter(el=> el.value == tax)[0]
            if(!rep) throw new Error(`Unexpected tax value => ${tax}`)
            return rep.department
            
        } catch (error) {
            console.log('GET_REPARTO errored', error)
        }
    }

    async function sumByPropertie (array, prop){
        return array.reduce( function(a, b){
            let v = !b['deleted'] && b[prop]? Number(b[prop]) : 0
            return a + v;
        }, 0);
    }

    async function PAGAMENTO_E_CHIUSURA_DOCUMENTO_CONTANTI(items){

        const field_1_request_code = '5'
        const field_2_payment_code = 1
        const field_3_payment_amount = await sumByPropertie(items,'calculated_price')
        const field_4_payment_description ='' //?
        const field_5_offline_pos_data = 0 //?
        const field_6_extended_payment_description = "" //?(field facoltativo) 
        const field_7_payment_typology = 'PC' //?
        const field_8_typology_detail = "" 
        const field_9_ticket_quantity= ''// ? 

        let commandString = `5/1/${field_3_payment_amount.toFixed(2)}////${field_7_payment_typology}///`
        console.log('cash payment command', commandString)
        var encodedValue = encodeURIComponent(commandString)
        console.log('cash payment encodedValue', encodedValue)
        return new Promise((resolve, reject)=>{

            axios.get(`${url}/_io?cmd=4&js=1&pkt=${encodedValue}`)
            .then(res => {
                console.log('print result', res.data.response)
                const verified = verifyStringResponse(res.data.response)
                if(!res) throw new Error('the printer answered with an error')
                return res
            })
            .then(async (res)=>{
                let status = await STATUS()
                let arrayOfLines = await GET_LAST_TICKET_TXT(status.ej.lastdoc.docbase)
                console.log('ticket metadata', status)
                //READ_DISPLAY_FROM_API_RESPONSES(status.display.lines)
                let objResponse = {
                    ...arrayOfLines,
                    raw:status,
                    docno:status.ej.lastdoc.docno,
                    zno:status.ej.lastdoc.zno,
                    docbase:status.ej.lastdoc.docbase,
                    rtc:status.rtc,
                    display:status.display,
                    items:items,
                    cart_total: field_3_payment_amount.toFixed(2),
                    command:commandString
                    

                }
                console.log('result', objResponse)
                resolve(objResponse)
            
            })
            .catch(error => {
                //when throw "Error" is executed it runs the catch block code
                console.log(error)
            });





        })
        
    
    }

    function CLOSE_CART(items){

        try {
          
            if (!items) throw new Error('the cart is empty')
            console.log("CLOSE CART", items);
            let sendItemsToPrinter = async(arr)=>{
                for (let i = 0; i < arr.length; i++) {
                    console.log(arr[i])
                    let result = await VENDITA_ARTICOLO(arr[i])
                    console.log('api response', result)
                    arr[i]=result
                    }
                    return arr
                }
             
            sendItemsToPrinter(items).then(async(res)=>{
               let resolved = await PAGAMENTO_E_CHIUSURA_DOCUMENTO_CONTANTI(res)
               console.log('resolved', resolved)
               onPrintTicketEventEnd(resolved)
               
            })
           

            
        } catch (error) {
            console.log('CLOSE CART error' , error);
          
        }
        
    }


     function deleteTicket(ticket){

        try {

         DELETE_TICKET(ticket)
         .then((res)=>{
            console.log('resolved', res)
            onPrintTicketEventEnd(res)
         })
           
            
        } catch (error) {
            console.log('deleteTicket error' , error);
        }


    }


    function CHECKOUT(items, payType){

        try {
          
            if (!items) throw new Error('the cart is empty')
            console.log("CLOSE CART", items);
            let sendItemsToPrinter = async(arr)=>{
                for (let i = 0; i < arr.length; i++) {
                    console.log(arr[i])
                    let result = await VENDITA_ARTICOLO(arr[i])
                    console.log('api response', result)
                    arr[i]=result
                    }
                    return arr
                }
             
            sendItemsToPrinter(items).then(async(res)=>{
               let resolved = await CHECKOUT_PAYMENT(res, payType)
               console.log('resolved', resolved)
               onPrintTicketEventEnd(resolved)
            })
           

            
        } catch (error) {
            console.log('CLOSE CART error' , error);
          
        }
        
    }




    async function CHECKOUT_PAYMENT(items, paymentType){

        const field_1_request_code = '5'
        const field_2_payment_code = 4
        const field_3_payment_amount = await sumByPropertie(items,'calculated_price')
        const field_4_payment_description ='' //?
        const field_5_offline_pos_data = 0 //?
        const field_6_extended_payment_description = "" //?(field facoltativo) 
        const field_7_payment_typology = paymentType //?
        const field_8_typology_detail = "" 
        const field_9_ticket_quantity= ''// ? 

        let commandString = `5/${field_2_payment_code}/${field_3_payment_amount.toFixed(2)}////${field_7_payment_typology}///`
        console.log('cash payment command', commandString)
        var encodedValue = encodeURIComponent(commandString)
        console.log('cash payment encodedValue', encodedValue)
        return new Promise((resolve, reject)=>{

            axios.get(`${url}/_io?cmd=4&js=1&pkt=${encodedValue}`)
            .then(res => {
                console.log('print result', res.data.response)
                const verified = verifyStringResponse(res.data.response)
                if(!res) throw new Error('the printer answered with an error')
                return res
            })
            .then(async (res)=>{
                let status = await STATUS()
                let arrayOfLines = await GET_LAST_TICKET_TXT(status.ej.lastdoc.docbase)
                console.log('ticket metadata', status)
                //READ_DISPLAY_FROM_API_RESPONSES(status.display.lines)
                let objResponse = {
                    ...arrayOfLines,
                    raw:status,
                    docno:status.ej.lastdoc.docno,
                    zno:status.ej.lastdoc.zno,
                    docbase:status.ej.lastdoc.docbase,
                    rtc:status.rtc,
                    display:status.display,
                    items:items,
                    cart_total: field_3_payment_amount.toFixed(2),
                    command:commandString
                    

                }
                console.log('result', objResponse)
                resolve(objResponse)
            
            })
            .catch(error => {
                //when throw "Error" is executed it runs the catch block code
                console.log(error)
            });





        })
        
    
    }



    const chectestkout = async (items) => {
        let result = {}
        for (let promise of [WRITE(items)]) {
            try {
                const obj = await promise;
                console.log('execution response', obj);
                result = {...result, ...obj}
            } catch (error) {
                console.log(error.message);
            }
        }
    };
    



    const WRITE = (arr)=>{
        return new Promise((resolve, reject) => {
            for (let i = 0; i < arr.length; i++) {
                console.log(arr[i])
                VENDITA_ARTICOLO(arr[i]).then((result)=>{
                    console.log('write response', result)
                    arr[i].write_response=result
                })
            }
            resolve({items:arr})
        })
      }

      const DELETE_TICKET = async (item)=>{
        return await new Promise((resolve, reject) => {
            
            const date = item.rtc?.date.replaceAll('-','')
            const zno = item?.zno
            const docno = item?.docno

            const inputData = {...item}

            let str = `+/1/${date}/${zno}/${docno}////`

            console.log('DELETE_TICKET', item, str )
            var encodedValue = encodeURIComponent(str)
            console.log('encodedValue', encodedValue)

            axios.get(`${url}/_io?cmd=4&js=1&pkt=${encodedValue}`)
            .then(async (res)=>{
                let status = await STATUS()
                let arrayOfLines = await GET_LAST_TICKET_TXT(status.ej.lastdoc.docbase)
                console.log('ticket metadata', status)
                //READ_DISPLAY_FROM_API_RESPONSES(status.display.lines)
                let objResponse = {
                    ...arrayOfLines,
                    raw:status,
                    docno:status.ej.lastdoc.docno,
                    zno:status.ej.lastdoc.zno,
                    docbase:status.ej.lastdoc.docbase,
                    rtc:status.rtc,
                    display:status.display,
                    deleted_item:inputData,
                    command:str,
                    deletion_command_response:res.data,
                    is_deletion:true
                    

                }
                console.log('result', objResponse)
                resolve(objResponse)
            
            })
            .catch(error => {
                //when throw "Error" is executed it runs the catch block code
                console.log(error)
            });
                
               
        })
      }

    async function VENDITA_ARTICOLO(item){

        console.log(item)

        const description = item.product_description
        const extended = item.product_extended_description
        const quant = item.purchase_quantity
        const price = item.calculated_price
        const reparto = await GET_REPARTO(item.tax_rate)

        let productString = `3/S/${description}/${extended}/${quant}/${price}/${reparto}/////`
        console.log('VENDITA_ARTICOLO', item, productString )
        var encodedValue = encodeURIComponent(productString)
        console.log('encodedValue', encodedValue)

        let result = await axios.get(`${url}/_io?cmd=4&js=1&pkt=${encodedValue}`)
        //READ_DISPLAY_FROM_API_RESPONSES(result.insert_response.response?result.insert_response.response:'no response')
        return { ... item, insert_response:result.data}

    
    }

    const GET_LAST_TICKET_TXT = async (ej_lastdoc_docbase)=>{

        let result = await axios.get(`${url}/_ejctl?cmd=0&fmt=0&line=${ej_lastdoc_docbase}`)
        
        return result.data
       
    }

    ///_driveinfo?cmd=1&path=0:\SENT
    // /_driveinfo?cmd=1&path=1:\PDF

    const GET_SENT_FILES = async ()=>{

        let sentFiles = []
        let encoded = encodeURI('1:\PDF');

        let result = await axios.get(`${url}/_driveinfo?cmd=1&path=${encoded}`)
        console.log('GET_SENT_FILES', result.data)
        result.data.fileslist.forEach(async(el)=>{
            sentFiles.push(el)

        })
        
        return {
            files:sentFiles,
        }
       
    }

    

    async function STATUS() {
        let result  = await axios.get(`${url}/_io?cmd=0`)
        return result.data
    }

        
    
    
    
    async function SCANNER(){
        try {
            let rnd = randomNumber(0.30, 1.80)
            let id = Math.floor(rnd * 100)
            let price = rnd 
            let tax = 4
            let sale_type = 0
    
            const product = {...productModel};
    
            product.product_description = 'prodotto ' + id
            product.product_extended_description= 'dettaglio ' + id
            product.calculated_price = price.toFixed(2)
            product.tax_rate = tax,
            product.product_sale_type=sale_type
            product.purchase_quantity=1
    
            return product
            
        } catch (error) {
            console.log('error generating item')
        }
    }

    function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }
    
      function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
      function verifyStringResponse(str) {
        const matches = str.match(/^\d\d/)
        console.log('matches', matches)
        const val = matches?matches[0]:''
        console.log(val)
        if (val == '00') return true
      
        return false;
      }

      


  return (
    {
        productModel,
        deleteTicket,
        last: tickets && tickets.length?tickets.slice(-1)[0]:{},
        tickets:tickets,
        generateFakeItem:()=>SCANNER(),
        paymentCash:(itemList)=> CLOSE_CART(itemList),
        checkout:(itemList, paymentType)=> CHECKOUT(itemList, paymentType),
        status:()=>STATUS(),
        sentFiles:()=>GET_SENT_FILES()
    }
  )
}

export default useMicrelec

