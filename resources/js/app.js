
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap')
window.Vue = require('vue')

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

import Vue from 'vue';
import Vuex from 'vuex';
import FileManager from './laravel-file-manager'
import VueClipboard from 'vue-clipboard2'
import Snotify from 'vue-snotify'

Vue.use(Vuex)
Vue.use(VueClipboard)
Vue.use(Snotify)
// create Vuex store, if you don't have it
const store = new Vuex.Store();

Vue.use(FileManager, {store});

const app = new Vue({
    store, // required
    headers: {'X-CSRF-TOKEN': 'token'}, // overwrite default header Axios
}).$mount('#app')
