import { createApp } from 'vue';
import App from './App.vue';

import { createBootstrap } from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import router from './router';

library.add(fas, fab, far);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(createBootstrap());
app.use(router);
app.mount('#app');
