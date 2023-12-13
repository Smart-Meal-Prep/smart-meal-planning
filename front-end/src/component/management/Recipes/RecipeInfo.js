import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/RecipesBody.css';

const RecipeInfo = (props) => {
    const { selectedRecipe, setSelectedRecipe, favoriteMealsList, handleAddFavorite, handleRemoveFavorite } = props;
    const isFavorite = favoriteMealsList && favoriteMealsList.find(m => m.name === selectedRecipe.name);

    return (
        <div className="recipes-body">

            <div className="row">
                <div className="col-md">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={() => setSelectedRecipe(null)}
                    >
                        Back to Recipes
                    </button>
               
                    <button
                        className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'} btn-lg favorite-button`}
                        onClick={(e) => {
                            isFavorite ? handleRemoveFavorite(e, selectedRecipe) : handleAddFavorite(e, selectedRecipe);
                        }}
                    >
                        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                    </button>
                </div>

                <div className="col-md">
                    <h4 className={`recipe-list-title strength-${selectedRecipe.strength}`}>{`${selectedRecipe.strength} match for your inventory`}</h4>

                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <h1 className="recipe-list-title">{selectedRecipe.name}</h1>
                    <div className="d-flex justify-content-center align-items-center recipe-info-img-div">
                        <img className="img-fluid recipe-info-img" src={selectedRecipe.thumbnail} alt={selectedRecipe.name} />
                    </div>
                </div>

                <div className="col-md-6">
                    <h2 className="recipe-list-title">Ingredients</h2>
                    <ul className="list-group">
                        {selectedRecipe.ingredients.map((ingredient, index) => {
                            const hasIngredient = selectedRecipe.matchingIngredients ? false : selectedRecipe.matchingIngredients.includes(ingredient);
                            return (
                                <li key={index} className="d-flex list-group-item">
                                    {ingredient} - {selectedRecipe.measurements[index]}
                                    <div className={`have-ingredient-${hasIngredient} ms-auto`}>
                                        {(hasIngredient ? ' You have this ingredient' : ' Missing this ingredient')}
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-12">
                    <h2 className="recipe-list-title">Directions</h2>
                    <h4 className="instructions">{selectedRecipe.instructions}</h4>
                </div>
            </div>

        </div>
    );
}

export default RecipeInfo;