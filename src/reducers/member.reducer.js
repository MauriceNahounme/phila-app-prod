import { GET_MEMBER } from "../actions/member.actions";

const initialState = {};

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBER:
      return action.payload;

    default:
      return state;
  }
};

export default memberReducer;
