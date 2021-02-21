import React, { useState, useRef, useCallback, useEffect } from "react";
import credential from "./credential";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
// import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const LoadingContainer = () => {
  return <div>CARGANDOOOOOOOO</div>;
};
const SearchBox = ({ maps, onPlacesChanged, placeholder }) => {
  const input = useRef(null);
  const searchBox = useRef(null);

  const handleOnPlacesChanged = useCallback(() => {
    if (onPlacesChanged) {
      onPlacesChanged(searchBox.current.getPlaces());
    }
  }, [onPlacesChanged, searchBox]);

  useEffect(() => {
    if (!searchBox.current && maps) {
      searchBox.current = new maps.places.SearchBox(input.current);
      searchBox.current.addListener("places_changed", handleOnPlacesChanged);
    }

    return () => {
      if (maps) {
        searchBox.current = null;
        maps.event.clearInstanceListeners(searchBox);
      }
    };
  }, [maps, handleOnPlacesChanged]);

  return <input ref={input} placeholder={placeholder} type="text" />;
};
const Mapss = (props) => {
  const [markers, setmarkers] = useState([
    {
      title: "The marker`s title will appear as a tooltip.",
      name: "SOMA",
      position: { lat: -11.962421576255773, lng: -77.05579195967476 },
    },
  ]);
  const pintandoMarker = (t, map, coord) => {
    const { initialCenter } = t;
    const lat = initialCenter.lat;
    const lng = initialCenter.lng;
    console.log(t);
    console.log(coord);
    console.log(coord.latLng.lat());
    console.log(coord.latLng.lng());
    const data = {
      title: "MI UBICACION",
      name: "MI CASITA",
      position: { lat: lat, lng: lng },
    };
    setmarkers([
      {
        title: "JEJEJE",
        name: "JOJOJO",
        position: { lat: coord.latLng.lat(), lng: coord.latLng.lng() },
      },
    ]);
    console.log(data);
    console.log(markers);
  };
  const onDragMarkeer = (coord, index) => {
    console.log("entrando a la funcion");
    const { latLng } = coord;
    // setmarkers([
    //   {
    //     title: "The marker`s title will appear as a tooltip.",
    //     name: "SOMA",
    //     position: { lat: 37.778519, lng: -122.40564 },
    //   },
    // ]);
    console.log(coord);
  };
  const containerStyle = {
    // position: "relative",
    width: "50%",
    height: "50%",
  };
  return (
    <div>
      <Map
        containerStyle={containerStyle}
        google={props.google}
        initialCenter={{
          lat: -11.962421576255773,
          lng: -77.05579195967476,
        }}
        onClick={pintandoMarker}
        zoom={12}
      >
        {markers
          ? markers.map((markere, index) => (
              <Marker
                key={index}
                title={markere.title}
                name={markere.name}
                position={markere.position}
                draggable={true}
                onDragend={onDragMarkeer}
              />
            ))
          : console.log("no hay nada")}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: credential.mapsKey,
  LoadingContainer: LoadingContainer,
  // containerElement: <div style={{ height: `400px` }} />,
  // mapElement: <div style={{ height: `100%` }} />,
})(Mapss);
