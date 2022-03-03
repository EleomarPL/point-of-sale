import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { AuthProvider } from './contexts/Auth';
import App from './App';

import './styles/index.css';

let mountNode = document.getElementById('root');
render(
  <AuthProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </AuthProvider>,
  mountNode
);