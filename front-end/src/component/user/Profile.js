import { React, useState, useEffect } from 'react';
import endPoints from '../../config/fetch'
import ingredients from '../../config/list';

const Profile = (props) => {
    const userId = props.userInformation.id;
    const [newAllergy, setNewAllergy] = useState('');
    const [newPreference, setNewPreference] = useState('');
    const [removingAllergy, setRemovingAllergy] = useState('');
    const [removingPreference, setRemovingPreference] = useState('');


    useEffect(() => {
        const updateProfile = async () => {
            try {
                const response = await fetch(`${endPoints.profileEndpoint}/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const userProfile = await response.json();
                    if (userProfile) {
                        if (JSON.stringify(userProfile) !== JSON.stringify(props.profile)) {
                            /* Update state only if it has changed*/
                            props.setProfile({
                                allergies: userProfile.allergies,
                                preferences: userProfile.preferences,
                            });
                        }
                    }
                }
            }
            catch (error) {
                console.log(error);
                return;
            }
        };
        updateProfile();
    },
        [props.userInformation.id]
    );

    const handleAddAllergy = async (event) => {
        event.preventDefault();
        if (!newAllergy) {
            return alert('Please provide vaild ingredient');
        }//need to check if it matchs a vaild ingreident

        if (props.profile.allergies.includes(newAllergy)) {
            return alert('Allergy already exists');
        }//checks to make sure user doesn't add duplicates

        try {
            const res = await fetch(endPoints.addAllergyEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        ingredient: newAllergy,
                        UserId: userId
                    }
                )
            });

            if (res.ok) {
                /*update allergy list*/
                const updatedAllergies = [...props.profile.allergies, newAllergy];
                props.setProfile({
                    ...props.profile,
                    allergies: updatedAllergies
                });
                setNewAllergy(""); // Clear the input field
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

    const handleRemoveAllergy = async (event) => {
        event.preventDefault();
        if (!removingAllergy) {
            return alert('Please provide vaild ingredient');
        }//need to check if it matchs a vaild ingreident

        if (!props.profile.allergies.includes(removingAllergy)) {
            return alert('Allergy does not exists');
        }//user cant remove an allergy that isn't in the list

        try {
            const res = await fetch(endPoints.removeAllergyEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        ingredient: removingAllergy,
                        UserId: userId
                    }
                )
            })

            if (res.ok) {
                /*update allergy list*/
                const updatedAllergies = props.profile.allergies.filter(allergy => allergy !== removingAllergy);
                props.setProfile({
                    ...props.profile,
                    allergies: updatedAllergies
                });
                setNewAllergy(""); // Clear the input field
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddPreference = async (event) => {
        event.preventDefault();
        if (!newPreference) {
            return alert('Please provide vaild ingredient');
        }//need to check if it matchs a vaild ingreident

        if (props.profile.preferences.includes(newPreference)) {
            return alert('Preference already exists');
        }//checks to make sure user doesn't add duplicates

        try {
            const res = await fetch(endPoints.addPreferenceEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        preference: newPreference,
                        UserId: userId
                    }
                )
            });

            if (res.ok) {
                /*update preference list*/
                const updatedPreferences = [...props.profile.preferences, newPreference];
                props.setProfile({
                    ...props.profile,
                    preferences: updatedPreferences
                });
                setNewPreference(""); // Clear the input field
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

    const handleRemovePreference = async (event) => {
        event.preventDefault();
        if (!removingPreference) {
            return alert('Please provide vaild ingredient');
        }//need to check if it matchs a vaild ingreident

        if (!props.profile.preferences.includes(removingPreference)) {
            return alert('Allergy does not exists');
        }//user cant remove an allergy that isn't in the list

        try {
            const res = await fetch(endPoints.removePreferenceEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        preference: removingPreference,
                        UserId: userId
                    }
                )
            })

            if (res.ok) {
                /*update allergy list*/
                const updatedPreferences = props.profile.preferences.filter(allergy => allergy !== removingPreference);
                props.setProfile({
                    ...props.profile,
                    preferences: updatedPreferences
                });
                setNewPreference(""); // Clear the input field
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <h1>Profile</h1>

            <form>
                <label>
                    Add Allergy:
                    <input
                        type="text"
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleAddAllergy}>
                    Add
                </button>
                <label>
                    Remove Allergy:
                    <input
                        type="text"
                        value={removingAllergy}
                        onChange={(e) => setRemovingAllergy(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleRemoveAllergy}>
                    Remove
                </button>
            </form>

            <form>
                <label>
                    Add Preference:
                    <input
                        type="text"
                        value={newPreference}
                        onChange={(e) => setNewPreference(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleAddPreference}>
                    Add
                </button>
                <label>
                    Remove Preference:
                    <input
                        type="text"
                        value={removingPreference}
                        onChange={(e) => setRemovingPreference(e.target.value)}
                    />
                </label>
                <button type="button" onClick={handleRemovePreference}>
                    Remove
                </button>
            </form>

            <h2>Allergies:</h2>
            <ul>
                {props.profile.allergies && props.profile.allergies.map((allergy, index) => (
                    <li key={index}>{allergy}</li>
                ))}
            </ul>

            <h2>Preferences:</h2>
            <ul>
                {props.profile.preferences && props.profile.preferences.map((preference, index) => (
                    <li key={index}>{preference}</li>
                ))}
            </ul>

        </div>
    );
}

export default Profile;