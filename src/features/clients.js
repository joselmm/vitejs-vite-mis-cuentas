import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
//import Client class
import Client from '../models/client.class';
import {
  getClients,
  removeClientById,
  updateClientById,
  addNewCLient,
} from './clientAsync';

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async () => {
    const clientList = await getClients();
    //console.log('clientList en reducer fetchClients', clientList);
    return clientList;
  }
);

export const removeClient = createAsyncThunk(
  'clients/removeClient',
  async (id) => {
    const clientList = await removeClientById(id);
    //console.log('clientList en reducer fetchClients', clientList);
    return clientList;
  }
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async (client) => {
    //console.log('client recibido en action: ', client);
    const clientList = await updateClientById(client);
    //console.log('clientList en reducer fetchClients', clientList);
    return clientList;
  }
);

export const addClient = createAsyncThunk(
  'clients/addClient',
  async (client) => {
    //console.log('client recibido en action: ', client);
    const clientList = await addNewCLient(client);
    //console.log('clientList en reducer fetchClients', clientList);
    return clientList;
  }
);

const defaultClient = new Client({
  name: 'Lastenia',
  contact: '3205742543',
});

const defaultClient2 = new Client({
  name: 'Luis',
  contact: '3215510102',
});

const initialState = {
  value: [],
  loading: true,
  error: null,
  clientSelected: null,
  clientToDeleteId: null,
  clientToEditId: null,
};

const clientsSlice = createSlice({
  name: 'clients',
  initialState: initialState,
  reducers: {
    setClientList: (state, action) => {
      console.log('dd', action);
      return {
        value: action.payload,
        loading: false,
        error: null,
      };
    },
    setClientToDeleteId: (state, action) => {
      state.clientToDeleteId = action.payload;
    },
    setClientToEditId: (state, action) => {
      state.clientToEditId = action.payload;
    },
    setSelectedClient: (state, action) => {
      state.clientSelected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateClient.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(removeClient.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    }); 
    builder.addCase(addClient.fulfilled, (state, action) => {
      state.value = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export const {
  setClientToDeleteId,
  setClientToEditId,
  setSelectedClient,
  setClientList,
} = clientsSlice.actions;

export default clientsSlice.reducer;
