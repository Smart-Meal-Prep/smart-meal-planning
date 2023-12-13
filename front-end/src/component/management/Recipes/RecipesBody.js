import React, { useState, useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/RecipesBody.css';
import MealItem from "./MealItem";
import endPoints from "../../../config/fetch";
import UserInfo from "../../../config/UserInfo";
import Select from "react-select";

const RecipesBody = (props) => {
    const { userInformation } = useContext(UserInfo);
    const userId = userInformation.id;
    const { selectedRecipe, setSelectedRecipe, favoriteMealsList, setFavoriteMealsList, favoriteMealsListOptions, setFavoriteMealsListOptions, handleAddFavorite, handleRemoveFavorite, recipeOptions } = props;
    const [rendered, setRendered] = useState(0);
    console.log(recipeOptions);
    useEffect(() => {
        const updateProfile = async () => {
            try {
                const response = await fetch(`${endPoints.profileEndpoint}/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userProfile = await response.json();
                    if (userProfile) {
                        const fetchedFavorites = userProfile.favoriteMeals;
                        let favoriteMealsObjects = [];
                        let opts = []
                        fetchedFavorites.forEach(fave => {
                            const match = props.recipes.find(r => r.name === fave)
                            match && (favoriteMealsObjects = [...favoriteMealsObjects, match]);
                            match && (opts = [...opts, { label: match.name, value: match }])
                        })
                        setFavoriteMealsListOptions(opts);
                        setFavoriteMealsList(favoriteMealsObjects);
                    }
                }
                rendered < 10 && setRendered(rendered + 1);
            }
            catch (error) {
                console.log(error);
                return;
            }
        };
        updateProfile();
    }, [rendered]);

    return (
        <div className="recipes-body">
            <div className="row items">
                <div className="col-md-8 recipe-list">
                    <h1 className="recipe-list-title">Recipes</h1>
                    <Select
                        options={recipeOptions}
                        onChange={(e) => setSelectedRecipe(e.value)}
                    />
                    <div className="list-group recipe-list-items">
                        {props.recipes && props.recipes.map((recipe) => (
                            <MealItem
                                recipe={recipe} selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe}
                                handleAddFavorite={handleAddFavorite} handleRemoveFavorite={handleRemoveFavorite}
                                favoriteMealsList={favoriteMealsList}
                            />
                        ))}
                    </div>
                </div>

                <div className="col-md-4 recipe-list">
                    <h1 className="recipe-list-title">Favorites</h1>
                    <Select 
                        options={favoriteMealsListOptions}
                        onChange={(e) => setSelectedRecipe(e.value)}
                    />
                    <div className="recipe-list-items">
                        {favoriteMealsList && favoriteMealsList.map((recipe) => {
                            return (
                                <MealItem
                                    recipe={recipe} selectedRecipe={selectedRecipe} setSelectedRecipe={setSelectedRecipe}
                                    handleAddFavorite={handleAddFavorite} handleRemoveFavorite={handleRemoveFavorite}
                                    favoriteMealsList={favoriteMealsList}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipesBody;