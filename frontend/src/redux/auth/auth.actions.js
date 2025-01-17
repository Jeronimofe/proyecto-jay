import { API } from "../../shared/services/api";

export const loginUser = (formdata, navigate) => async (dispatch) => {
  dispatch({ type: "login_user_start" });
  try {
    const result = await API.post("/users/login", formdata);
    dispatch({ type: "login_user_ok", payload: result.data });
    localStorage.setItem("token", result.data.token);
    navigate("/");
  } catch (error) {
    dispatch({ type: "login_user_error", payload: error.message });
  }
};

export const logoutUser = (navigate) => async (dispatch) => {
  dispatch({ type: "logout_user_start" });
  try {
    dispatch({ type: "logout_user_ok" });
    localStorage.clear(); //se puede eliminar el removeItem??
    alert("Sesión cerrada correctamente");
    navigate("/");
  } catch (error) {
    dispatch({ type: "logout_user_error", payload: error.message });
  }
};

export const newUser = (formdata, navigate) => async (dispatch) => {
  dispatch({ type: "register_user_start" });
  try {
    await API.post("users/postNewUser", formdata);
    dispatch({ type: "register_user_ok" });
    navigate("/login");
  } catch (error) {
    dispatch({ type: "register_user_error", payload: error.message });
  }
};

export const checkSession = (token, navigate) => async (dispatch) => {
  dispatch({ type: "checkSession_start" });
  try {
    const result = await API.post("users/checkSession");
    dispatch({
      type: "checkSession_ok",
      payload: { user: result.data, token: token },
    });
    localStorage.setItem("token", token);
  } catch (error) {
    dispatch({ type: "checkSession_error" });
    localStorage.removeItem("token");
    localStorage.clear();
    navigate("/login");
  }
};
