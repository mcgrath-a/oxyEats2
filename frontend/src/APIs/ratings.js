import { updateRatingRequestBody, getRatingRequestBody } from "../graphQlSchema/ratings"
import axios from "axios"
import { backendUrl } from "../constants"

export const updateRating = async (item, rating) => {
    const requestBody = updateRatingRequestBody(item, rating)
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.rateFavoriteMenuItem, status: response.status } 
}

export const getUserRatings = async () => {
    
    const requestBody = getRatingRequestBody()
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.userRatings, status: response.status } 
    
}