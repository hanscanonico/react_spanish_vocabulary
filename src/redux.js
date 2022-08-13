import { configureStore, createSlice, getDefaultMiddleware } from "@reduxjs/toolkit"
import { apiCallBegan } from "./store/api";
import api from "./store/middleware/api";


const translationSlice = createSlice({
    name: "translations",
    initialState: {
        list: [],
        inputsUser: [],
        inputsState: [],
        error: null,
        loading: false,
        category_id: -1,
        page: "exercice"
    },
    reducers: {
        translationsRequested: (translations, action) => {
            translations.loading = true;
        },
        translationsReceived: (translations, action) => {
            translations.list = action.payload;
            let inputsUser = []
            let inputsState = []
            translations.list.map(function (translation, idx) {
                inputsUser[translation.id] = ""
                inputsState[translation.id] = ""
            });
            translations.loading = false;
            translations.inputsUser = inputsUser;
            translations.inputsState = inputsState;
        },
        translationsRequestFailed: (translations, action) => {
            translations.loading = false;
        },
        setCategoryId: (translations, action) => {
            translations.category_id = action.payload;
        },
        setPage: (translations, action) => {
            translations.page = action.payload;
        },
        setInputsUser: (translations, action) => {
            let value = action.payload.value;
            let id = action.payload.id;
            translations.inputsUser[id] = value;
        },
        setInputsState: (translations, action) => {
            let value = action.payload.value;
            let id = action.payload.id;
            translations.inputsState[id] = value;
        },
    }
})

const categorySlice = createSlice({
    name: "categories",
    initialState: {
        list: [],
        error: null,
        loading: false
    },
    reducers: {
        categoriesRequested: (categories, action) => {
            categories.loading = true;
        },

        categoriesReceived: (categories, action) => {
            categories.list = action.payload;

            categories.loading = false;
        },

        categoriesRequestFailed: (categories, action) => {
            categories.loading = false;
        },
    }
})

export const { setInputsUser, setInputsState, translationsRequested, translationsRequestFailed, translationsReceived, setCategoryId, setPage } = translationSlice.actions
export const { categoriesRequested, categoriesReceived, categoriesRequestFailed } = categorySlice.actions

const categories_url = "http://localhost:3000/categories.json";

export const loadCategories = () => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: categories_url,
            onStart: categoriesRequested.type,
            onSuccess: categoriesReceived.type,
            onError: categoriesRequestFailed.type,
        })
    );
};

//const translations_url = "http://localhost:3000/translations/exercice.json";
export const loadTranslations = (page, category_id) => (dispatch) => {
    let translations_url = ""
    if (page == "exercice") {
        translations_url = "http://localhost:3000/translations/exercice.json";
    }
    else if (page == "course") {
        translations_url = "http://localhost:3000/translations.json";
    }
    if (category_id !== -1) {
        translations_url = translations_url + "?category_id=" + category_id;
    }
    return dispatch(
        apiCallBegan({
            url: translations_url,
            onStart: translationsRequested.type,
            onSuccess: translationsReceived.type,
            onError: translationsRequestFailed.type,
        })
    );
};

const store = configureStore({
    reducer: {
        translations: translationSlice.reducer,
        categories: categorySlice.reducer
    },
    middleware: [...getDefaultMiddleware(), api],
})


export default store

