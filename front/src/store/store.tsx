import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainSlice";
import recommenReducer from "./RecommendSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    recommend: recommenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
