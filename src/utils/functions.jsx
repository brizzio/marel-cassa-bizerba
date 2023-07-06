export const idFromMillis = () => {

    // create Date object for current location
var date = new Date();

// convert to milliseconds, add local time zone offset and get UTC time in milliseconds
var utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);

// time offset for New Zealand is +12
//var timeOffset = 12;

// create new Date object for a different timezone using supplied its GMT offset.
return  new Date(utcTime).toISOString().replace(/\D/g, '');


}

export const alphaIdGenerator = ()=>{
  return (+new Date).toString(36).slice(-6) + "-" + Math.random().toString(36).slice(-3)
}


export const readLocalStorage = async (key) => {
  return new Promise((resolve, reject) => {
      
  let result = localStorage.getItem(key)  
  
  if (result === undefined) {
      reject();
  } else {
      resolve(JSON.parse(result));
  }
   
  });
};



export const getLocalStorageCollectionDataByKey = async (key) => {

    try {
        var existing = localStorage.getItem(key);

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? JSON.parse(existing) : [];

        return existing;

    } catch (error) {
        console('getLocalStorageCollectionDataByKey error', error)
    }
   
    

};


export function isObjEmpty (obj) {
  return Object.keys(obj).length === 0;
}


export function deviceId()
    {
    var iPageTabID = sessionStorage.getItem("deviceId");
      // if it is the first time that this page is loaded
    if (iPageTabID == null)
        {
        var iLocalTabID = localStorage.getItem("deviceId");
          // if tabID is not yet defined in localStorage it is initialized to 1
          // else tabId counter is increment by 1
        iPageTabID = (iLocalTabID == null) ? alphaIdGenerator() : iLocalTabID;
          // new computed value are saved in localStorage and in sessionStorage
        
          localStorage.setItem("deviceId",iPageTabID);

          return iPageTabID;
        
        }
    }

export const getLocalStorageKeySync = (key) => {

    try {
        var existing = localStorage.getItem(key);

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? JSON.parse(existing) : undefined;

        return existing;

    } catch (error) {
        console('getLocalStorageKeySync error', error)
    }

};

export const updateCollectionLS = async (collection, updatedObject)=>{

    let data = await getLocalStorageCollectionDataByKey(collection)

    const index = data.findIndex(obj => {
        return obj.id === updatedObject.id;
      });
      console.log(index); // 👉️ -1
      
      if (index !== -1) {
        data[index] = updatedObject;
        localStorage.setItem(collection, JSON.stringify(data))
      }
      

}

export const findBagItemInLSItems = async ()=>{


    let res = null
    let data = await getLocalStorageCollectionDataByKey('items')

    const index = data.findIndex(obj => {
        return obj.id === 145;
      });
      //console.log('findBagItemInLSItems', data[index]); // 👉️ -1
      //console.log('findBagItemInLSItems', index, index > -1); // 👉️ -1
      
      return index > -1?data[index]:undefined

      
      

}


export const removeItemFromCollectionLSById = async (entryId, collection)=>{


    const col = collection? collection:'items'

    let data = await getLocalStorageCollectionDataByKey(col)

    const index = data.findIndex(obj => {
       
        return obj.entry_id == entryId;
      });
      console.log('removeItem id',entryId, entryId==entryId);
      console.log('removeItem',index); // 👉️ -1
      
      if (index > -1) {
        data.splice(index,1)
        localStorage.setItem('items', JSON.stringify(data))
      }
      

}

export const upsertCollectionLS = async (collection, updatedObject)=>{

    let data = await getLocalStorageCollectionDataByKey(collection)

    const index = data.findIndex(obj => {
        return obj.id === updatedObject.id;
      });
      console.log(index); // 👉️ -1
      
      if (index !== -1) {
        data[index] = updatedObject;
        localStorage.setItem(collection, JSON.stringify(data))
      }else{
        data.push(updatedObject)
        localStorage.setItem(collection, JSON.stringify(data))
      }
      

}

export const addItemToCollectionLS = async (collection, item)=>{

    let data = await getLocalStorageCollectionDataByKey(collection)
    data.push(item)
    localStorage.setItem(collection, JSON.stringify(data))
    
}

export const updateLocalStorageItem = async (key, keyValueObj)=>{

    let data = await getLocalStorageKey(key)

    let updated = {...data, ...keyValueObj}
   
    localStorage.setItem(key, JSON.stringify(updated))
      

}

export const itemBuilder = async(item, index, quantity)=>{
    
    try {

      let date =new Date()
      let utcTime = date.getTime() + date.getTimezoneOffset()

      item.entry_id = Math.random()
      item.deleted = false
      item.date_added= formatDate(date)
      item.time_added= utcTime
      item.order=`${index}/${quantity}`
      item.quantity=index
      console.log('itemBuilder', item)
      return item

      
    } catch (error) {
      console.log('item builder error', error)
    }
    

    
    

    

}

export const getCartValue = (items) =>{
    return sumArrayByProp(items,'calculated_price')
}





//==================================================
//HELPERS
//====================================================

const add = (function () {
  let counter = 1;
  return function () {counter += 1; return counter}
})();


async function uuid() {
  try {
    return 'xxxxxxyxx-xxxx-yxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
  } catch (error) {
    console.log('uuid error', error)
  }
  
}

console.log('unique', uuid)

// ✅ Format a date to YYYY-MM-DD (or any other format)
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
  export function formatDate(date) {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-');
  }


  const sumArrayByProp = (arr, prop) =>{
    return arr.reduce((a,item)=> a + item[prop],0)
  }