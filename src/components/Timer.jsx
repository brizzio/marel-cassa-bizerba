/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import useTimeZoneDate from '../hooks/useTimeZone';

function Timer() {

  const option = {
    year: 'numeric',
    month: 'long',     //('long' || 'short' || 'numeric'),
    weekday: 'long',   //  ('long' || 'short'),
    day: 'numeric'
}

const locale = 'it-IT'  //'pt-br'

    const [date, setDate] = React.useState('');

    const {tz, millis} = useTimeZoneDate()

   //console.log('timer prps', new Date(props.date))
   //console.log('timer', new Date(date).toLocaleDateString(undefined, option).//replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()))

   //console.log('timerdate', date)
   //console.log('timer time', new Date(date).toLocaleTimeString())

    
  
    //Replaces componentDidMount and componentWillUnmount
    React.useEffect(() => {
     var timerID = setInterval( () => tick(), 1000 );
     return function cleanup() {
         clearInterval(timerID);
       };
    });

    React.useEffect(() => {
      //console.log('timer effect',millis)
      setDate(new Date().setTime(new Date(millis).getTime()))
     }, []);
   
      function tick() {
       setDate(prev=>new Date(prev).setTime(new Date(prev).getTime() + 1000));
      }

      
      const fulldate = new Date(date).toLocaleDateString( locale, option).replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

   
      return (
         <div className={'text-black text-lg font-thin flex gap-2 justify-between'}>
           <span>{fulldate}</span> 
           <span className='w-[4rem]'>{new Date(date).toLocaleTimeString()} </span> 
           <span>{tz}</span>
         </div>
       );
}

export default Timer