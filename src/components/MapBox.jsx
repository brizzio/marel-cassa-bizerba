/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import React, {useState, useRef, useEffect} from 'react'
import mapboxgl from 'mapbox-gl'; 

mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpenppbyIsImEiOiJjbGoycjBtNGMxYXVmM2R0OGRhbGwzc2R0In0.-PPvpn656FabsxOSTtuWyw'



const MapBox = ({latitude, longitude}) => {


  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(longitude);
  const [lat, setLat] = useState(latitude);
  const [zoom, setZoom] = useState(9);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: zoom
    });

    
    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
   
      
      <div className= 'debug w-1/2' style={container} ref={mapContainerRef}>
       
            <div className= 'debug' style={sidebar}>
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
        
      </div>
    
  );
};

export default MapBox


const container = {
    position:'absolute',
    height:'50%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
}

const sidebar = {
    display: 'inline-block',
    backgroundColor: 'rgba(35, 55, 75, 0.9)',
    color: '#fff',
    padding: '2px 2px',
    fontFamily: 'monospace',
    fontSize: '9px',
    zIndex: '1 !important',
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: '3px',
    borderRadius: '4px',
   
    }


