import { EditorState, RichUtils, ContentState, convertFromRaw } from 'draft-js';

const defaultState = {
  editorState: EditorState.createEmpty(),
};

const editorStateReducer = (editorState = defaultState, action) => {
  switch (action.type) {
    case 'UPDATE_EDITOR_STATE':
      return { ...editorState, editorState: action.payload };

    case 'CHANGE_BLOCK_TYPE':
      let newEditorState = RichUtils.toggleBlockType(
        action.payload.editorState,
        action.payload.blockType
      );
      return { ...editorState, editorState: newEditorState };

    case 'MORE_CONTENT_RETRIEVED':
      // Capture current state
      const currentContentState = editorState.getCurrentContent();
      const currentBlockMap = currentContentState.getBlockMap();
      const currentSelection = editorState.getSelection();

      // Create new ContentBlocks
      const { blocks } = action.payload;
      const newContentState = convertFromRaw({ blocks, entityMap: {} });
      const newBlockMap = newContentState.getBlockMap();

      // Combine new and existing ContentBlocks
      const combinedBlockMap = newBlockMap.concat(currentBlockMap);
      const combinedContentState = ContentState.createFromBlockArray(
        combinedBlockMap.toArray()
      );

      // Push EditorState while excluding changes from undo/redo stack
      const stateNoUndo = EditorState.set(editorState, { allowUndo: false });
      const newState = EditorState.push(
        stateNoUndo,
        combinedContentState,
        'insert-fragment'
      );
      const stateAllowUndo = EditorState.set(newState, { allowUndo: true });

      // Maintain SelectionState
      const newStateWithSelection = EditorState.forceSelection(
        stateAllowUndo,
        currentSelection
      );

      // Return combined selection state
      return newStateWithSelection;
    case 'LOAD_EDITOR_STATE':
      // const testEditor = EditorState.

      const rawEditor = action.payload.rawEditor;
      const parsedEditor = JSON.parse(rawEditor);
      const convertedEditor = convertFromRaw(parsedEditor);
      const loadedEditor = EditorState.createWithContent(convertedEditor);
      console.log(action.payload);
      console.log(rawEditor);
      console.log(parsedEditor);
      console.log(convertedEditor);
      console.log(loadedEditor);
      return { editorState: loadedEditor };

    default:
      return editorState;
  }
};

export default editorStateReducer;
