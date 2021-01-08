import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_SCREENPLAYS':
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case 'FETCH_SCREENPLAY':
      return { ...state, [action.payload.id]: action.payload };
    case 'CREATE_SCREENPLAY':
      return { ...state, [action.payload.id]: action.payload };
    case 'DELETE_SCREENPLAY':
      return _.omit(state, action.payload);
    case 'SAVE_SCREENPLAY':
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
