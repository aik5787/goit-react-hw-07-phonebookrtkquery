import { useState } from 'react';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from '../../redux/contactsApi';
import {
  ContactFormContainer,
  FormLabel,
  FormInput,
  FormButton,
} from './ContactForm.styled';

export const ContactForm = () => {
  const { data: contacts } = useGetContactsQuery();
  // console.log(contacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [addContact] = useAddContactMutation();

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    setNumber(event.target.value);
  };
  const newContact = { name: name, number: number };

  const handleSubmit = event => {
    event.preventDefault();

    if (name.trim() === '' || number.trim() === '') return;

    const isExistingContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExistingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }
    addContact(newContact);
    setName('');
    setNumber('');
  };

  return (
    <ContactFormContainer onSubmit={handleSubmit}>
      <FormLabel htmlFor="nameInput">Name</FormLabel>
      <FormInput
        id="nameInput"
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleNameChange}
      />
      <FormLabel htmlFor="numberInput">Number</FormLabel>
      <FormInput
        id="numberInput"
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleNumberChange}
      />
      <FormButton type="submit" disabled={!name || !number}>
        Add contact
      </FormButton>
    </ContactFormContainer>
  );
};
