/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React, {useState, useRef, useEffect} from 'react'
import { useQuery } from '@tanstack/react-query';
import useApi from '../hooks/useApi';

//reference to generate static image
//https://docs.mapbox.com/playground/static/

let token = 'pk.eyJ1IjoiYnJpenppbyIsImEiOiJjbGoycjBtNGMxYXVmM2R0OGRhbGwzc2R0In0.-PPvpn656FabsxOSTtuWyw'

const StaticMap = ({latitude, longitude, classes, imageClasses}) => {


  const mapContainerRef = useRef(null);
  const {ax} = useApi()

  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
 
  async function urlContentToDataUri (url){
    
    return  fetch(url)
            .then( response => response.blob() )
            .then( blob => new Promise( callback =>{
                let reader = new FileReader() ;
                reader.onload = function(){ callback(this.result) } ;
                reader.readAsDataURL(blob) ;
            }) ) ;
}

  const marker = `pin-s+ff0088(${longitude},${latitude})`
  const bounds = `${(longitude - 0.2).toFixed(4)},${(latitude + 0.048).toFixed(4)}`
  const zoom = 7
  const bearing = 0
  const pitch = 60
  const width = 180
  const height= 180



  const nurl =`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${marker}/${bounds},${zoom},${bearing},${pitch}/${width}x${height}?before_layer=aerialway&access_token=${token}`

  const url = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${longitude},${latitude},8.66,0/300x200?access_token=${token}`

  //Usage example:
//urlContentToDataUri(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.3442,37.758,8.66,0/300x200?access_token=${token}`).then( dataUri => console.log( 'datauri', dataUri) ) ;

  /* const fetchMap = async () => {
    const res = await fetch(`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.3442,37.758,8.66,0/300x200?access_token=${token}`);
    return res//.json();
  }; */

  const {data, status} = useQuery(['staticMap', url], ()=>urlContentToDataUri(nurl))

  
  
  return (



   <div className={classes}>

     {status === "error" && <p>Error fetching data</p>}
        {status === "loading" && <p>Fetching data...</p>}
        {status === "success" && (
          
           <img src={data} alt="" className={` object-contain ${imageClasses}`} />
        )}

   </div>


     
    
  );
};

export default StaticMap 




