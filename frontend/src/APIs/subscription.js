import { subsciptionRequestBody, unSubsciptionRequestBody, getSubsciptionRequestBody } from "../graphQlSchema/subscription"
import axios from "axios"
import { backendUrl } from "../constants"

export const getSubscribeApi = async () => {
    const requestBody = getSubsciptionRequestBody()
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.getSubscription.isSubscribedToNewsletter, status: response.status } 
}

export const subscribeApi = async () => {
    const requestBody = subsciptionRequestBody()
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.getSubscription, status: response.status } 
}

export const unSubscribeApi = async () => {
    
    const requestBody = unSubsciptionRequestBody()
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.getSubscription, status: response.status } 

}