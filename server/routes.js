import react from 'react';
import {Route} from 'react-router';
import App from '..client/js/containers/App';
import Login from '..client/js/containers/Login';

export default (
  <Route component={App}>
    <Route path="/" component={MainContainer} />
    <Route path="/login" component={Login} />
  </Route>
);
