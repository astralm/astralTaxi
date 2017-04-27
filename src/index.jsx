import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/app_reducer';
import {AppContainer} from './components/App';
import {MainContainer} from './components/Main.jsx';
import setStateAction from './action_creators/set_state_creator.js';
import setUserInformationAction from './action_creators/set_user_information_action_creator.js';
import setAuthAction from './action_creators/set_auth_creator.js';
import setVerificationAction from './action_creators/set_verification_creator.js';
import setPinAction from './action_creators/set_pin_creator.js';
import setUserInBaseAction from './action_creators/set_user_in_base_creator.js';
import setUserPhoneAction from './action_creators/set_user_phone_creator.js';
import setUserRegisteredAction from './action_creators/set_user_registered_creator.js';
import {LoginContainer} from './components/Login';
import {VerificationContainer} from './components/Verification';
import {AddressContainer} from './components/Address.jsx';
import {Loading} from './components/Loading.jsx';
import {fromJS, Map} from 'immutable';
import middleware from './middlewares/middleware.js';
import * as phoenix from 'phoenix';
import {env} from './env.js';

var _phoenix = require("phoenix");
var socket = new _phoenix.Socket("wss://apiteam.ru/socket/websocket/websocket", { params: { token: "123" } });
socket.connect();
var channel = socket.channel("lobby", {});

channel.join().receive("ok", function (resp) {
  
}).receive("error", function (resp) {
	
});

const routes = <Route component = {AppContainer}>
	<Route path="/" component = {VerificationContainer}/>
	<Route path="/login" component = {LoginContainer}/>
	<Route path="/main" component = {MainContainer}/>
	<Route path="/address" component = {AddressContainer}/>
	<Route path="/loading" component = {Loading}/>
</Route>

const state = fromJS({
	auth: false,
	verification: false,
	registration: false,
	user: Map(),
	startPoint: Map(),
	endPoint: Map(),
	savedPlaces: fromJS({
		work: {
			lat: 29.7604267,
			lng: -95.3698028,
			address: "Хьюстон, Техас, США"
		},
		home: {
			lat: 55.75674743813564,
			lng: 37.62287363033295,
			address: "Богоявленский пер., 1, Москва, Россия, 109012"
		},
		history: {
			lat: -22.9219,
			lng: -43.235376599999995,
			address:"Shopping Tijuca - Av. Maracanã, 987 - Loja 1062 - Tijuca, Rio de Janeiro - RJ, 20543-970, Бразилия"
		}
	})
});

const store = applyMiddleware(middleware(channel))(createStore)(reducer);
store.subscribe(function(){
	localStorage.state = store.getState();
});

if (localStorage.hasOwnProperty("state")){
	store.dispatch(setStateAction(fromJS(JSON.parse(localStorage.state.split("Map").join("").split("List").join("")))));
} else{
	store.dispatch(setStateAction(state));
} 

channel.on("pg", (payload) => {
	let in_base = false;

	switch (payload.uxui){
		case 'pg_validate_phone': 
			if (payload.message.indexOf("[[0]]") == -1){
				in_base = true;
			}
			if (!store.getState().getIn(['user', 'pin'])){
				store.dispatch(setPinAction(true));
			}
			store.dispatch(setAuthAction(true));
			store.dispatch(setVerificationAction(true));
			break;
		case 'pg_validate_mail':
			if (payload.message.indexOf("[[0]]") != -1){
				store.dispatch(setUserRegisteredAction(true, true));
				store.dispatch(setUserPhoneAction(store.getState().getIn(['user', 'phoneNumber']), true));
			}
			break;
	}
	store.dispatch(setUserInBaseAction(in_base));
});


ReactDOM.render(
	<Provider store = {store} >
		<Router history = {hashHistory}>{routes}</Router>
	</Provider>,
	document.body
);




