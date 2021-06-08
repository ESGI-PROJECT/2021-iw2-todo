import './task-app.js';
import checkConnectivity from './network.js';

checkConnectivity({ threshold: 2000 });

document.addEventListener('connection-changed', ({ detail }) => {
  console.log({ isOnline: detail });
});
