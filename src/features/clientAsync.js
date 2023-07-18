const dbUri =
  'https://script.google.com/macros/s/AKfycbyCyRzC-3zpDaKNC3QbJMTJzMkBT9V54LtKq_dzlrFIXcfjgrAkmr834-JKdKP61kM/exec';

import {  
  getSheetData,
  getSheetColumnsData,
  insertRows,
  selectRows,
  updateRows,
  deleteRows,
} from '../constants/SheetData';

import { removePlatformsByClientId } from './platformsAsync';
import { setPlatforms } from './platforms';

export function getClients() {
  return new Promise((resolve, reject) => {
    getSheetData(dbUri, 'clients', null, (clients) => {
      /**
       console.log('from action method: ', clients);
       
       console.log('tipo: ', typeof clients);
      
      */
      const parseado = clients.map((user) => {
        return {
          ...user,
          active: user.active == '1' ? true : false,
        };
      });
      /*
      
      console.log('parseado', parseado);
      */
      resolve(clients);
    });
  });
}

export function removeClientById(id) {
  return new Promise(async (resolve, reject) => {
    //eliminar platforms asociadas
    var newPlatformList = await removePlatformsByClientId(id);
    //console.log('recibido en el remove client: ', newPlatformList);
    setPlatforms(newPlatformList);

    deleteRows(dbUri, 'clients', [{ id }], 'id', null, (clients) => {
      /**
       console.log('from action method: ', clients);
       console.log('tipo: ',  typeof clients);
      */
      const parseado = clients.map((user) => {
        return {
          ...user,
          active: user.active == '1' ? true : false,
        };
      });
      /*  
      console.log('parseado', parseado);
      */
      resolve(clients);
    });
  });
}

export function updateClientById(client) {
  return new Promise((resolve, reject) => {
    //console.log('cliente recibido en el async', client);
    /* 
    async function updateRows(
  URL_API,
  TABLENAME,
  Objects_Array,
  WHERE,
  SaveAs,
  callBack
)  */
    updateRows(dbUri, 'clients', [client], 'id', null, (clients) => {
      //console.log('nuevos clientes: ', clients);
      /**
       console.log('from action method: ', clients);
       console.log('tipo: ', typeof clients);
      */
      const parseado = clients.map((user) => {
        return {
          ...user,
          active: user.active == '1' ? true : false,
        };
      });
      /*
      console.log('parseado', parseado);
      */
      resolve(clients);
    });
  });
}

export function addNewCLient(client) {
  return new Promise((resolve, reject) => {
    //console.log('cliente recibido en el async', client);
    /* insertRows(URL_API, TableName, Objects_Array, SaveAs, callBack) */
    insertRows(dbUri, 'clients', [client], null, (clients) => {
      resolve(clients);
    });
  });
}
