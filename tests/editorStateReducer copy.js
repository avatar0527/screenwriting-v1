import { EditorState, RichUtils } from 'draft-js';

const defaultState = {
  editorState: EditorState.createEmpty(),
};

const editorStateReducer = (editorState = defaultState, { type, payload }) => {
  switch (type) {
    case 'UPDATE_EDITOR_STATE':
      return { ...editorState, editorState: payload };

    case 'CHANGE_BLOCK_TYPE':
      let newEditorState = RichUtils.toggleBlockType(
        payload.editorState,
        payload.blockType
      );
      return { ...editorState, editorState: newEditorState };

    default:
      return editorState;
  }
};

export default editorStateReducer;

import { EditorState, RichUtils } from 'draft-js';

const defaultState = {
  1: { editorState: EditorState.createEmpty() },
};

const editorStateReducer = (editorState = defaultState, action) => {
  switch (action.type) {
    case 'CREATE_NEW_EDITOR':
      let newState1 = { ...editorState };
      newState1[action.payload] = EditorState.createEmpty();
      console.log('created');
      return newState1;
    case 'UPDATE_EDITOR_STATE':
      let newState2 = { ...editorState };
      newState2[action.payload.id] = action.payload.editorState;
      return newState2;

    case 'CHANGE_BLOCK_TYPE':
      let newState3 = { ...editorState };
      let newEditorState = RichUtils.toggleBlockType(
        action.payload.editorState,
        action.payload.blockType
      );
      let newNewState = { ...newState3[action.payload.id], newEditorState };
      newState3[action.payload.id] = newNewState;
      return newState3;

    default:
      return editorState;
  }
};

export default editorStateReducer;
