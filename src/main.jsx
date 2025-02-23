import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Імпорт стилів нормалізації
import 'modern-normalize';
import './index.css';
import App from './components/App.jsx';
//Імпортуємо провайдер
import { Provider } from 'react-redux';
//Імпортуємо створений раніше стор
import { persistor, store } from './redux/store';
//Імпортуємо PersistGate для роботи с локальним сховищем
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
