import Contact from '../Contact/Contact';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';

const getFilterStatusContacts = (contacts, statusFilter) => {
  switch (statusFilter) {
    case 'family':
      return contacts.filter(contacts => contacts.group === 'family');
    case 'work':
      return contacts.filter(contacts => contacts.group === 'work');
    case 'other':
      return contacts.filter(contacts => contacts.group === 'other');
    default:
      return contacts;
  }
};

// const ContactList = ({ contacts, onDelete }) => (
const ContactList = () => {
  //Отримуємо масив контактів із стану Redux
  const contacts = useSelector(state => state.contacts.items);
  //Отримуємо значення фільтра status із стану Redux
  const statusFilter = useSelector(state => state.filters.status);
  //Отримуємо значення фільтра пошуку по імені із стану Redux
  const nameFilter = useSelector(state => state.filters.name);
  //Обчислюємо масив контактів, відфільтрованими по статусу
  const сontactsFilterStatus = getFilterStatusContacts(contacts, statusFilter);
  //Обчислюємо масив контактів, які необхідно відображати в інтерфейсі
  const visibleContacts = сontactsFilterStatus.filter(contact =>
    contact.name.toLowerCase().includes(nameFilter.toLowerCase().trim())
  );
  return (
    <ul className={s.list}>
      {visibleContacts.map(contact => (
        <li className={s.item} key={contact.id}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};
export default ContactList;
