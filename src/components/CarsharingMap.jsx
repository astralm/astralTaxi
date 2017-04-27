import React from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/addons/MarkerClusterer'
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
  	<MarkerClusterer gridSize = {60} averageCenter enableRetinaIcons>
	  	{
	  		[1,2,3,4,5,6,7,8,9,10].map(item => {
	  			return <Marker position = {new google.maps.LatLng(
	  				props.startLat + Math.random()*((0.009 - 0.001) - 0.001).toFixed(3),
	  				props.startLng + Math.random()*((0.009 - 0.001) - 0.001).toFixed(3)
					)}/>;
	  		}, this)
	  		
			}
		</MarkerClusterer>
  </GoogleMap>
));
const MapContainer = <div style={{width: "100%", height: "100%", position: "relative", overflow: "hidden"}}></div>;

export const CarsharingMap = React.createClass({
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
	render: function(){
		return <div data-role="page" id="carsharing" className="il white ui-page ui-page-theme-a ui-page-active" data-url="carsharing" tabIndex="0">
	    <div data-role="content" style={{padding: 0, height: "100vh"}} className="ui-content" role="main">
	      <div className="location-map carsharing">
	        <a className="back-link back ui-link" onClick = {this.props.history.goBack} style = {{zIndex: 999}}></a>
	        <GettingStartedGoogleMap startLat = {this.state.startLat} startLng = {this.state.startLng} containerElement = {MapContainer} mapElement = {MapContainer}/>
	      </div>
	      {
	      	this.state.popup ? 
		      <div className="best-inform__main" style={{zIndex: 999, background: "#fff", boxShadow: "0px -50vh 0px 0px rgba(0,0,0,.4)", position: "absolute", bottom: "0", width: "100vw"}}>
	          <a className="close-link best-inform-close ui-link" onClick = {(()=>{this.setState({popup: false})}).bind(this)}></a>
	          <div className="best-inform-wrapper">
	              <img src="img/marka.png" alt="logo" />
	              <div className="best-inform-h3">ZipCar</div>
	              <div className="best-inform-rating">
	                  <img src="img/gold-star.png" alt="star" />
	                  <span>4.9</span>
	              </div>
	              <div className="best-inform-dot">
	                  <div className="best-inform-dot__item">
	                      <span>Тариф</span>
	                      <div className="dotted-line"></div>
	                      <h4>8 РУБ/МИН</h4>
	                  </div>
	                  <div className="best-inform-dot__item">
	                      <span>Тариф</span>
	                      <div className="dotted-line"></div>
	                      <h4>8 РУБ/МИН</h4>
	                  </div>
	                  <div className="best-inform-dot__item">
	                      <span>Тариф</span>
	                      <div className="dotted-line"></div>
	                      <h4>8 РУБ/МИН</h4>
	                  </div>
	                  <div className="best-inform-dot__item">
	                      <span>Тариф</span>
	                      <div className="dotted-line"></div>
	                      <h4>8 РУБ/МИН</h4>
	                  </div>
	              </div>
	              <div className="best-inform-text-inf">
	                  <span>Более подробную информацию о данном перевозчике вы можете получить на официальном сайте. Также не забудьте ознакомиться с правилами использования данного сервиса.</span>
	                  <a href="" className="orange-a ui-link">ZIPCAR.COM</a>
	              </div>
	          </div>
	        </div> : ""
	      }
        <div className="location-confirm" >
          <div className="carsharing__marka">
            <img src="img/marka.png" alt="marka" onClick = {(()=>{this.setState({popup: true})}).bind(this)} style = {{cursor: "pointer"}}/>
            <div className="carsharing__marka-text">
              <h3>Ford Focus Sedan</h3>
              <span>Western Union, 7815 Northern Blvd, 3 min</span>
            </div>
         	</div>
          <div className="wrapper-carsharing">
            <div className="carsharing__two-cards">
              <div className="carsharing__card">
                <span className="carsharing__card__head-text">ТАРИФ</span>
                <span className="carsharing__card__main-text">8 руб./мин</span>
              </div>
              <div className="carsharing__card" onClick = {(()=>{this.props.history.push("/gus")}).bind(this)} style = {{cursor: "pointer"}}>
                <span className="carsharing__card__head-text">ОСТАВШЕЕСЯ ТОПЛИВО</span>
                <div className="wrapper__main-text">
                	<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACLElEQVQ4T5XTv2tTQRwA8Pte3r2rkMFFQqK4SFuEii6CuDmIi4MIOvkLEnMJWbQ4OFjMUrCKwa157+WH7eDqHyA46ya0IiKUTsWYiNUl3M+vXGxj+2gp/S7vuPvyuXvf7x0QQki9Xqe5XO4RY2wBAAgi+ulRUEqJc27DWntdCPFxvLA1AP+NougSY+y9tXYTEf+kkzKZTN5au46I54UQv3euj4A4ju9xzrtSysta6w9pIAzDeUJIkRAyCwCmVCp1tnNGQLvdvgMAS8aYmXK5/DkNxHH8BADmhsPhqYmJifuIuCaEWPJ5uwDn3JlSqbSaBqIomvOAtfZEr9cb5PP5Fefcy2q12hkDlNIlpdSFvQrVarWeOedmtdYna7Xa9ziOV4MgmNZa3x0BrVbrNmNsWUq5DgCD9AkIIZPOOTDGTHsgiqKVMAxnlFJmDARBsGyMGbUtHc4538pNrfVpDyRJ8pQxVtda/6uBP4EHlFJ7bE7I1t3oA0BTKbXc7/fXCoXCiyAIHhwG+OHbiIjHhRDPO53OMWPMt8MAA0S8SQi5KISYT5Ikh4j/AV/EA37hp3PuGgBcLZfLj5vN5iSl9O32Vb7BOX99APCLc35WSlmllDJELGit24CINEmSK5zzKSnlnkX0k4wxp5R6J4T4uri4eC4Mw16xWNyAbrd71BjzBQByvl37BeecDIfDN5VK5daux9RoNI5ks9lPmUxmylq7LxCGIZFSvhJCPNyZ9BeOtTPMNDuNJAAAAABJRU5ErkJggg==" alt="gas" />
                	<span className="carsharing__card__main-text">90 км</span>
                </div>
              </div>
            </div>
            <a href="#karchering" className="btn btn-warning waves-effect waves-light ui-link">ЗАБРОНИРОВАТЬ</a>
          </div>
	        </div>
	    </div>
		</div>
	}
});

export const CarsharingMapContainer = connect(null)(CarsharingMap);