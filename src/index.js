import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import EditorMain from './components//Editor/EditorMain';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <EditorMain />
  </Provider>,
  document.querySelector('#root')
);
