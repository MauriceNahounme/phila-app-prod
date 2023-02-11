import { GET_ADMIN } from "../actions/admin.actions";

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMIN:
      return action.payload;

    default:
      return state;
  }
};

export default userReducer;
