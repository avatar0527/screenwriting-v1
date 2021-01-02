export const updateOptionIndex = (index) => {
  return {
    type: 'UPDATE_OPTION_INDEX',
    payload: index,
  };
};

export const updateBackspaceCount = (count) => {
  return {
    type: 'UPDATE_BACKSPACE_COUNT',
    payload: count,
  };
};
