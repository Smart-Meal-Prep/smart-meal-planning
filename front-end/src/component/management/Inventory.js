import React, { useEffect } from "react";
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
                            quantity,
                        }));//filters and only recives the id, ingredient and quanity from each object in the array
                        props.setUserInventory(simplifiedInventory);//updates the inventory with specificed items 
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
        []);//will update if there is a change to the users inventory, need to implement later

    return (
        <div>
            Hi
        </div>
    )
}

export default Inventory