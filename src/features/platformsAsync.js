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

export function getPlatforms() {
  return new Promise((resolve, reject) => {
    getSheetData(dbUri, 'platforms', null, (platforms) => {
      /**
       console.log('from action method: ', platforms);
       
       console.log('tipo: ', typeof platforms);
      
      */
      /* const parseado = platforms.map((user) => {
        return {
          ...user,
          active: user.active == '1' ? true : false,
        };
      });

      console.log('parseado', parseado);
 */
      resolve(platforms);
    });
  });
}

export function deletePlatformById(platformId) {
  return new Promise((resolve, reject) => {
    console.log('platformId recibido: ', platformId);
    deleteRows(
      dbUri,
      'platforms',
      [{ id: platformId }],
      'id',
      null,
      (platforms) => {
        console.log(
          'desde action de borrar los asociados con un  client: ',
          platforms
        );

        /**
       console.log('from action method: ', clients);
       console.log('tipo: ',  typeof clients);
      */
        const platformsParsed = platforms.map((user) => {
          return {
            ...user,
            withCredentials: user.withCredentials == '1' ? true : false,
            active: user.active == '1' ? true : false,
            price: Number(user.price),
            parcialPayment: Number(user.parcialPayment),
            usageTime: Number(user.usageTime),
          };
        });
        /*
      console.log('platformsParsed', platformsParsed);
      */
        resolve(platformsParsed);
      }
    );
  });
}

export function removePlatformsByClientId(clientId) {
  return new Promise((resolve, reject) => {
    console.log('clientId recibido: ', clientId);
    deleteRows(
      dbUri,
      'platforms',
      [{ clientId }],
      'clientId',
      null,
      (platforms) => {
        console.log(
          'desde action de borrar los asociados con un  client: ',
          platforms
        );

        /**
       console.log('from action method: ', clients);
       console.log('tipo: ',  typeof clients);
      */
        const platformsParsed = platforms.map((user) => {
          return {
            ...user,
            withCredentials: user.withCredentials == '1' ? true : false,
            active: user.active == '1' ? true : false,
            price: Number(user.price),
            parcialPayment: Number(user.parcialPayment),
            usageTime: Number(user.usageTime),
          };
        });
        /*
      console.log('platformsParsed', platformsParsed);
      */
        resolve(platformsParsed);
      }
    );
  });
}

export function insertPlatform(platform) {
  return new Promise((resolve) => {
    console.log("recibido en inserPlatform: ",platform)
    /**insertRows(URL_API, TableName, Objects_Array, SaveAs, callBack) */
    insertRows(dbUri, 'platforms', [platform], null, (platformList) => {
      resolve(platformList);
    });
  });
}
