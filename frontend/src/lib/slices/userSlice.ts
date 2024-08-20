import { User } from "@/Types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserSlice {
  isLogin: boolean;
  currentUser: User | null;
}

const initialState: IUserSlice = {
  isLogin: false,
  currentUser: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<IUserSlice["currentUser"]>) {
      state.isLogin = !!action.payload;
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
