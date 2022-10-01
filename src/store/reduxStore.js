import { configureStore } from "@reduxjs/toolkit";
import boardSlice from "./reducer/boardSlice";

const reduxStore = configureStore({
  reducer: {
    board: boardSlice,
  },
});

export default reduxStore;
