import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SetStartPointAddressAction from '../action_creators/set_start_point_address_creator.js';
import SetEndPointAddressAction from '../action_creators/set_end_point_address_creator.js';
import SetStartPointCoordinatesAction from '../action_creators/set_start_point_coordinates_creator.js';
import SetEndPointCoordinatesAction from '../action_creators/set_end_point_coordinates_creator.js';

export const Address = React.createClass({
	mixins: [PureRenderMixin],
	getInitialState: function(){
		return {
			startPointAddress: this.props.startPointAddress,
			history: this.props.historyPoint,
			home: this.props.home,
			work: this.props.work
		}
	},
	getAddresses: function(event){
		let id = event.target.id,
				value = event.target.value;
		(new google.maps.Geocoder).geocode(
			{
				address: value
			}, 
			((results, status) => {
				if (status === "OK")
					this.setState({
						from: id == "from" ? true : false,
						addresses: results.map(item => {
							return {
								lat: item.geometry.location.lat(),
								lng: item.geometry.location.lng(),
								address: item.formatted_address
							}
						})
					});
			}).bind(this)
		);
	},
	render: function(){
		return <div data-role="page" id="adress" className="il white inner-form ui-page ui-page-theme-a ui-page-active" data-url="adress" tabIndex="0">
	    <div data-role="content" style={{padding: 0, height: "100vh"}} className="ui-content" role="main">
	      <div className="adress_top-container">
	       <div className="adress-title">
	           <a className="back-link back ui-link" onClick={this.props.history.goBack}></a>
	           <span>Укажите адрес</span>
	       </div>
	       <form action="" className="adress-form">
         	<div className="adress-from">
           	<div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">
           		<input type="text" id="adress-list" placeholder="" autoComplete="off" defaultValue={this.state.startPointAddress} autoFocus={true} id="from" onInput = {this.getAddresses}/>
         		</div>
         	</div>
            <div className="adress-to">
            	<div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">
           			<input type="text" id="adress-listTo" className="adress-to" placeholder="Куда едем?" autoComplete="off" id="to" onInput = {this.getAddresses}/>
         			</div>
       			</div>
	       </form>
	    	</div>
		    <div className="adress-main">
			    <div className="adress-list">
			    	{
			    		!this.state.addresses ? "" : ["history", "home", "work", ...this.state.addresses].map(function(address, key){
			    			let setAddress = function(){
			    				let input = document.getElementById(this.state.from ? "from" : "to");
			    				input.value = address.address;
			    				this.setState({
			    					[(this.state.from ? "start" : "end") + "PointAddress"]: address.address,
			    					[(this.state.from ? "start" : "end") + "PointLat"]: address.lat,
			    					[(this.state.from ? "start" : "end") + "PointLng"]: address.lng
			    				});
			    				if(this.state.from){
			    					this.props.SetStartPointAddressAction(address.address);
			    					this.props.SetStartPointCoordinatesAction(address.lat, address.lng);
			    				} else {
			    					this.props.SetEndPointAddressAction(address.address);
			    					this.props.SetEndPointCoordinatesAction(address.lat, address.lng);
			    				}
			    			};
			    			let title = "Предлагаемый адрес",
			    					src = "img/map-pin.png";
			    			switch (address){
			    				case "home":
				    				try{	
				    					address = {
				    						address: this.state.home.get('address'),
				    						lat: this.state.home.get('lat'),
				    						lng: this.state.home.get('lng')
				    					};
				    				} catch(err) {
				    					address = {};
				    				}
			    					title = "Дом";
			    					src = "img/home.png";
			    					break;
			    				case "history":
			    					try{
				    					address = {
				    						address: this.state.history.get('address'),
				    						lat: this.state.history.get('lat'),
				    						lng: this.state.history.get('lng')
				    					};
			    					} catch(err) {
			    						address = {};
			    					}
			    					src="img/story.png";
			    					title = "Последний адрес";
			    					break;
			    				case "work":
			    					try{
				    					address = {
				    						address: this.state.work.get('address'),
				    						lat: this.state.work.get('lat'),
				    						lng: this.state.work.get('lng')
				    					};
			    					} catch(err) {
			    						address = {};
			    					}
			    					src="img/work.png";
			    					title = "Работа";
			    					break;
			    			}
			    			return address.address ? <div className="list-container" onClick = {setAddress.bind(this)}>
			            <img src={src} alt="i" />
			            <div className="list-text">
		                <h4>{title}</h4>
		                <span>{address.address}</span>
			            </div>
				        </div> : "";
			    		}, this)
			    	}
			    </div>
			  </div>
	    </div>
		</div>
	}
});

function mapStateToProps(state){
	return {
		startPointAddress: state.getIn(['startPoint', 'address']),
		historyPoint: state.getIn(['savedPlaces', 'history']),
		work: state.getIn(['savedPlaces', 'work']),
		home: state.getIn(['savedPlaces', 'home'])
	}
}

export const AddressContainer = connect(mapStateToProps, Object({SetStartPointAddressAction, SetStartPointCoordinatesAction, SetEndPointAddressAction, SetEndPointCoordinatesAction}))(Address);