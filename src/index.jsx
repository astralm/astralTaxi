import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/app_reducer';
import {AppContainer} from './components/App';
import setStateAction from './action_creators/set_state_creator.js';
import setUserInformationAction from './action_creators/set_user_information_action_creator.js';
import setAuthAction from './action_creators/set_auth_creator.js';
import setVerificationAction from './action_creators/set_verification_creator.js';
import setPin from './action_creators/set_pin.js';
import {LoginContainer} from './components/Login';
import {VerificationContainer} from './components/Verification';
import {fromJS} from 'immutable';
import middleware from './middlewares/middleware.js';
import * as phoenix from 'phoenix';
import {env} from './env.js';

var _phoenix = require("phoenix");
var socket = new _phoenix.Socket("wss://apiteam.ru/socket/websocket/websocket", { params: { token: "123" } });
socket.connect();
var channel = socket.channel("lobby", {});

channel.join().receive("ok", function (resp) {
  console.log("Channel Joined successfully", resp);
}).receive("error", function (resp) {
	console.log("Channel Joined error", resp);
});

const routes = <Route component = {AppContainer}>
	<Route path="/" component = {VerificationContainer}/>
	<Route path="/login" component = {LoginContainer}/>
</Route>

const state = fromJS({
	auth: false,
	verification: false,
	registration: false
});

const store = applyMiddleware(middleware(channel))(createStore)(reducer);
store.subscribe(function(){
	localStorage.state = store.getState();
});

if (localStorage.hasOwnProperty("state")){
	store.dispatch(setStateAction(fromJS(JSON.parse(localStorage.state.split("Map").join("")))));
} else{
	store.dispatch(setStateAction(state));
} 

channel.on("pg", (payload) => {
	let in_base = false;
	if(payload.uxui == "pg_validate_phone" && payload.message.indexOf("[[0]]") == -1){
		in_base = true;
	}
	store.dispatch(setAuthAction(true));
	store.dispatch(setVerificationAction(true));
	store.dispatch(setUserInformationAction(fromJS({
		phoneNumber: store.getState().get("user"),
		in_base: in_base
	})));
	store.dispatch(setPin(true));
});

ReactDOM.render(
	<Provider store = {store} >
		<Router history = {hashHistory}>{routes}</Router>
	</Provider>,
	document.body
);




