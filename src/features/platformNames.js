import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPlatformNames,
  insertPlatformName,
  deletePlatformName,
} from './platformNamesAsync';

export const fetchPlatformNames = createAsyncThunk(
  'platformNames/fetchPlatformNames',
  async () => {
    const platformNamesEnum = await getPlatformNames();
    //console.log(platformNamesEnum);
    return platformNamesEnum;
  }
);

export const removePlatformName = createAsyncThunk(
  'platformNames/removePlatformName',
  async (platformName) => {
    //console.log("action recibido ", platformName)
    const platformNamesEnum = await deletePlatformName(platformName);
    //console.log(platformNamesEnum);
    return platformNamesEnum;
  }
);

export const addPlatformName = createAsyncThunk(
  'platformNames/addPlatformName',
  async (platformName) => {
    // console.log('recibido add:', platformName);
    const platformNamesEnum = await insertPlatformName(platformName);
    //console.log(platformNamesEnum);
    return platformNamesEnum;
  }
);

const initialState = {
  loading: true,
  enum: {},
  error: null,
};

const platformNamesSlice = createSlice({
  name: 'platformNames',
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPlatformNames.fulfilled, (state, action) => {
      state.enum = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addPlatformName.fulfilled, (state, action) => {
      state.enum = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removePlatformName.fulfilled, (state, action) => {
      state.enum = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

//export acctions if it is needed

export default platformNamesSlice.reducer;
