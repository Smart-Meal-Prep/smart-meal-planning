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
        [props.userInventory]);//will update if there is a change to the users inventory, need to implement later

    const [ingredient, setIngredient] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [selectedItemId, setSelectedItemId] = useState(0); // New state to store the selected item's ID

    const handleRemove = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior of refreshing on submission
        if (!selectedItemId) {
            return alert('Please select vaild ingredient');
        }//need to check if it matchs a vaild ingreident
        //Do fetching please add more edge cases above
        try {
            const res = await fetch(`${endPoints.inventoryEndpoint}/${selectedItemId}/${props.userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                }
            });

            if (res.ok) {
                const responseData = await res.json();
                console.log('Response data:', responseData);
                //to update the inventory
                const updatedInventory = props.userInventory.filter(item => item.id !== selectedItemId);
                props.setUserInventory(updatedInventory);
                setSelectedItemId(""); // Clear the selected item ID
            }
            else {
                const errorData = await res.json();
                alert(`Removing failed: ${errorData.message}`);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleAdding = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior of refreshing on submission
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
                    'Content-Type': 'application/json', // Set the content type to JSON
                },
                body: JSON.stringify(
                    {
                        ingredient,
                        quantity,
                        UserId
                    }
                )
            });

            if (res.ok) {// Request was successful (status code 2xx)
                const responseData = await res.json();
                console.log('Response data:', responseData);
                
                const newItem = {
                    id: responseData.id,
                    ingredient: responseData.ingredient,
                    quantity: responseData.quantity
                };
                //to update the inventory
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

    }

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

            <form /*</div>onSubmit={handleSubmission}*/>
                <label>
                    <p>Update ingredient:</p>
                    <input placeholder="Ingredient" type="text" onChange={(event) => setIngredient(event.target.value)} />
                    <input placeholder="Quantity" type="text" onChange={(event) => setQuantity(event.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Inventory