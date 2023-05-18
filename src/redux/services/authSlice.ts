import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  accessToken: string | null;
}

const localStorageKey = "accessToken";

const initialState: AuthState = {
  accessToken: localStorage.getItem("accessToken"),
  // accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<any>) => {
      const accessToken = action.payload;
      localStorage.setItem(localStorageKey, accessToken);
      state.accessToken = action.payload;
    },
    removeToken: (state) => {
      localStorage.removeItem(localStorageKey);
      state.accessToken = null;
    },
  },
});

export const { setToken, removeToken } = authSlice.actions;
