import React, { Component } from "react";
import dva, { connect } from "dva";
import map from "../images/map.png";
import prof_pic from "../images/profile_pic.png";
import {  
  addBioText,
  getPictures,
  getBase64ImgFromUrl,
  addInspiration
} from "../../../userApi";
import {
  Card, 
  message,
  Input,
  Modal,
  Button,
  Row,
  Col,
  Form,
  Divider,
  Spin
} from "antd";

/***************  Profile folder imports ****************/
import {Avatar} from "./Avatar";
import {EditProfile} from "./EditProfile";

const { Meta } = Card;

class PinInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      // title: '',
      loading: false
    };

    // this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleTitleChange(event) {
  //   console.log(event.target.value);
  //   this.setState({ title: event.target.value });
  // }

  handleUrlChange(event) {
    this.setState({
      url: event.target.value,
      loading: true
    });
    getPictures(event.target.value).then(imageAttrs => {
      this.props.updateImages(imageAttrs);
      this.setState({ loading: false });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <Form className="bookmark-inspiration" onSubmit={this.handleSubmit}>
        <Input
          placeholder="Paste URL"
          value={this.state.url}
          onChange={this.handleUrlChange}
          style={{ maxWidth: "80%" }}
        />
        <Spin spinning={this.state.loading} />
      </Form>
    );
  }
}
const PinCard = ({ selectedImageAttrs, handleChange, title }) => (
  <div className="pin-preview">
    <Card
      style={{ maxWidth: "60%" }}
      cover={<img src={selectedImageAttrs.src} alt="" />}
    >
      <Input
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="Add Title..."
      />
    </Card>
  </div>
);

const ImageSelector = ({ imageAttrs, selectImage }) => (
  <div>
    <h1>Select An Image</h1>
    {imageAttrs.map((imageAttrs, index) => (
      <img
        key={index}
        onClick={selectImage.bind(this, imageAttrs.src)}
        src={imageAttrs.src}
        alt={imageAttrs.alt}
        style={{ maxWidth: "100px" }}
      />
    ))}
  </div>
);

class BookmarkInspirtaion extends React.Component {
  state = {
    loading: false,
    visible: false,
    imageChosen: false,
    selectedImageAttrs: null,
    imageAttrs: [],
    title: ""
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    this.props.appState.dispatch({
      type: "inspiration/addInspiration",
      payload: {
        title: this.state.title,
        image: this.state.selectedImageAttrs.src
      }
    }),
      addInspiration({
        image: this.state.selectedImageAttrs.src,
        description: "Test run"
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
        <Button icon="plus" onClick={this.showModal}>
          Bookmark Your Inspiration
        </Button>
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

          {this.state.imageChosen ? (
            <PinCard
              selectedImageAttrs={this.state.selectedImageAttrs}
              handleChange={this.handleTitleChange}
              title={this.state.title}
            />
          ) : (
            <ImageSelector
              selectImage={this.selectImage}
              imageAttrs={this.state.imageAttrs}
            />
          )}
        </Modal>
      </div>
    );
  }
}

const ProfilePic = ({ src }) => (
  <Card cover={<img src={src} id="profile-avatar" />} />
);

const Bio = ({ bio }) => (
  <div className="bio">
    <p>{bio}</p>
  </div>
);

const Map = () => <Card cover={<img src={map} />} />;

export class ProfilePage extends React.Component {
  state = {
    pic: this.props.appState.user.profileImage,
    bio: this.props.appState.user.bioText
  };

  handleProfileChange = data => {
    this.setState(data);
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={16}>
            <div className="left">
              <ProfilePic src={this.state.pic} />
              <EditProfile
                updateProfileState={this.handleProfileChange}
                appState={this.props.appState}
              />
              <Bio bio={this.state.bio} />
            </div>
          </Col>
          <Col span={8}>
            <Map />
          </Col>
        </Row>
        <Divider>My Inspirations</Divider>
        <Row type="flex" justify="space-around">
          <Col lg={{ span: 8, offset: 16 }}>
            <BookmarkInspirtaion appState={this.props.appState} />
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col lg={{ span: 8 }}>
            {this.props.appState.inspiration.map(i => (
              <Card
                style={{ maxWidth: "60%" }}
                cover={<img src={i.image} alt="" />}
              >
                <Meta title={i.title} />
              </Card>
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}
