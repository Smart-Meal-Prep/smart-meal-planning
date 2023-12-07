import React, { useState } from "react";
import Select from 'react-select';
import lists from "../../../config/list";
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/InventoryBody.css';


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

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const ingredientsByCategory = lists.ingredientsByCategory;

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    const CustomOption = ({ label }) => {
        const isInInventory = props.userInventory.find(i => i.ingredient === label);
        return (
            <div className="row option">
                <h5 className="col-md-6">
                    {label}
                </h5>
                <button
                    type="button"
                    className={`btn ${isInInventory ? 'btn-danger' : 'btn-success'} btn-sm option-button`}
                    onClick={(e) => {
                        isInInventory ? handleRemove(e, label) : handleAdding(e, label);
                    }}
                >
                    {isInInventory ? 'Remove from Inventory' : 'Add to Inventory'}
                </button>
            </div>
        );
    };

    return (
        <div className="body">
            <div className="content-container">
                <div className="row items">
                    {/* Sidebar */}
                    <div className="col-md-3">
                        <h2 className="title">Categories</h2>
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
                        <h2 className="title">{selectedCategory ? selectedCategory[0] : 'Inventory Checklist'}</h2>
                        <Select
                            options={lists.ingredientsOptionsByCategory[selectedCategory[1]]}
                            value={ingredient}
                            placeholder={`Search Ingredients in ${selectedCategory[0]}...`}
                            components={{
                                Option: CustomOption
                            }}
                        />

                        {selectedCategory ? (
                            <ul className="list-group ingredients">
                                {ingredientsByCategory[selectedCategory[1]].map((ingredient) => {
                                    const isInInventory = props.userInventory.find(i => i.ingredient === ingredient);
                                    return (
                                        <li key={ingredient} className="list-group-item">
                                            <h5>
                                                {ingredient}
                                            </h5>
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
                        <h2 className="title">Inventory</h2>
                        <Select 
                            options={lists.ingredientsOptions}
                            value={ingredient}
                            placeholder='Search All Ingredients...'
                            components={{
                                Option: CustomOption
                            }}
                        />
                        <ul className="list-group inventory">
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
        </div>
    )
}

export default InventoryBody;