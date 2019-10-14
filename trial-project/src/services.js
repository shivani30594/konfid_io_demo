import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

// Function used to create the token based on authencation
export function authentication(data) {
    return axios.post(`${BASE_URL}/api/authentication`, 
                      { username: data.username, password: data.password })
      .then(response => {
         localStorage.setItem('x-access-token', response.data.token);
         localStorage.setItem('x-access-token-expiration', 
                              Date.now() + 2 * 60 * 60 * 1000);
        return response.data})
      .catch(err => Promise.reject('Authentication Failed!'));
  }

// Function used to get all products from the API
export function getAllProducts() {
    return axios.get(`${BASE_URL}/api/allProducts`)
            .then(response => response.data);
}

// Function used to get all products from the API
export function getCartProducts(cart) {
        return axios.post(`${BASE_URL}/api/allProducts`, {cart})
                .then(response => response.data);
}
 
// Function used to create the checkout  
export function checkout(data) {
        return axios.get(`${BASE_URL}/api/checkout`, 
            { params: { 'x-access-token': localStorage.getItem('x-access-token')} })
                .then(response => response.data)
                .catch(err => Promise.reject(err));
}

// Function used to check is user authenticated
export function isAuthenticated(){
        return localStorage.getItem('x-access-token') && localStorage.getItem('x-access-token-expiration') > Date.now()
}