import React from 'react';

import { Button, Row, Col } from 'antd';

import PlanCard from "./PlanCard";

class Plan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numTrips: 0,
    }
    this.onAddTrip = this.onAddTrip.bind(this);
  }

  onAddTrip = () => {
    this.setState({
      numTrips: this.state.numTrips + 1
    });
  }

  render() {

    const children = [];

    for (var i = 0; i < this.state.numTrips; i += 1) {
      children.push(<PlanCard key={i} number={i} />);
    };

    const ParentComponent = props => (
      <div>
        <Button onClick={props.addTrip}> Add Trip </Button>
        <div>
          {props.children}
        </div>
      </div>
    );

    return (
      <Row gutter={24}>
        <p> PLANNING PAGE </p>
        <ParentComponent addTrip = {this.onAddTrip}>
          {children}
        </ParentComponent>
      </Row>
    );
  }
}

export default Plan;
