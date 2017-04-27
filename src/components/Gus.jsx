import React from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    zoom={17}
    center={{ lat: props.startLat, lng: props.startLng }}
    mapTypeId = {google.maps.MapTypeId.ROADMAP}
    options= {{
    	zoomControlOptions: {
    		position: google.maps.ControlPosition.RIGHT_CENTER
    	},
    	mapTypeControl: false,
    	scaleControl: false,
    	streetViewControl: false,
    	rotateControl: false
    }}
  >
  	<Marker icon = "img/geolocation.png" position = {new google.maps.LatLng(props.startLat, props.startLng)}/>
  </GoogleMap>
));
const containerElement = <div className="gus__map"></div>,
			mapElement = <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}></div>;

export const Gus = React.createClass({
	mixins: [PureRenderMixin],
	getInitialState: function(){
		return {
			
		}
	},
	componentWillMount : function(){
		navigator.geolocation.getCurrentPosition((function(data){
			this.setState({
				startLng : data.coords.longitude,
				startLat : data.coords.latitude
			});
		}).bind(this));
	},
	render : function(){
		return <div data-role="page" id="gus" className="il white ui-page ui-page-theme-a ui-page-active" data-url="gus" tabIndex="0">
	    <div data-role="content" style={{padding: 0, height: "100vh"}} className="ui-content" role="main">
        <div className="segment-title">
          <div className="adress-title">
            <a className="back-link ui-link" onClick = {this.props.history.goBack}></a>
            <span>Заправки</span>
          </div>
        </div>
        <GettingStartedGoogleMap containerElement = {containerElement} mapElement = {mapElement} startLat = {this.state.startLat} startLng = {this.state.startLng}/>
        <div className="segment-main gus-main">
          <div className="segment-main-wrapper">
            <div className="gus-how">
              <div><img src="img/gus.png" alt="bus" /></div>
              <div className="gus-how-text">
                <h3>Способ передвижения, номер</h3>
                <span>Расстояние км, время мин, стоимость, количество остановок</span>
              </div>
            </div>
          </div>
        </div>
	    </div>
		</div>
	}
});

export const GusContainer = connect(null)(Gus);