import React, { useEffect, useState } from "react";
import endPoints from '../../config/fetch.js'

const Inventory = (props) => {
    useEffect(() => {
        const updateInventory = async () => {
            try {
                const response = await fetch(`${endPoints.inventoryEndpoint}/${props.userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userInventory = await response.json();
                    if (userInventory) {
                        const simplifiedInventory = userInventory.map(({ id, ingredient, quantity }) => ({
                            id,
                            ingredient,
                            quantity
                        }));//filters and only recives the id, ingredient and quanity from each object in the array
                        if (JSON.stringify(simplifiedInventory) !== JSON.stringify(props.userInventory)) {
                            /* Update state only if it has changed*/
                            props.setUserInventory(simplifiedInventory);
                        }
                        return;
                    }
                    return;
                };
            }
            catch (error) {
                return;
            }
        };
        updateInventory();
    },
        [props.userInventory]);

    const [ingredient, setIngredient] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [selectedItemId, setSelectedItemId] = useState(-1);
    const [possibleMeals, setPossibleMeals] = useState(new Set());
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const handleRemove = async (event) => {
        event.preventDefault();
        if (!selectedItemId) {
            return alert('Please select vaild ingredient');
        }//need to check if it matchs a vaild ingreident
        //Do fetching please add more edge cases above
        try {
            const res = await fetch(`${endPoints.inventoryEndpoint}/${selectedItemId}/${props.userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (res.ok) {
                const responseData = await res.json();
                console.log('Response data:', responseData);
                /*to update the inventory*/
                const updatedInventory = props.userInventory.filter(item => item.id !== selectedItemId);
                props.setUserInventory(updatedInventory);
                setSelectedItemId(-1); // Clear the selected item ID
            }
            else {
                const errorData = await res.json();
                alert(`Removing failed: ${errorData.message}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleAdding = async (event) => {
        event.preventDefault();
        if (!ingredient) {
            return alert('Please provide vaild ingredient');
        }//need to check if it matchs a vaild ingreident
        if (!quantity) {
            return alert('Please provide vaild quantity');
        }//need to check if it matchs a vaild ingreident

        try {
            const UserId = props.userId
            const res = await fetch(endPoints.inventoryEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        ingredient,
                        quantity,
                        UserId
                    }
                )
            });

            if (res.ok) {
                const responseData = await res.json();
                console.log('Response data:', responseData);

                const newItem = {
                    id: responseData.id,
                    ingredient: responseData.ingredient,
                    quantity: responseData.quantity
                };
                /*to update the inventory*/
                const updatedInventory = [...props.userInventory, newItem];
                props.setUserInventory(updatedInventory);
                setIngredient(""); // Clear the input fields
                setQuantity(0);
            }
            else {
                const errorData = await res.json();
                alert(`Adding failed: ${errorData.message}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handleUpdateAmount = async (event) => {
        event.preventDefault();
        if (!quantity) {
            return alert('Please provide vaild quantity');
        }//please do more testing here I.e it has to be a int, it cannot have spaces in between, it shouldnt be infinity or INT_MAX

        try {
            const UserId = props.userId
            const id = selectedItemId;
            const res = await fetch(endPoints.inventoryUpdateAmountEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        id,
                        quantity,
                        UserId
                    }
                )
            });

            if (res.ok) {
                const responseData = await res.json();
                console.log('Response data:', responseData);
                /*to update the inventory*/
                const updatedInventory = props.userInventory.map(item =>
                    item.id === selectedItemId ? { ...item, quantity: responseData.quantity } : item
                );
                // Set the updated inventory
                props.setUserInventory(updatedInventory);
                setSelectedItemId(-1);
                setQuantity(0);
            }
            else {
                const errorData = await res.json();
                alert(`Adding failed: ${errorData.message}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const handlePossibleRecipe = async () => {
        if (!props.userInventory.length) {
            return;
        };
        const uniqueMeals = Array.from(possibleMeals);
        const checkIfIngredientInInventory = (mealingredients, userInventory) => {
            const userInventoryIngredients = userInventory.map(item => item.ingredient);
            return [...mealingredients].every(ingredient => userInventoryIngredients.includes(ingredient));
        };
        for (const ingredient of props.userInventory) {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.ingredient}`);
                if (response.ok) {
                    const meals = await response.json();
                    const mealsArray = meals.meals;
                    if (mealsArray) {
                        for (const meal of mealsArray) {
                            try {
                                const mealres = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`);
                                if (mealres.ok) {
                                    const mealData = await mealres.json();
                                    const mealInfo = mealData.meals[0];
                                    const mealingredients = new Set();
                                    for (let i = 1; i < 21; i++) {
                                        const ingredientKey = `strIngredient${i}`;
                                        if (mealInfo.hasOwnProperty(ingredientKey) && mealInfo[ingredientKey] !== "") {
                                            mealingredients.add(mealInfo[ingredientKey]);
                                        };
                                    };
                                    if (checkIfIngredientInInventory(mealingredients, props.userInventory)) {
                                        if (!uniqueMeals.some(item => item.meal === mealInfo.strMeal)) {
                                            setPossibleMeals(new Set([...uniqueMeals, { meal: mealInfo.strMeal, imageUrl: mealInfo.strMealThumb }]));
                                        };
                                    };
                                };
                                await delay(700); // Introduce a delay before the next fetch
                            } catch (error) {
                                console.log(error);
                            };
                        };
                    };
                } else {
                    console.log(`Failed to fetch meals for ${ingredient.ingredient}`);
                };
                await delay(120);
            } catch (error) {
                console.log(error);
            };
        };
    };

    return (
        <div>
            <h1>Inventory</h1>
            <form onSubmit={handleRemove}>
                <label>
                    <p>Remove ingredient:</p>
                    <select value={selectedItemId} onChange={(event) => setSelectedItemId(event.target.value)}>
                        <option value="" disabled>Select an ingredient</option>
                        {props.userInventory.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.ingredient}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>

            <form onSubmit={handleAdding}>
                <label>
                    <p>Add ingredient:</p>
                    <input placeholder="Ingredient" type="text" onChange={(event) => setIngredient(event.target.value)} />
                    <input placeholder="Quantity" type="text" onChange={(event) => setQuantity(event.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>

            <form onSubmit={handleUpdateAmount}>
                <label>
                    <p>Update Ingredient amount:</p>
                    <select value={selectedItemId} onChange={(event) => setSelectedItemId(event.target.value)}>
                        <option value="" disabled>Select an ingredient</option>
                        {props.userInventory.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.ingredient}
                            </option>
                        ))}
                    </select>
                    <input placeholder="Quantity" type="text" onChange={(event) => setQuantity(event.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Inventory