import Vuex from 'vuex';

const cookieparser = require('cookieparser');
const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null
    },
    mutations: {
      update(state, data) {
        state.auth = data;
      }
    },
    actions: {
      nuxtServerInit({
        commit
      }, {
        req
      }) {
        let authToken = null;
        if (req.headers.cookie) {
          const parsed = cookieparser.parse(req.headers.cookie);

          authToken = parsed.jwtToken;
        }
        commit('update', authToken)
      }
    }
  })
}

export default createStore;
