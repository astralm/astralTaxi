import {Map} from 'immutable';

export default function(state = Map()){
	return {
		type: "SET_STATE",
		state: state
	}
}