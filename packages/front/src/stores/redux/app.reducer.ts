import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const appSlice = createSlice({
  name: "app",
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  }
})

export const {
  setLoading
} = appSlice.actions;
export default appSlice.reducer