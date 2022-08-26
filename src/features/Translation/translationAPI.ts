import { TranslationState } from "./translationSlice";

const API_URL = "http://localhost:3000";

export function fetchCourse(category_id: number) {
    let url: string = `${API_URL}/translations.json`;
    if (category_id > 0) {
        url = `${API_URL}/translations.json?category_id=${category_id}`;
    }
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json())
        .catch(error => {
            console.log(error);
            return {} as TranslationState;
        });
}

export function fetchExercice(category_id: number) {
    let url: string = `${API_URL}/translations/exercice.json`;
    console.log("category_id", category_id);
    if (category_id > 0) {
        url = `${API_URL}/translations/exercice.json?category_id=${category_id}`;
    }
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json())
        .catch(error => {
            console.log(error);
            return {} as TranslationState;
        });
}