import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOperations';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleFetchFullfilled = (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
};

const handleAddFullfilled = (state, action) => {
  state.isLoading = false;
  state.items.push(action.payload);
};
const handleDeleteFullfilled = (state, action) => {
  state.isLoading = false;
  state.items = state.items.filter(contact => contact.id !== action.payload);
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.items = action.payload;
};
export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialState,
  extraReducers: builder => {
    builder
      // .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, handleFetchFullfilled)
      // .addCase(fetchContacts.rejected, handleRejected)
      // .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, handleAddFullfilled)
      // .addCase(addContact.rejected, handleRejected)
      // .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, handleDeleteFullfilled)

      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending
        ),
        handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected
        ),
        handleRejected
      );
  },
});

export const getContacts = state => state.contacts.items;
export const getLoading = state => state.contacts.isLoading;
export const getError = state => state.contacts.error;
