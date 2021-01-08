import React from 'react';
import { Router, Route } from 'react-router-dom';

import EditorMain from './Editor/EditorMain';
import Header from './Header';
import createBrowserHistory from '../history';
import ScreenplayList from './ScreenplayList';
import ScreenplayCreate from './ScreenplayCreate';
import ScreenplayDelete from './ScreenplayDelete';

const RouteComponent = () => {
  return (
    <div className='ui container'>
      <Router history={createBrowserHistory}>
        <div>
          <Header />
          <Route path='/' exact component={ScreenplayList} />
          <Route path='/screenplays/new' exact component={ScreenplayCreate} />
          <Route path='/screenplays/editor/:id' exact component={EditorMain} />
          <Route
            path='/screenplays/delete/:id'
            exact
            component={ScreenplayDelete}
          />
        </div>
      </Router>
    </div>
  );
};

export default RouteComponent;
