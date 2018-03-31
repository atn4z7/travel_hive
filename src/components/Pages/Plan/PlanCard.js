import React from 'react';

import { Card, Col, Form, Input, Icon, Button } from 'antd';
import Modal from 'react-modal';

const FormItem = Form.Item;

const modalStyle = {
  content : {
    top: '40%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid black',
    width: '50%'
  }
};

Modal.setAppElement('#root')

class PlanCard extends React.Component {

  constructor() {
    super();

    this.state = { modalIsOpen: false };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <Col span={8}>
          <Card
            hoverable
            onClick = {this.openModal}
            style = {{ margin: '5px' }}
            title= "New Trip"
          />
        </Col>
        <Modal
          isOpen = {this.state.modalIsOpen}
          onRequestClose = {this.closeModal}
          style = {modalStyle}
          >
          <h2> Start a new trip! </h2>
          <Form layout="vertical">
            <FormItem>
              <Input placeholder="Name Your Trip!" />
            </FormItem>
            <FormItem>
              <Input placeholder="Day 1" />
            </FormItem>
          </Form>
          <Button onClick = {this.closeModal}> Close </Button>
          <Button icon="plus"> Add Day </Button>
          <Button icon="calendar"> Calendar </Button>
        </Modal>
      </div>
    )
  }
}

export default PlanCard;
