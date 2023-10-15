import { useSelector } from 'react-redux';
import { getFilter } from 'redux/filterSlice';
// import { useEffect } from 'react';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsApi';

import {
  ListItem,
  ListItemWrapper,
  ListItemInfo,
  ListItemButton,
} from './ContactListItem.styled';

export const ContactListItem = () => {
  const { data: contacts } = useGetContactsQuery();
  const [deleteContact, delInfo] = useDeleteContactMutation();
  // console.log(delInfo);
  const filter = useSelector(getFilter);

  const getFilteredContacts = () => {
    if (!contacts) return [];
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = getFilteredContacts();
  if (delInfo.isLoading) {
    return <h2>Loading...</h2>;
  }

  if (delInfo.error) {
    return <h2>{delInfo.error.message}</h2>;
  }
  if (contacts && contacts.length > 0) {
    return filteredContacts.map(contact => (
      <ListItem key={contact.id}>
        <ListItemWrapper>
          <ListItemInfo>
            {contact.name}: {contact.number}
          </ListItemInfo>
          <ListItemButton onClick={() => deleteContact(contact.id)}>
            Delete
          </ListItemButton>
        </ListItemWrapper>
      </ListItem>
    ));
  }
};
