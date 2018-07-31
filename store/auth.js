import api from '~/api';
import authToken from '../utils/setAuthentication';
import cookies from 'js-cookie';

export const state = () => ({
  user: null,
});

export const mutations = {
  set_user(store, data) {
    store.user = data;
  },
  reset_user(store, data) {
    store.user = null;
  },
};

export const actions = {
  fetch({ commit }) {
    return api.auth
      .me()
      .then(response => {
        commit('set_user', response.data.result);
        return response;
      })
      .catch(err => {
        commit('reset_user');
        return error;
      });
  },
  login({ commit }, data) {
    return api.auth.login(data).then(response => {
      const { token } = response.data.response;
      commit('set_user', response.data);
      authToken(token);
      cookies.set('authToken', token, {
        expires: 7,
      });
      return response;
    });
  },
};
