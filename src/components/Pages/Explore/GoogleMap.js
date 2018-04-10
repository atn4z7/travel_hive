import React from "react"
import { Button, Icon } from "antd" 
import { getStreetViewPhoto } from "../../../userApi"
import { BookmarkMapInspiration } from "./BookmarkMapInspiration/BookmarkMapInspiration"

const _ = require("lodash");
const { compose, withProps, withStateHandlers, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,  
  Marker,
} = require("react-google-maps");
const { InfoBox } = require("react-google-maps/lib/components/addons/InfoBox");
const demoFancyMapStyles = require("./TravelHiveMapStyle.json");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

export const CustomMap = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `450px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    center: { lat: 25.03, lng: 121.6 }, /* This is the home coordinates where the map will start once mounted */       
    streetViewObject : {}, /* This object contains all meta data about the streetview place*/
    image:"", /* Street view picture */
    imageDescription:"", /* Description of street view picture */
  }),
  withStateHandlers(() => ({
    isOpen: false,
    isModalOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
    onToggleModal: ({ isModalOpen }) => () => ({
      isModalOpen: !isModalOpen,
    })
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: this.props.center,        
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
          if(refs.map){
            refs.streetView = refs.map.getStreetView();
            const getStreetViewRef = () => {return refs.streetView};
            refs.streetView.addListener('visible_changed', () => {
              console.log("Streetview visibility changed",getStreetViewRef());
              this.setState({streetViewObject: getStreetViewRef()})
            })  
          }        
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })         
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {          
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
         
        },
        onVisibleChanged: (e) => console.log("Map visibility changed",e),
        onStreetViewTakePicture: () => {
          console.log("onStreetViewTakePicture called",this.state.streetViewObject);
          const streetView = this.state.streetViewObject;
          
          let args = {
            width: 400, /* This is a fixed value for now, but could be a user input */
            height: 400, /* This is a fixed value for now, but could be a user input */
            lat: streetView.position.lat(),
            lng: streetView.position.lng(),
            fov: 90, 
            heading: streetView.pov.heading,
            pitch: streetView.pov.pitch
          }

          const googleStreetviewImage = `https://maps.googleapis.com/maps/api/streetview?size=${args.width}x${args.height}&location=${args.lat}, ${args.lng}&fov=${args.fov}&heading=${args.heading}&pitch=${args.pitch}&key=${process.env.REACT_APP_GOOGLE_MAP_API}`        
          
          this.setState({image: googleStreetviewImage, imageDescription: streetView.location.description});
                    
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>  
  <div>
    <GoogleMap    
      ref={props.onMapMounted}
      defaultZoom={15}
      center={props.center}      
      onBoundsChanged={props.onBoundsChanged}
      defaultOptions={{ styles: demoFancyMapStyles }}      
    >    
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Explore!"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `270px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>        
      {props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} />
        
      )}
    </GoogleMap>

    <Button       
      style = {{minHeight: 60}}
      onClick = {() => {
        props.onStreetViewTakePicture()
        props.onToggleModal()}
      }
    >
      <Icon style={{fontSize: 40 }} type="camera" /> 
    </Button>

    {props.isModalOpen && <BookmarkMapInspiration 
                            onToggleModal = {props.onToggleModal}
                            visible = {true} 
                            imageSrc = {props.image}
                            imageDescription = {props.imageDescription}   
                          /> 
    }
  </div>
);

<CustomMap />