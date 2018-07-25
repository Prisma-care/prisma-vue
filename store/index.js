import cookie from 'cookie'
import {
  resolve
} from 'uri-js';
import authToken from '../utils/setAuthentication'

export const actions = {
  nuxtServerInit({
    dispatch
  }, context) {
    return new Promise((resolve, reject) => {
      const cookies = cookie.parse(context.req.headers.cookie || '')
      if (cookies.hasOwnProperty('authToken')) {
        authToken(cookies['authToken'])
        dispatch('auth/fetch')
          .then(result => {
            resolve(true)
          })
          .catch(error => {
            console.log('Token is invalid')
            authToken()
            resolve(false)
          })
      } else {
        authToken()
        resolve(false)
      }
    })
  }
}
