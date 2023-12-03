import React, { useEffect, useState, useContext } from "react";
import Select from 'react-select';
import lists from "../../../config/list";

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
                    <Select
                        options={lists.ingredientsOptions}
                        onChange={(e) => setIngredient(e.label)}
                        value={{ label: ingredient }}
                    />
                    <input placeholder="Quantity" type="text" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
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
    )
}

export default InventoryBody;