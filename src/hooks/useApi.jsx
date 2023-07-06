/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
import axios from 'axios'

const useApi = () =>{

const gasId = "AKfycbwvzxhkmw7MgQWswDox83wxMXjQK6QTE80JinTJwKTMp1MGeSkZ1PvtAlL77B8KAHwFjA";

const url = `https://script.google.com/macros/s/${gasId}/exec`

const serialize = async function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

const query = async (payload) =>{
  return "?" + await serialize(payload)
}


function get(table) {
  return new Promise((resolve, reject) => {
    console.log('executando a query...')

    axios.get(url,{
        params: {
          method: 'list',
          table: table,
        },
      })
      .then((res) => {
        //console.log('res.data', res.data)
        return resolve(res.data);
      })
      .catch((err) => {
        console.log(err)
        return reject(err);
      });
  });
}


function ax(url) {
  return new Promise((resolve, reject) => {
    console.log('executando axios get...')

    axios.get(url)
      .then((res) => {
        //console.log('res.data', res.data)
        return resolve(res.data);
      })
      .catch((err) => {
        console.log(err)
        return reject(err);
      });
  });
}


const fetchQuery = async (body) => {
  
  const requestOptions = (objBody) => {
    return {
      redirect: "follow",
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(objBody),
    };
  };

  const response = await fetch(url, requestOptions(body));
  return await response.json();
};


return {
  ax,
  get,
  fetchQuery
}


}

export default useApi





