import React, { useState, useRef } from 'react';
import Client from '../pure/Client';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
//components import
import DeleteClientConfirm from '../pure/popup/DeleteClientConfirm';
import EditUserForm from '../pure/forms/EditUserForm';
import AddUserForm from '../pure/forms/AddUserForm';
import PlatformForm from '../pure/forms/PlatformForm';
//actions import

import {
  setSelectedClient,
  setClientToDeleteId,
  setClientToEditId,
} from '../../features/clients';

import {setClientToAddPlatformId} from "../../features/platforms"
//popup imports
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const ClientList = () => {
  const dispatch = useDispatch();
  const [popupContent, setPopupContent] = useState(null);
  const editPopupRef = useRef(null);
  const deletePopupRef = useRef(null);
  const addPopupRef = useRef(null);
  const addPlatformPopupRef = useRef(null);
  const popupStyle = {
    background: 'transparent',
    border: 'none',
    width: 'auto',
  };
  const setCurrentlySelectedClient = (clientId) => {
    dispatch(setSelectedClient(clientId));
  };

  const openPopupToDeleteClient = (clientId) => {
    dispatch(setClientToDeleteId(clientId));
    deletePopupRef.current.open();
  };

  const openPopToAddCLient = () => {
    addPopupRef.current.open();
  };

  const openPopupToAddPlatform = (clientId) => {
    dispatch(setClientToAddPlatformId(clientId));
    addPlatformPopupRef.current.open();
  };

  const openPopupToEditClient = (clientId) => {
    console.log('id client: ', clientId);
    dispatch(setClientToEditId(clientId));
    //setPopupContent(EditUserForm);
    console.log(editPopupRef.current.className);
    editPopupRef.current.open();

    //setPopupContent(<div>PAPAPPAPPAP</div>);
    //dispatch(showPopup(EditUserForm));
  };

  const { clients } = useSelector((state) => state);

  const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text);
  };

  function copyClientContact(e) {
    var text = e.target.innerText;
    console.log('ooooo');
    copyToClipboard(text)
      .then(() => {
        toast.success('Copiado al portapapeles!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000, // Duración de 3 segundos
        });
        console.log('Texto copiado al portapapeles:', text);
      })
      .catch((err) => {
        toast.error('Error, revisa en consola!');
        alert('Hubo un error al copiar el texto al portapapeles: ' + err);
      });
  }
  const popups = [
    {
      ref: addPopupRef,
      component: <AddUserForm />,
    },
    {
      ref: editPopupRef,
      component: <EditUserForm />,
    },
    {
      ref: deletePopupRef,
      component: <DeleteClientConfirm />,
    },
    {
      ref: addPlatformPopupRef,
      component: <PlatformForm/>
    }
  ];
  return (
    <div className="col-2 h-auto pl-4"> 
      {/* TODO: poner algo para que se oculte */}
      <div className="popus">
        {popups.map(({ ref, component }, key) => (
          <Popup
            key={key}
            ref={ref}
            position="right center"
            modal
            contentStyle={popupStyle}
            closeOnDocumentClick={false}
          >
            {(close) => {
              return <>{React.cloneElement(component, { quit: close })}</>;
            }}
          </Popup>
        ))}
      </div>
      <div className="text-center p-1">
        <h3 className="m-0">Clientes</h3>
        <i
          onClick={openPopToAddCLient}
          class="bi bi-plus-circle-fill cursor-pointer add-client-button"
        ></i>
      </div>

      {clients.loading === false
        ? clients.value.map((client, key) => {
            return (
              <Client
                classActive={
                  client.id === clients.clientSelected
                    ? 'client-selected rounded'
                    : ''
                }
                key={key}
                client={client}
                copy={copyClientContact}
                setClient={setCurrentlySelectedClient}
                remove={openPopupToDeleteClient}
                edit={openPopupToEditClient}
                add={openPopupToAddPlatform}
              ></Client>
            );
          })
        : null}
    </div>
  );
};

export default ClientList;
