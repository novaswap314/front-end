import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    address: '',
  },
  reducers: {
    setAddress: (state, { payload }) => {
      state.address = payload
    },
  },
})

// Action creators are generated for each case reducer function
export const userActions = userSlice.actions

export default userSlice.reducer
