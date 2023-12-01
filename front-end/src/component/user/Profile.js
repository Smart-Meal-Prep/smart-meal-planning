import { React, useState, useEffect, useContext } from 'react';
import endPoints from '../../config/fetch'
import lists from '../../config/list';
import Select from 'react-select';
import UserInfo from '../../config/UserInfo';

const Profile = (props) => {

    const { userInformation } = useContext(UserInfo);
    const userId = userInformation.id;
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
                            const allergiesOptions = userProfile.allergies.map((allergy) => {
                                return { label: allergy, value: allergy };
                            });

                            const preferencesOptions = userProfile.preferences.map((preferece) => {
                                return { label: preferece, value: preferece };
                            });

                            props.setProfile({
                                allergies: userProfile.allergies,
                                preferences: userProfile.preferences,
                                allergiesOptions: allergiesOptions,
                                preferencesOptions: preferencesOptions
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
        [userInformation.id]
    );

    const handleAddAllergy = async (event) => {
        event.preventDefault();
        if (!lists.ingredients.get(newAllergy)) {
            return alert('Please provide vaild ingredient');
        }//check if it matchs a vaild ingreident

        if (!newAllergy) {
            return alert('Please enter an ingredient you are allergic to');
        }

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
                const updatedAllergiesOptions = [...props.profile.allergiesOptions, { label: newAllergy, value: newAllergy }];

                props.setProfile({
                    ...props.profile,
                    allergies: updatedAllergies,
                    allergiesOptions: updatedAllergiesOptions
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
                const updatedAllergiesOptions = props.profile.allergiesOptions.filter(opt => opt.label !== removingAllergy);
                props.setProfile({
                    ...props.profile,
                    allergies: updatedAllergies,
                    allergiesOptions: updatedAllergiesOptions
                });
                setRemovingAllergy(""); // Clear the input field
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddPreference = async (event) => {
        event.preventDefault();
        if (!newPreference) {
            return alert('Please provide vaild preference');
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
                const updatedPreferencesOptions = [...props.profile.preferencesOptions, { label: newPreference, value: newPreference }];

                props.setProfile({
                    ...props.profile,
                    preferences: updatedPreferences,
                    preferencesOptions: updatedPreferencesOptions
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
            return alert('Please provide vaild prefernece');
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
                const updatedPreferences = props.profile.preferences.filter(preference => preference !== removingPreference);
                const updatedPreferencesOptions = props.profile.preferencesOptions.filter(opt => opt.label !== removingPreference);
                props.setProfile({
                    ...props.profile,
                    preferences: updatedPreferences,
                    preferencesOptions: updatedPreferencesOptions
                });
                setRemovingPreference(""); // Clear the input field
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div>
            <h1>Profile</h1>

            <div>
                <form>
                    Add Allergy:
                    <Select
                        options={lists.ingredientsOptions}
                        onChange={(e) => setNewAllergy(e.label)}
                        value={{ label: newAllergy }}
                    />
                    <button type="button" onClick={handleAddAllergy}>
                        Add
                    </button>
                </form>

                <form>
                    Remove Allergy:
                    <Select
                        options={props.profile.allergiesOptions}
                        onChange={(e) => setRemovingAllergy(e.label)}
                        value={{ label: removingAllergy }}
                    />
                    <button type="button" onClick={handleRemoveAllergy}>
                        Remove
                    </button>
                </form>
            </div>

            <div>
                <form>
                    Add Preference:
                    <Select
                        options={lists.preferencesOptions}
                        value={{ label: newPreference }}
                        onChange={(e) => setNewPreference(e.label)}
                    />
                    <button type="button" onClick={handleAddPreference}>
                        Add
                    </button>
                </form>

                <form>
                    Remove Preference:
                    <Select
                        options={props.profile.preferencesOptions}
                        value={{ label: removingPreference }}
                        onChange={(e) => setRemovingPreference(e.label)}
                    />
                    <button type="button" onClick={handleRemovePreference}>
                        Remove
                    </button>
                </form>
            </div>

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