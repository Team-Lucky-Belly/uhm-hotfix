import React from 'react';
import { Container, Grid, Image } from 'semantic-ui-react';

export default class ThirdImage extends React.Component {
  render() {
    const blurbStyle = {
      marginTop: '150px',
      marginBottom: '40px',
      color: 'black',
      textAlign: 'left',
      verticalAlign: 'middle',
    };

    const titleStyle = {
      fontSize: '30px',
    };

    const subtitleStyle = {
      fontSize: '20px',
      lineHeight: '1.5',
    };

    return (
        <div id="thirdimage">
          <Container>
            <Grid centered columns={2}>
              <Grid.Column position='left floated' style={{ height: '650px' }}>
                <Image centered fluid src={'/images/landing3temp.jpg'}/>

              </Grid.Column>
              <Grid.Column style={{ height: '650px,' }}>


                <Container style={blurbStyle}>
                  <h3 style={titleStyle}>NOT LOST. NEVER FORGOTTEN.</h3>
                  <h6 style={subtitleStyle}>As time passes, your issue increases in importance, and is automatically moved up the chain. Let other people vote for your issue to increase in priority. Never feel left behind. Never feel ignored.</h6>
                </Container>


              </Grid.Column>

            </Grid>
          </Container>
        </div>
    );
  }
}
