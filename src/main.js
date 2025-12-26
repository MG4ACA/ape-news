import Aura from '@primevue/themes/aura';
import { createPinia } from 'pinia';
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import BadgeDirective from 'primevue/badgedirective';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Checkbox from 'primevue/checkbox';
import Column from 'primevue/column';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';
import InputNumber from 'primevue/inputnumber';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import Menu from 'primevue/menu';
import Menubar from 'primevue/menubar';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import Paginator from 'primevue/paginator';
import Password from 'primevue/password';
import ProgressSpinner from 'primevue/progressspinner';
import Tag from 'primevue/tag';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import { createApp } from 'vue';
import App from './App.vue';
import i18n from './i18n';
import router from './router';

import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import './assets/main.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(ToastService);
app.use(ConfirmationService);
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

// Register global components
app.component('Avatar', Avatar);
app.component('Badge', Badge);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('Card', Card);
app.component('Chart', Chart);
app.component('Checkbox', Checkbox);
app.component('Column', Column);
app.component('ConfirmDialog', ConfirmDialog);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('Dropdown', Dropdown);
app.component('FileUpload', FileUpload);
app.component('Image', Image);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Menu', Menu);
app.component('Menubar', Menubar);
app.component('Message', Message);
app.component('MultiSelect', MultiSelect);
app.component('Paginator', Paginator);
app.component('Password', Password);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Tag', Tag);
app.component('Textarea', Textarea);
app.component('Toast', Toast);

// Register directives
app.directive('badge', BadgeDirective);
app.directive('tooltip', Tooltip);

app.mount('#app');
