import { combineReducers } from 'redux';
import optionIndexReducer from './optionIndexReducer';

export default combineReducers({
  optionIndex: optionIndexReducer,
});
