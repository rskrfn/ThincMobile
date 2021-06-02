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
  let config = {
    method: 'POST',
    url: `${API_URL}/users/login`,
    data: data,
  };
  return dispatch => {
    dispatch({
      type: 'LOGIN_PENDING',
    });
    axios(config)
      .then(res => {
        dispatch({type: 'LOGIN_SUCCESS', payload: res.data.data});
      })
      .catch(err => {
        dispatch({
          type: 'LOGIN_REJECTED',
          payload: err.response,
        });
      });
  };
}
export function logoutHandler() {
  return dispatch => {
    dispatch({type: 'LOGOUT'});
  };
}
