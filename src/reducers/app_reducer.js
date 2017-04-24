import {List, Map} from 'immutable';

function setState(state, newState = Map()){
	return state.merge(newState);
}
function setAuth(state, auth = false){
	return auth === true ? state.set('auth', true) : state.set('auth', false);
}
function setUserInformation(state, userInformation = false){
	return userInformation ? state.set("user", userInformation) : state;
}
function setVerification(state, verification = false){
	return verification === true ? state.set("verification", true) : state.set("verification", false);
}
function setRegistration(state, registration = false){
	return registration == true ? state.set("registration", true) : state.set("registration", false);
}
function setPin(state){
	return state.set("user", state.get("user").set("pin", Math.floor(Math.random() * 9000) + 1000));
}

export default function(state = Map(), action){
	switch (action.type){
		case 'SET_STATE': 
			return setState(state, action.state);
		case 'SET_AUTH': 
			return setAuth(state, action.auth);
		case 'SET_USER_INFORMATION': 
			return setUserInformation(state, action.userInformation);
		case 'SET_VERIFICATION': 
			return setVerification(state, action.verification);
		case 'SET_REGISTRATION':
			return setRegistration(state, action.registration);
		case "SET_PIN":
			return setPin(state);
	}
}