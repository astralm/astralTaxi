import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/app_reducer';
import {AppContainer} from './components/App';
import setStateAction from './action_creators/set_state_creator.js';
import Auth from './components/Auth';
import {fromJS} from 'immutable';
import middleware from './middlewares/middleware.js';
import * as phoenix from 'phoenix';
import {env} from './env.js';

const socket = new phoenix.Socket(env.url, { params: { token: env.userToken } });
socket.connect();
const channel = socket.channel(env.channel, {});
channel.join().receive("ok", function (resp) {
  console.log("Channel Joined successfully", resp);
}).receive("error", function (resp) {
	console.log("error", resp);
});;

channel.on("vendor_server_token", (payload) => {
	console.log(payload);
});

channel.on("bearer_token", (payload) => {
	console.log(payload);
});

const routes = <Route component = {AppContainer}>
	<Route path="/" component = {Auth} />
</Route>

const state = fromJS({
	auth: false,
	registration: false
});

window.store = applyMiddleware(middleware)(createStore)(reducer);
store.subscribe(function(){
	localStorage.state = store.getState();
});

if (localStorage.hasOwnProperty("state")){
	store.dispatch(setStateAction(fromJS(JSON.parse(localStorage.state.match(/\{.*\}/)))));
} else{
	store.dispatch(setStateAction(state));
} 


ReactDOM.render(
	<Provider store = {store} >
		<Router history = {hashHistory}>{routes}</Router>
	</Provider>,
	document.body
);




