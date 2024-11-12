import { updateBannerRequestBody, getBannerRequestBody } from "../graphQlSchema/banner"
import axios from "axios"
import { backendUrl } from "../constants"

export const updateBanner = async (bannerId = "671d4568cdc7544cd62b0a29", timing) => {
    
    const requestBody = updateBannerRequestBody(bannerId = "671d4568cdc7544cd62b0a29", timing)
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.updateBannerTime, status: response.status } 
}

export const getBannerTiming = async (bannerId = "671d4568cdc7544cd62b0a29") => {
    
    const requestBody = getBannerRequestBody(bannerId = "671d4568cdc7544cd62b0a29")
    const response = await axios.post(
        backendUrl + "/graphql", 
        JSON.stringify(requestBody),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    return { data: response.data.data.getBannerTiming, status: response.status } 
}