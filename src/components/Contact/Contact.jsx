import { FaUserLarge, FaPhone, FaUserGroup } from 'react-icons/fa6';
import { IconContext } from 'react-icons';
import s from './Contact.module.css';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { nanoid } from 'nanoid';
//Імпортуємо хук
import { useDispatch } from 'react-redux';
//Імпортуємо фабрику екшену
import { deleteContact } from '../../redux/contactsSlice';

export default function Contact({ contact: { id, name, number, group } }) {
  //Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();
  const idTolltip = nanoid();
  const iconDataValue = {
    className: 'global-class-name-icon',
    size: '18px',
  };

  // Викликаємо фабрику екшену та передаємо ідентифікатор завдання
  // Відправляємо результат - екшен видалення завдання
  const handleDelete = () => {
    dispatch(deleteContact(id));
  };
  return (
    <>
      <div data-tooltip-id={idTolltip} className={s.contact}>
        <div className={s.containerTitle}>
          <IconContext.Provider value={iconDataValue}>
            <FaUserLarge className={s.icon} />
          </IconContext.Provider>
          <p className={s.name}>{name}</p>
          {name.length > 14 && (
            <ReactTooltip
              id={idTolltip}
              place="bottom"
              variant="info"
              content={name}
            />
          )}
        </div>
        <div className={s.containerPhone}>
          <IconContext.Provider value={iconDataValue}>
            <FaPhone className={s.icon} />
          </IconContext.Provider>
          <a className={s.phone} href={'tel:' + number}>
            {number}
          </a>
        </div>
        <div className={s.containerPhone}>
          <IconContext.Provider value={iconDataValue}>
            <FaUserGroup className={s.icon} />
          </IconContext.Provider>
          <p className={s.group}>{group}</p>
        </div>
      </div>
      {/* <button className={s.btn} onClick={() => onDelete(id)}></button> */}
      <button className={s.btn} onClick={handleDelete}>
        Delete
      </button>
    </>
  );
}
