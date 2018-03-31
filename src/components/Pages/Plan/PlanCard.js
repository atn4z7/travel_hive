import React from 'react';

import { Card, Col, Form, Input, Icon, Button, Modal } from 'antd';

const { TextArea } = Input;

class PlanCard extends React.Component {

  constructor() {
    super();

    this.state = { visible: false };
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

  render() {
    return (
      <div>
        <Col span={8}>
          <Card
            hoverable
            onClick = {this.showModal}
            style = {{ margin: '5px' }}
            title= "New Trip"
          />
        </Col>
        <Modal
          title="Update my itinerary"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel} >
          <Button icon="plus"> Add Bookmark </Button>
          <Button icon="calendar"> Calendar </Button>
          <Form layout="vertical">
            <TextArea placeholder = "Title" rows={4} />
          </Form>
        </Modal>
      </div>
    )
  }
}

export default PlanCard;
