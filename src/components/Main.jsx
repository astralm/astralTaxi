import React from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SetStartPointCoordinatesAction from '../action_creators/set_start_point_coordinates_creator.js';
import SetStartPointAddressAction from "../action_creators/set_start_point_address_creator.js";
import SetEndPointAddressAction from "../action_creators/set_end_point_address_creator.js";
import SetEndPointCoordinatesAction from "../action_creators/set_end_point_coordinates_creator.js";

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
    onCenterChanged={
    	function(){
    		var lat = this.center.lat(),
    				lng = this.center.lng();
    		props.setStartCoordinationsEvent(lat, lng);
    	}
    }
  >
  	<Marker icon = "img/geolocation.png" position = {new google.maps.LatLng(props.geoLat, props.geoLng)}/>
    <div className="centerMarker"></div>
    	{
    		props.carsharign && props.endPointAddress != "" ?
    		  <div className="carsharignButton" onClick = {(()=>{props.history.push('/carsharing')}).bind(this)}>
	    	    <img src="img/car_black.png"/>
	        </div>
    	  : ""
    	}
  </GoogleMap>
));
const MapContainer = <div id="map" className="map" style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}></div>;

export const Main = React.createClass({
	mixins: [PureRenderMixin],
	getInitialState: function(){
		return {
			startPointAddress: this.props.startPointAddress,
			history: this.props.historyPoint || "",
			home: this.props.home || "",
			work: this.props.work || "",
			geolocation: {
				lng: "",
				lat: ""
			},
			carsharign: this.props.carsharign,
			endPointAddress: this.props.endPointAddress			
		}
	},
	componentWillMount : function(){
		if (!this.props.startLng || !this.props.startLat)
			navigator.geolocation.getCurrentPosition((function(data){
				this.props.SetStartPointCoordinatesAction(data.coords.latitude, data.coords.longitude);
			}).bind(this));
		else
			navigator.geolocation.getCurrentPosition((function(data){
				this.setState({
					geoLng : data.coords.longitude,
					geoLat : data.coords.latitude
				});
			}).bind(this));
	},
	getStartPointAddress: function(){
		(new google.maps.Geocoder).geocode(
			{
				location: {
					lat: this.state.startPointLat,
					lng: this.state.startPointLng
				}
			},
			((results, status) => {
				if(status === "OK"){
					this.props.SetStartPointAddressAction(results[0].formatted_address);
					this.setState({
						startPointAddress: results[0].formatted_address
					});
				}
			}).bind(this)
		);
	},
	setEndPoint: function(event){
		let id = event.target.id;
		switch (id){
			case 'historyPoint':
				try {
					this.props.SetEndPointCoordinatesAction(this.state.history.get('lat'), this.state.history.get('lng'));
					this.props.SetEndPointAddressAction(this.state.history.get('address'));
					this.props.history.push('/loading');
				} catch (err){
					console.log(err);
				}
				break;
			case 'homePoint':
				try {
					this.props.SetEndPointCoordinatesAction(this.state.home.get('lat'), this.state.home.get('lng'));
					this.props.SetEndPointAddressAction(this.state.home.get('address'));
					this.props.history.push('/loading');
				} catch (err){
					console.log(err);
				}
				break;
			case 'workPoint':
				try{
					this.props.SetEndPointCoordinatesAction(this.state.work.get('lat'), this.state.work.get('lng'));
					this.props.SetEndPointAddressAction(this.state.work.get('address'));
					this.props.history.push('/loading');
				} catch (err){
					console.log(err);
				}
				break;
		}
	},
	render: function(){
		return <div data-role="page" id="main" className="location-map-go il white" style={{zIndex:2, display: "block"}} data-url="main">
			    <div data-role="content" style={{padding: 0, height: "100vh"}}>
		        	<GettingStartedGoogleMap 
		        		containerElement = {
		        			MapContainer
		        		}
		        		mapElement = {
		        			<div style={{height: "100%"}}></div>
		        		}
		        		setStartCoordinationsEvent = { 
		        			(function(lat,lng){
			        			this.props.SetStartPointCoordinatesAction(lat, lng);
			        			this.setState({
			        				startPointLng: lng,
			        				startPointLat: lat
			        			});
			        			this.getStartPointAddress();
			        		}).bind(this)
		        		}
		        		startLng = {this.props.startLng}
		        		startLat = {this.props.startLat}
		        		geoLat = {this.state.geoLat}
		        		geoLng = {this.state.geoLng}
		        		carsharign = {this.state.carsharign}
		        		history = {this.props.history}
		        		endPointAddress = {this.endPointAddress}
		        	/>
			        <div className="location-map">
			            <div className="loca" onClick = {(()=>{this.props.history.push('/address')}).bind(this)}>
			                <img src="img/map-pin.png" alt="ico" />
			                <span id="pac-input">{this.state.startPointAddress}</span>
			            </div>
			            <a href="#user-main">
			                <i className="burger fa fa-bars fa-2x menu" aria-hidden="true"></i>
			            </a>
			        </div>
			        <div className="location-confirm">
			            <div className="wrapper-location-map-go">
			                <form className="where_go" action="">
			                    <a href="#address">
			                        <input type="text" id="pac-inputend" placeholder="Куда едем?" />
			                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAARCAYAAADpPU2iAAACFUlEQVQ4T21SPYgTQRSeN+skQqII2lrKeSoqCnqCopWd2gjWuWwyY1YCgRPt3FLxICJJbnczIU0awUbsbCIqQgpFRb2TlEJq0bAkmd03MiEJ65kphvc+vu/9A0m8RqOxlkql1rXWpw0MAJ/iOG5xzntzGswN3/ddxthGHMfvEPG1wSmlVyzLuqiU2uScu9Mg5ms2mw4h5HEcx7eEEC+TWT3Pu2ZZ1jNCyN1CoVCHWq12MJ1ObyPiA875VpI8t4MgKAGAOx6PVyEIgusmyWg0OlIul3/7vs8IIXcopRoR65xz1el09odh2CeEFMCUo7W+XSwWT5iIjUbjZDab/Wzs4XB4qlQqfTF2EARfAWALTI0AIMMwXKlUKr9ardY+pdRTQ2KMlfP5/J9qtXogk8nsIGIBfN8/RAjZ0VoLIcTzZT14nnfTsiwPEY9Op+R5XmBZ1jHbti8BgE6KtNYgpXwbx/F3IURxKqjX66uMsY9a6xuc81dJge/7VwHghVLqjOM424vFSSkDRDw7GAzOu64bGVG3293T7/d7lNIPtm0XF4ubZTnMGPuGiBUhRMtgUsp1RHyilDruOM7PfwQzwgYi3qOUrhgfEX9QSh/Ztr353y0ZoN1u742iqAcAvSiKzC2tMcbO5XK50VLBbGIXKKVvAIBMJpPLjuO8Tw5h0XQSlFI+NL5t2/d372WpwHXdlCG6rjvZLfgLzADyLdFODwkAAAAASUVORK5CYII=" alt="loc" />
			                    </a>
			                </form>
			                <div href="" className="location-map-go__container">
			                    <a className="location-map-go__item" id="homePoint" onClick = {this.setEndPoint}>
			                        <div className="img-round">
			                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAACeklEQVQ4T82ST0hUURTGz7n33WkMyZmgRRAiZFEMvvfGWQcSgrsgqF3opgxyEQUVWIELiyioCIyyXbYrCFpFuBBaz8x9yWCZbSRoEaSGNOPc++6JGz55PuePy+7y3u/87ne+cxB2cXp6etKZTOZcJpN5NTc3V2tXgu0EuVwuJYR4kRKp4Y36xozW+nylUqm3qmsJjYCMsWGt9azjOINhGLYFN4VaYCqVmmaMjYRheEtKec913RtCiDvGmJl6vd7UcUNo5JBzbh3eDoJgMmrX9/2bnPPJVuAd0E3gNOd8JAmMwK7rjrdyvA3aymFyMJFjrfWOjLeg8QybOWwAHuec78j4HzRqeXMo2zJst3I2CsdxLPilUuqCXTccGBhIr66uPnMcx2b4QUo51A6UfM/n8+8550NKqZlsNjuKvu8/5pxfJqLQGPNWSnk2Ksrn84MAcAIAWAxkAOBjuVyejW3Ea8bYaUTkWusn6LruSUT0EfEiIn4pl8unIrHneQ+FEFe01goACADQcRyhlHoUBMHV2OfviOgoET0nok9bg/I8b4Ex9jUO9X3/AQCMAYBnjFljjHUBQAAAU1LKa3GoMeZIEATH7V0EtTEsIOJiA+il9fX1g0tLS797e3v3dXZ2/gCAp0modSqltFDaFTQMw0Pz8/MrfX19Wc759/8P2t/ff98YM5Z0yhibKpVK15ODatb+t3Q6fSYSV6vVuwAw2qD96Y6OjvFIV6vV3hDR4UbQz4ho1+JnJEbELBFtKKW6K5XKr1wut18IsYyIe4hoJaY7QESLUspjyUHZn7uJiMfEIWNsDREnisXin0KhsJeIJowxXUkdACxLKW1n9Bd8zLDXnomqnAAAAABJRU5ErkJggg==" alt="round" />
			                        </div>
			                        <span>Дом</span>
			                    </a>
			                    <a className="location-map-go__item" id="historyPoint" onClick = {this.setEndPoint}>
			                        <div className="img-round">
			                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAC7UlEQVQ4T5WUT4jVVRTHv9/77ltMIySZRCuhwsZw7vv9YYYeLtpYCeZOwVnpZsysjRC0STe2N4IGnQra2ULaqGBUm2IylN+7v/ejybEmCmpniDATM83c3zlxH+/F+HIYu8tz7vmce84950tscrIse05E9gHYC+BxY8x9Vf3BGDNXFMUvDwtjnudPAnisKIrfAWiapi8AOAPgMEkrIssAVgCMGGO2qeo6gMsA3vPe/7gRyiRJZgAcLMtyV5qmUyQvqqoRkVmSl9fX1xfm5+fvTU5O7lhbWxvrJzlBMoQQTlZVdWkAZKvV+oTkAZJnAXxM8luSJ4qiWIiX8jx/VlXfJPnhoLw8z8dEJN7dF0KYqqrqs3g3wi4aY44DCADmlpaWDi0uLv49yJZl2avGmOsicqDT6XwxsCdJsp3kVZIuhDBRVdWdCLtgrX1dRGpVfZvkHVX9syzLWzEwTdP9JL9U1Ze9919t7NHYWGv3yIjpALjqvT9K59xss9mcFhGQhDEGdV1/7b3fvxUs+pMkOU/ylLV2D+MIAHg6hFglYK2NsHvdbnd+CPaS9/6b4ZFwzr1orb0hIse52ZwN7IMyAbyjqrEkqGpYXl6+EXubpulOVf3VGDMTyzzUeyJ5viiKOEMPnFar9Uqj0fi38dFZ17Wo6q6qqv5wzo0aY34D8Hn8gA9IvkXyKe/93WFYu91+YnV1Ndtof9jLRGQmDu0xY8ynIYR2VVXfb1X2sH98fLzdbDa/U9VjnJiYeCaEcFtVZ8qyPP1/YUmSvE/yjV6r+j8WJ/jgyorkCwvdnx4V6Jx7vtFoFCJypdvtTvVgcT1U9aaqVqr6WlmW97cC9jfgWlSVuq4nexswCHLOHbXWXlLVOZLTnU7n9mbALMv2qOpH/9nNjQHOuSlr7QVVtao6G6VGRH4G8BeAUZK7SUZpmo67XNf1g6oxnL2f9V0AR0g2+3q22tezURHp6Zkx5tzw6zfdgCg9UWlJ7hWR7Y+itP8AaP6R4t7npzMAAAAASUVORK5CYII=" alt="round" />
			                        </div>
			                        <span>{this.state.history.get('address')}</span>
			                    </a>
			                    <a className="location-map-go__item" id="workPoint" onClick = {this.setEndPoint}>
			                        <div className="img-round">
			                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAATCAYAAAB/TkaLAAABpUlEQVQ4T8WUu47TUBCG52JLIWZLKmrESo4v0ZbhEbagAsRuwwvQ5DnS8AIU7EqIioJXSIkS36RF1FSUbEwk+8ygEylREpxkHWm1R3Jh+/8/zcyZGYQ7nCAIzhzHeVbX9c8sy74fsuABAUZRNCKi9wDAAGBE5EOSJEMA0F1eDMPQ63a7T+bz+X8aVX3BzJ9E5CsiflHVV0T0UkQuAWC8beh0OlCW5W8byWtm/igij7ZFRASICMYYsVHaaJmZVBVE7KfNQ0R/jTHvMI7jCyK6MsaMmPnXukxEbIr2QSLC7fd1rTHmKTMPbRYraF3Xp2ma/jh0Cbv+h2H43HGcmw2oiPSn0+n0WGgcxzERTR4e6vv+46Iobndl0jrSXq8Xuq77raqq8zzP0yZwI9QY00uSpGgyDAaDk9ls9sbzvM/j8fhPkyaKIp+Z82VN3xLRtYhMAGDWZEBEUdU5InZUlXaUwCOivohc2JZaQFW1EJHy2Nsnoi4i+kvoovmrqgqzLMuOhQZBELium95/S93LRDXNfptSbMz+vi3VBmq1qy21b5+2hS736T+oKRkCksna4QAAAABJRU5ErkJggg==" alt="round" />
			                        </div>
			                        <span>Работа</span>
			                    </a>
			                </div>
			            </div>
			            <div className="wrapper-location-map-go wrapper-location-map-go-res">
			                <p>Подтвердите Ваше местоположение</p>
			                <form className="where_go" action="">
			                    <a href="#adress" className="ui-link">
			                        <div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" id="pac-inputend-res" placeholder="Куда едем?" /></div>
			                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAARCAYAAADpPU2iAAACFUlEQVQ4T21SPYgTQRSeN+skQqII2lrKeSoqCnqCopWd2gjWuWwyY1YCgRPt3FLxICJJbnczIU0awUbsbCIqQgpFRb2TlEJq0bAkmd03MiEJ65kphvc+vu/9A0m8RqOxlkql1rXWpw0MAJ/iOG5xzntzGswN3/ddxthGHMfvEPG1wSmlVyzLuqiU2uScu9Mg5ms2mw4h5HEcx7eEEC+TWT3Pu2ZZ1jNCyN1CoVCHWq12MJ1ObyPiA875VpI8t4MgKAGAOx6PVyEIgusmyWg0OlIul3/7vs8IIXcopRoR65xz1el09odh2CeEFMCUo7W+XSwWT5iIjUbjZDab/Wzs4XB4qlQqfTF2EARfAWALTI0AIMMwXKlUKr9ardY+pdRTQ2KMlfP5/J9qtXogk8nsIGIBfN8/RAjZ0VoLIcTzZT14nnfTsiwPEY9Op+R5XmBZ1jHbti8BgE6KtNYgpXwbx/F3IURxKqjX66uMsY9a6xuc81dJge/7VwHghVLqjOM424vFSSkDRDw7GAzOu64bGVG3293T7/d7lNIPtm0XF4ubZTnMGPuGiBUhRMtgUsp1RHyilDruOM7PfwQzwgYi3qOUrhgfEX9QSh/Ztr353y0ZoN1u742iqAcAvSiKzC2tMcbO5XK50VLBbGIXKKVvAIBMJpPLjuO8Tw5h0XQSlFI+NL5t2/d372WpwHXdlCG6rjvZLfgLzADyLdFODwkAAAAASUVORK5CYII=" alt="loc" />
			                    </a>
			                </form>
			                <br/>
			                <a href="" className="btn btn-warning btn-pos waves-effect waves-light">Подтвердить</a>
			            </div>
			        </div>
			    </div>
			</div>
	}
});

function mapStateToProps(state){
	return {
		startPointAddress: state.getIn(["startPoint","address"]),
		startLng: state.getIn(["startPoint", "lng"]),
		startLat: state.getIn(["startPoint", "lat"]),
		endPointAddress: state.getIn(["endPoint", 'address']),
		historyPoint: state.getIn(["savedPlaces", 'history']),
		home: state.getIn(["savedPlaces", 'home']),
		work: state.getIn(["savedPlaces", 'work']),
		carsharign: state.get("carsharing")
	}
}

export const MainContainer = connect(mapStateToProps, Object({SetStartPointAddressAction, SetStartPointCoordinatesAction, SetEndPointAddressAction, SetEndPointCoordinatesAction}))(Main);