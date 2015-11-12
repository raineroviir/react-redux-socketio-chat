import React from 'react';
import { Button } from 'react-bootstrap';

export default class FBSignIn extends React.Component {

  render() {
    return (
      <section style={{justifyContent: 'center', display: 'flex'}}>
        <a style={{margin: 'auto', width: '20em', height: '3.5em'}} href="/api/auth/facebook">
          <Button
            bsStyle="primary"
            style={{margin: 'auto', width: '20em', height: '3.5em'}}
            >
              <p style={{margin: '0', padding: '0', fontSize: '1.5em'}}>
              <i className="fa fa-facebook" style={{marginRight: '1em'}}></i>
              Sign In With Facebook</p>
          </Button>
        </a>
      </section>
    );
  }
}
