import React from 'react'
import PropTypes from 'prop-types';

const PrintableDiv = ({children}) => {

    const printableRef = React.useRef()

    const Print = () =>{     
        //console.log('print');  
        //let printContents = document.getElementById('printablediv').innerHTML;
        let printContents = printableRef.current?printableRef.current.innerHTML:'';
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
       document.body.innerHTML = originalContents; 
      }

  return (
    <div style={printableWrapper}>

            <div  ref={printableRef} style={printable}>
                {children}
            </div>
            <div >
            <button style={printButton} onClick={Print}>Print To Pdf</button>
                
            </div>
    </div>
  )
}

PrintableDiv.propTypes ={
    children:PropTypes.node
}

export default PrintableDiv

const printable=  {
    display:'flex', 
    flexDirection:'column', 
    width: 400,
    padding:'2em',
    lineHeight:'0.15em',
    fontSize:'1.10em'
}

const printableWrapper=  {
    position:'relative',
    display:'flex', 
    flexDirection:'column', 
    justifyItems: 'center',
    alignItems: 'center',
    width: '100%',
    padding:'2em',
    lineHeight:'0.15em',
    fontSize:'1.25em',
    border:'solid'
}

const printButton =  {
    position:'absolute',
    top:'5px', 
    left:'5px', 
    fontSize:'1.25em'
}

