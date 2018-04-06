import React from 'react';

import { Button } from 'antd';

class Itinerary extends React.Component {
  constructor() {
    super();

    this.state = {
      visible: false
    };
  }

  hide = () => {
    this.props.hideTrips(this.props.showTrips)
  }

  render() {
    return (
      <div>
        <Button onClick = {this.hide}> Go Back to Previous Trips </Button>
        <h1> {this.props.title} </h1>
        <p> {this.props.description} </p>
        <p> Add Day by Day Activities </p>
      </div>
    )
  }
}

export default Itinerary;
