import * as types from "./actiontype.js";

const init = {
  loading: false,
  userId: null,
  adminId: null,
  adminName: null,
  error: "",
  userName: null,
  quizTitle: "",
  QuizData: [],
  result: [],
  questions: [],
  Alluser: [], // Store all user data here
  ans: [],
};

export const QuizReducer = (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ALL_USER_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
      };
    case types.GET_ALL_USER_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        Alluser: payload, // Update the state with fetched user data
      };
    case types.GET_ALL_USER_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};