/* eslint-disable react-hooks/exhaustive-deps */


import usePersistentContext from "./usePersistentContext";

const useTimeZoneDate = () => {


        const [ip]= usePersistentContext('ipData')

        
        let tz = ip?ip.timeZone:Intl.DateTimeFormat().resolvedOptions().timeZone

        var d = new Date();
        let ds = d.toLocaleString(undefined, { timeZone: tz, timeZoneName: "short"  }).replace(",","").trim()
        let dt = ds.split(" ")[0].split("/")
        let tm = ds.split(" ")[1].split(":")
        let millis = new Date().getMilliseconds()

        let objectDate =  {
            tz,
            millis:new Date( dt[2], dt[1], dt[0], tm[0], tm[1], tm[2]).getTime() + millis,
            dateTime: formatDate(dt[2], dt[1], dt[0]) + "T" + formatTime(tm[0], tm[1], tm[2]),
            formattedDate:formatDate(dt[2], dt[1], dt[0]),
            formattedTime:formatTime(tm[0], tm[1], tm[2]),
            array: [dt[2], dt[1], dt[0], tm[0], tm[1], tm[2]],
            numeric:new Date( dt[2], dt[1], dt[0], tm[0], tm[1], tm[2]).getTime(),
            timestamp:dt[2]
            + padTo2Digits(dt[1])
            + padTo2Digits(dt[0]) 
            + padTo2Digits(tm[0]) 
            + padTo2Digits(tm[1]) 
            + padTo2Digits(tm[2])
          } 
    
                

        return objectDate;

      


  
}

export default useTimeZoneDate

function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
        }
      
      function formatDate(y,m,d) {
        return [
          y,
          padTo2Digits(m),
          padTo2Digits(d),
        ].join('-');
      }

      function formatTime(h,m,s) {
        return [
          h,
          padTo2Digits(m),
          padTo2Digits(s),
        ].join(':');
      }