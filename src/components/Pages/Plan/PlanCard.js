import React from 'react';

import Plan from "./PlanCard"

import { Card, Col, Form, Input, Icon, Button, Modal } from 'antd';

const { TextArea } = Input;
const { Meta } = Card;

class PlanCard extends React.Component {

  constructor() {
    super();

    this.state = {
      visible: false
    };
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
            style = {{ margin: '5px'}}
            title = {this.props.title}
            cover = {<img src= {this.props.picture} height = '200px' />}
          >
          <Meta
            description = {this.props.description}
          />
          </Card>
        </Col>
        <Modal
          title= {this.props.title}
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
