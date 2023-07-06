/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react';

import useMicrelec from '../useMicrelec';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

//import PouchDB from 'pouchdb';
//import { PouchProvider } from '../PouchHooks';

import axios from 'axios'

import useCart from '../../hooks/models/useCart';
import Grid from '../Grid';


const store = {
    id:'',
    name:'',
    fical_code:'', // partita iva
    address:'',
    ventilation:0, //0: Deactivated 1: Activated If not declared it will come used the      state of ventilation configured in general parameter of device.

}


const Ticket = () => {

   
    const {
        productModel,
        last,
        generateFakeItem,
        deleteTicket,
        paymentCash,
        checkout,
        status,
        sentFiles
    } = useMicrelec()

    const {cart, 
           addItem,
           clearCartItems,
    } = useCart()


    //console.log('tickets',tickets)

      
    
    const options =  {
            auth: {
                username: 'brizzio',
                password: 'brizzio'
                }
            }
    //const saveList = (values)=> post({ items:values, timestamp: Date.now() });
    //const saveList = (data)=> db.post({ ...data, timestamp: Date.now() });
    //db.replicate.to('http://localhost:5984/ttt', options)



    function ScannerInputForm() {
        const [quantity, setQuantity] = React.useState(1);
        const ref= React.useRef()

        const onFocus = () => ref.current.value=''

        const handleMouseOut = (currentRef) => {

            if (document.activeElement === currentRef) {
                console.log("Yesss");
            }
            };
        
        const handleSubmit = (event) => {
            event.preventDefault();
            let generate= async (q)=>{
                let items=[]
                let newItem = await generateFakeItem()
                for (let i = 0; i < q; i++) {
                    items.push(newItem)
                }
                return items
            }

            generate(quantity).then((items)=>{
                console.log('ADD_ITEM', items)
                //setProducts(previus=>[...previus, ...items])
                addItem(items)
                console.log('cart', cart)
            })
            
        }

        
        
        return (
            <form  onSubmit={handleSubmit}>
            <label>Quantita:
                <input 
                ref={ref}
                type="text" 
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                onMouseOut={() => handleMouseOut(ref.current)}
                onFocus={onFocus}
                />
            </label>
            <input type="submit" value='SCANNER'/>
            </form>
        )
        }

    

    // eslint-disable-next-line react/prop-types
    const Display = ({off=false}) => {
      
        const [lines, setLines] = React.useState([]);

        React.useEffect(() => {
            const interval = setInterval(() => {

                if (off) clearInterval(interval);

                axios.get(`http://192.168.1.180/_io?cmd=0`)
                .then(res => {
                    
                    setLines(res.data.display.lines)
                })
              
            }, 500)
            return () => clearInterval(interval)
          }, [off])
        
        let cssDiv = {
            with:'100%',
            height:'100px',
            backgroundColor:'black',
            color:'white',
            padding:'5px',
        }
        
        if (off) return "Printing..."

        return (
          <div style={cssDiv}>
            
            {lines.length
            ?lines.map((line, i)=>{
                return (<p key={i}>{line}</p>)
            }):<p>Stand By...</p>}
          </div>
        );
      };
    
    const cartItems = cart?cart.items:[]
    const cartTotal = cart?cart.total:0
    const lines = last?last.lines:[]
    const clearItems = ()=>clearCartItems()
    const cashPayment = ()=>paymentCash(cartItems, cartTotal)
    const bancomatPayment = () => checkout(cartItems, 'PE')
    const ticketVoid = ()=> deleteTicket(last)


 
   return (
    <div>
        <div>
            
            <button onClick={()=>status()}>TEST_PRINTER</button>
            <button onClick={()=>sentFiles()}>SENT_FILES</button>
            
            <div>
                {/* <button onClick={()=>VENDITA_ARTICOLO()}>VENDITA_ARTICOLO</button> */}
                <button onClick={clearItems}>CANCELLA CARRELLO</button>
                {/* <button onClick={()=>ANNULLO_ARTICOLO()}>ANNULLO_ARTICOLO</button> */}
                <button onClick={cashPayment}>PAGA CONTANTI</button>
                <button onClick={bancomatPayment}>PAGA BANCOMAT</button>
                {/* <button onClick={()=>PAGAMENTO_E_CHIUSURA_DOCUMENTO_CONTANTI()}>PAGAMENTO_CONTANTI</button> */}
                <button onClick={ticketVoid}>ANNULLA_ULTIMO_SCONTRINO</button>
            </div>
            <h5>SCONTRINO</h5>
            <button onClick={clearItems}>NUOVO CLIENTE</button>
            <div style={{display:'inline-flex',gap:'30px'}}><ScannerInputForm/> {cart?.total.toFixed(2)}</div>
            {/* <Display off={isPrinting}/> */}
            {/* <button onClick={()=> ADD_ITEM(3)}>SCANNER</button> */}
        </div>
        
        
        <Grid model={productModel} data={cart?.items} />

       
    </div>
  )

}



export default Ticket


