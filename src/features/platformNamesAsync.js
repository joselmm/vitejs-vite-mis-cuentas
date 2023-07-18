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

export const getPlatformNames = () => {
  return new Promise((resolve) => {
    getSheetData(dbUri, 'platformNames', null, (platformNames) => {
      const platformNamesEnum = {};

      for (let i = 0; i < platformNames.length; i++) {
        const platformName = platformNames[i].platformName;
        platformNamesEnum[platformName] = platformName;
      }

      //console.log(platformNamesEnum);
      resolve(platformNamesEnum);
    });
  });
}; 

export const insertPlatformName = (platformName) => { 
  //console.log("recibido insert ",platformName)
  return new Promise((resolve) => {
    //(URL_API, TableName, Objects_Array, SaveAs, callBack)

    insertRows(
      dbUri,
      'platformNames',
      [{ platformName: platformName }],
      null,
      (platformNames) => {
        const platformNamesEnum = {};

        for (let i = 0; i < platformNames.length; i++) {
          const platformName = platformNames[i].platformName;
          platformNamesEnum[platformName] = platformName;
        }

        //console.log(platformNamesEnum);
        resolve(platformNamesEnum);
      }
    );
  });
};

export const deletePlatformName = (platformName) => {
  return new Promise((resolve) => {
    //deleteRows(URL_API,TABLENAME, Objects_Array,  WHERE,  SaveAs,  callBack)

    deleteRows(
      dbUri,
      'platformNames',
      [{ platformName: platformName }],
      'platformName',
      null,
      (platformNames) => {
        const platformNamesEnum = {};

        for (let i = 0; i < platformNames.length; i++) {
          const platformName = platformNames[i].platformName;
          platformNamesEnum[platformName] = platformName;
        }

        //console.log(platformNamesEnum);
        resolve(platformNamesEnum);
      }
    );
  });
};
