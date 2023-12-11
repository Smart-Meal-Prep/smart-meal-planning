/*file for getting lists of ingredients, areas, and categories for meals*/
import endPoints from "./fetch";

/*Ingredients sorted into categories */
const ingredientsByCategory = {
    "Meat and Poultry": [
        "Chicken", "Salmon", "Beef", "Pork", "Lamb", "Veal", "Duck",
        "Chicken Legs", "Chicken Breasts", "Chicken Thighs", "Chicken Stock", "Chicken Stock Cube",
        "Duck Legs", "Chicken Stock Concentrate", "Beef Brisket", "Beef Fillet", "Beef Gravy",
        "Beef Stock", "Lamb Loin Chops", "Lamb Mince", "Lamb Leg", "Lamb Shoulder",
        "Bacon", "Doner Meat", "Italian Fennel Sausages", "Sausages", "Beef Shin", "Haddock",
        "Smoked Haddock", "Lamb Kidney", "Beef Kidney", "Oxtail", "Cod", "Salt Cod", "Goat Meat",
        "Ground Pork", "Pork Chops", "Anchovy Fillet", "Herring", "Kielbasa",
        "Polish Sausage", "Mulukhiyah", "Sardines", "Lean Minced Beef", "Mackerel", "Raw King Prawns", "Prawns"
    ],
    "Vegetables and Fruits": [
        "Avocado", "Asparagus", "Aubergine", "Baby Plum Tomatoes", "Broccoli",
        "Carrots", "Celery", "Cherry Tomatoes", "Celeriac", "Chinese Broccoli", "Cucumber",
        "Egg Plants", "Garlic", "Ginger", "Kale", "Leek", "Lettuce", "Onion", "Peas", "Potatoes",
        "Red Onions", "Spinach", "Squash", "Stir-fry Vegetables", "Strawberries", "Sugar Snap Peas",
        "Tomato", "Yellow Pepper", "Green Pepper", "Courgettes", "Red Pepper", "Brussels Sprouts",
        "Raisins", "Currants", "Apples", "Apricot", "Butternut Squash", "Goose Fat", "Tinned Tomatos",
        "Chestnuts", "Wild Mushrooms", "Truffle Oil", "Lentils", "Roasted Vegetables", "Kidney Beans",
        "Mixed Grain", "Cabbage", "Shiitake Mushrooms", "Fennel", "Swede", "Redcurrants",
        "Blackberries", "Braeburn Apples", "Pears", "Cherry",
        "Black Pudding", "White Flour", "Figs", "Beetroot", "Fennel Bulb", "King Prawns",
        "Star Anise", "Tiger Prawns", "Persian Cucumber", "Rhubarb", "Charlotte Potatoes", "Chestnut Mushroom",
        "Green Beans", "Grape Tomatoes", "Green Chilli", "Turnips", "Tomatoes", "Zucchini", "Baby Squid", "Squid"
    ],
    "Sweeteners and Vinegars": [
        "Apple Cider Vinegar", "Balsamic Vinegar", "Demerara Sugar", "Golden Syrup", "Granulated Sugar",
        "Muscovado Sugar", "Brown Sugar", "White Chocolate Chips", "Dark Chocolate Chips",
        "Light Brown Soft Sugar", "Dark Brown Soft Sugar", "Vanilla Extract", "Dark Rum",
        "Light Rum", "Rum", "Red Wine Jelly", "Sherry", "White Wine Vinegar", "Malt Vinegar", "Rice Vinegar",
        "Cider", "Vinegar", "Caster Sugar", "Coco Sugar", "Honey", "Dark Brown Sugar", "Dark Soft Brown Sugar"
    ],
    "Flour and Grains": [
        "Baking Powder", "Bicarbonate Of Soda", "Cacao", "Cocoa", "Flour", "Self-raising Flour",
        "Plain Chocolate", "Plain Flour", "Rice", "Rice Noodles", "Rice Stick Noodles", "Rice Vermicelli",
        "Rigatoni", "Farfalle", "Macaroni", "Pappardelle Pasta", "Paccheri Pasta", "Linguine Pasta",
        "Tagliatelle", "Fettuccine", "Vermicelli Pasta", "Udon Noodles", "Couscous", "Shortcrust Pastry",
        "Puff Pastry", "Naan Bread", "Baguette", "Crusty Bread", "Ciabatta", "English Muffins", "Muffins",
        "Filo Pastry", "Corn Flour", "Oatmeal", "Oats", "Bread", "Breadcrumbs", "Pretzels", "Mussels",
        "Fideo", "Monkfish", "Clams", "Passata", "Gelatine Leafs", "Tortillas", "Wonton Skin",
        "Sushi Rice", "Bulgur Wheat", "Quinoa", "Basmati Rice", "Bowtie Pasta", "Corn Tortillas",
        "Flour Tortilla", "Lasagne Sheets", "Rolled Oats", "Whole Wheat", "Wholegrain Bread", "Bread Rolls",
        "Bun", "Potatoe Buns", "Pita Bread"
    ],
    "Dairy and Dairy Substitutes": [
        "Black Treacle", "Butter", "Challots", "Cheddar Cheese", "Cheese", "Cheese Curds",
        "Cubed Feta Cheese", "Cream", "Creme Fraiche", "Custard", "Double Cream", "Feta",
        "Fromage Frais", "Ghee", "Gouda Cheese", "Heavy Cream", "Mascarpone",
        "Mozzarella Balls", "Parmesan", "Parmesan Cheese", "Parmigiano-reggiano", "Shredded Mexican Cheese",
        "Shredded Monterey Jack Cheese", "Single Cream", "Sour Cream", "Clotted Cream", "Cream Cheese",
        "Unsalted Butter", "Butter Beans", "Peanut Butter", "Peanut Oil", "Peanut Brittle",
        "Vegan Butter", "Icing Sugar", "Creamed Corn", "Mayonnaise", "Shortening", "Condensed Milk",
        "Whole Milk", "Semi-skimmed Milk", "Soya Milk", "Almond Milk", "Milk", "Chilled Butter", "Mozzarella",
        "Salted Butter", "Cheese Slices"
    ],
    "Herbs and Spices": [
        "Basil", "Basil Leaves", "Bay Leaf", "Bay Leaves", "Cardamom", "Cayenne Pepper", "Chilli",
        "Chilli Powder", "Cinnamon", "Cinnamon Stick", "Cloves", "Coriander", "Coriander Leaves",
        "Coriander Seeds", "Cumin", "Cumin Seeds", "Curry Powder", "Dill", "Fennel Seeds", "Fenugreek",
        "Garam Masala", "Garlic Powder", "Harissa Spice", "Italian Seasoning", "Madras Paste", "Marjoram",
        "Massaman Curry Paste", "Oregano", "Paprika", "Parsley", "Red Chile Flakes", "Sage", "Saffron",
        "Tamarind Ball", "Tamarind Paste", "Thai Fish Sauce", "Thai Green Curry Paste",
        "Thai Red Curry Paste", "Thyme", "Turmeric", "Turmeric Powder", "Ras el hanout", "Mixed Spice",
        "Biryani Masala", "Cajun", "Celery Salt", "Chopped Parsley", "Dried Oregano", "Ginger Garlic Paste",
        "Ginger Paste", "Little Gem Lettuce", "Nutmeg"
    ],
    "Sauces and Condiments": [
        "Black Pepper", "Salt", "Sea Salt", "Onion Salt", "Kosher Salt", "Hot Beef Stock",
        "White Vinegar", "Dark Soy Sauce", "Soy Sauce", "Worcestershire Sauce", "Fish Sauce",
        "Oyster Sauce", "Tomato Ketchup", "Tomato Puree", "Dijon Mustard",
        "English Mustard", "Mustard", "Mustard Powder", "Mustard Seeds", "Tabasco Sauce", "Sriracha",
        "Pickle Juice", "Rice wine", "Cooking wine", "Duck Sauce", "Gochujang", "Enchilada Sauce",
        "Fajita Seasoning", "Garlic Sauce", "Sake", "Salsa", "Vinaigrette Dressing", "Barbeque Sauce",
        "Tomato Sauce", "Jerk"
    ],
    "Nuts and Seeds": [
        "Cashew Nuts", "Cashews", "Flaked Almonds", "Ground Almonds", "Peanuts", "Pecorino",
        "Pine Nuts", "Sesame Seed", "Almonds", "Walnuts", "Pecan Nuts", "Hazlenuts"
    ],
    "Legumes": [
        "Cannellini Beans", "Borlotti Beans", "Chickpeas", "Pinto Beans", "Haricot Beans",
        "Black Beans", "Butter Beans", "Kidney Beans", "Lentils", "French Lentils", "Green Red Lentils",
        "Brown Lentils", "Refried Beans", "Toor Dal"
    ],
    "Cheese and Yogurt": [
        "Colby Jack Cheese", "Greek Yogurt", "Full Fat Yogurt", "Yogurt", "Stilton Cheese", "Brie"
    ],
    "Coconut Products": [
        "Coconut Cream", "Coconut Milk", "Desiccated Coconut"
    ],
    "Flavorings": [
        "Ground Cumin", "Ground Ginger", "Smoked Paprika", "Smoky Paprika", "Vanilla", "Lemon Juice",
        "Lemon Zest", "Lime", "Soy Sauce", "Worcestershire Sauce"
    ],
    "Eggs and Egg Substitutes": [
        "Egg", "Meringue Nests", "Minced Garlic", "Miniature Marshmallows", "Eggs", "Free-range Egg, Beaten",
        "Free-range Eggs, Beaten", "Egg White", "Egg Yolks", "Flax Eggs"
    ],
    "Proteins": [
        "Chorizo", "Doner Meat", "Italian Fennel Sausages", "Parma Ham", "Prosciutto", "Bacon",
        "Sausages", "Kielbasa", "Polish Sausage", "Anchovy Fillet", "Herring", "Smoked Haddock", "Clams",
        "Mussels", "Monkfish", "Haddock", "Chicken Stock Cube", "Beef Stock Concentrate",
        "Goat Meat", "Oxtail", "Ground Pork", "Pork Chops", "Cod", "Salt Cod", "Turkey Mince",
        "Ground Beef", "Minced Pork", "Lamb Kidney", "Beef Kidney", "Beef Shin", "Cannellini Beans",
        "Borlotti Beans", "Chickpeas", "Pinto Beans", "Haricot Beans", "Black Beans", "Butter Beans",
        "Kidney Beans", "Lentils", "French Lentils", "Green Red Lentils", "Colby Jack Cheese",
        "Greek Yogurt", "Full Fat Yogurt", "Yogurt", "Lean Minced Beef", "Mackerel", "Raw King Prawns",
        "Prawns", "Chicken Breast", "Tofu", "Doubanjiang", "Fermented Black Beans", "Smoked Salmon"
    ],
    "Sweeteners and Dessert Ingredients": [
        "Raspberry Jam", "Peanut Butter", "Jam", "Orange Blossom Water", "Candied Peel", "Grand Marnier",
        "Sherry", "Rose water", "Maple Syrup", "Light Brown Soft Sugar", "Dark Brown Soft Sugar",
        "Dark Chocolate Chips", "Milk Chocolate", "Dark Chocolate", "Caramel", "Caramel Sauce", "Cream Cheese",
        "Icing Sugar", "Toffee Popcorn", "Gelatine Leafs", "Peanut Brittle", "Apricot Jam", "Marzipan",
        "Almonds", "Mixed Peel", "Redcurrants", "Blackberries", "Braeburn Apples", "Pears",
        "Cherry", "Apricot", "Black Pudding", "White Flour", "Figs", "Beetroot", "Fennel Bulb", "King Prawns",
        "Star Anise", "Tiger Prawns", "Persian Cucumber", "Rhubarb", "Goose Fat", "Chocolate Chips", "Meringue Nests",
        "Sugar", "Powdered Sugar", "Mincemeat"
    ],
    "Liquids and Beverages": [
        "Water", "Cold Water", "Warm Water", "Boiling Water", "Rice wine", "Water Chestnut", "Cider",
        "Stout", "Vine Leaves", "Tamarind Ball", "Tamarind Paste",
        "Sherry", "Red Wine", "White Wine", "White Chocolate", "English Mustard", "Mustard", "Mustard Powder",
        "Mustard Seeds", "White Chocolate Chips", "Dry White Wine", "Ginger Cordial", "Lemon Juice", "Sake"
    ],
    "Cooking Oils": [
        "Oil", "Truffle Oil", "Olive Oil", "Extra Virgin Olive Oil", "Canola Oil", "Sesame Seed Oil", "Peanut Oil",
        "Vegetable Oil", "Rapeseed Oil", "Sunflower Oil"
    ],
    "Chilies and Peppers": [
        "Allspice", "Ancho Chillies", "Cayenne Pepper", "Chili Powder", "Paprika",
        "Red Chile Flakes", "Sichuan Pepper", "Green Chilli", "Jalapeno", "Red Chilli", "Red Pepper Flakes", "Scotch Bonnet"
    ],
    "Alcohol": [
        "Rum", "Dark Rum", "Light Rum", "Star Anise", "Vanilla", "Dry White Wine", "Sake"
    ],
    "Desserts": [
        "Ice Cream", "Custard", "Mars Bar", "Raspberry Jam", "Peanut Brittle", "Toffee Popcorn", "Jam",
        "Maple Syrup", "Light Brown Soft Sugar", "Dark Brown Soft Sugar", "Dark Chocolate Chips",
        "Milk Chocolate", "Dark Chocolate", "Pumpkin", "Shortcrust Pastry", "Christmas Pudding", "Meringue Nests"
    ],
    "Miscellanous": [
        "Coco Sugar", "Jalapeno", "Jerusalem Artichokes", "Khus Khus", "Medjool Dates", "Shallots", "Sultanas",
        "Toor Dal", "Tuna", "Vegetable Stock Cube", "White Fish", "White Fish Fillets", "Wood Ear Mushrooms", "Suet",
        "Ham", "Oysters", "Lard", "Red Food Colouring", "Pink Food Colouring", "Blue Food Colouring", "Yellow Food Colouring",
        "Yeast", "Fruit Mix", "Dried Fruit", "Glace Cherry", "Treacle", "Bouquet Garni", "Tarragon Leaves", "Chives",
        "Custard Powder", "Frozen Peas", "Sun-Dried Tomatoes", "Bean Sprouts", "Noodles", "Tripe", "Sweetcorn", "Dried Apricots",
        "Capers", "Banana", "Raspberries", "Peanut Cookies", "Peaches", "Paneer", "Tahini", "Mirin", "Prunes"
    ]
}


/*Maps */
const ingredients = new Map();
const categories = new Map();
const areas = new Map();

/*Options for select components */
const ingredientsOptions = [];
const preferencesOptions = [];
let ingredientsOptionsByCategory = {};

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

const createIngredientOptions = () => {
    for (let cat in ingredientsByCategory) {
        let options = [];
        for (let i in ingredientsByCategory[cat]) {
            const labelValuePair = {
                label: ingredientsByCategory[cat][i],
                value: ingredientsByCategory[cat][i]
            }
            options.push(labelValuePair);
        }
        ingredientsOptionsByCategory[cat] = options;
    }
}

getIngredients();
getCategories();
getAreas();
createIngredientOptions();

const lists = {
    ingredients,
    ingredientsOptions,
    categories,
    areas,
    preferencesOptions,
    ingredientsByCategory,
    ingredientsOptionsByCategory
}

export default lists;