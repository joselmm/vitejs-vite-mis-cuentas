import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './style.css';

//components
import { ToastContainer } from 'react-toastify';

import PlatformForm from './components/pure/forms/PlatformForm';
import EditUserForm from './components/pure/forms/EditUserForm';
import UserForm from './components/pure/forms/AddUserForm';
import AddPaymentForm from './components/pure/forms/AddPaymentForm';
import DeleteClientConfirm from './components/pure/popup/DeleteClientConfirm';
import AddPlatformNameForm from './components/pure/forms/AddPlatformNameForm';
//import Client from './components/pure/Client';
import PlatformList from './components/container/PlatformList';
import ClientList from './components/container/ClientList';

//actions

import { removeClient, fetchClients, updateClient } from './features/clients';
import { fetchPlatforms } from './features/platforms';
import { fetchPayments } from './features/payments';
import { fetchPlatformNames } from './features/platformNames';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    //console.log(fetchPlatforms);
    dispatch(fetchPlatforms());
    dispatch(fetchClients());
    dispatch(fetchPlatformNames());
    dispatch(fetchPayments());
    setTimeout(() => {
      /*
      dispatch(
        updateClient({
          name: 'Jose A.G.',
          contact: '3148834055',
          active: true,
          id: '123',
        })
      );
      */
      // dispatch(removeClient('123'));
    }, 7000);

    /**
     
    getClients().then((clients) => {
      console.log('tipo: ', typeof clients);
      const parseado = clients.map((user) => {
        return {
          id: user.id,
          name: user.name,
          active: user.active == '1' ? true : false,
          contact: '' + user.contact,
        };
      });
      console.log('parseado', parseado);
     
      dispatch(setClientList(parseado));
      console.log('hi ya');
    });
     */
  }, []);

  function initclients() {
    console.log('set');
  }
  return (
    <div className="row h-auto">
      {/*  <div>
        <button
          onClick={() => {
            console.log('click on show pupop');
            dispatch(showPopup(DeleteClientConfirm));
          }}
          >
          mostrar popup
          </button>
        </div> */}
      <div className="col-12"></div>
      <header className="col-12 bg-primary" style={{ height: '50px' }}></header>
      <div className="">
        {/**
 
    <PlatformForm />
*/}
      </div>
      {/** <ClientList /> */}
      <PlatformList />
      {/**esto es el notificador (generalmente para mostarr avisos, como "se copio el texto al portapapeles") */}
      <ToastContainer />
    </div>
  );
}
