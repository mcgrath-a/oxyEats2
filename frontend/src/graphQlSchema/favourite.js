
export const addFavoriteRequestBody = (item) => {
    const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))

    return {
        query: `
        mutation {
            addFavorite(
              userId: "${credentials?._id}",   
              menuItemInput: {
                name: "${item}",            
                description: "${item}"  
              }
            ) {
                favorites {
                    name
                  }
            }
          }
        `
    }
}

export const getUserFavoriteRequestBody = () => {
  const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))

  return {
      query: `
      query {
        userFavorites(userId: "${credentials?._id}") {
          name 
        }
      }
      `
  }
}

export const removeUserFavoriteRequestBody = (menuItemName) => {
  
  const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))

  return {
    query: `
      mutation {
          removeFavorite(userId: "${credentials?._id}", menuItemName: "${menuItemName}") {
              _id
              email
              favorites {
                  _id
                  name
              }
          }
      }
    `
  }

}