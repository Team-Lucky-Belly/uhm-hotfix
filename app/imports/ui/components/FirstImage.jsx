import React from 'react';
import { Container, Grid, Button } from 'semantic-ui-react';

export default class FirstImage extends React.Component {
  render() {
    const blurbStyle ={
      marginTop: '150px',
      marginBottom:'40px',
      color: '#ffffff',
      textAlign: 'left',
      verticalAlign: 'middle',
    };

    const titleStyle={
      fontSize: '40px',
    };

    const subtitleStyle={
      fontSize: '20px',
      lineHeight: '1.5',
    };

    return (
        <div id="firstimage">
          <Container>
            <Grid centered columns={2}>
              <Grid.Column/>
              <Grid.Column position='right floated' style={{ height: '700px,' }}>
                <Container style={blurbStyle}>
                  <h1 style={titleStyle}>FIX UH MANOA</h1>
                  <h3 style={subtitleStyle}>Make an impact, submit an issue, connect with officials, improve the university for everyone</h3>
                  <Button size='huge' inverted basic>Submit an Issue ></Button>
                </Container>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}
