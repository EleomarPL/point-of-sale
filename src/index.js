import {render} from 'react-dom';
import App from './App';

import './styles/index.css';

var mountNode = document.getElementById('root');
render(<App />, mountNode);