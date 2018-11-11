import React from 'react';
import { Container } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { backgroundColor: 'white', color: 'black' };
    return (
        <div style={{backgroundColor: 'white' }}>
          <Container align='center' style={divStyle}>
              Developed by Team Lucky Belly <br />
              <a href='#'>GitHub</a><br />
          </Container>
        </div>
    );
  }
}

export default Footer;
