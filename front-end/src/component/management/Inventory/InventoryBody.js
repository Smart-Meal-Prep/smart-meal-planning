import React, { useEffect, useState, useContext } from "react";
import Select from 'react-select';
import lists from "../../../config/list";
import 'bootstrap/dist/css/bootstrap.min.css';

const InventoryBody = (props) => {
    const {
        handleAdding,
        handleRemove,
        handleUpdateAmount,
        selectedItemId,
        setSelectedItemId,
        ingredient,
        setIngredient,
        quantity,
        setQuantity
    } = props.value;

    const [selectedCategory, setSelectedCategory] = useState(null);

    const categories = [
        ['Meat', 'meat'],
        ['Fish/Seafood', 'fishSeafood'],
        ['Vegetables', 'vegetables'],
        ['Fruits', 'fruits'],
        ['Dairy', 'dairy'],
        ['Pantry', 'pantry'],
        ['Herbs/Spices', 'herbsSpices'],
        ['Grains/Pasta', 'grainsPasta'],
        ['Bakery', 'bakery'],
        ['Sweets/Snacks', 'sweetsSnacks'],
        ['Condiments/Sauces', 'condimentsSauces'],
        ['Oils/Vinegars', 'oilsVinegars'],
        ['Beverages', 'beverages'],
        ['Frozen', 'frozen'],
        ['Miscellaneous', 'miscellaneous'],
    ];

    const ingredientsByCategory = lists.ingredientsByCategory;

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <div className="list-group">
                        {categories.map((category) => (
                            <button
                                key={category}
                                type="button"
                                className={`list-group-item list-group-item-action ${selectedCategory === category ? 'active' : ''
                                    }`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                {category[0]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Inventory Checklist */}
                <div className="col-md-6">
                    <h2>{selectedCategory ? selectedCategory[0] : 'Inventory Checklist'}</h2>
                    {selectedCategory ? (
                        <ul className="list-group">
                            {ingredientsByCategory[selectedCategory[1]].map((ingredient) => {
                                const isInInventory = props.userInventory.find(i => i.ingredient === ingredient);

                                return (
                                    <li key={ingredient} className="list-group-item">
                                        {ingredient}
                                        <button
                                            type="button"
                                            className={`btn ${isInInventory ? 'btn-danger' : 'btn-success'} btn-sm float-end`}
                                            onClick={(e) => {
                                                setIngredient(ingredient);
                                                isInInventory ? handleRemove(e, ingredient) : handleAdding(e, ingredient);
                                            }}
                                        >
                                            {isInInventory ? 'Remove from Inventory' : 'Add to Inventory'}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <p>Select a category to view ingredients.</p>
                    )}
                </div>

                <div className="col-md-3">
                    <h2>Inventory</h2>
                    <ul className="list-group">
                        {props.userInventory.map(ingredient => {
                            return (
                                <li key={ingredient.ingredient} className="list-group-item">
                                    {ingredient.ingredient}
                                    <button
                                        type="button"
                                        className={`btn btn-danger btn-sm float-end`}
                                        onClick={(e) => {
                                            setIngredient(ingredient.ingredient);
                                            handleRemove(e, ingredient.ingredient);
                                        }}
                                    >
                                        Remove from Inventory
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default InventoryBody;