const debugIndexReducer = (index = 0, { type, payload }) => {
  switch (type) {
    case 'UPDATE_DEBUG_INDEX':
      return payload;
    default:
      return index;
  }
};

export default debugIndexReducer;
