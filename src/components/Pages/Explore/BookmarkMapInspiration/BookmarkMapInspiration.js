/******************* BookmarkInspiration Component of Profile Page *******************/
import React from 'react';
import {Button,message,Modal} from 'antd';
import {PinCard, PinInput} from './PinCard';
import {addInspiration,getBase64ImgFromUrl} from '../../../../userApi';

export class BookmarkMapInspiration extends React.Component {
    state = {
      loading: false,
      visible: this.props.visible,    
      imageSrc: this.props.imageSrc,
      title: this.props.imageDescription
    };
    componentWillUnmount = () =>{
      this.props.onToggleModal();
    }
    showModal = () => {
      this.setState({
        visible: true
      });
    };
    handleOk = () => {      
        addInspiration({
          image: this.state.imageSrc,
          description: this.state.title
        }).then(response => {
          if (response) {
            message.success("Inspiration added!");
          } else {
            message.error("Inspiration was not saved!");
          }
        });
      this.setState({
        loading: true,
        imageChosen: false,
        selectedImageAttrs: null,
        title: ""
      });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 3000);
    };
    handleCancel = () => {
      this.setState({ visible: false });
    };
    handleTitleChange = e => this.setState({ title: e.target.value });
    selectImage = (src, e) => {
      getBase64ImgFromUrl(src).then(result => {
        this.setState({ selectedImageAttrs: { src: result } });
        this.setState({ imageChosen: true });
      });
    };
  
    updateImages = imageAttrs => {
      this.setState({ imageAttrs: imageAttrs, loading: false });
    };
  
    render() {
      const { visible, loading } = this.state;
  
      return (
        <div>         
          <Modal
            style={{ top: 20 }}
            visible={visible}
            title="Bookmark Your Inspiration"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button
                key="submit"
                icon="plus"
                loading={loading}
                onClick={this.handleOk}
              >
                Add
              </Button>
            ]}
          >
            <PinInput updateImages={this.updateImages} />  
         
            <PinCard             
              handleChange={this.handleTitleChange}
              title={this.state.title}
              imageSrc = {this.props.imageSrc}
            />
           
            
          </Modal>
        </div>
      );
    }
  }