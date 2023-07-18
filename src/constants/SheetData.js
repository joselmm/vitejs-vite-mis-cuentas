const SSCONN = [];
 
async function getSheetData(URL_API, SheetName, SaveAs, callBack) {
  const information = [
    {
      tableName: SheetName,
      type: 'getSheetData',
    },
  ];

  let formData = new FormData();
  formData.append('data', JSON.stringify(information));
  await fetch(URL_API, {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((ArrayRows) => {
      if (SaveAs) {
        SSCONN[SaveAs] = ArrayRows;
      }

      if (callBack) {
        callBack(ArrayRows);
      }

      console.log(ArrayRows);
    });
}

async function getSheetColumnsData(
  URL_API,
  SheetName,
  Columns,
  SaveAs,
  callBack
) {
  const information = [
    {
      tableName: SheetName,
      type: 'getSheetColumnsData',
      columns: Columns,
    },
  ];

  let formData = new FormData();
  formData.append('data', JSON.stringify(information));
  await fetch(URL_API, {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((ArrayRows) => {
      if (SaveAs) {
        SSCONN[SaveAs] = ArrayRows;
      }

      if (callBack) {
        callBack(ArrayRows);
      }

      console.log(ArrayRows);
    });
}

// INSERTAR FILA
async function insertRows(URL_API, TableName, Objects_Array, SaveAs, callBack) {
  let formData = new FormData();

  let information = {
    type: 'insertRows',
    tableName: TableName,
  };
  Objects_Array.push(information);
  formData.append('data', JSON.stringify(Objects_Array));
  await fetch(URL_API, {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((ArrayRows) => {
      if (SaveAs) {
        SSCONN[SaveAs] = ArrayRows;
      }

      if (callBack) {
        callBack(ArrayRows);
      }
      console.log(ArrayRows);
    });
}

async function selectRows(
  URL_API,
  TABLENAME,
  Objects_Array,
  WHERE,
  SaveAs,
  callBack
) {
  let formData = new FormData();

  let information = { type: 'selectRows', tableName: TABLENAME, where: WHERE };

  Objects_Array.push(information);

  formData.append('data', JSON.stringify(Objects_Array));

  await fetch(URL_API, {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((selectedRows) => {
      if (SaveAs) {
        SSCONN[SaveAs] = selectedRows;
      }
      if (callBack) {
        callBack(selectedRows);
      }

      console.log(selectedRows);
    });
}

async function updateRows(
  URL_API,
  TABLENAME,
  Objects_Array,
  WHERE,
  SaveAs,
  callBack
) {
  let formData = new FormData();

  let information = { type: 'updateRows', tableName: TABLENAME, where: WHERE };

  Objects_Array.push(information);

  formData.append('data', JSON.stringify(Objects_Array));

  await fetch(URL_API, {
    method: 'POST',
    body: formData,
  })
    .then((res) => {
      return res.json();
    })
    .then((ArrayRows) => {
      if (SaveAs) {
        SSCONN[SaveAs] = ArrayRows;
      }

      if (callBack) {
        callBack(ArrayRows);
      }

      console.log(ArrayRows);
    });
}

async function deleteRows(
  URL_API,
  TABLENAME,
  Objects_Array,
  WHERE,
  SaveAs,
  callBack
) {
  let formData = new FormData();

  let information = { type: 'deleteRows', tableName: TABLENAME, where: WHERE };

  Objects_Array.push(information);
  //console.log(JSON.stringify(Objects_Array))

  formData.append('data', JSON.stringify(Objects_Array));
  //formData.append("data", '[{"id":5},{"idLeccion":10},{"idLeccion":12},{"type":"deleteRows","tableName":"Hoja 1", "columns":"Nombre/Fecha_Inicial","where":"id"}]');

  await fetch(URL_API, {
    method: 'POST',
    body: formData,
  })
    .then((rep) => {
      return rep.json();
    })
    .then((ArrayRows) => {
      if (SaveAs) {
        SSCONN[SaveAs] = ArrayRows;
      }

      if (callBack) {
        callBack(ArrayRows);
      }
      console.log(ArrayRows);
    });
}

export {
  getSheetData,
  getSheetColumnsData,
  insertRows,
  selectRows,
  updateRows,
  deleteRows,
};
