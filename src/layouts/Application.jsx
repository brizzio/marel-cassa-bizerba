/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Timer from "../components/Timer";
import useAuth from "../hooks/useAuth";

//https://stackoverflow.com/questions/58222004/how-to-get-parent-width-height-in-react-using-hooks

export const AppLayout = ({
    children
}) => {


    const windowSize = React.useRef([window.innerWidth, window.innerHeight]);

    const appRef = React.useRef()
    const {user} = useAuth()

    const [height, setHeight] = React.useState(null);
    const [width, setWidth] = React.useState(null);
    
    const div = React.useCallback(node => {
        if (node !== null) {
          setHeight(Math.trunc(node.getBoundingClientRect().height));
          setWidth(Math.trunc(node.getBoundingClientRect().width));
        }
      }, []);
    
    const headerHeight = '30px';


    const icon = user && user.isSuper || user.isAdmin
    ? <i 
    className="fas bg-white text-orange-600 fa-circle-check"
    />
    : <i 
    className="fas bg-white text-green-700 fa-circle-check"
    />
    
    

    function pixelsToRem(pixels) {    
        return pixels / parseFloat(getComputedStyle(document.body).fontSize);
    }
    
    //console.log('Width:', windowSize.current[0], pixelsToRem(headerHeight))
    //console.log('Height:', windowSize.current[1])

    return(
    <div  className="flex w-screen h-screen bg-stone-100 items-start justify-center">
       <div  className={`relative flex flex-col h-full w-full p-3 bg-gray-100 md:h-[520]`}

       style={{backgroundImage: 'url(https://static.vecteezy.com/system/resources/thumbnails/006/469/228/small/abstract-white-background-with-halftone-texture-free-vector.jpg)',
       backgroundPosition: 'center',
       backgroundRepeat: 'no-repeat', 
       backgroundSize: 'cover' }}>
        <div className={`w-full h-[${headerHeight}] py-[1rem] bg-white bg-opacity-90 border border-stone-100 rounded-xl flex flex-row items-center justify-between px-3 gap-2`}>
            <img 
                className="h-[15px]"
                src='/bizerba-logo.png' />
            <div className={`flex gap-3`}>
                <span>
                    {user && user.uuid
                    ? user.alias 
                    :'K360 SUPERMARKET AUTOMATION'}
                </span>
                <span>
                    {icon}
                </span>
                
            </div>
        </div>
        <div ref={div} className={`flex flex-col grow w-full  rounded drop-shadow-lg bg-white bg-opacity-20`}>
        
            {children}

        </div>
        <div className={`w-full  h-[${headerHeight}] bg-white bg-opacity-50 border border-purple-800 border-opacity-30 rounded-xl flex flex-row items-center justify-end px-3`}>
            {/* <span>content height: {height}</span> */}
            <Timer/>
        </div>
       </div>

    </div>
    )
    
    };