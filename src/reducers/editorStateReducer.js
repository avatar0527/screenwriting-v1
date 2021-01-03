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
