import axios from 'axios';
import {API_URL} from '@env';

export let userRegister = (url, auth) => {
  return {
    type: 'USER_REGISTER',
    payload: axios.post(url, auth),
  };
};
// export let loginAction = data => {
//   return {
//     type: 'USER_LOGIN',
//     payload: axios.post(`${API_URL}/users/login`, data),
//   };
// };

export function loginAction(data) {
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
          type: 'LOGIN_REJECTED',
          payload: err,
        });
      });
  };
}
export function logoutHandler() {
  return dispatch => {
    dispatch({type: 'LOGOUT'});
  };
}
