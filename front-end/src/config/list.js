/*file for getting lists of ingredients, areas, and categories for meals*/
import endPoints from "./fetch";
 
/*Ingredients sorted into categories */
const ingredientsByCategory = {
    meat: ['Chicken', 'Beef', 'Pork', 'Bacon', 'Beef Brisket', 'Beef Fillet', 'Chicken Breast', 'Chicken Breasts', 'Chicken Legs', 'Chicken Thighs', 'Chorizo', 'Doner Meat', 'Italian Fennel Sausages', 'Lamb', 'Lamb Loin Chops', 'Lamb Mince', 'Sausages', 'Duck', 'Duck Legs', 'Goose Fat', 'Duck Fat', 'Lamb Leg', 'Lamb Shoulder', 'Turkey Mince', 'Minced Beef', 'Lean Minced Beef', 'Beef Shin', 'Pork Chops', 'Beef Kidney', 'Lamb Kidney'],
    fishSeafood: ['Salmon', 'Mackerel', 'King Prawns', 'Fish Sauce', 'Cod', 'Salt Cod', 'Oysters', 'Haddock', 'Smoked Haddock', 'Prawns', 'Anchovy Fillet', 'Red Snapper', 'Squid', 'Baby Squid', 'Monkfish', 'Mussels', 'Clams', 'Crab'],
    vegetables: ['Asparagus', 'Aubergine', 'Broccoli', 'Carrots', 'Celeriac', 'Celery', 'Charlotte Potatoes', 'Cucumber', 'Egg Plants', 'Fennel Bulb', 'Garlic', 'Ginger', 'Jerusalem Artichokes', 'Kale', 'Leek', 'Little Gem Lettuce', 'Mushrooms', 'Onions', 'Peas', 'Potatoes', 'Rocket', 'Spinach', 'Squash', 'Sugar Snap Peas', 'Turnips', 'Zucchini', 'Bell Peppers', 'Red Onion', 'Cabbage'],
    fruits: ['Apple', 'Banana', 'Avocado', 'Bramley Apples', 'Cherry Tomatoes', 'Baby Plum Tomatoes', 'Lemons', 'Oranges', 'Raspberries', 'Blueberries', 'Strawberries', 'Peaches', 'Apricot', 'Pineapple', 'Mango', 'Grapes', 'Cherries', 'Lemon', 'Watermelon', 'Kiwi', 'Pears', 'Figs', 'Rhubarb', 'Tomatoes'],
    dairy: ['Butter', 'Cheese', 'Cheddar Cheese', 'Cheese Curds', 'Cubed Feta Cheese', 'Cream', 'Creme Fraiche', 'Feta', 'Gouda Cheese', 'Mozzarella Balls', 'Parmesan', 'Parmesan Cheese', 'Parmigiano-reggiano', 'Colby Jack Cheese', 'Cream Cheese', 'Goats Cheese', 'Mascarpone', 'Ricotta', 'Gruyère', 'Monterey Jack Cheese', 'Sour Cream', 'Milk', 'Double Cream', 'Full Fat Yogurt', 'Greek Yogurt', 'Semi-skimmed Milk', 'Whole Milk'],
    pantry: ['Baking Powder', 'Bicarbonate Of Soda', 'Black Treacle', 'Biryani Masala', 'Black Pepper', 'Borlotti Beans', 'Bowtie Pasta', 'Breadcrumbs', 'Brown Lentils', 'Brown Rice', 'Brown Sugar', 'Cacao', 'Cajun', 'Canned Tomatoes', 'Cannellini Beans', 'Cardamom', 'Cashew Nuts', 'Cashews', 'Caster Sugar', 'Cayenne Pepper', 'Chickpeas', 'Chili Powder', 'Chopped Tomatoes', 'Cinnamon', 'Cinnamon Stick', 'Clove', 'Coco Sugar', 'Cocoa', 'Coconut Cream', 'Coconut Milk', 'Condensed Milk', 'Coriander Seeds', 'Cornstarch', 'Cumin Seeds', 'Curry Powder', 'Dark Brown Sugar', 'Dark Soft Brown Sugar', 'Demerara Sugar', 'Digestive Biscuits', 'Dill', 'Enchilada Sauce', 'Farfalle', 'Flaked Almonds', 'Flour', 'Flour Tortilla', 'Garam Masala', 'Garlic Powder', 'Ginger Garlic Paste', 'Harissa Spice', 'Italian Seasoning', 'Lasagne Sheets', 'Lentils', 'Mint', 'Mustard', 'Mustard Powder', 'Nutmeg', 'Oatmeal', 'Oats', 'Paprika', 'Parsley', 'Peanut Butter', 'Pecorino', 'Penne Rigate', 'Pepper', 'Pine Nuts', 'Plain Chocolate', 'Plain Flour', 'Plum Tomatoes', 'Potatoes', 'Puff Pastry', 'Rice', 'Rosemary', 'Sage', 'Salsa', 'Salt', 'Sea Salt', 'Self-raising Flour', 'Sesame Seed', 'Shallots', 'Shortcrust Pastry', 'Smoked Paprika', 'Smoky Paprika', 'Spaghetti', 'Sultanas', 'Sunflower Oil', 'Tamarind Paste', 'Thyme', 'Turmeric', 'Vanilla Extract', 'White Vinegar', 'White Chocolate Chips', 'Whole Wheat', 'Yeast', 'Allspice', 'Bouquet Garni', 'Vanilla'],
    herbsSpices: ['Basil', 'Basil Leaves', 'Bay Leaf', 'Bay Leaves', 'Black Pepper', 'Cajun', 'Cardamom', 'Cayenne Pepper', 'Chili Powder', 'Cilantro', 'Cinnamon', 'Cinnamon Stick', 'Cloves', 'Coriander', 'Coriander Leaves', 'Cumin', 'Curry Powder', 'Dill', 'Fennel Seeds', 'Garam Masala', 'Garlic', 'Garlic Clove', 'Garlic Powder', 'Ginger', 'Italian Seasoning', 'Mint', 'Mustard', 'Mustard Powder', 'Nutmeg', 'Oregano', 'Paprika', 'Parsley', 'Rosemary', 'Sage', 'Thyme', 'Turmeric', 'Cumin Seeds', 'Fenugreek', 'Harissa Spice', 'Ground Almonds', 'Ground Cumin', 'Ground Ginger', 'Ground Pork', 'Ground Beef', 'Cocoa', 'Pumpkin Pie Spice', 'Saffron', 'Sesame Seed', 'Sichuan Pepper'],
    grainsPasta: ['Basmati Rice', 'Bowtie Pasta', 'Brown Rice', 'Couscous', 'Farfalle', 'Jasmine Rice', 'Macaroni', 'Penne Rigate', 'Rice', 'Spaghetti', 'Tagliatelle', 'Fettuccine', 'Cannellini Beans', 'Borlotti Beans', 'Black Beans', 'Lentils', 'Quinoa', 'Rigatoni', 'Risotto Rice', 'Rolled Oats', 'Udon Noodles', 'Rice Noodles', 'Rice Stick Noodles', 'Rice Vermicelli'],
    bakery: ['Bread', 'Breadcrumbs', 'Challah', 'Ciabatta', 'Croissants', 'Corn Tortillas', 'English Muffins', 'Flatbread', 'Naan Bread', 'Pita Bread', 'Baguette', 'Tortillas'],
    sweetsSnacks: ['Chocolate Chips', 'Marshmallows', 'Candy Canes', 'Pretzels', 'Caramel', 'Toffee Popcorn', 'Maple Syrup', 'Icing Sugar', 'Brownie Mix', 'Peanut Brittle', 'Jam', 'Honey', 'Gelatine Leafs', 'Powdered Sugar', 'Chocolate Bar', 'Caramel Sauce', 'Marshmallow Fluff', 'M&Ms', 'Nutella'],
    condimentsSauces: ['Apple Cider Vinegar', 'Balsamic Vinegar', 'BBQ Sauce', 'Burger Sauce', 'Caesar Dressing', 'Chimichurri Sauce', 'Chipotle Sauce', 'Coconut Aminos', 'Fish Sauce', 'Hot Sauce', 'Ketchup', 'Mayonnaise', 'Mustard', 'Pesto', 'Soy Sauce', 'Sweet Chilli Sauce', 'Tabasco Sauce', 'Tahini', 'Teriyaki Sauce', 'Worcestershire Sauce', 'Tomato Ketchup', 'Tomato Puree', 'Tomato Sauce'],
    oilsVinegars: ['Extra Virgin Olive Oil', 'Olive Oil', 'Vegetable Oil', 'Sesame Seed Oil', 'White Vinegar', 'Red Wine Vinegar', 'Balsamic Vinegar', 'Apple Cider Vinegar'],
    beverages: ['Red Wine', 'White Wine', 'Beer', 'Whiskey', 'Rum', 'Vodka', 'Gin', 'Tequila', 'Brandy', 'Baileys', 'Cointreau', 'Triple Sec', 'Prosecco', 'Champagne', 'Cider', 'Lemonade', 'Orange Juice', 'Cranberry Juice', 'Coconut Water', 'Tonic Water', 'Sparkling Water', 'Ginger Beer', 'Cola', 'Iced Tea', 'Coffee', 'Tea', 'Milk', 'Soda'],
    frozen: ['Ice Cream', 'Frozen Vegetables', 'Frozen Fruits', 'Frozen Pizza', 'Frozen Chicken', 'Frozen Shrimp'],
    miscellaneous: ['Eggs', 'Floury Potatoes', 'Chicken Stock', 'Free-range Eggs', 'Fresh Basil', 'Fresh Thyme', 'Lemon Zest', 'Orange Zest', 'Vanilla', 'Mushrooms', 'Raisins', 'Dried Fruit', 'Olives', 'Pickles', 'Capres', 'Capers', 'Anchovies', 'Canned Beans', 'Canned Corn', 'Canned Peas', 'Canned Chickpeas', 'Canned Tuna', 'Canned Salmon', 'Canned Sardines', 'Canned Pineapple', 'Canned Coconut Milk', 'Canned Tomatoes', 'Canned Soup', 'Canned Broth', 'Canned Condensed Milk', 'Canned Coconut Cream', 'Canned Pasta Sauce', 'Canned Fruit Cocktail', 'Canned Peach', 'Canned Mandarin Oranges', 'Canned Green Beans', 'Canned Black Beans', 'Canned Kidney Beans', 'Canned Cannellini Beans'],
};

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