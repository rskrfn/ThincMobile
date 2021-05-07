import axios from 'axios';

export let userData = data => {
  return {
    type: 'USERDATA',
    payload: data,
  };
};
export let userRegister = (url, auth) => {
  return {
    type: 'USER_REGISTER',
    payload: axios.post(url, auth),
  };
};
export let userLogin = (url, auth) => {
  return {
    type: 'USER_LOGIN',
    payload: axios.post(url, auth),
  };
};
