import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

export default class SecondImage extends React.Component {
  render() {
    const blurbStyle ={
      marginTop: '150px',
      marginBottom:'40px',
      color: 'black',
      textAlign: 'right',
      verticalAlign: 'middle',
    };

    const titleStyle={
      fontSize: '30px',
    };

    const subtitleStyle={
      fontSize: '20px',
      lineHeight: '1.5',
    };

    return (
        <div id="secondimage">
          <Container>
            <Grid centered verticalAlign='middle' columns={2}>
              <Grid.Column position='left floated' style={{height: '550px' }}>

                <Container style={blurbStyle}>
                  <h3 style={titleStyle}>FIND THE ISSUE. FIX THE ISSUE.</h3>
                  <h6 style={subtitleStyle}>Be confident that officials know exactly where to find your problem. Let administrators quickly find your issue by including the location in your issue submission.</h6>
                </Container>
              </Grid.Column>
              <Grid.Column style={{ height: '550px,' }}>

                <Image centered fluid src={'/images/landing2.jpg'} />



              </Grid.Column>

            </Grid>
          </Container>
        </div>
    );
  }
}
