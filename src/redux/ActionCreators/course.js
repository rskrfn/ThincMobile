import axios from 'axios';

export const newClassPaginated = url => {
  return {
    type: 'GET_COURSE_PAGINATED',
    payload: axios.get(url),
  };
};

export const myClassPaginated = (url, email) => {
  return {
    type: 'GET_MYCLASS_PAGINATED',
  };
};
