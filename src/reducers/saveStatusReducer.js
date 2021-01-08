const saveStatusReducer = (index = 0, { type, payload }) => {
  switch (type) {
    case 'UPDATE_SAVE_STATUS':
      return payload;
    default:
      return index;
  }
};

export default saveStatusReducer;
