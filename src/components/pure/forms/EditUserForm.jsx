import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
//actions imports
import { setClientToEditId, updateClient } from '../../../features/clients';
import { useSelector, useDispatch } from 'react-redux';
import Client from '../../../models/client.class';
const EditUserForm = ({ quit }) => {
  const dispatch = useDispatch();
  const [currentValues, setCV] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  //useEffect(() => {}, []);
  const clients = useSelector((state) => state.clients);
  const { clientToEditId: currentId, value: clientList } = clients;
  const clientObject = clientList.filter(
    (client) => client.id === currentId
  )[0];
  const client = clientObject;

  useEffect(() => {
    //    console.log('client: ', client);
    //    console.log('clientList en  edit form: ', clientList);
    //    console.log('currentValues: ', currentValues);
    if (currentValues) {
      console.log('cambio la lista');
      const updatedClient = clientList.filter(
        (client) => client.id === currentId
      )[0];

      //      console.log('client actualizado: ', updatedClient);
      let sonIguales = true;
      for (let key in updatedClient) {
        if (updatedClient[key] !== currentValues[key]) {
          sonIguales = false;
          break;
        }
      }
      if (sonIguales) {
        console.log('si se actualizo');
        quit();
      }
    }

    return () => {
      console.log('de desmonto el EditUserForm');
      dispatch(setClientToEditId(null));
    };
  }, [clientList, currentValues]);

  const schema = Yup.object().shape({
    name: Yup.string().required('Escribe un nombre por favor'),
    contact: Yup.string().required('Escribe un contacto por favor'),
    active: Yup.string()
      .oneOf(['1', '0'], null)
      .required('Escoge si el usuario está activo'),
  });

  //onNameChanges
  function onNameChanges(e, setFieldValue) {
    var userNameValue = e.target.value;
    var fieldName = 'name';
    setFieldValue(fieldName, capitalizeWords(userNameValue));
  }
  function capitalizeWords(string) {
    return string.replace(/\b\w/g, function (l) {
      return l.toUpperCase();
    });
  }

  //on Submit:
  function updateCurrenClient(values) {
    //console.log({ ...values });
    dispatch(updateClient(values));
  }
  async function onSubmit(values) {
    const newClient = values;
    try {
      if (newClient === client) return quit();
      setIsUpdating(true);
      setCV(newClient);
      updateCurrenClient(newClient);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="bg-dark text-light text-center p-3 rounded border border-warning"
      style={{ width: '250px', boxSizing: 'content-box' }}
    >
      <Formik
        onSubmit={onSubmit}
        initialValues={client}
        validationSchema={schema}
      >
        {({ isSubmitting, errors, setFieldValue }) => {
          return (
            <Form>
              <div>
                <div>
                  <h3>Editar cliente</h3>
                  <label style={{ display: 'block' }} htmlFor="name">
                    Nombre
                  </label>
                </div>
                <Field
                  onChange={(e) => {
                    onNameChanges(e, setFieldValue);
                  }}
                  id="name"
                  type="text"
                  name="name"
                />
                {errors.contact && (
                  <ErrorMessage
                    name="name"
                    className="text-danger"
                    component="div"
                  />
                )}
              </div>
              <div>
                <label style={{ display: 'block' }} htmlFor="contact">
                  Contacto
                </label>
                <Field id="contact" type="text" name="contact" />
                {errors.name && (
                  <ErrorMessage
                    className="text-danger"
                    name="contact"
                    component="div"
                  />
                )}
              </div>
              <div>
                <label className="d-block">Cliente activo</label>
                <label className="mr-2">
                  <Field value="1" type="radio" name="active" />
                  SI
                </label>

                <label>
                  <Field value="0" type="radio" name="active" />
                  NO
                </label>
                {errors.active && (
                  <ErrorMessage
                    className="text-danger"
                    name="active"
                    component="div"
                  />
                )}
              </div>
              <div>
                {isUpdating === true ? (
                  <div class="alert alert-warning" role="alert">
                    Se está actualizando...
                  </div>
                ) : (
                  <>
                    <button className="btn btn-danger" type="sumbit">
                      Actualizar
                    </button>
                    <div>
                      <button onClick={quit} className="mt-2 btn btn-secondary">
                        Cancelar
                      </button>
                    </div>
                  </>
                )}
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EditUserForm;
