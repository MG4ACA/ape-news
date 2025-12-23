import Aura from '@primevue/themes/aura';
import Button from 'primevue/button';
import PrimeVue from 'primevue/config';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import Textarea from 'primevue/textarea';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './assets/main.css';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false,
    },
  },
});

app.component('Button', Button);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('Menubar', Menubar);
app.component('Message', Message);
app.component('Textarea', Textarea);

app.mount('#app');
