export const initialState = {
  user: null,
  //add any initial state you would like in here such as basket: []
  //This is how the Data layer looks at the beginning
};

//Putting actions into the data layer
export const actionTypes = {
  SET_USER: "SET_USER",
};

const reducer = (state, action) => {
  console.log(action);

  // The Switch listens for any action types and based on the case, updates the data layer in a certain way
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
