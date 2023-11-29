import React, { useEffect, useState } from "react";
import endPoints from '../../config/fetch.js'

const Recipes = (props) => {
    const userId = props.userInformation.id;

    useEffect(() => {
        const updateRecipes = async () => {
            try {
                const response = await fetch(`${endPoints.recipeEdnpoint}${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response) {
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

            } catch (error) {
                console.log('failed to get recipes');
                return;
            }
        }
        updateRecipes();
    }, []);

    return (
        <div>
            <h1>Recipes</h1>
            <h1>---------------------------------------------------------------</h1>
            <ol>
                {props.recipes && props.recipes.map((recipe) => (
                    <li>
                        <div>
                            <h2>{recipe.name}</h2>
                            <div style={{ display: 'flex', flexwrap: 'wrap' }}>
                                <img loading="lazy" key={recipe.name} src={recipe.thumbnail} alt="Meal pic" style={{ width: '250px', height: 'auto' }} />
                                <div>
                                    <h3>Ingredients</h3>
                                    <ul>
                                        {recipe.ingredients && recipe.ingredients.map((ingredient) => (
                                            <li>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                                <h3>----</h3>
                                <div>
                                    <h3>Measurements</h3>
                                    <ul>
                                        {recipe.measurements && recipe.measurements.map((measurement) => (
                                            <li>{measurement}</li>
                                        ))}
                                    </ul>
                                </div>
                                <h3>----</h3>
                                <div>
                                    <h3>Matching Ingredients</h3>
                                    <ul>
                                        {recipe.matchingIngredients && recipe.matchingIngredients.map((ingredient) => (
                                            <li>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                                <h3>----</h3>
                                <div>
                                    <h3>Missing Ingredients</h3>
                                    <ul>
                                        {recipe.missingIngredients && recipe.missingIngredients.map((ingredient) => (
                                            <li>{ingredient}</li>
                                        ))}
                                    </ul>
                                </div>
                                <h3>----</h3>
                                <div>
                                    <h3>Strength</h3>
                                    <ul>
                                        {recipe.strength}
                                    </ul>
                                </div>
                            </div>
                            <h4>Directions</h4>
                            <div>{recipe.instructions}</div>
                        </div>
                        <h1>---------------------------------------------------------------</h1>
                    </li>
                ))}
            </ol>

        </div>
    )
}

export default Recipes;