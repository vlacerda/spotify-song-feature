import React, { Component } from 'react';
import {Provider} from 'react-redux';
import configureStore from './redux/configureStore';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Search from './components/Search';
import Detail from './components/Detail';
import Authenticate from './components/Authenticate';
import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={configureStore()}>
      <div className="App">
        <Authenticate></Authenticate>
        <Router>
          <div>
            <Route exact path="/oauth" component={Search} />
            <Route exact path="/detail/:id" component={Detail} />
          </div>
        </Router>
      </div>
      </Provider>
    );
  }
}

export default App;
