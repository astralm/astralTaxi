import React from 'react';
import {connect} from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import setVerificationAction from '../action_creators/set_verification_creator.js';
import setRegistrationAction from '../action_creators/set_registration_creator.js';
import {RegistrationContainer} from '../components/Registration.jsx';
import {Carsharing} from '../components/Carsharing.jsx';

export const Verification = React.createClass({
	mixins: [PureRenderMixin],
	getInitialState: function(){
		return {
			inputsValues: []
		}
	},
	insert: function(event){
		var target =  event.target,
				value = target.value,
				id = parseInt(target.id.split("I").join("")),
				inputsValues = this.state.inputsValues;
		if (value.match(/[0-9]{1}/) != value || value == "" || value == undefined){
			event.target.value = ""
		} else if(inputsValues.filter(item => { return item }).length == 3){
			inputsValues[id - 1] = value;
			if (inputsValues.join("") == this.props.pin)
				this.props.setRegistrationAction(true);
			this.setState({inputsValues: []});
			for (var i = 1; i < 5; i ++)
				document.getElementById("I" + i).value = "";
		} else {
			inputsValues[id - 1] = value;
			document.getElementById("I" + (id == 4 ? id : id + 1)).focus();
			this.setState({inputsValues: inputsValues});
		}
	},
	redirect(){
		this.props.setVerificationAction(false);
	},
	render: function(){
		return !this.props.registration ? <div data-role="page" id="pass" className="il white ui-page ui-page-theme-a ui-page-active" data-url="pass" tabIndex="0">
		  <div data-role="content" style={{padding: 0, height: "100vh"}} className="ui-content" role="main">
		      <div className="segment-title" style={{border: "none"}}>
		          <div className="adress-title">
		              <a href="#login" onClick={this.redirect} className="back-link ui-link"></a>
		          </div>
		      </div>
		      <div className="pass-main">
		          <div className="pass-text-box">
		              <h3>Код подтверждения</h3>
		              <span>На ваш номер телефона был отправлен код подтверждения</span>
		          </div>
		          <div className="password-box">
		              <div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="password" onInput={this.insert} id="I1" maxLength = '1' autoFocus={true}/></div>
		              <div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="password" onInput={this.insert} id="I2" maxLength = '1'/></div>
		              <div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="password" onInput={this.insert} id="I3" maxLength = '1'/></div>
		              <div className="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset"><input type="password" onInput={this.insert} id="I4" maxLength = '1'/></div>
		          </div>
		      </div>
		  </div>
		</div> : !this.props.in_base ? <RegistrationContainer/> : <Carsharing/>;
	}
});

function mapStateToProps(state){
	return {
		registration: state.get('registration'),
		pin: state.getIn(["user", "pin"]),
		in_base: state.getIn(["user", "in_base"])
	}
}

export const VerificationContainer = connect(mapStateToProps, Object({setVerificationAction, setRegistrationAction}))(Verification);
