/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { usePouch, Provider } from 'use-pouchdb'
import PouchDB from 'pouchdb-browser'
import find from "pouchdb-find"

PouchDB.plugin(find)

export function useAllDocs(dbKey = '_default') {
  //console.log('pouch key', dbKey)
  
  return React.useCallback(async () => {

    //console.log('options', )
    var db = new PouchDB(dbKey);
    const result = await db.allDocs({
      include_docs: true,
      attachments: true,
      
    })
    //.catch(function (err) {
    //  
    //});
    //console.log('result', result);
    return result
  }, [dbKey])
}


export function useInsert(dbKey = '_default') {
  console.log('pouch key', dbKey)
  
  return React.useCallback(async obj => {
    console.log('obj', obj)
    var db = new PouchDB(dbKey);
    const result = await db.put({
      _id: new Date().toJSON(),
      ...obj,
      
    })
    return result
  }, [dbKey])
}

export function useFind(dbKey = '_default') {
  //console.log('pouch key', dbKey)
  //indexObject example {fields: ['name']}
  /*optionsObject example {
       selector: {name: {$gt: null}},
        sort: ['name']
      }
  */
 //https://nolanlawson.github.io/pouchdb-find/
  
  return React.useCallback(async (indexObject, optionsObject) => {
    console.log('options', optionsObject)
    var db = new PouchDB(dbKey);
    const result = await db.createIndex({
      index: indexObject
    }).then(function () {
      return db.find(optionsObject);
    });
    return result
  }, [dbKey])
}

