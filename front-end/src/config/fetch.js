/*Folder containing endpoint urls*/
const backendEndpoint = "http://localhost:3001/"

/*user endpoints*/
const registerEndpoint = `${backendEndpoint}user/registration`;
const loginEndpoint = `${backendEndpoint}user/login`;

/*profile endpoints*/
const profileEndpoint = `${backendEndpoint}profile/`;
const addAllergyEndpoint = `${profileEndpoint}addAllergy`
const removeAllergyEndpoint = `${profileEndpoint}removeAllergy`
const addPreferenceEndpoint = `${profileEndpoint}addPreference`
const removePreferenceEndpoint = `${profileEndpoint}removePreference`

/*inventory endpoints*/
const inventoryEndpoint = `${backendEndpoint}inventory`;
const inventoryUpdateAmountEndpoint = `${inventoryEndpoint}/update/amount`;

export default {
    registerEndpoint,
    loginEndpoint,
    profileEndpoint,
    addAllergyEndpoint,
    removeAllergyEndpoint,
    addPreferenceEndpoint,
    removePreferenceEndpoint,
    inventoryEndpoint,
    inventoryUpdateAmountEndpoint
}