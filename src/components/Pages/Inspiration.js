import React, { Component } from 'react';
import { Col,Row,Form, Input, Card, Button } from 'antd';
import { getInspirations } from '../../userApi'

const { Meta } = Card;

class PinInput extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      url: ''       
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleChange(event) {
    // console.log(event.target.value);
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('New Pin URL: ' + this.state.url);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          placeholder="Enter Url"
          value={this.state.url}
          onChange={this.handleChange}
          style={{ width: 400 }}
        />
        <Button htmlType="submit" icon="pushpin-o">Pin</Button>

      </Form>
    );
  }
}

const PinCard = ({image, description}) => (
  <div>
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img src={image || "https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL2RlODZjMTUyZWY2YWRlZmYxNDljNWIxNzU2NjNmYThhNzI4NTVhNzMuanBnIl0sWyJwIiwidGh1bWIiLCI5ODB4PiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA4MSAtYXV0by1vcmllbnQiXV0/de86c152ef6adeff149c5b175663fa8a72855a73.jpg"} alt="" />}
    >
      <Meta
        title={description || "Kasbah du Toubkal"} 

        /* IMPORTANT! need to add href attribution of images before site is live to public */
        description={<a href="" rel="noopener noreferrer" target="_blank">Source</a>}
        /******************************************************************************** */
      />
    </Card>
  </div>
);

export class InspirationPage extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      inspirations: []       
    };       
  }  
  componentDidMount(){
    getInspirations().then((inspirationsObject) => {
      if(!inspirationsObject) return
      this.setState({ inspirations: inspirationsObject.inspirations});    
      
    })    
  }  
  
  render(){
    
      let Layout = [];
      for(let i = 0; i < this.state.inspirations.length; i += 4){        
        var tmp = this.state.inspirations.slice(i,i+4).map((inspiration) => {         
                        
          return(    
             <Col span={6} key={inspiration.id + i}>
              <PinCard 
                key={inspiration.id} 
                image = {inspiration.image }
                description = {inspiration.description}
              />
             </Col>          
          );         
          
        })
        Layout.push(<Row key={i+100}>{tmp}</Row>);
  
      }
      
    return Layout;      
    
    return(
      <div>
        <Row>
         <Col> 
          <PinInput />
         </Col>
        </Row>

        <Row>
          <Col>
            <PinCard />
          </Col>
        </Row>
        {Layout}   
        
      </div>
    )}
}
