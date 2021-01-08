import screenplays from '../apis/screenplays';
import history from '../history';
import { EditorState, convertToRaw } from 'draft-js';

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

export const notSaved = () => {
  return {
    type: 'UPDATE_SAVE_STATUS',
    payload: 1,
  };
};

export const saved = () => {
  return {
    type: 'UPDATE_SAVE_STATUS',
    payload: 0,
  };
};

export const createScreenplay = (formValues) => async (dispatch, getState) => {
  // const { userId } = getState().auth;
  const newEditor = EditorState.createEmpty();
  const rawEditor = JSON.stringify(convertToRaw(newEditor.getCurrentContent()));
  const response = await screenplays.post('/screenplays', {
    ...formValues,
    rawEditor,
  });

  dispatch({ type: 'CREATE_SCREENPLAY', payload: response.data });
  history.push('/');
};

export const deleteScreenplay = (id) => async (dispatch) => {
  await screenplays.delete(`/screenplays/${id}`);

  dispatch({ type: 'DELETE_SCREENPLAY', payload: id });
  history.push('/');
};

export const fetchScreenplays = () => async (dispatch) => {
  const response = await screenplays.get('/screenplays');

  dispatch({ type: 'FETCH_SCREENPLAYS', payload: response.data });
};

export const fetchScreenplay = (id) => async (dispatch) => {
  const response = await screenplays.get(`/screenplays/${id}`);

  dispatch({ type: 'FETCH_SCREENPLAY', payload: response.data });
};

export const loadEditorState = (id) => async (dispatch) => {
  const response = await screenplays.get(`/screenplays/${id}`);
  console.log(response);

  dispatch({ type: 'LOAD_EDITOR_STATE', payload: response.data });
};

export const saveScreenplay = (currentEditor, id) => async (dispatch) => {
  console.log(currentEditor);
  const convertedEditor = convertToRaw(currentEditor.getCurrentContent());
  const rawEditor = JSON.stringify(convertedEditor);
  const please = { rawEditor: rawEditor };
  const response = await screenplays.patch(`/screenplays/${id}`, please); //might need to be patch? not sure.
  dispatch({ type: 'SAVE_SCREENPLAY', payload: response.data });
};
