import axios from "axios";
import { BASE_URL } from "../config";

export const GET_MEMBER = "GET_MEMBER";

export const getMember = (member) => {
  return (dispatch) => {
    return axios
      .get(`${BASE_URL}/members/${member._id}`)
      .then((value) => {
        dispatch({
          type: GET_MEMBER,
          payload: value.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
