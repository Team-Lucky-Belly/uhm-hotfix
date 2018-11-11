import React from 'react';
import FirstImage from '../components/FirstImage.jsx';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div>
          <FirstImage/>
        </div>
    );
  }
}

export default Landing;
