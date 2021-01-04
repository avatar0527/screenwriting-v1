export const createNewEditor = (id) => {
  return {
    type: 'CREATE_NEW_EDITOR',
    payload: id,
  };
};
export const updateEditorState = (editorState, id) => {
  return {
    type: 'UPDATE_EDITOR_STATE',
    payload: { editorState, id },
  };
};

export const changeBlockType = (editorState, blockType, id) => {
  return {
    type: 'CHANGE_BLOCK_TYPE',
    payload: { editorState, blockType, id },
  };
};

export const updateOptionIndex = (index) => {
  return {
    type: 'UPDATE_OPTION_INDEX',
    payload: index,
  };
};
export const updateDebugIndex = (index) => {
  return {
    type: 'UPDATE_DEBUG_INDEX',
    payload: index,
  };
};

export const updateBackspaceCount = (count) => {
  return {
    type: 'UPDATE_BACKSPACE_COUNT',
    payload: count,
  };
};
