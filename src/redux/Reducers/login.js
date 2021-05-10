let initialState = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  isLogin: false,
  result: {},
  user: {},
  err: {},
};

let loginReducer = (state = initialState, action) => {
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
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        isLogin: true,
        user: payload,
      };
    case 'LOGOUT':
      return {
        isPending: false,
        isRejected: false,
        isFulfilled: true,
        isLogin: false,
        user: {},
      };

    default:
      return state;
  }
};

export default loginReducer;
