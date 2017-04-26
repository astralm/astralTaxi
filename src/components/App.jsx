import React from 'react';
import {LoginContainer} from './Login';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const App = React.createClass({
	mixins: [PureRenderMixin],
  render: function() {
    return !this.props.auth || !this.props.verification || !this.props.registration ? <LoginContainer /> : this.props.children;
  }
});

function mapStateToProps(state){
	return {
		auth: state.get('auth'),
		verification: state.get('verification'),
		registration: state.get('registration')
	}
}

export const AppContainer = connect(mapStateToProps)(App);
