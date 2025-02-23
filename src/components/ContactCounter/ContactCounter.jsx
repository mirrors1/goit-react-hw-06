import s from './ContactCounter.module.css';
import { useSelector } from 'react-redux';

export const ContactCounter = () => {
  // Отримуємо масив завдань із стану Redux
  const contacts = useSelector(state => state.contacts.items);

  // На базі стану Redux отримуємо похідні дані
  const count = contacts.reduce(
    (acc, contacts) => {
      if (contacts.group === 'family') {
        acc.family += 1;
      } else if (contacts.group === 'work') {
        acc.work += 1;
      } else {
        acc.other += 1;
      }
      return acc;
    },
    { family: 0, work: 0, other: 0 }
  );
  return (
    <div className={s.list}>
      <p className={s.text}>Total: {contacts.length}</p>
      <p className={s.text}>Family: {count.family}</p>
      <p className={s.text}>Work: {count.work}</p>
      <p className={s.text}>Other: {count.other}</p>
    </div>
  );
};
