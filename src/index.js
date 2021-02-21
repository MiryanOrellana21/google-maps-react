import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './components/Map2';
import App from './components/Map';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    {/* <App markers={[{
      title: "The marker`s title will appear as a tooltip.",
      name: "SOMA",
      position: { lat: 37.778519, lng: -122.40564 },
    },]}/> */}
    <App></App>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
