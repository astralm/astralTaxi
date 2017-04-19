import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../../src/reducers/app_reducer.js';

describe('app reducer', () => {
	it('обработчик SET_STATE', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: fromJS({
				auth: false
			})
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			auth: false
		}));
	});
	it('oбработчик SET_AUTH', () => {
		const initialState = Map();
		const action = {
			type: 'SET_AUTH',
			auth: false
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			auth: false
		}));
	});
	it('обработчик SET_AUTH проверка на другой тип данных', () => {
		const initialState = Map();
		const action = {
			type: 'SET_AUTH',
			auth: 3
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			auth: false
		}));
	});
	it('обработчик SET_USER_INFORMATION', () => {
		const initialState = fromJS({
			auth: true
		});
		const action = {
			type: 'SET_USER_INFORMATION',
			userInformation: fromJS({
				email: "simple@mail.ru",
				phone: "+79999999999",
				name: "simple name"
			})
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			auth: true,
			user: {
				email: "simple@mail.ru",
				phone: "+79999999999",
				name: "simple name" 
			}
		}));
	});
	it('обработчик SET_USER_INFORMATION провека на undefined', () => {
		const initialState = fromJS({
			auth: true
		});
		const action = {
			type: 'SET_USER_INFORMATION',
			userInformation: undefined
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			auth: true
		}));
	});
	it('обработчик SET_USER_INFORMATION проверка на наличие авторизации', () => {
		const initialState = Map();
		const action = {
			type: 'SET_USER_INFORMATION',
			userInformation: fromJS({
				email: "simple@mail.ru",
				phone: "+79999999999",
				name: "simple name"
			})
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(initialState);
	});
})