let initialState = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  result: {},
  err: {},
};

let loginReducers = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'USER_LOGIN_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'USER_LOGIN_REJECTED':
      return {
        ...state,
        isRejected: true,
        isPending: false,
        err: payload,
      };
    case 'USER_LOGIN_FULFILLED':
      return {
        ...state,
        isFulfilled: true,
        isPending: false,
        result: payload,
      };

    default:
      return state;
  }
};

export default loginReducers;
