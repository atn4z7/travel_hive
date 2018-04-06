import React from 'react';

import Plan from "./Plan"
import Itinerary from "./Itinerary"

import { Card, Col, Button } from 'antd';

const { Meta } = Card;

class PlanCard extends React.Component {
  constructor() {
    super();

    this.state = {
      visible: true
    };
    this.delete = this.delete.bind(this);
  }

  delete = () => {
    this.setState({
      visible: false
    });
    this.props.remove(this.props.data);
  }

  hide = () => {
    this.props.hideTrips(this.props.showTrips)
  }

  render() {
    return (
      <div>
        <Col span={8}>
          <Card
            hoverable
            onClick = {this.hide}
            style = {{ margin: '5px'}}
            title = {this.props.title}
            visible = {this.state.visible}
            cover = {<img src= {this.props.picture} height = '200px' />} >
          <Meta
            description = {this.props.description} />
          </Card>
          <Button
            onClick = {this.delete}
            type="danger"> Delete Trip </Button>
        </Col>
      </div>
    )
  }
}

export default PlanCard;
