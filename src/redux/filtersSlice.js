//Імпортуємо функцію createAction
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  // Ім'я слайсу
  name: 'filters',
  // Початковий стан редюсера слайсу
  initialState: {
    status: 'all',
    name: '',
  },
  // Об'єкт case-редюсерів
  reducers: {
    changeFilter(state, action) {
      // ✅ Immer замінить це на операцію оновлення
      state.name = action.payload;
    },
    setStatusFilter(state, action) {
      // ✅ Immer замінить це на операцію оновлення
      state.status = action.payload;
    },
  },
});

// Експортуємо фабрики екшенів
export const { changeFilter, setStatusFilter } = slice.actions;

// Експортуємо редюсер слайсу
export default slice.reducer;
