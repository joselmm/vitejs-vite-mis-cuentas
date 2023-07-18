import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPlatformName,
  removePlatformName,
} from '../../../features/platformNames';

import * as Yup from 'yup';
import React, { useEffect, useState, useRef } from 'react';

const AddPlatformNameForm = () => {
  const dispatch = useDispatch();
  const [cursorPointerClass, setCPC] = useState('cursor-pointer');
  const [lastPlatformNameTried, setLPNT] = useState(null);
  const submittingRef = useRef(null);
  const setFieldValueRef = useRef(null);
  const platformNamesListRef = useRef(null);

  const platformNamesEnum = useSelector((state) => state.platformNames.enum);

  useEffect(() => {
    if (
      lastPlatformNameTried &&
      platformNamesEnum.hasOwnProperty(lastPlatformNameTried)
    ) {
      console.log('ya se guardo PM: ', platformNamesEnum);
      setLPNT(null);
      setCPC('cursor-pointer');
      //hacer scroll hasta el ultimo item (recien agregado)
      platformNamesListRef.current.scrollTop =
        platformNamesListRef.current.scrollHeight -
        platformNamesListRef.current.clientHeight;

      if (submittingRef.current && setFieldValueRef) {
        //setSubmitting(false)
        submittingRef.current(false);
        //vaciar input
        setFieldValueRef.current('platformName', '');
      }
    }
  }, [platformNamesEnum]);

  function addPlatformNameFromComponent(platformName) {
    console.log('linea 13 AddPlatformNameForm', platformName);
    setLPNT(platformName);
    dispatch(addPlatformName(platformName));
  }

  const schema = Yup.object().shape({
    platformName: Yup.string().required('Ingresa un metodo de pago'),
  });
  const initialValues = {
    platformName: '',
  };
  //onNameChanges
  function onNameChanges(e, setFieldValue) {
    var userNameValue = e.target.value;
    var fieldName = 'platformName';
    setFieldValue(fieldName, userNameValue.toUpperCase());
  }

  //onSubmit
  function onSubmit(values, { setSubmitting, setFieldValue }) {
    const { platformName } = values;
    try {
      if (platformNamesEnum.hasOwnProperty(platformName)) {
        setSubmitting(false);
        return;
      }
      setCPC('disabled-icon');
      console.log(platformName);
      addPlatformNameFromComponent(platformName);
      submittingRef.current = setSubmitting;
      setFieldValueRef.current = setFieldValue;
      console.log(platformName);
    } catch (err) {
      console.log(err);
    }
  }

  function removePlatformNameFromComponent(e, platformName) {
    if (!e.target.className.includes('cursor-pointer')) return;
    console.log('hshs');
    e.target.className = e.target.className.replace('cursor-pointer', '');
    e.target.className = e.target.className + 'disabled-icon';
    dispatch(removePlatformName(platformName));
    //e.target.
  }

  return (
    <div
      style={{ width: '300px' }}
      className="pop-content bg-primary p-3 border border-danger rounded"
    >
      <div>
        <div className="text-center">
          <h3>Lista</h3>
        </div>
        <ul
          ref={platformNamesListRef}
          style={{ overflowY: 'scroll', height: '30vh', padding: '20px' }}
        >
          {Object.keys(platformNamesEnum).map((platformName, key) => {
            return (
              <li className="position-relative " key={key}>
                {platformName}
                <span style={{ position: 'absolute', right: 0 }}>
                  <i
                    onClick={(e) =>
                      removePlatformNameFromComponent(e, platformName)
                    }
                    className={'bi bi-trash text-danger ' + cursorPointerClass}
                  ></i>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
      >
        {({ isSubmitting, errors, setFieldValue }) => {
          return (
            <Form>
              <div className="text-center text-light">
                <h3>Agregar un nombre de plataforma</h3>
              </div>
              <div className="text-center">
                <label
                  style={{ display: 'block', fontSize: '20px' }}
                  htmlFor="platformName"
                >
                  Nombre de la plataforma
                </label>
                <Field
                  onChange={(e) => {
                    onNameChanges(e, setFieldValue);
                  }}
                  id="platformName"
                  type="text"
                  name="platformName"
                />
                {errors.platformName && (
                  <ErrorMessage
                    style={{ color: 'red' }}
                    name="platformName"
                    component="div"
                  />
                )}
              </div>

              <div className="mt-3 text-center">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-warning "
                >
                  Agregar
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddPlatformNameForm;
