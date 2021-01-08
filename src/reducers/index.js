import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import optionIndexReducer from './optionIndexReducer';
import editorStateReducer from './editorStateReducer';
import debugIndexReducer from './debugIndexReducer';
import screenplaysReducer from './screenplaysReducer';
import saveStatusReducer from './saveStatusReducer';
import authReducer from './authReducer';

export default combineReducers({
  optionIndex: optionIndexReducer,
  editorState: editorStateReducer,
  debugIndex: debugIndexReducer,
  screenplays: screenplaysReducer,
  form: formReducer,
  saveStatus: saveStatusReducer,
  auth: authReducer,
});
