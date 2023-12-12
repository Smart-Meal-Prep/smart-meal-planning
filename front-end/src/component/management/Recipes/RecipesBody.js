import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/RecipesBody.css';


const RecipesBody = (props) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    return (
        <div className="recipes-body">
            <div className="row items">
                <div className="col-md-8 recipe-list">
                    <h1 className="recipe-list-title">Recipes</h1>
                    <div className="list-group recipe-list-items">
                        {props.recipes && props.recipes.map((recipe) => {
                            return (
                                <div>
                                    <button
                                        className="list-group-item list-group-item-action meal-item"
                                        onClick={(e) => {
                                            setSelectedRecipe(recipe.name)
                                        }}
                                    >
                                        <img className="meal-img" loading="lazy" key={recipe.name} src={recipe.thumbnail} alt="Meal pic" />
                                        <h4 className="recipe-list-item-name">{recipe.name}</h4>
                                        <button
                                            className="btn btn-primary favorite-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >
                                            Add to Favorites
                                        </button>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="col-md-4 favorite-list">
                    <h1 className="recipe-list-title">Favorites</h1>
                </div>
            </div>
        </div>
    );
}

export default RecipesBody;