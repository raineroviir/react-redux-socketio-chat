'use strict';

var React = require('react');
var WelcomePage = require('./js/components/welcome_page.jsx');
var createUsr = require('./js/components/create_user.jsx');
var logIn = require('./js/components/log_in.jsx');


window.React = React; //react dev tools

React.render(
    <WelcomePage />,
    document.getElementById('react')
);
