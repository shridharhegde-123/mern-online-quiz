import axios from "axios";
import * as types from "./actiontype.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Fetch all users
export const getAllUserDataFromBackend = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  dispatch({ type: types.GET_ALL_USER_DATA_REQUEST });

  try {
    const response = await axios.get("http://localhost:4000/getuser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: types.GET_ALL_USER_DATA_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: types.GET_ALL_USER_DATA_FAILURE,
      payload: error.response?.data?.message || "Error fetching user data",
    });
  }
};
//pormote
export const promoteUserToAdmin = (userId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.patch(
      `http://localhost:4000/user/${userId}/promote`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch(getAllUserDataFromBackend());
    toast.success("User promoted to Admin successfully");
  } catch (error) {
    console.error("Error promoting user:", error.response?.data?.message || error.message);
    toast.error("Unable to promote the User");
  }
};

// Delete user by admin
export const deleteUserByAdmin = (userId) => async (dispatch) => {
  const token = localStorage.getItem("token");

  try {
    await axios.delete(`http://localhost:4000/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(getAllUserDataFromBackend());
  } catch (error) {
    console.error("Error deleting user:", error.response?.data?.message);
  }
};


// Logout handler
export const Logouthandleraction = () => (dispatch) => {
  localStorage.removeItem("token");

  dispatch({
    type: "LOGOUTUSER",
  });
};

// Login user actions
export const loginUser = (userId) => ({
  type: "GETUSERID",
  payload: userId,
});

export const loginUserName = (userName) => ({
  type: "GETUSERNAME",
  payload: userName,
});

// Login admin actions
export const loginAdminId = (adminId) => ({
  type: "GETADMINID",
  payload: adminId,
});

export const loginAdminName = (adminName) => ({
  type: "GETADMINNAME",
  payload: adminName,
});