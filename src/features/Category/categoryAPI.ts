import { CategoryState } from "./categorySlice";

const API_URL = "http://localhost:3005";

export function fetchCategories() {
    return fetch(`${API_URL}/categories.json`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(response => response.json())
        .catch(error => {
            console.log(error);
            return {} as CategoryState;
        });

}