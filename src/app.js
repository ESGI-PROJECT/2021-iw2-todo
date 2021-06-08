import page from 'page';

import './task-app.js';
import checkConnectivity from './network.js';

checkConnectivity({ threshold: 2000 });

page('/', () => {
  import('./views/task-list.js');
});

page();
