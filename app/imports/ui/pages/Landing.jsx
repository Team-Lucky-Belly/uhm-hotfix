import React from 'react';
import FirstImage from '../components/FirstImage.jsx';
import SecondImage from '../components/SecondImage.jsx';
import ThirdImage from '../components/ThirdImage.jsx';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <FirstImage/>
          <SecondImage/>
          <ThirdImage />
        </div>
    );
  }
}

export default Landing;
