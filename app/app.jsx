'use strict';

var React = require('react');
var WelcomePage = require('./js/components/welcome_page.jsx');

window.React = React; //react dev tools

React.render(
    <WelcomePage />,
    document.getElementById('react')
);
