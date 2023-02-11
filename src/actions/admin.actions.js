import axios from "axios";
import { BASE_URL } from "../config";

export const GET_ADMIN = "GET_ADMIN";

export const getAdmin = (admin) => {
  return (dispatch) => {
    return axios
      .get(`${BASE_URL}/users/${admin._id}`)
      .then((value) => {
        dispatch({
          type: GET_ADMIN,
          payload: value.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
