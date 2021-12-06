import { AUTH, LOGIN_FAIL, SIGNUP_FAIL } from '../constants/actionTypes';
import * as api from '../api';

 const signin = (formData:any, router:any) => async (dispatch:any) => {
  try {
    const { data } = await api.signIn(formData);
    console.log("🚀 ~ file: auth.tsx ~ line 7 ~ signin ~ data", data)

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error:any) {
    const er = error?.response?.data?.message;
    console.log(er);

    dispatch({ type: LOGIN_FAIL, er });
  }
};

 const signup = (formData:any, router:any) => async (dispatch:any) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router('/');
  } catch (error:any) {
    // console.log(error.response.data.message);

    const er = error.response.data.message;
    console.log(er);

    dispatch({ type: SIGNUP_FAIL, er });
  }
};

export {signin,signup}
