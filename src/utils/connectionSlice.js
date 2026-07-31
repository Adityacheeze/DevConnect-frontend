import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: null,
  reducers: {
    addConnection : (state, action) => action.payload,
    removeConnection : (state, action) => {
      return state.filter((connection) => connection._id !== action.payload);
    },
  },
});

export const {addConnection, removeConnection} = connectionSlice.actions;
export default connectionSlice.reducer;
