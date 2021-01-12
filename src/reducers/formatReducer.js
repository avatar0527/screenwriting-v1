const formatReducer = (def = 'hollywood', action) => {
  switch (action.type) {
    case 'UPDATE_FORMAT':
      return action.payload.format;
    default:
      return def;
  }
};

export default formatReducer;
