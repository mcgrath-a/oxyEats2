import { createUserRequestBody, loginUserRequestBody } from "../graphQlSchema/auth"
import axios from "axios"
import { backendUrl } from "../constants"

export const register = async (email, password, fullName) => {
    
    const requestBody = createUserRequestBody(email, password, fullName)
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.createUser, status: response.status } 
}

export const login = async (email, password) => {
    
    const requestBody = loginUserRequestBody(email, password)
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.loginUser, status: response.status } 
}