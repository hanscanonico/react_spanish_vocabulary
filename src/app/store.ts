import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
// @ts-ignore 
import categorySlice from "../features/Category/categorySlice.ts";
// @ts-ignore 
import translationSlice from "../features/Translation/translationSlice.ts";

export const store = configureStore({
    reducer: {
        translations: translationSlice,
        categories: categorySlice,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
