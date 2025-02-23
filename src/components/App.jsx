import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchBox from './SearchBox/SearchBox';
import initContacts from './contacts.json';
import s from './App.module.css';
import Notification from './Notification/Notification';
import { nanoid } from 'nanoid';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const LS_KEY = 'Contacts-cd330120-98f4-4795-8a1e-2acb7efad19c';

function App() {
  //Довідник контактів
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_KEY)) ?? initContacts
  );
  //Фільтр від користувача
  const [filter, setFilter] = useState('');
  //Текст в placeholder - підсказка для користувача
  const [placeholder, setPlaceholder] = useState('');
  //Індекс масиву значень для placeholder - підсказка для користувача
  const [currentIndex, setCurrentIndex] = useState(0);
  //Масив значень для placeholder - підсказка для користувача
  const [placeholderData, setPlaceholderData] = useState(() =>
    initContacts.map(item => item.name.toLowerCase().trim())
  );

  //Функція додавання контактів
  const addContact = newContact => {
    const find = contacts.find(contact => contact.number === newContact.number);
    if (find) {
      // toast('Wow so easy !');
      toast.error('The phone already exists', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      return;
    }
    newContact.id = nanoid();
    setContacts(prev => [...prev, newContact]);
    toast.success('Сontact added', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  };

  //Функція видалення контактів
  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  const text = placeholderData[currentIndex];
  let symbolIndex = 0;

  //Хук для динамічного placeholder
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholder(prev => {
        symbolIndex++;
        if (symbolIndex > text.length) {
          symbolIndex = 0; // скидаємо індекс після того, як текст завершився
          setCurrentIndex(
            prevIndex => (prevIndex + 1) % placeholderData.length
          ); // змінюємо текст з масиву
        }

        return text.slice(0, symbolIndex); // відображаємо частину тексту
      });
    }, 800); // змінюємо кожні 800 мс

    return () => clearInterval(intervalId); // очищаємо інтервал після демонтажу
  }, [currentIndex, text]);

  //Функція для пошуку контактів
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase().trim())
  );

  //Хук для зберігання довідника контактів в localStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm newContact={addContact} />
      {contacts.length <= 1 ? (
        <></>
      ) : (
        <SearchBox
          value={filter}
          onSearch={setFilter}
          placeholderText={placeholder}
        />
      )}
      {contacts.length === 0 ? (
        <Notification />
      ) : (
        <ContactList contacts={visibleContacts} onDelete={deleteContact} />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
