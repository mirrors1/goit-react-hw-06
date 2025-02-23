import { ContactCounter } from '../ContactCounter/ContactCounter';
import { StatusFilter } from '../StatusFilter/StatusFilter';
import s from './AppBar.module.css';

const AppBar = () => {
  return (
    <header className={s.wrapper}>
      <section className={s.section}>
        <h2 className={screen.title}>Contacts</h2>
        <ContactCounter />
      </section>
      <section className={s.section}>
        <h2 className={s.title}>Filter by group</h2>
        <StatusFilter />
      </section>
    </header>
  );
};
export default AppBar;
