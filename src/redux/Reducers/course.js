let initialState = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  info: {},
  result: {},
  err: {},
};
export const courseReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'GET_DATA_COURSE_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_DATA_COURSE_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        error: payload,
      };
    case 'GET_DATA_COURSE_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        info: payload.data.info,
        result: payload.data.result,
      };

    default:
      return state;
  }
};
export const myClassReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case 'GET_MYCLASS_PENDING':
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_MYCLASS_REJECTED':
      return {
        ...state,
        isPending: false,
        isRejected: true,
        error: payload,
      };
    case 'GET_MYCLASS_FULFILLED':
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        result: payload.data.result,
      };

    default:
      return state;
  }
};
