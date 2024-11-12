export const getMenuRequestBody = () => {

    return {
        query: `
        query{
            getAllMenus{
              _id,
              day,
              date,
              data{
                meal,
                foods
              }
            }
          }
        `
    }
}

export const updateMenuRequestBody = (dayInput) => {
  return {
    query: `
      mutation createMenu($dayInput: DayInput!) {
        createMenu(dayInput: $dayInput) {
          _id,
          day,
          date,
          data {
            meal,
            foods
          }
        }
      }
    `,
    variables: {
      dayInput: dayInput,  
    }
  };
};