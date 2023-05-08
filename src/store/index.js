import Vuex from 'vuex';
import VuexPersistence from "vuex-persist";

import { user } from './modules/user';
import { todos } from './modules/todos';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  modules: {
    user,
    todos
  },
  plugins: [vuexLocal.plugin],
})
