let initialState = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  isLogin: false,
  user: {},
  err: {},
};

let loginReducers = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'LOGIN_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isRejected: true,
        isPending: false,
        err: payload,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        isLogin: true,
        user: payload,
        err: {},
      };
    case 'LOGOUT':
      return {
        isPending: false,
        isRejected: false,
        isFulfilled: true,
        isLogin: false,
        user: {},
        err: {},
      };

    default:
      return state;
  }
};

export default loginReducers;
