import React, { useEffect, useState } from "react";
import endPoints from '../../config/fetch.js'
import lists from "../../config/list.js";

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
        [props.userInventory]);//will update if there is a change to the users inventory, need to implement later

    const [ingredient, setIngredient] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [selectedItemId, setSelectedItemId] = useState(-1); // New state to store the selected item's ID

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
        if (!lists.ingredients.get(ingredient)) {
            return alert('Please provide a vaild ingredient');
        }//check if it matchs a vaild ingreident

        if (!ingredient) {
            return alert('Please provide an ingredient');
        }

        if (!quantity) {
            return alert('Please provide vaild quantity');
        }

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
}

export default Inventory