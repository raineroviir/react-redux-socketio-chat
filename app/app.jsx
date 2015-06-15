'use strict';

var React = require('react');
var WelcomePage = require('./js/components/WelcomePage.react.jsx');

window.React = React; //react dev tools

React.render(
    <WelcomePage />,
    document.getElementById('react')
);
