import { Button } from '../Button/Button';
import css from './StatusFilter.module.css';
//Імпортуємо хук
import { useSelector, useDispatch } from 'react-redux';
//Імпортуємо фабрику екшену
import { setStatusFilter } from '../../redux/filtersSlice';

export const StatusFilter = () => {
  // Отримуємо посилання на функцію відправки екшенів
  const dispatch = useDispatch();
  const filterStatus = useSelector(state => state.filters.status);

  //Викликаємо фабрику екшену та передаємо значення фільтра
  //Відправляємо результат - екшен зміни фільтра
  const handleFilterChange = filterStatus =>
    dispatch(setStatusFilter(filterStatus));

  return (
    <div className={css.wrapper}>
      <Button
        onClick={() => handleFilterChange('all')}
        selected={filterStatus === 'all'}
      >
        All
      </Button>
      <Button
        onClick={() => handleFilterChange('family')}
        selected={filterStatus === 'family'}
      >
        Family
      </Button>
      <Button
        onClick={() => handleFilterChange('work')}
        selected={filterStatus === 'work'}
      >
        Work
      </Button>
      <Button
        onClick={() => handleFilterChange('other')}
        selected={filterStatus === 'other'}
      >
        Other
      </Button>
    </div>
  );
};
