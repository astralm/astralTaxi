import {expect} from 'chai';
import {fromJS} from 'immutable';
import setUserInformationAction from '../../src/action_creators/set_user_information_action_creator.js';

describe('SET_USER_INFORMATION action creator', () => {
	it('Проверка на возвращённое значение', () => {
		const userInformation = fromJS({
			email: "simple@mail.ru",
			phone: "+79999999999",
			name: "simple name"
		});
		const action = setUserInformationAction(userInformation);

		expect(action.type).to.equal('SET_USER_INFORMATION');
		expect(action.userInformation).to.equal(fromJS({
			email: "simple@mail.ru",
			phone: "+79999999999",
			name: "simple name"
		}));
	});
});