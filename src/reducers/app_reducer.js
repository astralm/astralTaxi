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
function setUserEmail(state, email = false){
	return !email ? state : state.set("user", state.get("user").set("email", email));
}
function setUserName(state, name = false){
	return !name ? state : state.set("user", state.get("user").set("name", name));
}
function setUserInBase(state, in_base = false){
	return in_base == false ?
		state.set("user", state.get("user").set("in_base", false)) :
		state.set("user", state.get("user").set("in_base", true));
}
function setUserPhone(state, phoneNumber = false){
	return !phoneNumber ? state : state.set("user", state.get("user").set("phoneNumber", phoneNumber));
}
function setUserRegistered(state, registered = false){
	return registered == false ?
		state.set("user", state.get("user").set("registered", false)) : 
		state.set("user", state.get("user").set("registered", true));
}
function setVerification(state, verification = false){
	return verification === true ? state.set("verification", true) : state.set("verification", false);
}
function setRegistration(state, registration = false){
	return registration == true ? state.set("registration", true) : state.set("registration", false);
}
function setPin(state, pin = false){
	return pin ? state.set("user", state.get("user").set("pin", pin)) : state;
}
function setStartPointCoordinates(state, lat, lng){
	return state.set("startPoint", state.get("startPoint").set("lat", lat).set("lng", lng));
}
function setStartPointAddress(state, address){
	return state.set("startPoint", state.get("startPoint").set("address", address));
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
			return setPin(state, action.pin);
		case 'SET_USER_EMAIL':
			return setUserEmail(state, action.email);
		case 'SET_USER_NAME':
			return setUserName(state, action.name);
		case 'SET_USER_IN_BASE':
			return setUserInBase(state, action.in_base);
		case 'SET_USER_REGISTERED':
			return setUserRegistered(state, action.registered);
		case 'SET_USER_PHONE': 
			return setUserPhone(state, action.phoneNumber);
		case 'SET_START_POINT_COORDINATES':
			return setStartPointCoordinates(state, action.lat, action.lng);
		case 'SET_START_POINT_ADDRESS':
			return setStartPointAddress(state, action.address);
	}
}