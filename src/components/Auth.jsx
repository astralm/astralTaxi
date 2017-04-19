import React from 'react';
import {LoginContainer} from './Login';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const Auth = React.createClass({
	mixins: [PureRenderMixin],
	render: function(){
		return !this.props.registration ? <LoginContainer /> : <Registration />;
	}
});

function mapStateToProps(state){
	return {
		registration: state.get('registration')
	}
}

export const AuthContainer = connect(mapStateToProps)(Auth);

