import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Row, Col, Modal, Form, Input } from 'antd';

import PlanCard from "./PlanCard";

const { TextArea } = Input;

class Trips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      picture: '',
      modalVisible: false,
      data: []
    }
    this.addTrip = this.addTrip.bind(this);
    this.removeTrip = this.removeTrip.bind(this);
  }

  handleProp = (prop) => {
    return (e) => {
      this.setState({
        [prop]: e.target.value
      })
    }
  }

  removeTrip = (index) => {
    this.setState({
      data: this.state.data.filter((x,i) => i != index)
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  }

  addTrip = (e) => {
    e.preventDefault();

    let tripInfo =
      {
        title: this.state.title,
        description: this.state.description,
        picture: this.state.picture
      }

    this.setState({
      modalVisible: false,
      data: this.state.data.concat(tripInfo),
      title: '',
      description: '',
      picture: ''
    });
  }

  render() {
    return (
      <Row gutter={24}>
        <p> PLANNING PAGE </p>
        <Button onClick={this.showModal}> Create a new itinerary </Button>
        <Modal
          title="Create a new itinerary"
          visible={this.state.modalVisible}
          onOk={this.addTrip}
          onCancel={this.hideModal}>
          <Form>
            <Input
              placeholder="Add a title" value={this.state.title}
              onChange={this.handleProp('title').bind(this)} />
            <Input
              placeholder="Add picture URL" value={this.state.picture}
              onChange={this.handleProp('picture').bind(this)} />
            <TextArea
              placeholder = "Write a brief description about your trip"
              value={this.state.description}
              onChange={this.handleProp('description').bind(this)}
              rows={4} />
          </Form>
        </Modal>
        <div>
          {this.state.data.map((x, i) =>
            <div key={i}>
              <PlanCard
                data = {x}
                number = {i}
                remove = {this.removeTrip.bind(this, i)}
                title = {x.title}
                description = {x.description}
                picture = {x.picture} />
            </div>
          )}
        </div>
      </Row>
    );
  }
}

export default Trips;
