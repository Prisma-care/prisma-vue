import api from '~/api';
import authToken from '../utils/setAuthentication'
import cookies from 'js-cookie';
import axios from 'axios';

export const state = () => ({
  stories: null
})

export const mutations = {
  set_stories(store, data) {
    store.stories = data
  },
}

export const actions = {
  fetch({
    commit
  }, patientId) {
    return api.stories.getStories(patientId)
      .then(response => {

        commit('set_stories', response.data.result)
        return response

      })
      .catch(err => {
        commit('set_stories', null)
        return err
      })
  }
}
