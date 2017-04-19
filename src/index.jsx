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

const routes = <Route component = {AppContainer}>
	<Route path="/" component = {Auth} />
</Route>

const state = fromJS({
	auth: false,
	registration: false
});

const store = createStore(reducer);
store.dispatch(setStateAction(state));

ReactDOM.render(
	<Provider store = {store} >
		<Router history = {hashHistory}>{routes}</Router>
	</Provider>,
	document.body
);




