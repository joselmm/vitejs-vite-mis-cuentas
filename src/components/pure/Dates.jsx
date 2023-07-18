import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import '../../constants/luxon.config';
import { DateTime } from 'luxon';
//import

//setDefaultLocale('es',es)
import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const Dates = ({ onChange, values, setFieldValue }) => {
  const initialValue =
    typeof values.lastBillingDate === 'string'
      ? new Date(values.lastBillingDate)
      : new Date();

  const [startDate, setStartDate] = useState(initialValue);

  function handle(date) {
    setStartDate(date);
    const d = DateTime.local(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    setFieldValue('lastBillingDate', d.toString());
    //(days, lastBillingDate, setFieldValue)
    
    onChange(values.usageTime, d.toString(), setFieldValue);
    //console.log('valor a guardar de la ultima fecha: ' + d.toString());
  }

  return <DatePicker selected={startDate} onChange={handle} />;
};

export default Dates;
