import { IoSearch } from 'react-icons/io5';
import s from './SearchBox.module.css';
import { useEffect, useState } from 'react';
//Імпортуємо хук
import { useDispatch, useSelector } from 'react-redux';
//Імпортуємо фабрику екшену
import { changeFilter } from '../../redux/filtersSlice';

// const SearchBox = { value, onSearch, placeholderText };
const SearchBox = () => {
  //Фільтр від користувача
  const [filter, setFilter] = useState('');
  //Текст в placeholder - підсказка для користувача
  const [placeholder, setPlaceholder] = useState('');
  //Індекс масиву значень для placeholder - підсказка для користувача
  const [currentIndex, setCurrentIndex] = useState(0);
  //Отримуємо масив контактів із стану Redux
  const contacts = useSelector(state => state.contacts.items);
  //Масив значень для placeholder - підсказка для користувача
  const [placeholderData, setPlaceholderData] = useState(() =>
    contacts.map(item => item.name.toLowerCase().trim())
  );
  //Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();

  //Хук для пошуку контакту
  useEffect(() => {
    dispatch(changeFilter(filter));
  }, [filter]);

  //Хук для зміни масиву значень для placeholder
  useEffect(() => {
    if (contacts.length) {
      setPlaceholderData(contacts.map(item => item.name.toLowerCase().trim()));
      return;
    }
    setPlaceholderData(['enter name...']);
  }, [contacts]);

  const text = placeholderData[currentIndex];
  let symbolIndex = 0;

  //Хук для динамічного placeholder
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholder(prev => {
        symbolIndex++;
        if (!text) return;
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

  return (
    <section className={s.container}>
      <label className={s.label}>
        Find contacts by name
        <div>
          <IoSearch className={s.icon} />
          <input
            id="dynamicInput"
            className={s.input}
            type="text"
            placeholder={placeholder}
            onChange={e => setFilter(e.target.value)}
          />
        </div>
      </label>
    </section>
  );
};
export default SearchBox;
