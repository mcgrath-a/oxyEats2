import axios from "axios";
import {
  getOperatingHoursRequestBody,
  updateOperatingHoursRequestBody,
} from "../graphQlSchema/operatingHours";
//import { backendUrl } from "../constants";

export const backendUrl = "https://oxyeats2.onrender.com";

export const getOperatingHours = async () => {
  const requestBody = {
    query: `
      query {
        getOperatingHours {
          day
          startTime
          endTime
        }
      }
    `,
  };
  const response = await axios.post(
    backendUrl + "/graphql",
    JSON.stringify(requestBody),
    { headers: { "Content-Type": "application/json" } }
  );
  return {
    data: response.data.data.getOperatingHours,
    status: response.status,
  };
};

export const updateOperatingHours = async (operatingHours) => {
  const requestBody = {
    query: `
      mutation ($input: OperatingHoursInput!) {
        updateOperatingHours(operatingHours: $input) {
          day
          startTime
          endTime
        }
      }
    `,
    variables: {
      input: operatingHours,
    },
  };
  const response = await axios.post(
    backendUrl + "/graphql",
    JSON.stringify(requestBody),
    { headers: { "Content-Type": "application/json" } }
  );
  return {
    data: response.data.data.updateOperatingHours,
    status: response.status,
  };
};
