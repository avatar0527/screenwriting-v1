const optionIndexReducer = (index = 0, action) => {
  switch (action.type) {
    case 'UPDATE_OPTION_INDEX':
      return action.payload;
    default:
      return index;
  }
};

export default optionIndexReducer;
