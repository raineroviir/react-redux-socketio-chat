import request from 'reqwest';
import when from 'when';
import {LOGIN_URL, CREATEUSER_URL} from '../constants/login_constants';
import TurtleActions from '../actions/TurtleActions.js'

class AuthService {

  login(username, password) {
    // Call server to log use in
    return this.handleAuth(when(request({
      url: 'http://localhost/api/login',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        username, password
      }
    })));
  }

  logout() {
    TurtleActions.logoutUser();
  }

  createUser(username, password, email) {
    return this.handleAuth(when(request({
      url: 'localhost:3000/users',
      method: 'POST',
      crossOrigin: true,
      type: 'json',
      data: {
        username, password, email
      }
    })));
  }

  handleAuth(loginPromise) {
    return loginPromise
      // We get the eat token back
      .then(function(res) {
        var eat = res.eat;
        // Trigger the login with the eat token
        TurtleActions.loginUser(eat);
        return true;
    });
  }
}

export default new AuthService()
