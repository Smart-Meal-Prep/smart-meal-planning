/*file for getting lists of ingredients, areas, and categories for meals*/
import endPoints from "./fetch";

/*Maps */
const ingredients = new Map();
const categories = new Map();
const areas = new Map();

/*Options for select components */
const ingredientsOptions = [];
const preferencesOptions = [];

const getIngredients = async () => {
    try {
        const res = await fetch(endPoints.listAllIngredients);

        if (!res.ok) {
            console.error('Fetch failed:', res.status, res.statusText);
        }

        const data = await res.json();
        const ingredientsArray = data.meals;
        ingredientsArray.forEach((ingredient) => {
            ingredients.set(ingredient.strIngredient, ingredient.idIngredient);
            ingredientsOptions.push({
                label: ingredient.strIngredient,
                value: ingredient.idIngredient
            })
        });
    } catch (error) {
        console.log(error);
    }
}

const getCategories = async () => {
    try {
        const res = await fetch(endPoints.listAllCategories);

        if (!res.ok) {
            console.error('Fetch failed:', res.status, res.statusText);
        }

        const data = await res.json();
        const categoriesArray = data.meals;
        categoriesArray.forEach((category) => {
            categories.set(category.strCategory, true);
            preferencesOptions.push({
                label: category.strCategory,
                value: category.strCategory
            })
        });
    } catch (error) {
        console.log(error);
    }
}

const getAreas = async () => {
    try {
        const res = await fetch(endPoints.listAllAreas);

        if (!res.ok) {
            console.error('Fetch failed:', res.status, res.statusText);
        }

        const data = await res.json();
        const areasArray = data.meals;
        areasArray.forEach((area) => {
            areas.set(area.strArea, true);
            preferencesOptions.push({
                label: area.strArea,
                value: area.strArea
            })
        });
    } catch (error) {
        console.log(error);
    }
}

getIngredients();
getCategories();
getAreas();

const lists = {
    ingredients,
    ingredientsOptions,
    categories,
    areas,
    preferencesOptions
}

export default lists;