import {List, Map} from 'immutable';

function setState(state, newState = Map()){
	return state.merge(newState);
}
function setAuth(state, auth = false){
	return auth === true ? state.set('auth', true) : state.set('auth', false);
}
function setUserInformation(state, userInformation = false){
	return userInformation /*&& state.get('auth')*/ ? state.set("user", userInformation) : state;
}

export default function(state = Map(), action){
	switch (action.type){
		case 'SET_STATE': 
			return setState(state, action.state);
		case 'SET_AUTH': 
			return setState(state, setAuth(state, action.auth));
		case 'SET_USER_INFORMATION': 
			return setState(state, setUserInformation(state, action.userInformation));
	}
}