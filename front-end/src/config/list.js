/*file for getting lists of ingredients, areas, and categories for meals*/
import endPoints from "./fetch";

const ingredients = new Map();
const getIngredients = async () => {
    try {
        const res = await fetch(endPoints.listAllIngredients);

        if (!res.ok) {
            console.error('Fetch failed:', res.status, res.statusText);
        }

        const data = await res.json();
        const ingredientsArray = data.meals;
        ingredientsArray.forEach((ingredient) => {
            ingredients.set(ingredient.strIngredient, true);
        });

        console.log(ingredients);
    } catch (error) {
        console.log(error);
    }
}
getIngredients();

const categories = new Map();
const getCategories = async () => {
    try {
        const res = await fetch(endPoints.listAllCategories);

        if (!res.ok) {
            console.error('Fetch failed:', res.status, res.statusText);
        }

        const data = await res.json();
        const categoriesArray = data.meals;
        categoriesArray.forEach((category) => {
            ingredients.set(category.strCategory, true);
        });

        console.log(categories);
    } catch (error) {
        console.log(error);
    }
}
getCategories();

const areas = new Map();
const getAreas = async () => {
    try {
        const res = await fetch(endPoints.listAllAreas);

        if (!res.ok) {
            console.error('Fetch failed:', res.status, res.statusText);
        }

        const data = await res.json();
        const areasArray = data.meals;
        areasArray.forEach((area) => {
            ingredients.set(area.strArea, true);
        });

        console.log(areas);
    } catch (error) {
        console.log(error);
    }
}
getCategories();

export default {
    ingredients,
    categories,
    areas
};