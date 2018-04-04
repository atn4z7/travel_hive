import React from 'react';

import { Button, Row, Col, Modal, Form, Input } from 'antd';

import PlanCard from "./PlanCard";

const { TextArea } = Input;
const FormItem = Form.Item;

class Plan extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      picture: '',
      visible: false,
      data: []
    }
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handlePicture = this.handlePicture.bind(this);
    this.onAddTrip = this.onAddTrip.bind(this);
  }

  handleTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  handlePicture(e) {
    this.setState({
      picture: e.target.value
    });
  }

  handleDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  onAddTrip = (e) => {
    e.preventDefault();

    let tripInfo = {title: this.state.title, description: this.state.description, picture: this.state.picture}

    this.setState({
      visible: false,
      data: this.state.data.concat(tripInfo)
    });
  }

  render() {

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
            <Input
              type = "text" placeholder="Add a title" value={this.state.title} onChange={this.handleTitle}
            />
            <Input
              type = "text" placeholder="Add picture URL" value={this.state.picture} onChange={this.handlePicture}
            />
            <TextArea
              placeholder = "Write a brief description about your trip" value={this.state.description} onChange={this.handleDescription}
              rows={4}
            />
          </Form>
        </Modal>
        {this.state.data.map((x, i) =>
        <div key={i}>
          <PlanCard title = {x.title} description = {x.description} picture = {x.picture} />
        </div>
        )}
      </Row>
    );
  }
}

export default Plan;
