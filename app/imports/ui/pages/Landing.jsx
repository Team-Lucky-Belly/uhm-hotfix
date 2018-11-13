import React from 'react';
import FirstImage from '../components/FirstImage.jsx';
import SecondImage from '../components/SecondImage.jsx';
import ThirdImage from '../components/ThirdImage.jsx';
import FooterExtra from '../components/FooterExtra.jsx';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <FirstImage/>
          <SecondImage/>
          <ThirdImage />
          <FooterExtra />
        </div>
    );
  }
}

export default Landing;
