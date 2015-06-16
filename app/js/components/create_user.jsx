import React from 'react/addons';
import ReactMixin from 'react-mixin';
// import Auth from '../services/AuthService';

export default class CreateUser extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: '',
      email: ''
    }
  }

  createUser(e) {
    e.preventDefault();
    Auth.createUser(this.state.user, this.state.password, this.state.email)
      .catch(function(err) {
        alert('There was an error creating a user');
        console.log('Error when creating user: ' + err);
      });
  }

  render() {
    return (
        <div>
          <h1>Join Turtle</h1>
          <form>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" value="" name="username" placeholder="Please enter desired username"/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Please enter your password here"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="text" value="" name="email" placeholder="Please enter your email here"/>
          </div>
          </form>
          <button type="submit"value="Sign up">Create User</button>
        </div>
    );
  }
}

ReactMixin(CreateUser.prototype, React.addons.LinkedStateMixin);
