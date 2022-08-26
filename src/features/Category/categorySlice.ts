import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import produce from 'immer';
// @ts-ignore 
import { RootState } from '../app/store.ts';
// @ts-ignore 
import { fetchCategories } from './categoryAPI.ts';

export enum STATUSES {
    IDLE = 'IDLE',
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface CategoryState {
    id?: number;
    name?: string;
    created_at?: string;
    updated_at?: string;
}

export interface CategoriesState {
    categories: CategoryState[];
    status: string;
}

const initialState: CategoriesState = {
    categories: [
        {
            id: 0,
            name: '',
            created_at: '',
            updated_at: '',
        }
    ],
    status: STATUSES.IDLE,
};

export const fetchCategoriesAsync = createAsyncThunk(
    'Category/fetchCategories',
    async () => {
        const response = await fetchCategories();
        return response;
    }
);

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesAsync.pending, (state) => {
                return produce(state, draftState => {
                    draftState.status = STATUSES.PENDING;
                });
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                return produce(state, draftState => {
                    draftState.status = STATUSES.SUCCESS;
                    draftState.categories = action.payload;
                });
            })
            .addCase(fetchCategoriesAsync.rejected, (state) => {
                return produce(state, draftState => {
                    draftState.status = STATUSES.ERROR;
                });
            });
    },
});

export const { } = categorySlice.actions;

export const selectCategories = (state: RootState) => state.categories.categories;

export const selectCategoryStatus = (state: RootState) => state.categories.status;

export default categorySlice.reducer;