import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { 
  getPaymentMethods,
  addPaymentMethod,
  deletePayment,
} from './paymentsAsync';

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async () => {
    const paymentsEnum = await getPaymentMethods();
    //console.log(paymentsEnum);
    return paymentsEnum;
  }
);

export const removePayment = createAsyncThunk(
  'payments/removePayment',
  async (paymentMethod) => {
    const paymentsEnum = await deletePayment(paymentMethod);
    //console.log(paymentsEnum);
    return paymentsEnum;
  }
);

export const addPayment = createAsyncThunk(
  'payments/addPayment',
  async (paymentMethod) => {
    //console.log('linea 16 payments.js', paymentMethod);
    const paymentsEnum = await addPaymentMethod(paymentMethod);
    //console.log(paymentsEnum);
    return paymentsEnum;
  }
);

const initialState = {
  loading: true,
  enum: {},
  error: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      state.enum = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addPayment.fulfilled, (state, action) => {
      state.enum = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removePayment.fulfilled, (state, action) => {
      state.enum = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

//export acctions if it is needed

export default paymentsSlice.reducer;
