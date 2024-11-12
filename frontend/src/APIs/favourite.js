import { addFavoriteRequestBody, getUserFavoriteRequestBody, removeUserFavoriteRequestBody } from "../graphQlSchema/favourite"
import axios from "axios"
import { backendUrl } from "../constants"

export const addFavorite = async (item) => {
    const requestBody = addFavoriteRequestBody(item)
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.addFavorite, status: response.status } 
}

export const removeFavorite = async (itemName) => {
    
    const requestBody = removeUserFavoriteRequestBody(itemName)
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.removeFavorite, status: response.status } 

}

export const getUserFavorite = async (item) => {
    
    const requestBody = getUserFavoriteRequestBody(item)
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.userFavorites, status: response.status } 
    
}