import { recDATA } from './js/app';
import { getInfo } from './js/getinfo';

import './styles/style.scss';
import './styles/form.scss';
import './styles/button.scss';
import './styles/data.scss';
import 'bootstrap';

export {
 recDATA,
 getInfo
}

document.getElementById('generate').addEventListener('click', recDATA);
