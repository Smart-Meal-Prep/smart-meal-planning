import React, { useEffect, useContext } from "react";
import endPoints from '../../../config/fetch.js'
import UserInfo from "../../../config/UserInfo.js";
import NavigationBar from "../../NavigationBar.js";
import RecipesBody from "./RecipesBody.js";
import DashboardFooter from "../../DashboardFooter.js";

const Recipes = (props) => {

    const { userInformation } = useContext(UserInfo);
    const userId = userInformation.id;

    useEffect(() => {
        const updateRecipes = async () => {
            try {
                const response = await fetch(`${endPoints.recipeEdnpoint}${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response) {
                    console.log('failed to get recipes');
                    return;
                }

                const recipes = await response.json();
                if (!recipes) {
                    console.log('failed to get recipes');
                    return;
                }

                if (JSON.stringify(recipes) === JSON.stringify(props.recipes)) {
                    return;
                }

                props.setRecipes(recipes);

            } catch (error) {
                console.log('failed to get recipes');
                return;
            }
        }
        updateRecipes();
    }, []);

    return (
        <div>
            <NavigationBar />
            <RecipesBody recipes={props.recipes} setRecipes={props.setRecipes}/>
            <DashboardFooter />
        </div>
    )
}

export default Recipes;