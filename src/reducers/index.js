import { combineReducers } from 'redux';
import backspaceCountReducer from './backspaceCountReducer';
import optionIndexReducer from './optionIndexReducer';
import editorStateReducer from './editorStateReducer';
import debugIndexReducer from './debugIndexReducer';

export default combineReducers({
  optionIndex: optionIndexReducer,
  backspaceCount: backspaceCountReducer,
  editorState: editorStateReducer,
  debugIndex: debugIndexReducer,
});
