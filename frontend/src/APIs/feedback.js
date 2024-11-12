import { addFeedbackRequestBody } from "../graphQlSchema/feedback"
import axios from "axios"
import { backendUrl } from "../constants"

export const addFeedback = async (item) => {
    const requestBody = addFeedbackRequestBody(item)
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.createText, status: response.status } 
}
