/*Folder containing endpoint urls*/
const backendEndpoint = "http://localhost:3001/"

/*user endpoints*/
const registerEndpoint = `${backendEndpoint}user/registration`;
const loginEndpoint = `${backendEndpoint}user/login`;

/*profile endpoints*/
const profileEndpoint = `${backendEndpoint}profile/`;
const addAllergyEndpoint = `${profileEndpoint}addAllergy`
const removeAllergyEndpoint = `${profileEndpoint}removeAllergy`
const addPreferenceEndpoint = `${profileEndpoint}addPreference`
const removePreferenceEndpoint = `${profileEndpoint}removePreference`

/*inventory endpoints*/
const inventoryEndpoint = `${backendEndpoint}inventory`;
const inventoryUpdateAmountEndpoint = `${inventoryEndpoint}/update/amount`;

/*recipe endpoints*/
const recipeEdnpoint = `${backendEndpoint}recipes/getRecipes/`

/*MealDB endpoints*/
const mealDb = "https://www.themealdb.com/api/json/v1/1/"
const listAllIngredients = `${mealDb}list.php?i=list`;
const listAllAreas = `${mealDb}list.php?a=list`
const listAllCategories = `${mealDb}list.php?c=list`

const endPoints = {
    registerEndpoint,
    loginEndpoint,
    profileEndpoint,
    addAllergyEndpoint,
    removeAllergyEndpoint,
    addPreferenceEndpoint,
    removePreferenceEndpoint,
    inventoryEndpoint,
    inventoryUpdateAmountEndpoint,
    recipeEdnpoint,
    listAllAreas,
    listAllCategories,
    listAllIngredients
};

export default endPoints;