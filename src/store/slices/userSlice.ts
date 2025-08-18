import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  planType: "free",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setPlanType: (state, action) => {
      state.planType = action.payload;
    },
  },
});

export const { setPlanType } = userSlice.actions;
export default userSlice.reducer;
