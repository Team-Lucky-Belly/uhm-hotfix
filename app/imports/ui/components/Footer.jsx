import React from 'react';
import { Container, Image, Menu, Header } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { backgroundColor: 'rgb(27, 28, 29)', color: 'black', paddingBottom: '10px' };
    const footerMenuStyle = {   boxShadow: 'none', border: 'none', margin: '0', borderRadius: '0' };
    return (
        <div>
        <div className="black-background colorblocktop" id='footer' style={{ backgroundColor: 'rgb(27, 28, 29)' }}>

          <Container align='center' style={divStyle}>
            <Image centered size='small' src='/images/logo.png'/>
            <Header inverted as='h1'>UHM HOTFIX</Header>

            <Menu fluid widths={6} borderless inverted style={footerMenuStyle}>
              <Menu.Item>HOME</Menu.Item>
              <Menu.Item>SUBMIT</Menu.Item>
              <Menu.Item>FEED</Menu.Item>
              <Menu.Item>ADMIN</Menu.Item>
            </Menu>
            <Menu fluid widths={11} borderless inverted>
              <Menu.Item>About</Menu.Item>
              <Menu.Item>|</Menu.Item>
              <Menu.Item>Blog</Menu.Item>
              <Menu.Item>|</Menu.Item>
              <Menu.Item>Contact Us</Menu.Item>
            </Menu>
          </Container>
        </div>
          <div id='footer2'>
            <Container>
              <Menu borderless id='topnav' style={{backgroundColor: '#006064', color: 'white'}}>
                <Menu.Item style={{color: 'white'}}>Developed by Team Lucky Belly:</Menu.Item>
                <Menu.Item style={{color: 'white'}}>Will Post</Menu.Item>
                <Menu.Item style={{color: 'white'}}>Nicolas Lum</Menu.Item>
                <Menu.Item style={{color: 'white'}}>Kenneth Lauritzen</Menu.Item>
                <Menu.Item position='right' style={{color: 'white'}}>In collaboration with the Fall 2018 ICS 314 community</Menu.Item>
              </Menu>
            </Container>
          </div>
        </div>
    );
  }
}

export default Footer;
