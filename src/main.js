import { createApp } from 'vue';
import { OktaAuth } from '@okta/okta-auth-js';
import OktaVue from '@okta/okta-vue';
import { OAUTH_ISSUER, CLIENT_ID } from '@/shared';
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

const oktaAuth = new OktaAuth({
  issuer: `${OAUTH_ISSUER}`,
  clientId: `${CLIENT_ID}`,
  redirectUri: `${window.location.origin}/login/callback`,
  scopes: ['openid', 'profile', 'email'],
});

app.use(OktaVue, { oktaAuth });

app.use(store);
app.use(router);
app.mount('#app');
