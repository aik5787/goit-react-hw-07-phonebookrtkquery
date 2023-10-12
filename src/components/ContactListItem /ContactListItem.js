import { useDispatch, useSelector } from 'react-redux';
import { getContacts, getLoading, getError } from 'redux/contactsSlice';
import { getFilter } from 'redux/filterSlice';
import { deleteContact, fetchContacts } from 'redux/contactsOperations';
import { useEffect } from 'react';

import {
  ListItem,
  ListItemWrapper,
  ListItemInfo,
  ListItemButton,
} from './ContactListItem.styled';

export const ContactListItem = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getFilteredContacts = () => {
    if (!contacts) return [];
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = getFilteredContacts();
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }
  if (contacts.length > 0) {
    return filteredContacts.map(contact => (
      <ListItem key={contact.id}>
        <ListItemWrapper>
          <ListItemInfo>
            {contact.name}: {contact.number}
          </ListItemInfo>
          <ListItemButton onClick={() => dispatch(deleteContact(contact.id))}>
            Delete
          </ListItemButton>
        </ListItemWrapper>
      </ListItem>
    ));
  }
};
