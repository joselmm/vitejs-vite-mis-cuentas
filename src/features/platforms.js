import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import Client class

import {
  getPlatforms,
  deletePlatformById,
  insertPlatform,
} from './platformsAsync';

export const fetchPlatforms = createAsyncThunk(
  'platforms/fetchPlatforms',
  async () => {
    const platformList = await getPlatforms();
    //console.log('plaforms en reducer fetchPlatforms', platformList);
    return platformList;
  }
);

export const removePlatform = createAsyncThunk(
  'platforms/removePlatform',
  async (platformId) => {
    console.log('platform id recibida en remove platform: ', platformId);
    const platformList = await deletePlatformById(platformId);
    //console.log('plaforms en reducer fetchPlatforms', platformList);
    return platformList;
  }
);

export const addPlatform = createAsyncThunk(
  'platforms/addPlatform',
  async (platform) => {
    console.log('platform recibida en addPlatform action: ', platform);
    const platformList = await insertPlatform(platform);
    //console.log('plaforms en reducer fetchPlatforms', platformList);
    return platformList;
  }
);
//initial state

const initialState = {
  value: [],
  loading: true,
  error: null,
  platformToDeleteId: null,
  clientToAddPlatformId: null,
  platformToEditId: null,
};

const platformsSlice = createSlice({
  name: 'platforms',
  initialState: initialState,
  reducers: {
    setPlatforms:(state, action)=>{
      // se usa para cuando se borra un cliente implica que se borren su plataformas
      state.value=action.payload;
    },
    setPlatformToDeleteId: (state, action) => {
      state.platformToDeleteId = action.payload;
    },
    setClientToAddPlatformId: (state, action) => {
      state.clientToAddPlatformId = action.payload;
      state.platformToEditId = null;
    },
    setPlatformToEditId: (state, action) => {
      state.platformToEditId = action.payload;
      state.clientToAddPlatformId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlatforms.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removePlatform.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addPlatform.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  setPlatforms, 
  setPlatformToDeleteId,
  setClientToAddPlatformId,
  setPlatformToEditId,
} = platformsSlice.actions;

export default platformsSlice.reducer;
