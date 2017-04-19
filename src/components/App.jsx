import React from 'react';
import {AuthContainer} from './Auth';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export const App = React.createClass({
	mixins: [PureRenderMixin],
  render: function() {
    return !this.props.auth ? <AuthContainer /> : this.props.children;
  }
});

function mapStateToProps(state){
	return {
		auth: state.get('auth')
	}
}

export const AppContainer = connect(mapStateToProps)(App);
