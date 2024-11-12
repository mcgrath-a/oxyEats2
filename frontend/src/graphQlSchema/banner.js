
export const updateBannerRequestBody = (bannerId = "671d4568cdc7544cd62b0a29", timing) => {
    return {
        query: `
        mutation {
          updateBannerTime(
            banner: 
            {
              bannerId: "${bannerId}",
              startTimeOne: "${timing.startTimeOne}", 
              endTimeOne: "${timing.endTimeOne}",
              startTimeTwo: "${timing.startTimeTwo}", 
              endTimeTwo: "${timing.endTimeTwo}",
              startTimeText: "${timing.startTimeText}",
              endTimeText: "${timing.endTimeText}",
            }) {
            _id,
            startTimeOne, 
            endTimeOne,
            startTimeTwo, 
            endTimeTwo
          }
          }
        `
    }
}

export const getBannerRequestBody = (bannerId = "671d4568cdc7544cd62b0a29") => {

  return {
      query: `
      query {
        getBannerTiming(bannerId : "${bannerId}"){
          _id,
          startTimeOne, 
            endTimeOne,
            startTimeTwo, 
            endTimeTwo,
            startTimeText,
            endTimeText,
        }
      }
      `
  }
}
