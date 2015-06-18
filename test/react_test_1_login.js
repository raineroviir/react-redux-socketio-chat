// Test for React login interface

jest.dontMock('../app/js/components/log_in.jsx');
describe('the login interface') {
  it('takes username and password and creates an object') {
    var React = require('react'                          );
    var login = require('../app/js/components/log_in.jsx');
    var TU    = React.addons.TestUtils;

    // Render user inputs
    var usernameInput: TU.renderIntoDocument(
      <input id="password" value=""/>
    );
  }
}
