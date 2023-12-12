import { React, useState, useEffect, useContext } from 'react';
import endPoints from '../../../config/fetch'
import lists from '../../../config/list';
import Select from 'react-select';
import UserInfo from '../../../config/UserInfo';
import NavigationBar from '../../NavigationBar';
import DashboardFooter from '../../DashboardFooter';
import '../../../styles/Profile.css'
import 'bootstrap/dist/css/bootstrap.min.css';

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

    const [selectedOption, setSelectedOption] = useState('');

    const renderContent = () => {
        switch (selectedOption) {
            case 'My Information':
                return (
                    <div>
                        {/* Render content for My Information */}
                        {/* Example: Display user information */}
                        <h2>User Information</h2>
                        {/* Add your content here */}
                    </div>
                );

            case 'Update Preference':
                return (
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

            case 'Favorite Meals':
                return (
                    <div>
                        {/* Render content for Favorite Meals */}
                        {/* Example: Display favorite meals */}
                        <h2>Favorite Meals</h2>
                        {/* Add your content here */}
                    </div>
                );

            default:
                return 'My Information';
        }
    };

    return (
        <div className='profile-div'>
            <NavigationBar />
            <div className="row">
                {/* Sidebar */}
                <div className="col-md-3">
                    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark profile-bar">
                        <p className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                            <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap" /></svg>
                            <span className="profile-title">Profile Settings</span>
                        </p>
                        <hr />
                        <ul className="nav nav-pills flex-column mb-auto">
                            <li className='list-section'>
                                <button
                                    className="btn nav-link text-white list-section"
                                    onClick={() => setSelectedOption('My Information')}
                                >
                                    <svg className="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2" /></svg>
                                    My Information
                                </button>
                            </li>
                            <li className='list-section'>
                                <button
                                    className="btn nav-link text-white list-section"
                                    onClick={() => setSelectedOption('Update Preference')}
                                >
                                    <svg className="bi me-2" width="16" height="16"><use xlinkHref="#table" /></svg>
                                    Update Preference
                                </button>
                            </li>
                            <li className='list-section'>
                                <button
                                    className="btn nav-link text-white list-section"
                                    onClick={() => setSelectedOption('Favorite Meals')}
                                >
                                    <svg className="bi me-2" width="16" height="16"><use xlinkHref="#grid" /></svg>
                                    Favorite Meals
                                </button>
                            </li>
                        </ul>
                        <hr />
                    </div>
                </div>
                <div className="col-md-9 p-3">
                    {renderContent()}
                </div>
            </div>
            <DashboardFooter />
        </div>
    );
}

export default Profile;