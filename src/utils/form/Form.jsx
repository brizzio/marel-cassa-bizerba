/* eslint-disable react/prop-types */
import React from 'react';
import './Form.module.css'

const Form = ({title, image, inputs, submit}) => {


    const reducer = (state, action) => {return {...state, ...action}}

    const [state, dispatch] = React.useReducer(reducer, {});

    const inputChange = (event)=> dispatch(Object.fromEntries([[event.target.name, event.target.value]]))
   
    //console.log('formData', state)


    const handleSubmit = ()=> submit(state)

  return (
    <div style={wrapper}>
      <img width='200px' src={image}/> 
        <div >
            
            {title}
            
        

        {inputs.map((el, i)=> {

           return ( <Input key={i}
                    change={inputChange}
                    fieldData={el.field}
                    label={el.label}
                    />  )
            
        })}

       <button onClick={handleSubmit}>SUBMIT</button>
       </div>
    </div>
    
    
  )
}

export default Form



const Input = ({fieldData, label, change})=>{

    return (
    <div>
        <label htmlFor={fieldData}>{label}:</label>
        <input 
        type="text" 
        id={fieldData}
        name={fieldData}
        required
        onChange={change}
        />
    </div>
    )
}

const wrapper = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 'auto',
  justifyItems: 'center',
  alignItems: 'center',
  borderStyle: 'dotted',
  paddingBottom: '5%',
  

}