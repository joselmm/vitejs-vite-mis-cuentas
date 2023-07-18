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

export const getPaymentMethods = () => {
  return new Promise((resolve) => {
    getSheetData(dbUri, 'payments', null, (payments) => {
      const paymentsEnum = {};

      for (let i = 0; i < payments.length; i++) {
        const payment = payments[i].payment;
        paymentsEnum[payment] = payment;
      }

      //console.log(paymentsEnum);
      resolve(paymentsEnum);
    });
  });
};

export const addPaymentMethod = (paymentMethod) => {
  return new Promise((resolve) => {
    //(URL_API, TableName, Objects_Array, SaveAs, callBack)
    console.log('linea 31 addPaymentMethod ', paymentMethod);
    insertRows(
      dbUri,
      'payments',
      [{ payment: paymentMethod }],
      null,
      (payments) => {
        const paymentsEnum = {};
        console.log('linea 38 addPaymentMethod: respuesta', payments);
        for (let i = 0; i < payments.length; i++) {
          const payment = payments[i].payment;
          paymentsEnum[payment] = payment;
        }

        //console.log(paymentsEnum);
        resolve(paymentsEnum);
      }
    );
  });
};

export const deletePayment = (paymentMethod) => {
  return new Promise((resolve) => {
    //deleteRows(URL_API,TABLENAME, Objects_Array,  WHERE,  SaveAs,  callBack)

    console.log('linea 58 deletePayment ', paymentMethod);
    deleteRows(
      dbUri,
      'payments',
      [{ payment: paymentMethod }], 
      'payment',
      null,
      (payments) => {
        const paymentsEnum = {};
        console.log('linea 67 deletePayment: respuesta', payments);
        for (let i = 0; i < payments.length; i++) {
          const payment = payments[i].payment;
          paymentsEnum[payment] = payment;
        }

        //console.log(paymentsEnum);
        resolve(paymentsEnum);
      }
    );
  });
};
