import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/RecipesBody.css';

const MealItem = (props) => {
    const {recipe, setSelectedRecipe, handleAddFavorite, handleRemoveFavorite, favoriteMealsList} = props;
    const isFavorite = favoriteMealsList && favoriteMealsList.find(m => m.name === recipe.name);
    return (
        <div>
            <button
                className="list-group-item list-group-item-action meal-item"
                onClick={(e) => {
                    setSelectedRecipe(recipe)
                }}
            >
                <img className="meal-img" loading="lazy" key={recipe.name} src={recipe.thumbnail} alt="Meal pic" />
                <h4 className="recipe-list-item-name">{recipe.name}</h4>
                <button
                    className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'} btn-sm favorite-button`}
                    onClick={(e) => {
                        e.stopPropagation();
                        isFavorite ? handleRemoveFavorite(e, recipe) : handleAddFavorite(e, recipe); 
                    }}
                >
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </button>
        </div>
    );
}

export default MealItem;