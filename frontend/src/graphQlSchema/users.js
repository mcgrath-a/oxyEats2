
export const getAllUserRequestBody = (email, password, fullName) => {
    return {
        query: `
        query {
            getAllUsers{
              _id,
              email,
              newsEmail,
              fullName,
              isSubscribedToNewsletter,
              favorites{
                _id,
                name
              },
              ratings{
                _id,
                name,
                rating
              }
            }
          }
        `
    }
}

export const getMeRequestBody = () => {
  const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))

  return {
      query: `
      query {
        getMe(userId: "${credentials?._id}") {
          _id,
          fullName, 
          email,
          newsEmail,
          password 
        }
      }
      `
  }
}

export const updateMeRequestBody = (fullName, newsEmail) => {
  const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))

  return {
      query: `
      mutation {
        updateMe(userInput: {userId: "${credentials?._id}", fullName: "${fullName}", newsEmail: "${newsEmail}"}) {
          _id,
          fullName, 
          email,
          newsEmail,
          role
        }
      }
      `
  }
}