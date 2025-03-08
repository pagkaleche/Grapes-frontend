import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authReducer } from "@/store/authSlice";

export const store = configureStore({
  reducer: { auth: authReducer },
});

store.subscribe(() => {
  localStorage.setItem("token", store.getState().auth.token);
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
