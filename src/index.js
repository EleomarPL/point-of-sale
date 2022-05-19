import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/Auth';
import App from './App';

import './styles/index.css';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <AuthProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthProvider>
);