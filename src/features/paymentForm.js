import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initalState = {
  show:false,
};
const paymentFormSlice = createSlice({
  name:"paymentForm",
  reducer:{
    setPaymentFormStatus:(state, action)=>{
      state.show=action.payload;
    }
  }
})

export const {setPaymentFormStatus} = paymentFormSlice.actions;

export default paymentFormSlice.reducer;