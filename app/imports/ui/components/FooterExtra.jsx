import React from 'react';
import { Container, Image,} from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
export default class FooterExtra extends React.Component {
  render() {
    const divStyle = { backgroundColor: 'rgb(27, 28, 29)', color: 'black', paddingBottom: '10px' };
    return (
        <div>
        <div className="black-background colorblocktop" id='footer' style={{ backgroundColor: 'rgb(27, 28, 29)' }}>

          <Container align='center' style={divStyle}>
            <Image centered size='small' src='/images/logo.png'/>
          </Container>
        </div>
        </div>
    );
  }
}

