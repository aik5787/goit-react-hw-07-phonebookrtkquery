import { configureStore } from '@reduxjs/toolkit';
import { filterSlice } from './filterSlice';
import { contactsApi } from './contactsApi';

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
