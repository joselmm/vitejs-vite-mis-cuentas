import React, { useState } from 'react';
/* IMPORTANTE TENER LA CONFIGURACION DE LUXON ANTES */
import '../../../constants/luxon.config';
import { DateTime } from 'luxon';
import { parseISOFormatDate } from '../../../constants/time.functions';
import Dates from '../Dates';

//Formik Dependencies
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//classes
import Platform from '../../../models/platform.class';

//enums
import FORM_TYPES from '../../../constants/formType.enum';
import PAYMENT_STATUSES from '../../../constants/paymentStatuses.enum';

//redux dependencies
import { useSelector, useDispatch } from 'react-redux';

//actions import

import { addPlatform } from '../../../features/platforms';

const AddPlatformForm = ({ quit }) => {
  const dispatch = useDispatch();
  const { clients, platformNames, payments, platforms } = useSelector(
    (state) => state
  );
  const clientList = clients.value;
  const platformsEnum = platformNames.enum;
  const paymentsEnum = payments.enum;
  //initialValues and formType definition
  let initialValues;
  let formType;
  if (platforms.clientToAddPlatformId) {
    initialValues = new Platform({ clientId: platforms.clientToAddPlatformId });
    formType = PAYMENT_STATUSES.ADD;
  } else if (platforms.platformToEditId) {
    initialValues = platforms.value.filter(
      (platform) => platform.id === platforms.platformToEditId
    )[0];
    formType = PAYMENT_STATUSES.UPDATE;
  } else{
    initialValues = new Platform();
    formType = PAYMENT_STATUSES.ADD;
  }

  const [showSoldUsers, setShowSoldUsers] = useState(
    initialValues.fullAccount === '0'
  );
  const [showParcialPayment, setShowParcialPayment] = useState(
    initialValues.paymentStatus === PAYMENT_STATUSES.PARTIALLY_PAID
  );
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(
    initialValues.additionalInfo !== ''
  );

  // nextBillingDate Parsed
  let parsedDate = parseISOFormatDate(initialValues.nextBillingDate);
  const [nextDateString, setNextDateString] = useState(
    `${parsedDate.date} ${parsedDate.month} ${parsedDate.fullYear}`
  );

  //SCHEMA
  const schema = Yup.object().shape({
    clientId: Yup.string().required('Selecciona o agrega un client'),
    platformName: Yup.string().required(
      'Selecciona o agrega el nombre de la plataforma'
    ),
    active: Yup.boolean()
      .oneOf([true, false], null)
      .required('Selecciona si la plataforma esta activa'),
    withCredentials: Yup.string()
      .oneOf(['1', '0'], null)
      .required('Escoge si le entregastes correo y contraseña al cliente'),
    email: Yup.string()
      .email('Email no valido')
      .required('Ingresa un email por favor'),
    password: Yup.string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .required('Ingresa la contraseña de la plataforma'),
    emailPassword: Yup.string()
      .min(7, 'La contraseña debe tener al menos 7 caracteres')
      .required('Ingresa la contraseña del email'),
    paymentMethod: Yup.string().required(
      'Selecciona o agrega un metodo de pago'
    ),
    paymentStatus: Yup.string().required('Escoge el estado del pago'),
    price: Yup.number()
      .min(0, 'el precio no puede ser negativo')
      .required('Pon el precio de la venta. Puede ser 0'),
    additionalInfo: Yup.string(),
    usageTime: Yup.number()
      .min(1, 'El tiempo de uso debe ser mayor que cero')
      .required('Indica por cuantos dias se usara la plataforma'),
    nextBillingDate: Yup.string().required('Se requiere numero dias'),
    lastBillingDate: Yup.string().required('Se requiere numero dias'),
  });
  async function onSubmit(values) {
    //await new Promise(resolve=>setTimeout(resolve,1000))
    dispatch(addPlatform(values));
    console.log(values);
  }

  //const formFor = "Update"
  //const formFor = FORM_TYPES.UPDATE;

  function onUsageTimeChange(days, lastBillingDate, setFieldValue) {
    var nextBillingDate = DateTime.fromISO(lastBillingDate).plus({
      days: days,
    });
    let parsedDate = parseISOFormatDate(nextBillingDate.toString());

    setNextDateString(
      `${parsedDate.date} ${parsedDate.month} ${parsedDate.fullYear}`
    );

    setFieldValue('nextBillingDate', nextBillingDate.toString());
    //console.log(nextBillingDate.toString());
  }

  function onFullAccountChange(fullAccountValue, setFieldValue) {
    //console.log(fullAccountValue)

    if (fullAccountValue === '1') {
      setShowSoldUsers(false);
      setFieldValue('soldUsers', 0);
    }
    if (fullAccountValue === '0') {
      setShowSoldUsers(true);
    }
  }

  function onPaymentStatusChange(paymentStatusValue, setFieldValue) {
    console.log('recibio en status: ', paymentStatusValue);
    if (paymentStatusValue === PAYMENT_STATUSES.PARTIALLY_PAID) {
      setShowParcialPayment(true);
    } else {
      setShowParcialPayment(false);
      setFieldValue('parcialPayment', 0);
    }
  }

  function onInfoCheckboxChange(checked, setFieldValue) {
    console.log('recibio en checked: ', checked);
    if (checked) {
      setShowAdditionalInfo(true);
    } else {
      setShowAdditionalInfo(false);
      setFieldValue('additionalInfo', '');
    }
  }

  function validate(values) {
    var errors = {};
    //console.log(values.fullAccount)
    if (values.fullAccount === '0') {
      if (values.soldUsers <= 0) {
        errors.soldUsers = 'El numero de pantallas debe ser mayor a cero';
      }
    }
    //console.log(values);
    if (values.paymentStatus === PAYMENT_STATUSES.PARTIALLY_PAID) {
      //console.log("pago parcial")
      if (values.parcialPayment <= 0) {
        //console.log("menor o igual a cero de abono")
        errors.parcialPayment = 'El abono debe ser mayor a cero';
      }
    }

    return errors;
  }
  return (
    <div
      style={{ position:"relative"}}
      className="text-center bg-dark text-light p-3 border rounded border-danger"
    >
      <span onClick={quit} className="text-right m-0 cursor-pointer" style={{position:"absolute",right:"15px"}}>X</span>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={schema}
        validate={validate}
      >
        {({ isSubmitting, errors, setFieldValue, values }) => {
          return (
            <Form
            style={{ height: '90dvh', overflowY: 'scroll'}}
              onChange={(e) => {
                //(days, lastBillingDate, setFieldValue)
                //IMPORTANTE EL ORDEN de la condicion
                if (
                  e.target.name === 'usageTime' &&
                  e.target.name !== '' &&
                  Number(e.target.value) > 0
                ) {
                  onUsageTimeChange(
                    e.target.value,
                    values.lastBillingDate,
                    setFieldValue
                  );
                }

                if (e.target.name === 'fullAccount') {
                  onFullAccountChange(e.target.value, setFieldValue);
                }
                if (e.target.name === 'paymentStatus') {
                  //console.log("ooo ",e.target.value)
                  onPaymentStatusChange(e.target.value, setFieldValue);
                }
                if (e.target.name === 'additionalInfoCheckBox') {
                  onInfoCheckboxChange(e.target.checked, setFieldValue);
                }
              }}
            >
              <p style={{ fontSize: '25px' }}>
                {formType === FORM_TYPES.UPDATE
                  ? 'Actualizar plataforma'
                  : 'Agregar plataforma'}
              </p>
              <div>
                <label htmlFor="clientId" className="mr-1">
                  Cliente:
                </label>
                <Field id="clientId" name="clientId" as="select">
                  <option value="">Selecciona</option>

                  {clientList.map((client) => {
                    return (
                      <option value={client.id} key={client.id}>
                        {client.name} {`(${client.contact})`}
                      </option>
                    );
                  })}
                </Field>
                {errors.clientId && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="clientId"
                  />
                )}
              </div>
              <div>
                <label className="mr-1">Con credenciales:</label>

                <label>
                  <Field
                    className="m-1"
                    type="radio"
                    value="1"
                    name="withCredentials"
                  />
                  SI
                </label>
                <label>
                  <Field
                    className="m-1"
                    type="radio"
                    value="0"
                    name="withCredentials"
                  />
                  NO
                </label>
                {errors.withCredentials && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="withCredentials"
                  />
                )}
              </div>

              <div>
                <label className="mr-1" htmlFor="platformName">
                  Nombre de plataforma:
                </label>
                <Field id="platformName" name="platformName" as="select">
                  <option value="">Selecciona</option>
                  {Object.keys(platformsEnum).map((platform_name) => (
                    <option
                      value={platformsEnum[platform_name]}
                      key={platformsEnum[platform_name]}
                    >
                      {platformsEnum[platform_name]}
                    </option>
                  ))}
                </Field>
                {errors.platformName && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="platformName"
                  />
                )}
              </div>
              <div>
                <label className="m-1">Cuenta Completa:</label>

                <label>
                  <Field
                    className="m-1"
                    type="radio"
                    value="1"
                    name="fullAccount"
                  />
                  SI
                </label>
                <label>
                  <Field
                    className="m-1"
                    type="radio"
                    value="0"
                    name="fullAccount"
                  />
                  NO
                </label>
                <div hidden={!showSoldUsers}>
                  <label className="mr-1"># Perfiles:</label>
                  <Field size="2" type="number" name="soldUsers"></Field>
                  {errors.soldUsers && (
                    <ErrorMessage
                      className="text-danger"
                      component="div"
                      name="soldUsers"
                    />
                  )}
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="email">Email:</label>
                </div>
                <Field size="30" type="email" id="email" name="email" />
                {errors.email && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="email"
                  />
                )}
              </div>
              <div>
                <label className="mr-1 mt-3" htmlFor="password">
                  Contraseña:
                </label>
                <Field size="15" type="text" id="password" name="password" />
                {errors.password && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="password"
                  />
                )}
              </div>

              <div>
                <label htmlFor="emailPassword">Password email:</label>
                <div>
                  <Field
                    size="15"
                    type="text"
                    id="emailPassword"
                    name="emailPassword"
                  />

                  {/*checkbox*/}
                  <input
                    className="m-1"
                    id="same-password"
                    type="checkbox"
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const passwordValue = e.target.form.password.value;
                      if (checked) {
                        setFieldValue('emailPassword', passwordValue);
                      } else {
                        setFieldValue('emailPassword', '');
                      }
                    }}
                  />
                  <label htmlFor="same-password">Misma</label>
                </div>
                {/*error control*/}
                {errors.emailPassword && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="emailPassword"
                  />
                )}
              </div>

              <div>
                <Field id="paymentMethod" name="paymentMethod" as="select">
                  <option value="">Metodo pago</option>
                  {Object.keys(paymentsEnum).map((payment_method) => (
                    <option value={payment_method} key={payment_method}>
                      {payment_method}
                    </option>
                  ))}
                </Field>
                {/**TODO: crear un campo para agregar metodo de pago
                 * y que tenga un manejador en el estado global ue los actualice en la nube
                 */}
                <button
                  type="button"
                  className="mt-3 ml-2 mb-3 btn btn-success p-1"
                >
                  Agregar
                </button>
                {errors.paymentMethod && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="paymentMethod"
                  />
                )}
              </div>
              <div>
                <label className="mr-1">Fecha inicio: </label>
                <div className="customDatePickerWidth">
                  <Dates
                    onChange={onUsageTimeChange}
                    values={values}
                    setFieldValue={setFieldValue}
                    fieldKey="lastBillingDate"
                  />
                </div>
              </div>
              <div>
                <label className="mr-1" htmlFor="usageTime">
                  Duracion:{' '}
                </label>
                <Field
                  className="mt-3"
                  size="5"
                  min="1"
                  name="usageTime"
                  id="usageTime"
                  type="number"
                />{' '}
                (dias)
                {errors.usageTime && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="usageTime"
                  />
                )}
              </div>
              <div>
                <p>Termina: {nextDateString}</p>
              </div>
              <div>
                <label className="mr-1" htmlFor="price">
                  Precio:{' '}
                </label>
                <Field size="7" name="price" id="price" type="number" />
                <label>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue('price', values.price * 1000);
                      } else {
                        e.target.form.price.focus();
                        if (values.price % 1000 === 0 && values.price > 0) {
                          setFieldValue('price', values.price / 1000);
                        }
                      }
                    }}
                    type="checkbox"
                  ></input>
                  x mil
                </label>
                {errors.price && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="price"
                  />
                )}
              </div>
              <div>
                <label className="mr-1" htmlFor="paymentStatus">
                  Estado de pago:
                </label>
                <Field id="paymentStatus" name="paymentStatus" as="select">
                  <option value="">Selecciona</option>

                  {Object.keys(PAYMENT_STATUSES).map((payment_status) => (
                    <option value={payment_status} key={payment_status}>
                      {(() => {
                        switch (payment_status) {
                          case PAYMENT_STATUSES.PAID:
                            return 'PAGO';
                          case PAYMENT_STATUSES.PENDING:
                            return 'PENDIENTE';
                          case PAYMENT_STATUSES.PARTIALLY_PAID:
                            return 'PARCIALMENTE';
                        }
                      })()}
                    </option>
                  ))}
                </Field>
                {errors.paymentStatus && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="paymentStatus"
                  />
                )}
              </div>

              <div hidden={!showParcialPayment}>
                <label>Abono: </label>
                <Field initialValue="0" name="parcialPayment" type="number" />
                <label>
                  <input
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue(
                          'parcialPayment',
                          values.parcialPayment * 1000
                        );
                      } else {
                        e.target.form.parcialPayment.focus();
                        if (
                          values.parcialPayment % 1000 === 0 &&
                          values.parcialPayment > 0
                        ) {
                          setFieldValue(
                            'parcialPayment',
                            values.parcialPayment / 1000
                          );
                        }
                      }
                    }}
                    type="checkbox"
                  />
                  X mil
                </label>
                {errors.parcialPayment && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="parcialPayment"
                  />
                )}
              </div>
              <div>
                <label className="mr-1">Cuenta activa:</label>
                <label className="mr-2">
                  <Field value="1" type="radio" name="active" />
                  SI
                </label>
                <label>
                  <Field value="0" type="radio" name="active" />
                  NO
                </label>
              </div>
              <div>
                <label className="d-block">
                  <input
                    className="mr-1"
                    type="checkbox"
                    checked={showAdditionalInfo}
                    name="additionalInfoCheckBox"
                  />
                  Info adicional
                </label>
                <Field
                  hidden={!showAdditionalInfo}
                  placeholder="Escribe tu info aqui"
                  cols="25"
                  rows="4"
                  as="textarea"
                  id="additionalInfo"
                  name="additionalInfo"
                ></Field>
                {errors.additionalInfo && (
                  <ErrorMessage
                    className="text-danger"
                    component="div"
                    name="additionalInfo"
                  />
                )}
              </div>
              <div>
                <button
                  className="btn btn-info"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Guardar
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddPlatformForm;
