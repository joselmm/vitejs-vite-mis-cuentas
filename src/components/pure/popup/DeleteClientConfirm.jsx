import React, { useEffect, useState } from 'react';
import { setClientToDeleteId, removeClient } from '../../../features/clients';

import { fetchPlatforms } from '../../../features/platforms';
import { useSelector, useDispatch } from 'react-redux';

const DeleteClientQuestion = ({ quit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients);
  const { clientToDeleteId: currentId, value: clientList } = clients;
  var currentClient = clientList.filter((client) => client.id === currentId)[0];

  useEffect(() => {
    if (clientList.findIndex((client) => client.id === currentId) >= 0) {
      console.log('existe');
    } else {
      console.log('ya se borro');
      dispatch(fetchPlatforms());

      quit();
    }

    return () => {
      console.log('de desmonto el DeleteClientQuestion');
      dispatch(setClientToDeleteId(null));
    };
  }, [clientList]);

  function deleteSelectedClient() {
    dispatch(removeClient(currentId));
    setIsDeleting(true);
  }

  return (
    <div
      className="bg-dark border border-danger text-white text-center p-3"
      style={{ width: '300px' }}
    >
      <p>
        Seguro que quieres borrar el cliente
        {currentClient
          ? ' ' + currentClient.name + ' (' + currentClient.contact + ')'
          : null}
        ?
        <br />
        <span className="text-danger">ADVERTENCIA:</span>
        <br />
        Se borraran todas las plataformas asociadas
      </p>
      {isDeleting ? (
        <div class="alert alert-warning" role="alert">
          Se está borrando...
        </div>
      ) : (
        <>
          <button
            onClick={deleteSelectedClient}
            className="btn btn-danger mr-3"
          >
            CONFIRMAR
          </button>
          <button onClick={quit} className="btn btn-primary">
            CANCELAR
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteClientQuestion;
