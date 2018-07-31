import axios from 'axios';

export default {
  auth: {
    me: () => axios.get('user'),
    login: data => axios.post('user/signin', data),
  },
  stories: {
    getStories: patientId => axios.get(`patient/${patientId}/album`),
  },
};
