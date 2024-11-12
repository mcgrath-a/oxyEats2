
export const updateRatingRequestBody = (item, rating) => {

  const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))
    return {
        query: `
        mutation {
          rateFavoriteMenuItem(rateMenuItemInput: { userId: "${credentials._id}", menuItemName: "${item}", rating: ${rating} }) {
            ratings {
              name,
              rating
            }
          }
        }
        `
    }

  }

export const getRatingRequestBody = () => {

  const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))
    return {
        query: `
        query {
          userRatings(userId: "${credentials?._id}") {
              name,
              rating
          }
        }
        
        `
    }

  }