
export const addFeedbackRequestBody = (feedback) => {
    const credentials = localStorage.getItem('credentials') && JSON.parse(localStorage.getItem('credentials'))
    return {
        query: `
        mutation {
          createText(textInput: {
            content: "${feedback}",
            userId: "${credentials?._id}"
          }) {
            _id
            content
            createdAt
            userId {
              fullName
            }
          }
        }
        `
    }
}

