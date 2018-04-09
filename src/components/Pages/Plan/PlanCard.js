import React from 'react';

import Itinerary from "./Itinerary"
import Plan from "./Plan"

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Card, Col, Button } from 'antd';

const { Meta } = Card;

class PlanCard extends React.Component {
  constructor(props) {
    super(props);

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

  render() {
    return (
      <div>
        <Col span={8}>
          <Card
            hoverable
            style = {{ margin: '5px' }}
            title = {this.props.title}
            visible = {this.state.visible}
            cover = {<img src= {this.props.picture} height = '200px' />} >
          <Meta
            description = {this.props.description} />
            <Button>
              <Link to = {`/plan/${this.props.number}`}> Edit Trip </Link>
            </Button>
            <br/>
            <Button
              onClick = {this.delete}
              type="danger"> Delete Trip
            </Button>
          </Card>
        </Col>
      </div>
    )
  }
}

export default PlanCard;
