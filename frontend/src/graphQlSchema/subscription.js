
export const subsciptionRequestBody = () => {
    const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))
  return {
        query: `
        mutation {
            subscribeToNewsletter(userId: "${credentials?._id}") {
              isSubscribedToNewsletter
            }
          }
          
        `
    }
}

export const unSubsciptionRequestBody = () => {
  const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))
  return {
        query: `
        mutation {
            unsubscribeFromNewsletter(userId: "${credentials?._id}") {
              isSubscribedToNewsletter
            }
          }
          
        `
    }
}

export const getSubsciptionRequestBody = () => {
  const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))
  return {
        query: `
        query {
          getSubscription(userId: "${credentials?._id}"){
            isSubscribedToNewsletter
          }
        }
        `
    }
}