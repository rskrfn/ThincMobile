import axios from 'axios';
import {API_URL} from '@env';

export let userRegister = (url, auth) => {
  return {
    type: 'USER_REGISTER',
    payload: axios.post(url, auth),
  };
};
// export let userLogin = (url, auth) => {
//   return {
//     type: 'USER_LOGIN',
//     payload: axios.post(url, auth),
//   };
// };

export function loginHandler(data) {
  return dispatch => {
    dispatch({
      type: 'LOGIN_PENDING',
    });
    axios
      .post(`${API_URL}/users/login`, data)
      .then(res => {
        dispatch({type: 'LOGIN_SUCCESS', payload: res.data});
      })
      .catch(err => {
        dispatch({
          type: 'LOGIN_ERROR',
          payload: err,
        });
      });
  };
}
