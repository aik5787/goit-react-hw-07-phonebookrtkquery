import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { Container, TitleHone, TitleHtwo } from './App.styled';

export const App = () => {
  return (
    <Container>
      <TitleHone>Phonebook</TitleHone>
      <ContactForm />
      <TitleHtwo>Contacts</TitleHtwo>
      <ContactFilter />
      <ContactList />
    </Container>
  );
};
