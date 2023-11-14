/*Folder containing endpoint urls*/
const backendEndpoint = "http://localhost:3001/"
const registerEndpoint = `${backendEndpoint}user/registration`;
const loginEndpoint = `${backendEndpoint}user/login`;
const profileEndpoint = `${backendEndpoint}profile`;
const inventoryEndpoint = `${backendEndpoint}inventory`;
const inventoryUpdateAmountEndpoint = `${inventoryEndpoint}/update/amount`;

export default {
    registerEndpoint,
    loginEndpoint,
    profileEndpoint,
    inventoryEndpoint,
    inventoryUpdateAmountEndpoint
}