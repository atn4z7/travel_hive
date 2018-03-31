import React from 'react';

import { Button, Row, Col, Modal, Form, Input } from 'antd';

import PlanCard from "./PlanCard";

const { TextArea } = Input;

class Plan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numTrips: 0,
      visible: false
    }
    this.onAddTrip = this.onAddTrip.bind(this);
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  onAddTrip = () => {
    this.setState({
      numTrips: this.state.numTrips + 1,
      visible: false
    });
  }

  render() {

    const children = [];

    for (var i = 0; i < this.state.numTrips; i += 1) {
      children.push(<PlanCard key={i} number={i} />);
    };

    const ParentComponent = props => (
      <div>
        {props.children}
      </div>
    );

    return (
      <Row gutter={24}>
        <p> PLANNING PAGE </p>
        <Button onClick={this.showModal}> Create a new itinerary </Button>
        <Modal
          title="Create a new itinerary"
          visible={this.state.visible}
          onOk={this.onAddTrip}
          onCancel={this.handleCancel}>
          <Form>
            <Input placeholder="Add a title" />
            <TextArea placeholder = "Write a brief description about your trip" rows={4} />
          </Form>
        </Modal>
        <ParentComponent>
          {children}
        </ParentComponent>
      </Row>
    );
  }
}

export default Plan;
