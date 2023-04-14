import * as types from "../types";

export const fetchPosts = () => async (dispatch) => {
  dispatch({
    type: types.GET_POSTS,
    payload: ["1st post", "2nd post", "3rd post"],
  });
};
