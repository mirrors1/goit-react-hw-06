import { IoSearch } from 'react-icons/io5';
import s from './SearchBox.module.css';

const SearchBox = ({ value, onSearch, placeholderText }) => {
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
            value={value}
            placeholder={placeholderText}
            onChange={e => onSearch(e.target.value)}
          />
        </div>
      </label>
    </section>
  );
};
export default SearchBox;
