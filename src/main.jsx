import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Theme } from '@radix-ui/themes';
import './index.css';
import "@radix-ui/themes/styles.css";
import { Provider } from 'react-redux';
import { store } from './app/store';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Theme>
      <Provider store={store}>
        <App />
      </Provider>
    </Theme>
  </BrowserRouter>,
)
