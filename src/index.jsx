import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
//import AppReducer from './reducers/app_reducer';
import App from './components/App';
import Auth from './components/Auth';

const routes = <Route component = {App}>
	<Route path="/auth" component = {Auth} />
</Route>

window.addEventListener("DOMContentLoaded",function(){
	ReactDOM.render(
		<Router history = {hashHistory}>{routes}</Router>,
		document.body
	);
});




