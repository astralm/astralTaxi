import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import setUserEmail from '../action_creators/set_user_email_creator.js';
import setUserName from '../action_creators/set_user_name_creator.js';

export const Registration = React.createClass({
	mixins: [PureRenderMixin],
	validate: function(event){
		var target = event.target,
				id = target.id,
				value = target.value;
		switch (id){
			case 'email':
				if (value != undefined && value != "" && value.match(/.*\@[aA-zZ]*\.[aA-zZ]*/) == value){
					this.setState({email: value});
				} else {
					this.setState({email: ""});
				}
			case 'name':
				if (value != undefined && value != "" && value.match(/[aA-zZаА-яЯ ]*/) == value){
					this.setState({name: value});
				} else {
					this.setState({name: ""});
				}
		}
		if (this.state.email != "" && this.state.name != "" && this.value != ""){
			document.getElementById("next").classList.remove("disabled");
		} else {
			document.getElementById("next").classList.add("disabled");
		}
	},
	getInitialState: function(){
		return {
			email: "",
			name: ""
		}
	},
	next: function(){
		this.validate(window.event);
		if (document.getElementById("next").classList.value.indexOf("disabled") == -1){
			this.props.setUserName(this.state.name);
			this.props.setUserEmail(this.state.email, true);
		}
	},
	render: function(){
		return <div data-role="page" id="registration" className="il white inner-form ui-page ui-page-theme-a ui-page-active" data-url="registration" tabIndex="0">
	    <div data-role="content" style={{padding: 0, height: "100vh"}} className="ui-content" role="main">
	        <div className="registration">
	            <h3>Регистрация</h3>
	            <span className="sub">Начните свой путь с Followay!</span>
	            <form className="form_auth form_auth_user">
	                <div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" placeholder="Email" id="email" onInput = {this.validate}/></div>
	                <div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="text" placeholder="Имя" id="name" onInput = {this.validate}/></div>
	                <a className="btn btn-warning btn_auth waves-effect waves-light ui-link disabled" onClick = {this.next} id = "next">Продолжить</a>
	                <div className="check-doc"></div>
	        		</form>
	    		</div>
			</div>
		</div>
	}
});

export const RegistrationContainer = connect(null, Object({setUserEmail, setUserName}))(Registration);