//Імпортуємо функцію createAction
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState: {
    items: [
      {
        id: 'id-1',
        name: 'Rosie Simpson',
        number: '459-112-5446',
        group: 'family',
      },
      {
        id: 'id-2',
        name: 'Hermione Kline',
        number: '443-892-1122',
        group: 'work',
      },
      {
        id: 'id-3',
        name: 'Eden Clements',
        number: '645-172-7339',
        group: 'other',
      },
      {
        id: 'id-4',
        name: 'Annie Copeland',
        number: '227-916-1526',
        group: 'other',
      },
    ],
  },
  // Об'єкт case-редюсерів
  reducers: {
    addContact: (state, action) => {
      // ✅ Immer замінить це на операцію оновлення
      state.items.push(action.payload);
    },
    deleteContact: (state, action) => {
      // ✅ Immer замінить це на операцію оновлення
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

// Експортуємо фабрики екшенів
export const { addContact, deleteContact } = slice.actions;

// Експортуємо редюсер слайсу
export default slice.reducer;
