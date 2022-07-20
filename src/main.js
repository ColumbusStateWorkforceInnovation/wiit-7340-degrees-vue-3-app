import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

app.config.globalProperties.$filters = {
  capitalize(value) {
    if (!value) return '';
    // eslint-disable-next-line no-param-reassign
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  },
};

app.use(store);
app.use(router);
app.mount('#app');
