const backspaceCountReducer = (count = 0, action) => {
  switch (action.type) {
    case 'UPDATE_BACKSPACE_COUNT':
      return action.payload;
    default:
      return count;
  }
};

export default backspaceCountReducer;
