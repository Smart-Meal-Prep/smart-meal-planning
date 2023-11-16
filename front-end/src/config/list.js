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

        console.log(ingredients); //need to remove this
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
            categories.set(category.strCategory, true);
        });

        console.log(categories);//need to remove this
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
            areas.set(area.strArea, true);
        });

        console.log(areas);//need to remove this
    } catch (error) {
        console.log(error);
    }
}
getAreas();

const lists = {
    ingredients,
    categories,
    areas
}

export default lists;