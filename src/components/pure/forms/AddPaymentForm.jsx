import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addPayment, removePayment } from '../../../features/payments';

import * as Yup from 'yup';
import React, { useEffect, useState, useRef } from 'react';

const AddPaymentForm = () => {
  const dispatch = useDispatch();
  const [cursorPointerClass, setCPC] = useState('cursor-pointer');
  const [lastPaymentMethodTried, setLPMT] = useState(null);
  const submittingRef = useRef(null);
  const setFieldValueRef = useRef(null);
  const paymentListRef = useRef(null);

  const paymentsEnum = useSelector((state) => state.payments.enum);

  useEffect(() => {
    if (
      lastPaymentMethodTried &&
      paymentsEnum.hasOwnProperty(lastPaymentMethodTried)
    ) {
      console.log('ya se guardo PM: ', paymentsEnum);
      setLPMT(null);
      setCPC('cursor-pointer');
      //hacer scroll hasta el ultimo item (recien agregado)
      paymentListRef.current.scrollTop =
        paymentListRef.current.scrollHeight -
        paymentListRef.current.clientHeight;

      if (submittingRef.current && setFieldValueRef) {
        //setSubmitting(false)
        submittingRef.current(false);
        //vaciar input
        setFieldValueRef.current('paymentMethodName', '');
      }
    }
  }, [paymentsEnum]);

  function addPaymentMethod(paymentMethodName) {
    console.log('linea 13 addPaymentFOrm', paymentMethodName);
    setLPMT(paymentMethodName);
    dispatch(addPayment(paymentMethodName));
  }

  const schema = Yup.object().shape({
    paymentMethodName: Yup.string().required('Ingresa un metodo de pago'),
  });
  const initialValues = {
    paymentMethodName: '',
  };
  //onNameChanges
  function onNameChanges(e, setFieldValue) {
    var userNameValue = e.target.value;
    var fieldName = 'paymentMethodName';
    setFieldValue(fieldName, userNameValue.toUpperCase());
  }

  //onSubmit
  function onSubmit(values, { setSubmitting, setFieldValue }) {
    const { paymentMethodName } = values;
    try {
      if (paymentsEnum.hasOwnProperty(paymentMethodName)) {
        setSubmitting(false);
        return;
      }
      setCPC('disabled-icon');
      addPaymentMethod(paymentMethodName);
      submittingRef.current = setSubmitting;
      setFieldValueRef.current = setFieldValue;
      console.log(paymentMethodName);
    } catch (err) {
      console.log(err);
    }
  }

  function deletePaymentMethod(e, paymentMethod) {
    if (!e.target.className.includes('cursor-pointer')) return;
    console.log('hshs');
    e.target.className = e.target.className.replace('cursor-pointer', '');
    e.target.className = e.target.className + 'disabled-icon';
    dispatch(removePayment(paymentMethod));
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
          ref={paymentListRef}
          style={{ overflowY: 'scroll', height: '30vh', padding: '20px' }}
        >
          {Object.keys(paymentsEnum).map((paymentMethod) => {
            return (
              <li className="position-relative " key={paymentsEnum}>
                {paymentMethod}
                <span style={{ position: 'absolute', right: 0 }}>
                  <i
                    onClick={(e) => deletePaymentMethod(e, paymentMethod)}
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
                <h3>Agregar metodo pago</h3>
              </div>
              <div className="text-center">
                <label
                  style={{ display: 'block', fontSize: '20px' }}
                  htmlFor="paymentMethodName"
                >
                  Nombre del metodo
                </label>
                <Field
                  onChange={(e) => {
                    onNameChanges(e, setFieldValue);
                  }}
                  id="paymentMethodName"
                  type="text"
                  name="paymentMethodName"
                />
                {errors.paymentMethodName && (
                  <ErrorMessage
                    style={{ color: 'red' }}
                    name="paymentMethodName"
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

export default AddPaymentForm;
