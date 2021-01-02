import { combineReducers } from 'redux';
import backspaceCountReducer from './backspaceCountReducer';
import optionIndexReducer from './optionIndexReducer';

export default combineReducers({
  optionIndex: optionIndexReducer,
  backspaceCount: backspaceCountReducer,
});
