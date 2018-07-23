import Vuex from 'vuex';
import setAuthToken from '../utils/setAuthentication';

const cookieparser = require('cookieparser');
const createStore = () => {
  return new Vuex.Store({
    state: {
      auth: null,
      patient: null,
      user: null,
    },
    mutations: {
      setAuth(state, data) {
        state.auth = data;
      },
      setPatient(state, data) {
        state.patient = data;
      },
      setUser(state, data) {
        state.user = data;
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

          commit('setAuth', parsed.jwtToken);
          // set token for axios requests
          setAuthToken(`Bearer ${parsed.jwtToken}`);
          commit('setPatient', parsed.patient);
          commit('setUser', parsed.user);
        }
      }
    }
  })
}

export default createStore;
