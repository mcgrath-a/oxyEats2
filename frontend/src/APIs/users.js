import { getAllUserRequestBody, getMeRequestBody, updateMeRequestBody } from "../graphQlSchema/users"
import axios from "axios"
import { backendUrl } from "../constants"

export const getAllUser = async () => {
    
    const requestBody = getAllUserRequestBody()
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.getAllUsers, status: response.status } 
}

export const getMe = async () => {
    
    const requestBody = getMeRequestBody()
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.getMe, status: response.status } 
}

export const updateMe = async (fullName, newsEmail) => {
    
    const requestBody = updateMeRequestBody(fullName, newsEmail)
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.updateMe, status: response.status } 
}