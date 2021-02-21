import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React from "react";

import credential from "./credential";
const LoadingContainer = (props) => <div>Fancy loading container!</div>;

export class MapContainers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMarker: {},
      selectedPlace: {
        name: "s",
      },
      showingInfoWindow: false,
      name: "",
      markers: [
        {
          title: "The marker`s title will appear as a tooltip.",
          name: "SOMA",
          position: { lat: 37.778519, lng: -122.40564 },
        },
      ],
    };
    this.onClick = this.onClick.bind(this);
  }
  onInfoWindowClose = () => {
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });
  };
  onClick(t, map, coord) {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();

    this.setState(previousState => {
      return {
        markers: [
          ...previousState.markers,
          {
            title: "",
            name: "",
            position: { lat, lng }
          }
        ]
      };
    });
  }

  onMarkerClick = (props, marker) => {
    console.log("marker");
    console.log(props, marker);
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true,
    });
  };

  onMapClicked = (e) => {
    console.log(e);
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };

  render() {
    const style = {};
    return (
      <div>
        <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807,
          }}
        //   onClick={this.onMapClicked}
        onClick={this.onClick}
        >
         

          <Marker name="Current location" onClick={this.onMarkerClick} />

          <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
          </InfoWindow>
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              title={marker.title}
              name={marker.name}
              position={marker.position}
            />
          ))}
          {/* {map && marker && (
  <InfoWindow google={google} visible={showInfo} marker={marker} map={map as google.maps.Map}>
    <big className="my-0">{`${marker.position.lat().toFixed(3)}, ${marker.position.lng().toFixed(3)}`}</big>
  </InfoWindow>
)} */}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: credential.mapsKey,
  LoadingContainer: LoadingContainer,
})(MapContainers);
