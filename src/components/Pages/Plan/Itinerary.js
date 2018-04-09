import React from 'react';

import { Button } from 'antd';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class Itinerary extends React.Component {

  render() {
    return (
      <div>
        <h1> {this.props.title} </h1>
        <p> {this.props.description} </p>
        <p> Add Day by Day Activies </p>
        <Button>
          <Link to = {`/plan/`}> Go Back to Previous Trips </Link>
        </Button>
      </div>
    )
  }
}

export default Itinerary;
