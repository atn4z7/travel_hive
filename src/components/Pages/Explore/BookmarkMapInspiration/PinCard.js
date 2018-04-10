/******************* PinCard Component of Explore page *******************/
import React,{Component} from 'react';
import {getPictures} from '../../../../userApi';
import {Card,Form,Input,Spin} from 'antd';

export class PinInput extends Component {
    constructor(props) {
      super(props);
  
      this.state = {         
        loading: false
      };  
  
      this.handleSubmit = this.handleSubmit.bind(this);
    }     
  
    handleSubmit(event) {
      event.preventDefault();
    }
  
    render() {
      return (
        <Form className="bookmark-inspiration" onSubmit={this.handleSubmit}>         
          <Spin spinning={this.state.loading} />
        </Form>
      );
    }
  }

  export const PinCard = (props) => (    
    <div className="pin-preview">
    {console.log("PinCard props",props)}
      <Card
        style={{ maxWidth: "80%" }}       
       cover={<img src={props.imageSrc} alt="" />}
      >
        <Input
          type="text"
          value={props.title}
          onChange={props.handleChange}          
        />
      </Card>
    </div>
  );