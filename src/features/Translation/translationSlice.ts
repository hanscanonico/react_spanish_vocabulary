import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import produce from 'immer';
// @ts-ignore 
import { RootState } from '../app/store.ts';
// @ts-ignore 
import { fetchCourse, fetchExercice } from './translationAPI.ts';

export enum STATUSES {
    IDLE = 'IDLE',
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export interface TranslationState {
    id?: number;
    key?: string;
    value?: string;
    code?: string;
    type?: string;
    text_to_show?: string;
    correction?: string;
    created_at?: string;
    updated_at?: string;
}

export interface TranslationsState {
    translations: TranslationState[];
    status: string;
    inputsUser: string[],
    inputsState: string[]
}

const initialState: TranslationsState = {
    translations: [
        {
            id: 0,
            key: '',
            created_at: '',
            value: '',
            code: '',
            type: '',
            text_to_show: '',
            correction: '',
            updated_at: '',
        }
    ],
    status: STATUSES.IDLE,
    inputsUser: [],
    inputsState: []
};

export const fetchCourseAsync = createAsyncThunk(
    'Category/fetchCourse',
    async (category_id) => {
        const response = await fetchCourse(category_id);
        return response;
    }
);

export const fetchExerciceAsync = createAsyncThunk(
    'Category/fetchexercice',
    async (category_id) => {
        const response = await fetchExercice(category_id);
        return response;
    }
);

const translationSlice = createSlice({
    name: "translations",
    initialState,
    reducers: {
        setInputsUser: (translations: any, action) => {
            let value = action.payload.value;
            let id = action.payload.id;
            translations.inputsUser[id] = value;
        },
        setInputsState: (translations: any, action) => {
            let value = action.payload.value;
            let id = action.payload.id;
            translations.inputsState[id] = value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourseAsync.pending, (state) => {
                return produce(state, draftState => {
                    draftState.status = STATUSES.PENDING;
                });
            })
            .addCase(fetchCourseAsync.fulfilled, (state, action) => {
                return produce(state, draftState => {
                    draftState.status = STATUSES.SUCCESS;
                    draftState.translations = action.payload;
                });
            })
            .addCase(fetchCourseAsync.rejected, (state) => {
                return produce(state, draftState => {
                    draftState.status = STATUSES.ERROR;
                });
            })
            .addCase(fetchExerciceAsync.pending, (state) => {
                return produce(state, draftState => {
                    draftState.status = STATUSES.PENDING;
                });
            })
            .addCase(fetchExerciceAsync.fulfilled, (state, action) => {
                return produce(state, draftState => {
                    draftState.status = STATUSES.SUCCESS;
                    draftState.translations = action.payload;
                    draftState.translations.map(function (translation, idx) {
                        if (translation.id !== undefined) {
                            draftState.inputsUser[translation.id] = ""
                            draftState.inputsState[translation.id] = ""
                        }

                    });
                });
            })
            .addCase(fetchExerciceAsync.rejected, (state) => {
                return produce(state, draftState => {
                    draftState.status = STATUSES.ERROR;
                });
            });
    },
})

export const { setInputsUser, setInputsState } = translationSlice.actions

export const selectTranslations = (state: RootState) => state.translations.translations;

export const selectTranslationStatus = (state: RootState) => state.translations.status;

export const selectInputsUser = (state: RootState) => state.translations.inputsUser;

export const selectInputsState = (state: RootState) => state.translations.inputsState;

export default translationSlice.reducer;