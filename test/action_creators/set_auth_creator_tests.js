import {expect} from 'chai';
import {Map, fromJS} from 'immutable';
import setAuthAction from '../../src/action_creators/set_auth_creator.js';

describe('SET_AUTH action creator', () => {
 it('Проверка на пустой параметр', () => {
 	const auth = undefined;
 	const action = setAuthAction(auth);

 	expect(action.auth).to.equal(false);
 });
 it('провека на правильный результат', () => {
	const auth = true;
 	const action = setAuthAction(auth); 	

 	expect(action.type).to.equal('SET_AUTH');
 	expect(action.auth).to.equal(true);
 });
});