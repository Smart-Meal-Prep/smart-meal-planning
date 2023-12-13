import React, { useEffect, useContext, useState } from "react";
import endPoints from '../../../config/fetch.js'
import UserInfo from "../../../config/UserInfo.js";
import NavigationBar from "../../NavigationBar.js";
import RecipesBody from "./RecipesBody.js";
import DashboardFooter from "../../DashboardFooter.js";
import RecipeInfo from "./RecipeInfo.js";

const Recipes = (props) => {
    const { userInformation } = useContext(UserInfo);
    const userId = userInformation.id;
    const [favoriteMealsList, setFavoriteMealsList] = useState(null);
    const [favoriteMealsListOptions, setFavoriteMealsListOptions] = useState(null);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const { recipes, setRecipes } = props;
    const [recipeOptions, setRecipeOptions] = useState(null);

    useEffect(() => {
        const updateRecipes = async () => {
            try {
                const response = await fetch(`${endPoints.recipeEdnpoint}${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    console.log('failed to get recipes');
                    return;
                }

                const recipes = await response.json();
                if (!recipes) {
                    console.log('failed to get recipes');
                    return;
                }

                if (JSON.stringify(recipes) === JSON.stringify(props.recipes)) {
                    return;
                }

                props.setRecipes(recipes);

                let opts = []
                recipes.forEach(recipe => {
                    opts = [...opts, { label: recipe.name, value: recipe }];
                });
                setRecipeOptions(opts);


            } catch (error) {
                console.log('failed to get recipes');
                return;
            }
        }
        updateRecipes();
    }, []);

    const handleAddFavorite = async (event, meal) => {
        event.preventDefault()
        if (!meal) {
            alert('Invalid meal');
        }
        if (favoriteMealsList.find(m => m.name === meal)) {
            alert('Meal is already a favorite');
        }
        try {
            const res = await fetch(`${endPoints.addFavoriteMealEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        meal: meal.name,
                        UserId: userId
                    }
                )
            })

            if (!res.ok) {
                console.log('failed to add favorite meal');
                return;
            }

            setFavoriteMealsList([...favoriteMealsList, meal]);
            setFavoriteMealsListOptions([...favoriteMealsListOptions, { label: meal.name, value: meal }])

        } catch (error) {
            console.log(error);
        }
    }

    const handleRemoveFavorite = async (event, meal) => {
        event.preventDefault();
        if (!meal) {
            alert('Invalid meal');
        }
        if (favoriteMealsList.find(m => m.name === meal)) {
            alert('Meal is already a favorite');
        }
        try {
            const res = await fetch(`${endPoints.removeFavoriteMealEndpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        UserId: userId,
                        meal: meal.name
                    }
                )
            })

            if (!res.ok) {
                console.log(res, 'failed to remove favorite meal');
                return;
            }

            setFavoriteMealsList(favoriteMealsList.filter(m => m.name !== meal.name));
            setFavoriteMealsListOptions(favoriteMealsListOptions.filter(m => m.label !== meal.name));

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <NavigationBar />
            {selectedRecipe ?
                <RecipeInfo
                    recipes={recipes} setRecipes={setRecipes}
                    selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe}
                    favoriteMealsList={favoriteMealsList} setFavoriteMealsList={setFavoriteMealsList}
                    handleAddFavorite={handleAddFavorite} handleRemoveFavorite={handleRemoveFavorite}
                />
                :
                <RecipesBody
                    recipes={recipes} setRecipes={setRecipes}
                    recipeOptions={recipeOptions}
                    selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe}
                    favoriteMealsList={favoriteMealsList} setFavoriteMealsList={setFavoriteMealsList}
                    handleAddFavorite={handleAddFavorite} handleRemoveFavorite={handleRemoveFavorite}
                    favoriteMealsListOptions={favoriteMealsListOptions} setFavoriteMealsListOptions={setFavoriteMealsListOptions}
                />
            }
            <DashboardFooter />
        </div>
    )
}

export default Recipes;