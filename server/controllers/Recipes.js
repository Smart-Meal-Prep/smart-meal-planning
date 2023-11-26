const { Recipes } = require('../models');

const fillRecipes = async (req, res) => {
    let searchByFirstLetter = ['a', 'b', 'c', 'd',
        'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
        'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    for (let j = 0; j < 26; j++) {
        try {
            const mealDbResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByFirstLetter[j]}`);

            if (!mealDbResponse.ok) {
                res.status(400);
                return res.json({ error: 'Failed to fetch from TheMealDB' });
            }

            const data = await mealDbResponse.json();
            const meals = data.meals;
            meals && await meals.forEach(async meal => {
                const ingredients = [];
                const measurements = [];
                for (let i = 1; i <= 20; i++) {
                    const ingredientKey = `strIngredient${i}`;
                    const measurementKey = `strMeasure${i}`;
                    if (meal[ingredientKey] && meal[ingredientKey] !== "") {
                        ingredients.push(meal[ingredientKey]);
                        measurements.push(meal[measurementKey]);
                    };
                }
                try {
                    const possibleDuplicate = await Recipes.findOne({
                        where: {
                            name: meal.strMeal
                        }
                    })

                    !possibleDuplicate && await Recipes.create({
                        name: meal.strMeal,
                        ingredients: ingredients,
                        measurements: measurements,
                        instructions: meal.strInstructions,
                        thumbnail: meal.strMealThumb,
                        category: meal.strCategory,
                        area: meal.strArea
                    })

                } catch (error) {
                    console.log("Error adding recipe: ", error);
                }
            });
        } catch (error) {
            console.log('Failed to add recipes from TheMealDB: ', error);
            res.status(400);
            return res.json({ error: 'Error adding recipes' })
        }
    }

    res.status(200);
    return res.json('Successfully filled table');
}

module.exports = {
    fillRecipes
}