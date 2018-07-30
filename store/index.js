import cookieparser from 'cookieparser';
import {
  resolve
} from 'uri-js';
import authToken from '../utils/setAuthentication'

export const actions = {
  nuxtServerInit({
    commit
  }, {
    req
  }) {
    let token = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      token = parsed.authToken;
    }

    commit('set_user', token)
  }
}
