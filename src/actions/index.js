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

export const updateEditorState = (editorState) => {
  return {
    type: 'UPDATE_EDITOR_STATE',
    payload: editorState,
  };
};

export const changeBlockType = (editorState, blockType) => {
  return {
    type: 'CHANGE_BLOCK_TYPE',
    payload: { editorState, blockType },
  };
};
export const moreContentRetrieved = (editorState, blocks) => {
  return {
    type: 'MORE_CONTENT_RETRIEVED',
    payload: { editorState, blocks },
  };
};
