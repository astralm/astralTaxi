import {expect} from 'chai';
import {fromJS, Map} from 'immutable';
import setStateAction from '../../src/action_creators/set_state_creator.js';

describe('SET_STATE action creator', () => {
	it('проверка на пустое состояние', () => {
		const state = undefined;
		const action = setStateAction(state);

		expect(action.state).to.equal(Map());
		expect(action.type).to.equal('SET_STATE');
	});
	it('проверка на возвращённое состояние', () => {
		const state = fromJS({
			auth: true
		});
		const action = setStateAction(state);

		expect(action.state).to.equal(state);
	})
})